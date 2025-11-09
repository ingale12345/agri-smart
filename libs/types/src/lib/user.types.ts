import type { IEntitlementPermission } from './entitlement.types';

export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  SHOP_ADMIN = 'SHOP_ADMIN',
  STAFF = 'STAFF',
  DELIVERY = 'DELIVERY',
  CUSTOMER = 'CUSTOMER',
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  shopId?: string;
  roleId?: string;
  permissions?: IEntitlementPermission[];
  isActive?: boolean;
  phone?: string;
  address?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IAuthResponse {
  accessToken: string;
  user: IUser;
}

export interface ILoginPayload {
  email: string;
  password: string;
  shopId?: string;
}

export interface ISignupPayload {
  email: string;
  password: string;
  name: string;
  role?: UserRole;
  shopId?: string;
  phone?: string;
  address?: string;
}
