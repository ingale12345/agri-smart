import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  allowedRoles?: string[];
  requiredShopId?: string;
}

export function ProtectedRoute({
  allowedRoles,
  requiredShopId,
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user, shopId } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    // Redirect to appropriate login page
    if (location.pathname.startsWith('/admin')) {
      return <Navigate to="/admin/login" replace />;
    } else if (requiredShopId) {
      return <Navigate to={`/${requiredShopId}/login`} replace />;
    }
    return <Navigate to="/admin/login" replace />;
  }

  // Check role requirement
  if (allowedRoles && user?.role && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Check shop ID requirement
  if (requiredShopId && shopId !== requiredShopId) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}
