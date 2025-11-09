import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Branch, BranchDocument } from './schemas/branch.schema';
import { CreateBranchDto, UpdateBranchDto } from './dto/branch.dto';

@Injectable()
export class BranchesService {
  constructor(
    @InjectModel(Branch.name) private branchModel: Model<BranchDocument>,
  ) {}

  async create(createBranchDto: CreateBranchDto, currentUser: any) {
    // SUPER_ADMIN can create branches for any shop
    // SHOP_ADMIN can only create branches for their shop
    if (
      currentUser.role !== 'SUPER_ADMIN' &&
      createBranchDto.shopId !== currentUser.shopId
    ) {
      throw new ForbiddenException('You can only create branches for your shop');
    }

    const branch = new this.branchModel(createBranchDto);
    return branch.save();
  }

  async findAll(shopId?: string, currentUser?: any) {
    const query: any = {};

    // SHOP_ADMIN can only see branches from their shop
    if (currentUser?.role === 'SHOP_ADMIN') {
      query.shopId = currentUser.shopId;
    } else if (shopId) {
      query.shopId = shopId;
    }

    return this.branchModel
      .find(query)
      .populate('shopId', 'name code')
      .exec();
  }

  async findOne(id: string, currentUser?: any) {
    const branch = await this.branchModel
      .findById(id)
      .populate('shopId', 'name code')
      .exec();

    if (!branch) {
      throw new NotFoundException('Branch not found');
    }

    // SHOP_ADMIN can only access branches from their shop
    if (
      currentUser?.role === 'SHOP_ADMIN' &&
      branch.shopId.toString() !== currentUser.shopId
    ) {
      throw new ForbiddenException('Access denied');
    }

    return branch;
  }

  async update(id: string, updateBranchDto: UpdateBranchDto, currentUser: any) {
    const branch = await this.branchModel.findById(id).exec();

    if (!branch) {
      throw new NotFoundException('Branch not found');
    }

    // SHOP_ADMIN can only update branches from their shop
    if (
      currentUser.role !== 'SUPER_ADMIN' &&
      branch.shopId.toString() !== currentUser.shopId
    ) {
      throw new ForbiddenException('Access denied');
    }

    Object.assign(branch, updateBranchDto);
    return branch.save();
  }

  async remove(id: string, currentUser: any) {
    const branch = await this.branchModel.findById(id).exec();

    if (!branch) {
      throw new NotFoundException('Branch not found');
    }

    // SHOP_ADMIN can only delete branches from their shop
    if (
      currentUser.role !== 'SUPER_ADMIN' &&
      branch.shopId.toString() !== currentUser.shopId
    ) {
      throw new ForbiddenException('Access denied');
    }

    await this.branchModel.findByIdAndDelete(id).exec();
    return { message: 'Branch deleted successfully' };
  }
}

