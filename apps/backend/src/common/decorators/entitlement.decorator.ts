import { SetMetadata } from '@nestjs/common';

export interface EntitlementRequirement {
  entitlementCode: string;
  permission: 'read' | 'create' | 'update' | 'delete' | 'download';
}

export const ENTITLEMENT_KEY = 'entitlement';
export const Entitlement = (entitlementCode: string, permission: 'read' | 'create' | 'update' | 'delete' | 'download') =>
  SetMetadata(ENTITLEMENT_KEY, { entitlementCode, permission });

