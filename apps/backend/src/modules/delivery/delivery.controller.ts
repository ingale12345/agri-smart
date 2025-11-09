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
import { DeliveryService } from './delivery.service';
import {
  CreateDeliveryDto,
  UpdateDeliveryDto,
  DeliveryResponseDto,
} from './dto/delivery.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { User } from '../../common/decorators/user.decorator';
import { UserRole } from '../../common/decorators/roles.decorator';

@ApiTags('Delivery')
@ApiBearerAuth('JWT-auth')
@Controller('delivery')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @Post()
  @Roles(UserRole.SUPER_ADMIN, UserRole.SHOP_ADMIN, UserRole.STAFF)
  @ApiOperation({ summary: 'Create delivery tracking for an order' })
  @ApiResponse({
    status: 201,
    description: 'Delivery created successfully',
    type: DeliveryResponseDto,
  })
  create(@Body() createDeliveryDto: CreateDeliveryDto, @User() currentUser: any) {
    return this.deliveryService.create(createDeliveryDto, currentUser);
  }

  @Get()
  @Roles(
    UserRole.SUPER_ADMIN,
    UserRole.SHOP_ADMIN,
    UserRole.STAFF,
    UserRole.DELIVERY,
  )
  @ApiOperation({ summary: 'Get all deliveries' })
  @ApiQuery({ name: 'shopId', required: false })
  @ApiResponse({
    status: 200,
    description: 'List of deliveries',
    type: [DeliveryResponseDto],
  })
  findAll(@Query('shopId') shopId?: string, @User() currentUser?: any) {
    return this.deliveryService.findAll(shopId, currentUser);
  }

  @Get(':id')
  @Roles(
    UserRole.SUPER_ADMIN,
    UserRole.SHOP_ADMIN,
    UserRole.STAFF,
    UserRole.DELIVERY,
    UserRole.CUSTOMER,
  )
  @ApiOperation({ summary: 'Get delivery by ID' })
  @ApiResponse({
    status: 200,
    description: 'Delivery details',
    type: DeliveryResponseDto,
  })
  findOne(@Param('id') id: string, @User() currentUser?: any) {
    return this.deliveryService.findOne(id, currentUser);
  }

  @Patch(':id')
  @Roles(
    UserRole.SUPER_ADMIN,
    UserRole.SHOP_ADMIN,
    UserRole.STAFF,
    UserRole.DELIVERY,
  )
  @ApiOperation({ summary: 'Update delivery' })
  @ApiResponse({
    status: 200,
    description: 'Delivery updated successfully',
    type: DeliveryResponseDto,
  })
  update(
    @Param('id') id: string,
    @Body() updateDeliveryDto: UpdateDeliveryDto,
    @User() currentUser: any,
  ) {
    return this.deliveryService.update(id, updateDeliveryDto, currentUser);
  }

  @Patch(':id/assign')
  @Roles(UserRole.SUPER_ADMIN, UserRole.SHOP_ADMIN, UserRole.STAFF)
  @ApiOperation({ summary: 'Assign delivery agent' })
  @ApiResponse({
    status: 200,
    description: 'Delivery agent assigned successfully',
    type: DeliveryResponseDto,
  })
  assignAgent(
    @Param('id') id: string,
    @Body() body: { deliveryAgentId: string },
    @User() currentUser: any,
  ) {
    return this.deliveryService.assignDeliveryAgent(id, body.deliveryAgentId, currentUser);
  }
}

