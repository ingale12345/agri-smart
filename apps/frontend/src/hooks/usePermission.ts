import { useAuth } from '../context/AuthContext';

type PermissionAction = 'read' | 'create' | 'update' | 'delete' | 'download';

export const usePermission = (entitlementCode: string, action: PermissionAction): boolean => {
  const { permissions, isSuperAdmin } = useAuth();

  // Super admin has all permissions
  if (isSuperAdmin) {
    return true;
  }

  if (!permissions || permissions.length === 0) {
    return false;
  }

  // Check if user has the specific permission
  return permissions.some((p) => {
    if (p.entitlementCode !== entitlementCode) {
      return false;
    }

    const permission = p.permissions[action];
    return permission?.enabled && permission?.isAllowed;
  });
};

export const useHasAnyPermission = (entitlementCode: string, actions: PermissionAction[]): boolean => {
  return actions.some((action) => usePermission(entitlementCode, action));
};

export const useHasAllPermissions = (entitlementCode: string, actions: PermissionAction[]): boolean => {
  return actions.every((action) => usePermission(entitlementCode, action));
};

