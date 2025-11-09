import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsBoolean,
  IsArray,
  ValidateNested,
  IsObject,
} from 'class-validator';
import { Type } from 'class-transformer';

export class PermissionStatusDto {
  @ApiProperty()
  @IsBoolean()
  enabled!: boolean;

  @ApiProperty()
  @IsBoolean()
  isAllowed!: boolean;
}

export class RolePermissionsDto {
  @ApiProperty({
    type: 'object',
    properties: {
      enabled: { type: 'boolean', example: true },
      isAllowed: { type: 'boolean', example: true },
    },
    example: { enabled: true, isAllowed: true },
  })
  @ValidateNested()
  @Type(() => PermissionStatusDto)
  read!: PermissionStatusDto;

  @ApiProperty({
    type: 'object',
    properties: {
      enabled: { type: 'boolean', example: true },
      isAllowed: { type: 'boolean', example: true },
    },
    example: { enabled: true, isAllowed: true },
  })
  @ValidateNested()
  @Type(() => PermissionStatusDto)
  create!: PermissionStatusDto;

  @ApiProperty({
    type: 'object',
    properties: {
      enabled: { type: 'boolean', example: true },
      isAllowed: { type: 'boolean', example: true },
    },
    example: { enabled: true, isAllowed: true },
  })
  @ValidateNested()
  @Type(() => PermissionStatusDto)
  update!: PermissionStatusDto;

  @ApiProperty({
    type: 'object',
    properties: {
      enabled: { type: 'boolean', example: true },
      isAllowed: { type: 'boolean', example: false },
    },
    example: { enabled: true, isAllowed: false },
  })
  @ValidateNested()
  @Type(() => PermissionStatusDto)
  delete!: PermissionStatusDto;

  @ApiProperty({
    type: 'object',
    properties: {
      enabled: { type: 'boolean', example: true },
      isAllowed: { type: 'boolean', example: true },
    },
    example: { enabled: true, isAllowed: true },
  })
  @ValidateNested()
  @Type(() => PermissionStatusDto)
  download!: PermissionStatusDto;
}

export class EntitlementPermissionDto {
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

  @ApiProperty({
    description: 'Permissions for this entitlement',
    type: 'object',
    additionalProperties: false,
    example: {
      read: { enabled: true, isAllowed: true },
      create: { enabled: true, isAllowed: true },
      update: { enabled: true, isAllowed: true },
      delete: { enabled: true, isAllowed: false },
      download: { enabled: true, isAllowed: true },
    },
  })
  @ValidateNested()
  @Type(() => RolePermissionsDto)
  permissions!: RolePermissionsDto;
}

export class CreateRoleDto {
  @ApiProperty()
  @IsString()
  roleName!: string;

  @ApiProperty()
  @IsString()
  roleCode!: string;

  @ApiProperty({ type: () => [EntitlementPermissionDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EntitlementPermissionDto)
  entitlementPermissions!: EntitlementPermissionDto[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;
}

export class UpdateRoleDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  roleName?: string;

  @ApiProperty({ type: () => [EntitlementPermissionDto], required: false })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EntitlementPermissionDto)
  entitlementPermissions?: EntitlementPermissionDto[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;
}

export class RoleResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  shopId!: string;

  @ApiProperty()
  roleName!: string;

  @ApiProperty()
  roleCode!: string;

  @ApiProperty()
  createdBy!: string;

  @ApiProperty({ type: () => [EntitlementPermissionDto] })
  entitlementPermissions!: EntitlementPermissionDto[];

  @ApiProperty()
  isActive!: boolean;

  @ApiProperty({ required: false })
  description?: string;
}

