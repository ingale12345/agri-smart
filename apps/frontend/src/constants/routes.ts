export const ROUTES = {
  AUTH: {
    ADMIN_LOGIN: '/admin/login',
    SHOP_LOGIN: '/:shopId/login',
  },
  ADMIN: {
    BASE: '/admin',
    LOGIN: '/admin/login',
    DASHBOARD: '/admin/dashboard',
    SHOPS: '/admin/shops',
    ENTITLEMENTS: '/admin/entitlements',
    USERS: '/admin/users',
  },
  SHOP: {
    BASE: '/:shopId',
    LOGIN: '/:shopId/login',
    DASHBOARD: '/:shopId/dashboard',
    ROLES: '/:shopId/roles',
    ENTITLEMENTS: '/:shopId/entitlements',
    USERS: '/:shopId/users',
    INVENTORY: '/:shopId/inventory',
    ORDERS: '/:shopId/orders',
  },
  PUBLIC: {
    HOME: '/',
    UNAUTHORIZED: '/unauthorized',
    NOT_FOUND: '*',
  },
} as const;
