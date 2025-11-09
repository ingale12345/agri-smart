import { apiClient, API_SHOP_ENTITLEMENTS, API_ASSIGN_SHOP_ENTITLEMENTS } from '../index';
import type {
  IEntitlement,
  IShopEntitlement,
  IAssignMultipleShopEntitlementsPayload,
} from '@agri-smart/types';
import { SERVICES } from '../index';

export interface ICreateEntitlementPayload {
  entitlementCode: string;
  entitlementName: string;
  moduleCode: string;
  moduleName: string;
  applicablePermissions?: {
    read: { enabled: boolean };
    create: { enabled: boolean };
    update: { enabled: boolean };
    delete: { enabled: boolean };
    download: { enabled: boolean };
  };
  category?: string;
  description?: string;
}

export interface IUpdateEntitlementPayload {
  entitlementName?: string;
  moduleName?: string;
  applicablePermissions?: {
    read: { enabled: boolean };
    create: { enabled: boolean };
    update: { enabled: boolean };
    delete: { enabled: boolean };
    download: { enabled: boolean };
  };
  category?: string;
  description?: string;
}

export const entitlementsAPI = {
  getAll: async (): Promise<IEntitlement[]> => {
    const response = await apiClient.get<IEntitlement[]>(SERVICES.ENTITLEMENTS);
    return response.data;
  },

  getById: async (entitlementId: string): Promise<IEntitlement> => {
    const response = await apiClient.get<IEntitlement>(`${SERVICES.ENTITLEMENTS}/${entitlementId}`);
    return response.data;
  },

  create: async (payload: ICreateEntitlementPayload): Promise<IEntitlement> => {
    const response = await apiClient.post<IEntitlement>(SERVICES.ENTITLEMENTS, payload);
    return response.data;
  },

  update: async (entitlementId: string, payload: IUpdateEntitlementPayload): Promise<IEntitlement> => {
    const response = await apiClient.patch<IEntitlement>(`${SERVICES.ENTITLEMENTS}/${entitlementId}`, payload);
    return response.data;
  },

  delete: async (entitlementId: string): Promise<void> => {
    await apiClient.delete(`${SERVICES.ENTITLEMENTS}/${entitlementId}`);
  },

  // Shop Entitlements
  getShopEntitlements: async (shopId: string): Promise<IShopEntitlement[]> => {
    const response = await apiClient.get<IShopEntitlement[]>(API_SHOP_ENTITLEMENTS(shopId));
    return response.data;
  },

  assignToShop: async (shopId: string, payload: IAssignMultipleShopEntitlementsPayload): Promise<IShopEntitlement[]> => {
    const response = await apiClient.post<IShopEntitlement[]>(API_ASSIGN_SHOP_ENTITLEMENTS(shopId), payload);
    return response.data;
  },
};

export default entitlementsAPI;

