export interface IPermissionStatus {
  enabled: boolean;
  isAllowed?: boolean;
}

export interface IEntitlementPermission {
  entitlementCode: string;
  entitlementName: string;
  moduleCode: string;
  moduleName: string;
  permissions: {
    read: IPermissionStatus;
    create: IPermissionStatus;
    update: IPermissionStatus;
    delete: IPermissionStatus;
    download: IPermissionStatus;
  };
}

export interface IApplicablePermissions {
  read: { enabled: boolean };
  create: { enabled: boolean };
  update: { enabled: boolean };
  delete: { enabled: boolean };
  download: { enabled: boolean };
}

export interface IEntitlement {
  id: string;
  entitlementCode: string;
  entitlementName: string;
  moduleCode: string;
  moduleName: string;
  applicablePermissions: IApplicablePermissions;
  category?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IAllowedPermissions {
  read: boolean;
  create: boolean;
  update: boolean;
  delete: boolean;
  download: boolean;
}

export interface IShopEntitlement {
  id: string;
  shopId: string;
  entitlementId: string;
  entitlementCode: string;
  moduleName: string;
  allowedPermissions: IAllowedPermissions;
  assignedBy: string;
  createdAt?: string;
}

export interface IAssignShopEntitlementPayload {
  entitlementId: string;
  allowedPermissions?: IAllowedPermissions;
}

export interface IAssignMultipleShopEntitlementsPayload {
  entitlements: IAssignShopEntitlementPayload[];
}
