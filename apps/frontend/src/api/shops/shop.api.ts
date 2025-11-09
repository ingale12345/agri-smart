import { apiClient, API_SHOP_CONFIG } from '../index';
import type { IShop, IShopConfig, ICreateShopPayload, IUpdateShopPayload } from '@agri-smart/types';
import { SERVICES } from '../index';

export const shopAPI = {
  getAll: async (): Promise<IShop[]> => {
    const response = await apiClient.get<IShop[]>(SERVICES.SHOPS);
    return response.data;
  },

  getById: async (shopId: string): Promise<IShop> => {
    const response = await apiClient.get<IShop>(`${SERVICES.SHOPS}/${shopId}`);
    return response.data;
  },

  getByCode: async (code: string): Promise<IShop> => {
    const response = await apiClient.get<IShop>(`${SERVICES.SHOPS}/code/${code}`);
    return response.data;
  },

  getConfig: async (shopIdentifier: string): Promise<IShopConfig> => {
    // shopIdentifier could be a shop code or ID
    // Try to get by code first (more user-friendly), then by ID
    let shop: IShop;
    try {
      shop = await shopAPI.getByCode(shopIdentifier);
    } catch {
      // If not found by code, try by ID
      shop = await shopAPI.getById(shopIdentifier);
    }
    
    return {
      id: shop.id,
      name: shop.name,
      code: shop.code,
      logoUrl: shop.logoUrl,
      primaryColor: shop.theme?.primary,
      secondaryColor: shop.theme?.secondary,
      accentColor: shop.theme?.secondary, // Map secondary to accent if needed
      theme: shop.theme,
    };
  },

  create: async (payload: ICreateShopPayload): Promise<IShop> => {
    const response = await apiClient.post<IShop>(SERVICES.SHOPS, payload);
    return response.data;
  },

  update: async (shopId: string, payload: IUpdateShopPayload): Promise<IShop> => {
    const response = await apiClient.patch<IShop>(`${SERVICES.SHOPS}/${shopId}`, payload);
    return response.data;
  },

  delete: async (shopId: string): Promise<void> => {
    await apiClient.delete(`${SERVICES.SHOPS}/${shopId}`);
  },
};

export default shopAPI;

