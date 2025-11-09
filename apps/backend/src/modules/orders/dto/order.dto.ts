import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsEnum,
  IsArray,
  ValidateNested,
  Min,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import { OrderStatus, OrderType } from '../schemas/order.schema';

export class OrderItemDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  productId!: string;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  quantity!: number;
}

export class CreateOrderDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  shopId!: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  branchId?: string;

  @ApiProperty({ type: [OrderItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items!: OrderItemDto[];

  @ApiProperty({ enum: OrderType })
  @IsEnum(OrderType)
  orderType!: OrderType;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  deliveryAddress?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  discount?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}

export class UpdateOrderStatusDto {
  @ApiProperty({ enum: OrderStatus })
  @IsEnum(OrderStatus)
  status!: OrderStatus;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}

export class OrderResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  customerId!: string;

  @ApiProperty()
  shopId!: string;

  @ApiProperty({ required: false })
  branchId?: string;

  @ApiProperty({ type: [Object] })
  items!: any[];

  @ApiProperty()
  subtotal!: number;

  @ApiProperty()
  gst!: number;

  @ApiProperty()
  totalAmount!: number;

  @ApiProperty()
  discount!: number;

  @ApiProperty({ enum: OrderStatus })
  status!: OrderStatus;

  @ApiProperty({ enum: OrderType })
  orderType!: OrderType;

  @ApiProperty({ required: false })
  deliveryAddress?: string;

  @ApiProperty({ required: false })
  invoiceNumber?: string;

  @ApiProperty({ required: false })
  notes?: string;
}
