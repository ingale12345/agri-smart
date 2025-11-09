import { RouteObject } from 'react-router-dom';
import AdminDashboard from '../features/admin/pages/AdminDashboard';
import AdminShops from '../features/admin/pages/AdminShops';
import AdminEntitlements from '../features/admin/pages/AdminEntitlements';
import AdminUsers from '../features/admin/pages/AdminUsers';

const adminRoutes: RouteObject[] = [
  {
    index: true,
    element: <AdminDashboard />,
  },
  {
    path: 'shops',
    element: <AdminShops />,
  },
  {
    path: 'entitlements',
    element: <AdminEntitlements />,
  },
  {
    path: 'users',
    element: <AdminUsers />,
  },
];

export default adminRoutes;

