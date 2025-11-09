import { apiClient } from '../index';
import type { IAuthResponse, ILoginPayload, ISignupPayload } from '@agri-smart/types';
import { SERVICES } from '../index';

export const authAPI = {
  login: async (payload: ILoginPayload): Promise<IAuthResponse> => {
    const response = await apiClient.post<IAuthResponse>(`${SERVICES.AUTH}/login`, payload);
    return response.data;
  },

  shopLogin: async (payload: ILoginPayload & { shopId: string }): Promise<IAuthResponse> => {
    const response = await apiClient.post<IAuthResponse>(`${SERVICES.AUTH}/shop/login`, payload);
    return response.data;
  },

  signup: async (payload: ISignupPayload): Promise<IAuthResponse> => {
    const response = await apiClient.post<IAuthResponse>(`${SERVICES.AUTH}/signup`, payload);
    return response.data;
  },

  logout: async (): Promise<void> => {
    // Clear local storage
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
  },
};

export default authAPI;

