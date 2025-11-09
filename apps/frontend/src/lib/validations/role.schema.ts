import { z } from 'zod';

const permissionStatusSchema = z.object({
  enabled: z.boolean(),
  isAllowed: z.boolean(),
});

const rolePermissionsSchema = z.object({
  read: permissionStatusSchema,
  create: permissionStatusSchema,
  update: permissionStatusSchema,
  delete: permissionStatusSchema,
  download: permissionStatusSchema,
});

const entitlementPermissionSchema = z.object({
  entitlementCode: z.string().min(1, 'Entitlement code is required'),
  entitlementName: z.string().min(1, 'Entitlement name is required'),
  moduleCode: z.string().min(1, 'Module code is required'),
  moduleName: z.string().min(1, 'Module name is required'),
  permissions: rolePermissionsSchema,
});

export const createRoleSchema = z.object({
  roleName: z.string().min(2, 'Role name must be at least 2 characters'),
  roleCode: z.string().min(2, 'Role code must be at least 2 characters').regex(/^[A-Z0-9_]+$/, 'Role code must be uppercase letters, numbers, or underscores'),
  entitlementPermissions: z.array(entitlementPermissionSchema).min(1, 'At least one entitlement permission is required'),
  description: z.string().optional(),
});

export const updateRoleSchema = createRoleSchema.partial().extend({
  isActive: z.boolean().optional(),
});

export type CreateRoleFormData = z.infer<typeof createRoleSchema>;
export type UpdateRoleFormData = z.infer<typeof updateRoleSchema>;

