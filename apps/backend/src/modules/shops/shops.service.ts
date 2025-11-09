import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Shop, ShopDocument } from './schemas/shop.schema';
import { CreateShopDto, UpdateShopDto } from './dto/shop.dto';

@Injectable()
export class ShopsService {
  constructor(
    @InjectModel(Shop.name) private shopModel: Model<ShopDocument>,
  ) {}

  async create(createShopDto: CreateShopDto) {
    const existingShop = await this.shopModel.findOne({
      $or: [{ name: createShopDto.name }, { code: createShopDto.code }],
    });

    if (existingShop) {
      throw new ConflictException('Shop with this name or code already exists');
    }

    const shop = new this.shopModel(createShopDto);
    return shop.save();
  }

  async findAll() {
    return this.shopModel.find().populate('categories', 'name').exec();
  }

  async findOne(id: string) {
    const shop = await this.shopModel
      .findById(id)
      .populate('categories', 'name description imageUrl')
      .exec();

    if (!shop) {
      throw new NotFoundException('Shop not found');
    }
    return shop;
  }

  async findByCode(code: string) {
    const shop = await this.shopModel
      .findOne({ code })
      .populate('categories', 'name description imageUrl')
      .exec();

    if (!shop) {
      throw new NotFoundException('Shop not found');
    }
    return shop;
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
        throw new ConflictException('Shop with this name or code already exists');
      }
    }

    Object.assign(shop, updateShopDto);
    return shop.save();
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

