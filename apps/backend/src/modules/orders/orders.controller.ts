import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
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
import { OrdersService } from './orders.service';
import {
  CreateOrderDto,
  UpdateOrderStatusDto,
  OrderResponseDto,
} from './dto/order.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { User } from '../../common/decorators/user.decorator';
import { UserRole } from '../../common/decorators/roles.decorator';

@ApiTags('Orders')
@ApiBearerAuth('JWT-auth')
@Controller('orders')
@UseGuards(JwtAuthGuard, RolesGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @Roles(UserRole.CUSTOMER, UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: 'Create a new order' })
  @ApiResponse({
    status: 201,
    description: 'Order created successfully',
    type: OrderResponseDto,
  })
  create(@Body() createOrderDto: CreateOrderDto, @User() currentUser: any) {
    return this.ordersService.create(createOrderDto, currentUser);
  }

  @Get()
  @Roles(
    UserRole.SUPER_ADMIN,
    UserRole.SHOP_ADMIN,
    UserRole.STAFF,
    UserRole.CUSTOMER,
  )
  @ApiOperation({ summary: 'Get all orders' })
  @ApiQuery({ name: 'shopId', required: false })
  @ApiResponse({
    status: 200,
    description: 'List of orders',
    type: [OrderResponseDto],
  })
  findAll(@Query('shopId') shopId?: string, @User() currentUser?: any) {
    return this.ordersService.findAll(shopId, currentUser);
  }

  @Get(':id')
  @Roles(
    UserRole.SUPER_ADMIN,
    UserRole.SHOP_ADMIN,
    UserRole.STAFF,
    UserRole.CUSTOMER,
  )
  @ApiOperation({ summary: 'Get order by ID' })
  @ApiResponse({
    status: 200,
    description: 'Order details',
    type: OrderResponseDto,
  })
  findOne(@Param('id') id: string, @User() currentUser: any) {
    return this.ordersService.findOne(id, currentUser);
  }

  @Patch(':id/status')
  @Roles(UserRole.SUPER_ADMIN, UserRole.SHOP_ADMIN, UserRole.STAFF)
  @ApiOperation({ summary: 'Update order status' })
  @ApiResponse({
    status: 200,
    description: 'Order status updated successfully',
    type: OrderResponseDto,
  })
  updateStatus(
    @Param('id') id: string,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
    @User() currentUser: any,
  ) {
    return this.ordersService.updateStatus(id, updateOrderStatusDto, currentUser);
  }

  @Get(':id/invoice')
  @Roles(
    UserRole.SUPER_ADMIN,
    UserRole.SHOP_ADMIN,
    UserRole.STAFF,
    UserRole.CUSTOMER,
  )
  @ApiOperation({ summary: 'Get order invoice' })
  @ApiResponse({
    status: 200,
    description: 'Order invoice',
    type: OrderResponseDto,
  })
  getInvoice(@Param('id') id: string, @User() currentUser: any) {
    return this.ordersService.getInvoice(id, currentUser);
  }
}

