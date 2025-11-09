import {
  Injectable,
  NotFoundException,
  ConflictException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role, RoleDocument } from './schemas/role.schema';
import { CreateRoleDto, UpdateRoleDto } from './dto/role.dto';
import { Shop, ShopDocument } from '../shops/schemas/shop.schema';
import {
  ShopEntitlement,
  ShopEntitlementDocument,
} from '../entitlements/schemas/shop-entitlement.schema';
import { User, UserDocument } from '../auth/schemas/user.schema';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role.name) private roleModel: Model<RoleDocument>,
    @InjectModel(Shop.name) private shopModel: Model<ShopDocument>,
    @InjectModel(ShopEntitlement.name)
    private shopEntitlementModel: Model<ShopEntitlementDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async create(createRoleDto: CreateRoleDto, shopId: string, createdBy: string) {
    // Verify shop exists
    const shop = await this.shopModel.findById(shopId).exec();
    if (!shop) {
      throw new NotFoundException('Shop not found');
    }

    // Verify user has access to this shop
    const user = await this.userModel.findById(createdBy).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.shopId?.toString() !== shopId) {
      throw new ForbiddenException('You can only create roles for your shop');
    }

    // Check if role code already exists for this shop
    const existingRole = await this.roleModel.findOne({
      shopId,
      roleCode: createRoleDto.roleCode.toUpperCase(),
    });

    if (existingRole) {
      throw new ConflictException('Role with this code already exists for this shop');
    }

    // Validate that all entitlements are assigned to the shop
    const shopEntitlements = await this.shopEntitlementModel
      .find({ shopId })
      .exec();

    const shopEntitlementCodes = shopEntitlements.map((se) => se.entitlementCode);

    for (const entPerm of createRoleDto.entitlementPermissions) {
      if (!shopEntitlementCodes.includes(entPerm.entitlementCode.toUpperCase())) {
        throw new BadRequestException(
          `Entitlement ${entPerm.entitlementCode} is not assigned to this shop`,
        );
      }

      // Validate permissions against shop entitlements
      const shopEntitlement = shopEntitlements.find(
        (se) => se.entitlementCode === entPerm.entitlementCode.toUpperCase(),
      );

      if (shopEntitlement) {
        // Check if requested permissions are allowed by shop entitlement
        if (
          entPerm.permissions.read.isAllowed &&
          !shopEntitlement.allowedPermissions.read
        ) {
          throw new BadRequestException(
            `Read permission not allowed for ${entPerm.entitlementCode}`,
          );
        }
        if (
          entPerm.permissions.create.isAllowed &&
          !shopEntitlement.allowedPermissions.create
        ) {
          throw new BadRequestException(
            `Create permission not allowed for ${entPerm.entitlementCode}`,
          );
        }
        if (
          entPerm.permissions.update.isAllowed &&
          !shopEntitlement.allowedPermissions.update
        ) {
          throw new BadRequestException(
            `Update permission not allowed for ${entPerm.entitlementCode}`,
          );
        }
        if (
          entPerm.permissions.delete.isAllowed &&
          !shopEntitlement.allowedPermissions.delete
        ) {
          throw new BadRequestException(
            `Delete permission not allowed for ${entPerm.entitlementCode}`,
          );
        }
        if (
          entPerm.permissions.download.isAllowed &&
          !shopEntitlement.allowedPermissions.download
        ) {
          throw new BadRequestException(
            `Download permission not allowed for ${entPerm.entitlementCode}`,
          );
        }
      }
    }

    const role = new this.roleModel({
      ...createRoleDto,
      shopId,
      roleCode: createRoleDto.roleCode.toUpperCase(),
      createdBy,
      isActive: true,
    });

    return role.save();
  }

  async findAll(shopId: string, currentUser?: any) {
    // SHOP_ADMIN can only see roles from their shop
    if (currentUser?.role === 'SHOP_ADMIN' && currentUser.shopId !== shopId) {
      throw new ForbiddenException('You can only view roles for your shop');
    }

    return this.roleModel
      .find({ shopId })
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 })
      .exec();
  }

  async findOne(id: string, currentUser?: any) {
    const role = await this.roleModel
      .findById(id)
      .populate('createdBy', 'name email')
      .populate('shopId', 'name code')
      .exec();

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    // SHOP_ADMIN can only access roles from their shop
    if (
      currentUser?.role === 'SHOP_ADMIN' &&
      role.shopId.toString() !== currentUser.shopId
    ) {
      throw new ForbiddenException('Access denied');
    }

    return role;
  }

  async update(id: string, updateRoleDto: UpdateRoleDto, currentUser: any) {
    const role = await this.roleModel.findById(id).exec();

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    // SHOP_ADMIN can only update roles from their shop
    if (
      currentUser.role === 'SHOP_ADMIN' &&
      role.shopId.toString() !== currentUser.shopId
    ) {
      throw new ForbiddenException('Access denied');
    }

    // Validate entitlements if updating
    if (updateRoleDto.entitlementPermissions) {
      const shopEntitlements = await this.shopEntitlementModel
        .find({ shopId: role.shopId })
        .exec();

      const shopEntitlementCodes = shopEntitlements.map((se) => se.entitlementCode);

      for (const entPerm of updateRoleDto.entitlementPermissions) {
        if (!shopEntitlementCodes.includes(entPerm.entitlementCode.toUpperCase())) {
          throw new BadRequestException(
            `Entitlement ${entPerm.entitlementCode} is not assigned to this shop`,
          );
        }
      }
    }

    Object.assign(role, updateRoleDto);
    return role.save();
  }

  async remove(id: string, currentUser: any) {
    const role = await this.roleModel.findById(id).exec();

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    // SHOP_ADMIN can only delete roles from their shop
    if (
      currentUser.role === 'SHOP_ADMIN' &&
      role.shopId.toString() !== currentUser.shopId
    ) {
      throw new ForbiddenException('Access denied');
    }

    // Check if any users are using this role
    const usersWithRole = await this.userModel
      .find({ roleId: id })
      .countDocuments()
      .exec();

    if (usersWithRole > 0) {
      throw new BadRequestException(
        'Cannot delete role. There are users assigned to this role.',
      );
    }

    await this.roleModel.findByIdAndDelete(id).exec();
    return { message: 'Role deleted successfully' };
  }

  async assignRoleToUser(userId: string, roleId: string, currentUser: any) {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const role = await this.roleModel.findById(roleId).exec();
    if (!role) {
      throw new NotFoundException('Role not found');
    }

    // SHOP_ADMIN can only assign roles to users from their shop
    if (
      currentUser.role === 'SHOP_ADMIN' &&
      (user.shopId?.toString() !== currentUser.shopId ||
        role.shopId.toString() !== currentUser.shopId)
    ) {
      throw new ForbiddenException('Access denied');
    }

    // Verify user belongs to the same shop as the role
    if (user.shopId?.toString() !== role.shopId.toString()) {
      throw new BadRequestException(
        'User and role must belong to the same shop',
      );
    }

    // Build permissions array from role
    const permissions = role.entitlementPermissions.map((ep) => ({
      entitlementCode: ep.entitlementCode,
      moduleName: ep.moduleName,
      permissions: {
        read: ep.permissions.read.isAllowed,
        create: ep.permissions.create.isAllowed,
        update: ep.permissions.update.isAllowed,
        delete: ep.permissions.delete.isAllowed,
        download: ep.permissions.download.isAllowed,
      },
    }));

    user.roleId = role._id as any;
    user.permissions = permissions;
    await user.save();

    return user;
  }

  async removeRoleFromUser(userId: string, currentUser: any) {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // SHOP_ADMIN can only remove roles from users from their shop
    if (
      currentUser.role === 'SHOP_ADMIN' &&
      user.shopId?.toString() !== currentUser.shopId
    ) {
      throw new ForbiddenException('Access denied');
    }

    user.roleId = undefined;
    user.permissions = [];
    await user.save();

    return user;
  }
}

