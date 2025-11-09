import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsArray,
  IsEmail,
  ValidateNested,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { Type } from 'class-transformer';

class ThemeDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  primary?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  secondary?: string;
}

export class CreateShopDto {
  @ApiProperty()
  @IsString()
  name!: string;

  @ApiProperty()
  @IsString()
  code!: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  contact?: string;

  @ApiProperty({ required: false, type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  categories?: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  logoUrl?: string;

  @ApiProperty({ required: false, type: () => ThemeDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => ThemeDto)
  theme?: ThemeDto;

  // Shop Admin User Creation (optional)
  @ApiProperty({ required: false, description: 'Email for shop admin user' })
  @IsOptional()
  @IsEmail()
  adminEmail?: string;

  @ApiProperty({ required: false, description: 'Password for shop admin user (min 6 characters)' })
  @ValidateIf((o) => o.adminEmail)
  @IsString()
  @MinLength(6)
  adminPassword?: string;

  @ApiProperty({ required: false, description: 'Name for shop admin user' })
  @ValidateIf((o) => o.adminEmail)
  @IsString()
  adminName?: string;
}

export class UpdateShopDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  code?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  contact?: string;

  @ApiProperty({ required: false, type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  categories?: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  logoUrl?: string;

  @ApiProperty({ required: false, type: () => ThemeDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => ThemeDto)
  theme?: ThemeDto;
}

export class ShopResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  code!: string;

  @ApiProperty({ required: false })
  address?: string;

  @ApiProperty({ required: false })
  email?: string;

  @ApiProperty({ required: false })
  contact?: string;

  @ApiProperty({ type: [String] })
  categories!: string[];

  @ApiProperty({ required: false })
  logoUrl?: string;

  @ApiProperty({ required: false })
  theme?: {
    primary?: string;
    secondary?: string;
  };
}

