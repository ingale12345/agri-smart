import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './schemas/user.schema';
import { SignupDto, LoginDto, ShopLoginDto, AuthResponseDto } from './dto/auth.dto';
import { UserRole } from '../../common/decorators/roles.decorator';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto): Promise<AuthResponseDto> {
    const existingUser = await this.userModel.findOne({
      email: signupDto.email,
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(signupDto.password, 10);

    const user = new this.userModel({
      ...signupDto,
      password: hashedPassword,
      role: signupDto.role || UserRole.CUSTOMER,
    });

    await user.save();

    const payload = {
      sub: user._id,
      email: user.email,
      role: user.role,
      shopId: user.shopId?.toString(),
      roleId: user.roleId?.toString(),
    };
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        role: user.role,
        shopId: user.shopId?.toString(),
        roleId: user.roleId?.toString(),
        permissions: user.permissions || [],
      },
    };
  }

  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    const user = await this.userModel.findOne({ email: loginDto.email });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Account is inactive');
    }

    const payload = {
      sub: user._id,
      email: user.email,
      role: user.role,
      shopId: user.shopId?.toString(),
      roleId: user.roleId?.toString(),
    };
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        role: user.role,
        shopId: user.shopId?.toString(),
        roleId: user.roleId?.toString(),
        permissions: user.permissions || [],
      },
    };
  }

  async shopLogin(shopLoginDto: ShopLoginDto): Promise<AuthResponseDto> {
    const user = await this.userModel.findOne({
      email: shopLoginDto.email,
      shopId: shopLoginDto.shopId,
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials or shop association');
    }

    const isPasswordValid = await bcrypt.compare(
      shopLoginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Account is inactive');
    }

    // Verify user has shop-related role
    if (
      ![
        UserRole.SUPER_ADMIN,
        UserRole.SHOP_ADMIN,
        UserRole.STAFF,
        UserRole.DELIVERY,
      ].includes(user.role)
    ) {
      throw new UnauthorizedException('User does not have shop access');
    }

    const payload = {
      sub: user._id,
      email: user.email,
      role: user.role,
      shopId: user.shopId?.toString(),
      roleId: user.roleId?.toString(),
    };
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        role: user.role,
        shopId: user.shopId?.toString(),
        roleId: user.roleId?.toString(),
        permissions: user.permissions || [],
      },
    };
  }

  async validateUser(userId: string): Promise<UserDocument> {
    const user = await this.userModel.findById(userId);
    if (!user || !user.isActive) {
      throw new UnauthorizedException('User not found or inactive');
    }
    return user;
  }
}

