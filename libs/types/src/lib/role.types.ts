import type { IEntitlementPermission } from './entitlement.types';

export interface IRole {
  id: string;
  shopId: string;
  roleName: string;
  roleCode: string;
  createdBy: string;
  entitlementPermissions: IEntitlementPermission[];
  isActive: boolean;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ICreateRolePayload {
  roleName: string;
  roleCode: string;
  entitlementPermissions: IEntitlementPermission[];
  description?: string;
}

export interface IUpdateRolePayload {
  roleName?: string;
  entitlementPermissions?: IEntitlementPermission[];
  isActive?: boolean;
  description?: string;
}
