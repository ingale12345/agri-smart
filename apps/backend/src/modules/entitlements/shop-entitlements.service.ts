import {
  Injectable,
  NotFoundException,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  ShopEntitlement,
  ShopEntitlementDocument,
} from './schemas/shop-entitlement.schema';
import { Entitlement, EntitlementDocument } from './schemas/entitlement.schema';
import {
  AssignShopEntitlementDto,
  AssignMultipleShopEntitlementsDto,
} from './dto/shop-entitlement.dto';
import { Shop, ShopDocument } from '../shops/schemas/shop.schema';

@Injectable()
export class ShopEntitlementsService {
  constructor(
    @InjectModel(ShopEntitlement.name)
    private shopEntitlementModel: Model<ShopEntitlementDocument>,
    @InjectModel(Entitlement.name)
    private entitlementModel: Model<EntitlementDocument>,
    @InjectModel(Shop.name)
    private shopModel: Model<ShopDocument>,
  ) {}

  async assignEntitlement(
    shopId: string,
    assignDto: AssignShopEntitlementDto,
    assignedBy: string,
  ) {
    // Verify shop exists
    const shop = await this.shopModel.findById(shopId).exec();
    if (!shop) {
      throw new NotFoundException('Shop not found');
    }

    // Verify entitlement exists
    const entitlement = await this.entitlementModel
      .findById(assignDto.entitlementId)
      .exec();
    if (!entitlement) {
      throw new NotFoundException('Entitlement not found');
    }

    // Check if already assigned
    const existing = await this.shopEntitlementModel
      .findOne({
        shopId,
        entitlementId: assignDto.entitlementId,
      })
      .exec();

    if (existing) {
      throw new ConflictException('Entitlement already assigned to this shop');
    }

    // Use provided permissions or default from entitlement
    const allowedPermissions = assignDto.allowedPermissions || {
      read: entitlement.applicablePermissions.read.enabled,
      create: entitlement.applicablePermissions.create.enabled,
      update: entitlement.applicablePermissions.update.enabled,
      delete: entitlement.applicablePermissions.delete.enabled,
      download: entitlement.applicablePermissions.download.enabled,
    };

    const shopEntitlement = new this.shopEntitlementModel({
      shopId,
      entitlementId: assignDto.entitlementId,
      entitlementCode: entitlement.entitlementCode,
      moduleName: entitlement.moduleName,
      allowedPermissions,
      assignedBy,
    });

    return shopEntitlement.save();
  }

  async assignMultipleEntitlements(
    shopId: string,
    assignDtos: AssignMultipleShopEntitlementsDto,
    assignedBy: string,
  ) {
    const results = [];
    const errors = [];

    for (const assignDto of assignDtos.entitlements) {
      try {
        const result = await this.assignEntitlement(
          shopId,
          assignDto,
          assignedBy,
        );
        results.push(result);
      } catch (error) {
        errors.push({
          entitlementId: assignDto.entitlementId,
          error: error.message,
        });
      }
    }

    return {
      success: results.length,
      failed: errors.length,
      results,
      errors,
    };
  }

  async getShopEntitlements(shopId: string) {
    const shop = await this.shopModel.findById(shopId).exec();
    if (!shop) {
      throw new NotFoundException('Shop not found');
    }

    return this.shopEntitlementModel
      .find({ shopId })
      .populate('entitlementId', 'entitlementName moduleName description')
      .populate('assignedBy', 'name email')
      .exec();
  }

  async removeEntitlement(shopId: string, entitlementId: string) {
    const shopEntitlement = await this.shopEntitlementModel
      .findOne({
        shopId,
        entitlementId,
      })
      .exec();

    if (!shopEntitlement) {
      throw new NotFoundException('Shop entitlement not found');
    }

    await this.shopEntitlementModel.findByIdAndDelete(shopEntitlement._id).exec();
    return { message: 'Entitlement removed from shop successfully' };
  }

  async updateEntitlementPermissions(
    shopId: string,
    entitlementId: string,
    allowedPermissions: any,
  ) {
    const shopEntitlement = await this.shopEntitlementModel
      .findOne({
        shopId,
        entitlementId,
      })
      .exec();

    if (!shopEntitlement) {
      throw new NotFoundException('Shop entitlement not found');
    }

    shopEntitlement.allowedPermissions = allowedPermissions;
    return shopEntitlement.save();
  }
}

