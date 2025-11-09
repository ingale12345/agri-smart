import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ShopEntitlementsService } from './shop-entitlements.service';
import {
  AssignShopEntitlementDto,
  AssignMultipleShopEntitlementsDto,
  ShopEntitlementResponseDto,
  AllowedPermissionsDto,
} from './dto/shop-entitlement.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { User } from '../../common/decorators/user.decorator';
import { UserRole } from '../../common/decorators/roles.decorator';

@ApiTags('Shop Entitlements')
@ApiBearerAuth('JWT-auth')
@Controller('shops/:shopId/entitlements')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ShopEntitlementsController {
  constructor(
    private readonly shopEntitlementsService: ShopEntitlementsService,
  ) {}

  @Post()
  @Roles(UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: 'Assign entitlement to shop' })
  @ApiResponse({
    status: 201,
    description: 'Entitlement assigned successfully',
    type: ShopEntitlementResponseDto,
  })
  assignEntitlement(
    @Param('shopId') shopId: string,
    @Body() assignDto: AssignShopEntitlementDto,
    @User() currentUser: any,
  ) {
    return this.shopEntitlementsService.assignEntitlement(
      shopId,
      assignDto,
      currentUser.id,
    );
  }

  @Post('bulk')
  @Roles(UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: 'Assign multiple entitlements to shop' })
  @ApiResponse({
    status: 201,
    description: 'Entitlements assigned successfully',
  })
  assignMultipleEntitlements(
    @Param('shopId') shopId: string,
    @Body() assignDtos: AssignMultipleShopEntitlementsDto,
    @User() currentUser: any,
  ) {
    return this.shopEntitlementsService.assignMultipleEntitlements(
      shopId,
      assignDtos,
      currentUser.id,
    );
  }

  @Get()
  @Roles(UserRole.SUPER_ADMIN, UserRole.SHOP_ADMIN)
  @ApiOperation({ summary: 'Get shop entitlements' })
  @ApiResponse({
    status: 200,
    description: 'List of shop entitlements',
    type: [ShopEntitlementResponseDto],
  })
  getShopEntitlements(@Param('shopId') shopId: string) {
    return this.shopEntitlementsService.getShopEntitlements(shopId);
  }

  @Patch(':entitlementId/permissions')
  @Roles(UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: 'Update shop entitlement permissions' })
  @ApiResponse({
    status: 200,
    description: 'Permissions updated successfully',
    type: ShopEntitlementResponseDto,
  })
  updatePermissions(
    @Param('shopId') shopId: string,
    @Param('entitlementId') entitlementId: string,
    @Body() allowedPermissions: AllowedPermissionsDto,
  ) {
    return this.shopEntitlementsService.updateEntitlementPermissions(
      shopId,
      entitlementId,
      allowedPermissions,
    );
  }

  @Delete(':entitlementId')
  @Roles(UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: 'Remove entitlement from shop' })
  @ApiResponse({
    status: 200,
    description: 'Entitlement removed successfully',
  })
  removeEntitlement(
    @Param('shopId') shopId: string,
    @Param('entitlementId') entitlementId: string,
  ) {
    return this.shopEntitlementsService.removeEntitlement(shopId, entitlementId);
  }
}

