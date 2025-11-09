import { Injectable, NotFoundException, ForbiddenException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';

@Injectable()
export class InventoryService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  calculateGST(price: number, gstPercentage: number): number {
    return (price * gstPercentage) / 100;
  }

  calculateTotalWithGST(price: number, gstPercentage: number): number {
    return price + this.calculateGST(price, gstPercentage);
  }

  async create(createProductDto: CreateProductDto, currentUser: any) {
    // Only SHOP_ADMIN can create products
    if (currentUser.role !== 'SUPER_ADMIN' && currentUser.role !== 'SHOP_ADMIN') {
      throw new ForbiddenException('Only shop admins can create products');
    }

    // SHOP_ADMIN can only create products for their shop
    if (currentUser.role === 'SHOP_ADMIN' && createProductDto.shopId !== currentUser.shopId) {
      throw new ForbiddenException('You can only create products for your shop');
    }

    // Check if SKU already exists for this shop
    const existingProduct = await this.productModel.findOne({
      shopId: createProductDto.shopId,
      sku: createProductDto.sku,
    });

    if (existingProduct) {
      throw new ConflictException('Product with this SKU already exists in this shop');
    }

    const product = new this.productModel(createProductDto);
    return product.save();
  }

  async findAll(shopId?: string, branchId?: string, categoryId?: string, currentUser?: any) {
    const query: any = {};

    // SHOP_ADMIN can only see products from their shop
    if (currentUser?.role === 'SHOP_ADMIN') {
      query.shopId = currentUser.shopId;
    } else if (shopId) {
      query.shopId = shopId;
    }

    if (branchId) {
      query.branchId = branchId;
    }

    if (categoryId) {
      query.categoryId = categoryId;
    }

    return this.productModel
      .find(query)
      .populate('categoryId', 'name')
      .populate('shopId', 'name code')
      .populate('branchId', 'name')
      .exec();
  }

  async findOne(id: string, currentUser?: any) {
    const product = await this.productModel
      .findById(id)
      .populate('categoryId', 'name description')
      .populate('shopId', 'name code')
      .populate('branchId', 'name')
      .exec();

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    // SHOP_ADMIN can only access products from their shop
    if (
      currentUser?.role === 'SHOP_ADMIN' &&
      product.shopId.toString() !== currentUser.shopId
    ) {
      throw new ForbiddenException('Access denied');
    }

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto, currentUser: any) {
    const product = await this.productModel.findById(id).exec();

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    // SHOP_ADMIN can only update products from their shop
    if (
      currentUser.role !== 'SUPER_ADMIN' &&
      currentUser.role !== 'SHOP_ADMIN'
    ) {
      throw new ForbiddenException('Only shop admins can update products');
    }

    if (
      currentUser.role === 'SHOP_ADMIN' &&
      product.shopId.toString() !== currentUser.shopId
    ) {
      throw new ForbiddenException('Access denied');
    }

    Object.assign(product, updateProductDto);
    return product.save();
  }

  async remove(id: string, currentUser: any) {
    const product = await this.productModel.findById(id).exec();

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    // SHOP_ADMIN can only delete products from their shop
    if (
      currentUser.role !== 'SUPER_ADMIN' &&
      currentUser.role !== 'SHOP_ADMIN'
    ) {
      throw new ForbiddenException('Only shop admins can delete products');
    }

    if (
      currentUser.role === 'SHOP_ADMIN' &&
      product.shopId.toString() !== currentUser.shopId
    ) {
      throw new ForbiddenException('Access denied');
    }

    await this.productModel.findByIdAndDelete(id).exec();
    return { message: 'Product deleted successfully' };
  }
}

