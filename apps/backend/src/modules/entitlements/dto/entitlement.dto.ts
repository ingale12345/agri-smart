import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, ValidateNested, IsObject } from 'class-validator';
import { Type } from 'class-transformer';

export class PermissionConfigDto {
  @ApiProperty()
  @IsBoolean()
  enabled!: boolean;
}

export class ApplicablePermissionsDto {
  @ApiProperty({ type: () => PermissionConfigDto })
  @ValidateNested()
  @Type(() => PermissionConfigDto)
  read!: PermissionConfigDto;

  @ApiProperty({ type: () => PermissionConfigDto })
  @ValidateNested()
  @Type(() => PermissionConfigDto)
  create!: PermissionConfigDto;

  @ApiProperty({ type: () => PermissionConfigDto })
  @ValidateNested()
  @Type(() => PermissionConfigDto)
  update!: PermissionConfigDto;

  @ApiProperty({ type: () => PermissionConfigDto })
  @ValidateNested()
  @Type(() => PermissionConfigDto)
  delete!: PermissionConfigDto;

  @ApiProperty({ type: () => PermissionConfigDto })
  @ValidateNested()
  @Type(() => PermissionConfigDto)
  download!: PermissionConfigDto;
}

export class CreateEntitlementDto {
  @ApiProperty()
  @IsString()
  entitlementCode!: string;

  @ApiProperty()
  @IsString()
  entitlementName!: string;

  @ApiProperty()
  @IsString()
  moduleCode!: string;

  @ApiProperty()
  @IsString()
  moduleName!: string;

  @ApiProperty({ type: () => ApplicablePermissionsDto, required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => ApplicablePermissionsDto)
  applicablePermissions?: ApplicablePermissionsDto;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;
}

export class UpdateEntitlementDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  entitlementName?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  moduleName?: string;

  @ApiProperty({ type: () => ApplicablePermissionsDto, required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => ApplicablePermissionsDto)
  applicablePermissions?: ApplicablePermissionsDto;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;
}

export class EntitlementResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  entitlementCode!: string;

  @ApiProperty()
  entitlementName!: string;

  @ApiProperty()
  moduleCode!: string;

  @ApiProperty()
  moduleName!: string;

  @ApiProperty({ type: () => ApplicablePermissionsDto })
  applicablePermissions!: ApplicablePermissionsDto;

  @ApiProperty({ required: false })
  category?: string;

  @ApiProperty({ required: false })
  description?: string;
}

