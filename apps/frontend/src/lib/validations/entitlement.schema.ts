import { z } from 'zod';

const permissionConfigSchema = z.object({
  enabled: z.boolean(),
});

const applicablePermissionsSchema = z.object({
  read: permissionConfigSchema,
  create: permissionConfigSchema,
  update: permissionConfigSchema,
  delete: permissionConfigSchema,
  download: permissionConfigSchema,
});

export const createEntitlementSchema = z.object({
  entitlementCode: z.string().min(1, 'Entitlement code is required').regex(/^[A-Z0-9_]+$/, 'Code must be uppercase letters, numbers, or underscores'),
  entitlementName: z.string().min(2, 'Entitlement name must be at least 2 characters'),
  moduleCode: z.string().min(1, 'Module code is required'),
  moduleName: z.string().min(2, 'Module name must be at least 2 characters'),
  applicablePermissions: applicablePermissionsSchema.optional(),
  category: z.string().optional(),
  description: z.string().optional(),
});

export const updateEntitlementSchema = createEntitlementSchema.partial();

const allowedPermissionsSchema = z.object({
  read: z.boolean(),
  create: z.boolean(),
  update: z.boolean(),
  delete: z.boolean(),
  download: z.boolean(),
});

export const assignShopEntitlementSchema = z.object({
  entitlementId: z.string().min(1, 'Entitlement ID is required'),
  allowedPermissions: allowedPermissionsSchema.optional(),
});

export const assignMultipleShopEntitlementsSchema = z.object({
  entitlements: z.array(assignShopEntitlementSchema).min(1, 'At least one entitlement is required'),
});

export type CreateEntitlementFormData = z.infer<typeof createEntitlementSchema>;
export type UpdateEntitlementFormData = z.infer<typeof updateEntitlementSchema>;
export type AssignShopEntitlementFormData = z.infer<typeof assignShopEntitlementSchema>;
export type AssignMultipleShopEntitlementsFormData = z.infer<typeof assignMultipleShopEntitlementsSchema>;

