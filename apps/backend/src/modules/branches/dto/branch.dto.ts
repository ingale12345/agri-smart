import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsNumber,
  ValidateNested,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';

class GeoTagDto {
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

  @ApiProperty()
  @IsNumber()
  @Min(0)
  radius: number;
}

export class CreateBranchDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  shopId: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiProperty({ required: false, type: () => GeoTagDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => GeoTagDto)
  geoTag?: GeoTagDto;
}

export class UpdateBranchDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiProperty({ required: false, type: () => GeoTagDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => GeoTagDto)
  geoTag?: GeoTagDto;
}

export class BranchResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  shopId: string;

  @ApiProperty({ required: false })
  location?: string;

  @ApiProperty({ required: false })
  geoTag?: {
    lat: number;
    lng: number;
    radius: number;
  };
}

