import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { User } from '../../common/decorators/user.decorator';
import { UserRole } from '../../common/decorators/roles.decorator';

@ApiTags('Analytics')
@ApiBearerAuth('JWT-auth')
@Controller('analytics')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('sales-by-product')
  @Roles(UserRole.SUPER_ADMIN, UserRole.SHOP_ADMIN)
  @ApiOperation({ summary: 'Get sales by product' })
  @ApiQuery({ name: 'shopId', required: false })
  @ApiQuery({ name: 'startDate', required: false })
  @ApiQuery({ name: 'endDate', required: false })
  @ApiResponse({ status: 200, description: 'Sales by product' })
  getSalesByProduct(
    @Query('shopId') shopId?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @User() currentUser?: any,
  ) {
    const shop = shopId || (currentUser?.role === 'SHOP_ADMIN' ? currentUser.shopId : undefined);
    return this.analyticsService.getSalesByProduct(
      shop,
      startDate ? new Date(startDate) : undefined,
      endDate ? new Date(endDate) : undefined,
    );
  }

  @Get('sales-by-category')
  @Roles(UserRole.SUPER_ADMIN, UserRole.SHOP_ADMIN)
  @ApiOperation({ summary: 'Get sales by category' })
  @ApiQuery({ name: 'shopId', required: false })
  @ApiQuery({ name: 'startDate', required: false })
  @ApiQuery({ name: 'endDate', required: false })
  @ApiResponse({ status: 200, description: 'Sales by category' })
  getSalesByCategory(
    @Query('shopId') shopId?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @User() currentUser?: any,
  ) {
    const shop = shopId || (currentUser?.role === 'SHOP_ADMIN' ? currentUser.shopId : undefined);
    return this.analyticsService.getSalesByCategory(
      shop,
      startDate ? new Date(startDate) : undefined,
      endDate ? new Date(endDate) : undefined,
    );
  }

  @Get('pickup-vs-delivery')
  @Roles(UserRole.SUPER_ADMIN, UserRole.SHOP_ADMIN)
  @ApiOperation({ summary: 'Get pickup vs delivery ratio' })
  @ApiQuery({ name: 'shopId', required: false })
  @ApiQuery({ name: 'startDate', required: false })
  @ApiQuery({ name: 'endDate', required: false })
  @ApiResponse({ status: 200, description: 'Pickup vs delivery ratio' })
  getPickupVsDeliveryRatio(
    @Query('shopId') shopId?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @User() currentUser?: any,
  ) {
    const shop = shopId || (currentUser?.role === 'SHOP_ADMIN' ? currentUser.shopId : undefined);
    return this.analyticsService.getPickupVsDeliveryRatio(
      shop,
      startDate ? new Date(startDate) : undefined,
      endDate ? new Date(endDate) : undefined,
    );
  }

  @Get('revenue')
  @Roles(UserRole.SUPER_ADMIN, UserRole.SHOP_ADMIN)
  @ApiOperation({ summary: 'Get overall revenue' })
  @ApiQuery({ name: 'shopId', required: false })
  @ApiQuery({ name: 'startDate', required: false })
  @ApiQuery({ name: 'endDate', required: false })
  @ApiResponse({ status: 200, description: 'Overall revenue' })
  getOverallRevenue(
    @Query('shopId') shopId?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @User() currentUser?: any,
  ) {
    const shop = shopId || (currentUser?.role === 'SHOP_ADMIN' ? currentUser.shopId : undefined);
    return this.analyticsService.getOverallRevenue(
      shop,
      startDate ? new Date(startDate) : undefined,
      endDate ? new Date(endDate) : undefined,
    );
  }

  @Get('sales-by-season')
  @Roles(UserRole.SUPER_ADMIN, UserRole.SHOP_ADMIN)
  @ApiOperation({ summary: 'Get sales by season/month' })
  @ApiQuery({ name: 'shopId', required: false })
  @ApiQuery({ name: 'year', required: false })
  @ApiResponse({ status: 200, description: 'Sales by season' })
  getSalesBySeason(
    @Query('shopId') shopId?: string,
    @Query('year') year?: number,
    @User() currentUser?: any,
  ) {
    const shop = shopId || (currentUser?.role === 'SHOP_ADMIN' ? currentUser.shopId : undefined);
    return this.analyticsService.getSalesBySeason(shop, year ? Number(year) : undefined);
  }
}

