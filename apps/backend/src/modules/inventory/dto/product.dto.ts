import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsOptional,
  Min,
  IsNotEmpty,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  sku!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  unit!: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  price!: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  gst!: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  stock!: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  categoryId!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  shopId!: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  branchId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;
}

export class UpdateProductDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  unit?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  gst?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  stock?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  categoryId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  branchId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;
}

export class ProductResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  sku!: string;

  @ApiProperty()
  unit!: string;

  @ApiProperty()
  price!: number;

  @ApiProperty()
  gst!: number;

  @ApiProperty()
  stock!: number;

  @ApiProperty()
  categoryId!: string;

  @ApiProperty()
  shopId!: string;

  @ApiProperty({ required: false })
  branchId?: string;

  @ApiProperty({ required: false })
  imageUrl?: string;

  @ApiProperty({ required: false })
  description?: string;
}

