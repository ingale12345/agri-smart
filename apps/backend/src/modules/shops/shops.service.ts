import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Shop, ShopDocument } from './schemas/shop.schema';
import { CreateShopDto, UpdateShopDto } from './dto/shop.dto';
import { User, UserDocument } from '../auth/schemas/user.schema';
import { UserRole } from '../../common/decorators/roles.decorator';

@Injectable()
export class ShopsService {
  constructor(
    @InjectModel(Shop.name) private shopModel: Model<ShopDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}

  async create(createShopDto: CreateShopDto) {
    const existingShop = await this.shopModel.findOne({
      $or: [{ name: createShopDto.name }, { code: createShopDto.code }],
    });

    if (existingShop) {
      throw new ConflictException('Shop with this name or code already exists');
    }

    // Extract admin user fields (using type assertion to handle optional properties)
    const adminEmail = (createShopDto as any).adminEmail;
    const adminPassword = (createShopDto as any).adminPassword;
    const adminName = (createShopDto as any).adminName;

    // Validate admin user creation fields
    if (adminEmail) {
      if (!adminPassword || !adminName) {
        throw new BadRequestException(
          'adminEmail, adminPassword, and adminName are required together when creating a shop admin user'
        );
      }

      // Check if user with this email already exists
      const existingUser = await this.userModel.findOne({
        email: adminEmail,
      });

      if (existingUser) {
        throw new ConflictException(
          'User with this email already exists. Please use a different email for the shop admin.'
        );
      }
    }

    // Create the shop (exclude admin fields from shop data)
    const {
      adminEmail: _,
      adminPassword: __,
      adminName: ___,
      ...shopData
    } = createShopDto as any;
    const shop = new this.shopModel(shopData);
    const savedShop = await shop.save();

    // Create shop admin user if provided
    if (adminEmail && adminPassword && adminName) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);

      const shopAdminUser = new this.userModel({
        email: adminEmail,
        password: hashedPassword,
        name: adminName,
        role: UserRole.SHOP_ADMIN,
        shopId: savedShop._id,
        isActive: true,
      });

      await shopAdminUser.save();
    }

    // Transform MongoDB document to plain object with id field
    const shopObj = savedShop.toObject() as ShopDocument & {
      _id: Types.ObjectId;
    };
    return {
      ...shopObj,
      id: shopObj._id.toString(),
    };
  }

  async findAll() {
    const shops = await this.shopModel
      .find()
      .populate('categories', 'name')
      .exec();
    // Transform MongoDB documents to plain objects with id field
    return shops.map((shop) => {
      const shopObj = shop.toObject() as ShopDocument & { _id: Types.ObjectId };
      return {
        ...shopObj,
        id: shopObj._id.toString(),
      };
    });
  }

  async findOne(id: string) {
    const shop = await this.shopModel
      .findById(id)
      .populate('categories', 'name description imageUrl')
      .exec();

    if (!shop) {
      throw new NotFoundException('Shop not found');
    }

    // Transform MongoDB document to plain object with id field
    const shopObj = shop.toObject() as ShopDocument & { _id: Types.ObjectId };
    return {
      ...shopObj,
      id: shopObj._id.toString(),
    };
  }

  async findByCode(code: string) {
    const shop = await this.shopModel
      .findOne({ code })
      .populate('categories', 'name description imageUrl')
      .exec();

    if (!shop) {
      throw new NotFoundException('Shop not found');
    }

    // Transform MongoDB document to plain object with id field
    const shopObj = shop.toObject() as ShopDocument & { _id: Types.ObjectId };
    return {
      ...shopObj,
      id: shopObj._id.toString(),
    };
  }

  async update(id: string, updateShopDto: UpdateShopDto) {
    const shop = await this.shopModel.findById(id).exec();
    if (!shop) {
      throw new NotFoundException('Shop not found');
    }

    if (updateShopDto.name || updateShopDto.code) {
      const existingShop = await this.shopModel.findOne({
        $or: [
          updateShopDto.name ? { name: updateShopDto.name } : {},
          updateShopDto.code ? { code: updateShopDto.code } : {},
        ],
        _id: { $ne: id },
      });

      if (existingShop) {
        throw new ConflictException(
          'Shop with this name or code already exists'
        );
      }
    }

    Object.assign(shop, updateShopDto);
    const updatedShop = await shop.save();

    // Transform MongoDB document to plain object with id field
    const shopObj = updatedShop.toObject() as ShopDocument & {
      _id: Types.ObjectId;
    };
    return {
      ...shopObj,
      id: shopObj._id.toString(),
    };
  }

  async remove(id: string) {
    const shop = await this.shopModel.findById(id).exec();
    if (!shop) {
      throw new NotFoundException('Shop not found');
    }

    await this.shopModel.findByIdAndDelete(id).exec();
    return { message: 'Shop deleted successfully' };
  }
}
