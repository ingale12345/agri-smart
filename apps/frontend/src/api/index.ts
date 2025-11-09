// API Service endpoints configuration
export const API_SERVICE = '/api';

export const SERVICES = {
  AUTH: `${API_SERVICE}/auth`,
  USERS: `${API_SERVICE}/users`,
  SHOPS: `${API_SERVICE}/shops`,
  ROLES: `${API_SERVICE}/roles`,
  ENTITLEMENTS: `${API_SERVICE}/entitlements`,
  INVENTORY: `${API_SERVICE}/inventory`,
  ORDERS: `${API_SERVICE}/orders`,
  DELIVERY: `${API_SERVICE}/delivery`,
  ANALYTICS: `${API_SERVICE}/analytics`,
  CATEGORIES: `${API_SERVICE}/categories`,
  BRANCHES: `${API_SERVICE}/branches`,
} as const;

// Shop-specific endpoints
export const API_SHOP_CONFIG = (shopId: string) => `${SERVICES.SHOPS}/${shopId}`;
export const API_SHOP_ROLES = (shopId: string) => `${SERVICES.ROLES}/shop/${shopId}`;
export const API_SHOP_ENTITLEMENTS = (shopId: string) => `${SERVICES.SHOPS}/${shopId}/entitlements`;
export const API_ASSIGN_SHOP_ENTITLEMENTS = (shopId: string) => `${SERVICES.SHOPS}/${shopId}/entitlements/bulk`;
export const API_ROLE_ASSIGN_USER = (userId: string, roleId: string) => `${SERVICES.USERS}/${userId}/role/${roleId}`;

// Export API client
export { apiClient, default as httpClient } from '../lib/http-client';
