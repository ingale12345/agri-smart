export interface IShop {
  id: string;
  name: string;
  code: string;
  address?: string;
  email?: string;
  contact?: string;
  categories?: string[];
  logoUrl?: string;
  theme?: {
    primary?: string;
    secondary?: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface IShopConfig {
  id: string;
  name: string;
  code: string;
  logoUrl?: string;
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  theme?: {
    primary?: string;
    secondary?: string;
  };
}

export interface ICreateShopPayload {
  name: string;
  code: string;
  address?: string;
  email?: string;
  contact?: string;
  categories?: string[];
  logoUrl?: string;
  theme?: {
    primary?: string;
    secondary?: string;
  };
}

export interface IUpdateShopPayload {
  name?: string;
  code?: string;
  address?: string;
  email?: string;
  contact?: string;
  categories?: string[];
  logoUrl?: string;
  theme?: {
    primary?: string;
    secondary?: string;
  };
}

