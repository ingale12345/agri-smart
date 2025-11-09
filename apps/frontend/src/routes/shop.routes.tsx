import { RouteObject } from 'react-router-dom';
import ShopDashboard from '../features/shop/pages/ShopDashboard';
import ShopRoles from '../features/shop/pages/ShopRoles';
import ShopEntitlements from '../features/shop/pages/ShopEntitlements';
import ShopUsers from '../features/shop/pages/ShopUsers';
import ShopInventory from '../features/shop/pages/ShopInventory';
import ShopOrders from '../features/shop/pages/ShopOrders';

const shopRoutes: RouteObject[] = [
  {
    index: true,
    element: <ShopDashboard />,
  },
  {
    path: 'roles',
    element: <ShopRoles />,
  },
  {
    path: 'entitlements',
    element: <ShopEntitlements />,
  },
  {
    path: 'users',
    element: <ShopUsers />,
  },
  {
    path: 'inventory',
    element: <ShopInventory />,
  },
  {
    path: 'orders',
    element: <ShopOrders />,
  },
];

export default shopRoutes;

