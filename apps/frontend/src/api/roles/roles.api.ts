import { apiClient, API_SHOP_ROLES, API_ROLE_ASSIGN_USER } from '../index';
import type { IRole, ICreateRolePayload, IUpdateRolePayload } from '@agri-smart/types';
import { SERVICES } from '../index';

export const rolesAPI = {
  getAll: async (shopId?: string): Promise<IRole[]> => {
    if (!shopId) {
      throw new Error('shopId is required');
    }
    const response = await apiClient.get<IRole[]>(API_SHOP_ROLES(shopId));
    return response.data;
  },

  getById: async (roleId: string): Promise<IRole> => {
    const response = await apiClient.get<IRole>(`${SERVICES.ROLES}/${roleId}`);
    return response.data;
  },

  create: async (shopId: string, payload: ICreateRolePayload): Promise<IRole> => {
    const response = await apiClient.post<IRole>(API_SHOP_ROLES(shopId), payload);
    return response.data;
  },

  update: async (roleId: string, payload: IUpdateRolePayload): Promise<IRole> => {
    const response = await apiClient.patch<IRole>(`${SERVICES.ROLES}/${roleId}`, payload);
    return response.data;
  },

  delete: async (roleId: string): Promise<void> => {
    await apiClient.delete(`${SERVICES.ROLES}/${roleId}`);
  },

  assignToUser: async (userId: string, roleId: string): Promise<void> => {
    await apiClient.post(API_ROLE_ASSIGN_USER(userId, roleId));
  },
};

export default rolesAPI;

