import { SetMetadata } from '@nestjs/common';

export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  SHOP_ADMIN = 'SHOP_ADMIN',
  STAFF = 'STAFF',
  DELIVERY = 'DELIVERY',
  CUSTOMER = 'CUSTOMER',
}

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
