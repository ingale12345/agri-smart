import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from '../auth/schemas/user.schema';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { UserRole } from '../../common/decorators/roles.decorator';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto, currentUser: any) {
    // SUPER_ADMIN can create all types
    // SHOP_ADMIN can create only STAFF and DELIVERY
    if (currentUser.role === UserRole.SHOP_ADMIN) {
      if (
        ![
          UserRole.STAFF,
          UserRole.DELIVERY,
        ].includes(createUserDto.role)
      ) {
        throw new ForbiddenException(
          'You can only create STAFF and DELIVERY users',
        );
      }
      // SHOP_ADMIN users must belong to the same shop
      if (createUserDto.shopId && createUserDto.shopId !== currentUser.shopId) {
        throw new ForbiddenException('You can only create users for your shop');
      }
      createUserDto.shopId = currentUser.shopId;
    }

    const existingUser = await this.userModel.findOne({
      email: createUserDto.email,
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });

    return user.save();
  }

  async findAll(currentUser: any) {
    const query: any = {};

    // SHOP_ADMIN can only see users from their shop
    if (currentUser.role === UserRole.SHOP_ADMIN) {
      query.shopId = currentUser.shopId;
    }

    return this.userModel
      .find(query)
      .select('-password')
      .populate('shopId', 'name code')
      .exec();
  }

  async findOne(id: string, currentUser: any) {
    const user = await this.userModel
      .findById(id)
      .select('-password')
      .populate('shopId', 'name code')
      .exec();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // SHOP_ADMIN can only access users from their shop
    if (
      currentUser.role === UserRole.SHOP_ADMIN &&
      user.shopId?.toString() !== currentUser.shopId
    ) {
      throw new ForbiddenException('Access denied');
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto, currentUser: any) {
    const user = await this.userModel.findById(id).exec();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // SHOP_ADMIN can only update users from their shop
    if (
      currentUser.role === UserRole.SHOP_ADMIN &&
      user.shopId?.toString() !== currentUser.shopId
    ) {
      throw new ForbiddenException('Access denied');
    }

    // SHOP_ADMIN cannot change shopId
    if (currentUser.role === UserRole.SHOP_ADMIN && updateUserDto.shopId) {
      delete updateUserDto.shopId;
    }

    Object.assign(user, updateUserDto);
    return user.save();
  }

  async remove(id: string, currentUser: any) {
    const user = await this.userModel.findById(id).exec();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Prevent deleting yourself
    if (user._id.toString() === currentUser.id) {
      throw new ForbiddenException('You cannot delete yourself');
    }

    // SHOP_ADMIN can only delete users from their shop
    if (
      currentUser.role === UserRole.SHOP_ADMIN &&
      user.shopId?.toString() !== currentUser.shopId
    ) {
      throw new ForbiddenException('Access denied');
    }

    await this.userModel.findByIdAndDelete(id).exec();
    return { message: 'User deleted successfully' };
  }
}

