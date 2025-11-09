import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { InventoryService } from './inventory.service';
import { CreateProductDto, UpdateProductDto, ProductResponseDto } from './dto/product.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { EntitlementGuard } from '../../common/guards/entitlement.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Entitlement } from '../../common/decorators/entitlement.decorator';
import { User } from '../../common/decorators/user.decorator';
import { UserRole } from '../../common/decorators/roles.decorator';
import { Public } from '../../common/decorators/public.decorator';

@ApiTags('Inventory')
@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard, EntitlementGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.SHOP_ADMIN)
  @Entitlement('INV_MGMT', 'create')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({
    status: 201,
    description: 'Product created successfully',
    type: ProductResponseDto,
  })
  create(@Body() createProductDto: CreateProductDto, @User() currentUser: any) {
    return this.inventoryService.create(createProductDto, currentUser);
  }

  @Get()
  @Public()
  @ApiOperation({ summary: 'Get all products' })
  @ApiQuery({ name: 'shopId', required: false })
  @ApiQuery({ name: 'branchId', required: false })
  @ApiQuery({ name: 'categoryId', required: false })
  @ApiResponse({
    status: 200,
    description: 'List of products',
    type: [ProductResponseDto],
  })
  findAll(
    @Query('shopId') shopId?: string,
    @Query('branchId') branchId?: string,
    @Query('categoryId') categoryId?: string,
    @User() currentUser?: any,
  ) {
    return this.inventoryService.findAll(shopId, branchId, categoryId, currentUser);
  }

  @Get(':id')
  @Public()
  @ApiOperation({ summary: 'Get product by ID' })
  @ApiResponse({
    status: 200,
    description: 'Product details',
    type: ProductResponseDto,
  })
  findOne(@Param('id') id: string, @User() currentUser?: any) {
    return this.inventoryService.findOne(id, currentUser);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard, EntitlementGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.SHOP_ADMIN)
  @Entitlement('INV_MGMT', 'update')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update product' })
  @ApiResponse({
    status: 200,
    description: 'Product updated successfully',
    type: ProductResponseDto,
  })
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @User() currentUser: any,
  ) {
    return this.inventoryService.update(id, updateProductDto, currentUser);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard, EntitlementGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.SHOP_ADMIN)
  @Entitlement('INV_MGMT', 'delete')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Delete product' })
  @ApiResponse({
    status: 200,
    description: 'Product deleted successfully',
  })
  remove(@Param('id') id: string, @User() currentUser: any) {
    return this.inventoryService.remove(id, currentUser);
  }
}

