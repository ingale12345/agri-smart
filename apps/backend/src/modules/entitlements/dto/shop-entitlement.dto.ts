import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsArray, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class AllowedPermissionsDto {
  @ApiProperty()
  @IsBoolean()
  read!: boolean;

  @ApiProperty()
  @IsBoolean()
  create!: boolean;

  @ApiProperty()
  @IsBoolean()
  update!: boolean;

  @ApiProperty()
  @IsBoolean()
  delete!: boolean;

  @ApiProperty()
  @IsBoolean()
  download!: boolean;
}

export class AssignShopEntitlementDto {
  @ApiProperty()
  @IsString()
  entitlementId!: string;

  @ApiProperty({ type: () => AllowedPermissionsDto, required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => AllowedPermissionsDto)
  allowedPermissions?: AllowedPermissionsDto;
}

export class AssignMultipleShopEntitlementsDto {
  @ApiProperty({ type: () => [AssignShopEntitlementDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AssignShopEntitlementDto)
  entitlements!: AssignShopEntitlementDto[];
}

export class ShopEntitlementResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  shopId!: string;

  @ApiProperty()
  entitlementId!: string;

  @ApiProperty()
  entitlementCode!: string;

  @ApiProperty()
  moduleName!: string;

  @ApiProperty({ type: () => AllowedPermissionsDto })
  allowedPermissions!: AllowedPermissionsDto;

  @ApiProperty()
  assignedBy!: string;
}

