import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsEnum,
  IsDate,
  ValidateNested,
  IsNumber,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';
import { DeliveryStatus } from '../schemas/delivery.schema';

class LocationDto {
  @ApiProperty()
  @IsNumber()
  @Min(-90)
  @Max(90)
  lat: number;

  @ApiProperty()
  @IsNumber()
  @Min(-180)
  @Max(180)
  lng: number;
}

export class CreateDeliveryDto {
  @ApiProperty()
  @IsString()
  orderId: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  deliveryAgentId?: string;
}

export class UpdateDeliveryDto {
  @ApiProperty({ required: false, enum: DeliveryStatus })
  @IsOptional()
  @IsEnum(DeliveryStatus)
  status?: DeliveryStatus;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  deliveryAgentId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  estimatedTime?: Date;

  @ApiProperty({ required: false, type: () => LocationDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => LocationDto)
  location?: LocationDto;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}

export class DeliveryResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  orderId: string;

  @ApiProperty({ required: false })
  deliveryAgentId?: string;

  @ApiProperty({ enum: DeliveryStatus })
  status: DeliveryStatus;

  @ApiProperty({ required: false })
  estimatedTime?: Date;

  @ApiProperty({ required: false })
  deliveredAt?: Date;

  @ApiProperty({ required: false })
  location?: {
    lat: number;
    lng: number;
  };

  @ApiProperty({ required: false })
  notes?: string;
}

