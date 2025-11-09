import { z } from 'zod';

export const createShopSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  code: z.string().min(2, 'Code must be at least 2 characters').regex(/^[A-Z0-9_]+$/, 'Code must be uppercase letters, numbers, or underscores'),
  address: z.string().optional(),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  contact: z.string().optional(),
  categories: z.array(z.string()).optional(),
  logoUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
  theme: z
    .object({
      primary: z.string().optional(),
      secondary: z.string().optional(),
    })
    .optional(),
  // Shop Admin User Creation (optional)
  adminEmail: z.string().email('Invalid admin email address').optional().or(z.literal('')),
  adminPassword: z.string().min(6, 'Password must be at least 6 characters').optional().or(z.literal('')),
  adminName: z.string().min(2, 'Admin name must be at least 2 characters').optional().or(z.literal('')),
}).refine(
  (data) => {
    // If adminEmail is provided, adminPassword and adminName are required
    if (data.adminEmail && data.adminEmail !== '') {
      return data.adminPassword && data.adminPassword !== '' && data.adminName && data.adminName !== '';
    }
    return true;
  },
  {
    message: 'Admin email, password, and name are required together when creating a shop admin user',
    path: ['adminEmail'],
  }
);

export const updateShopSchema = createShopSchema.partial();

export type CreateShopFormData = z.infer<typeof createShopSchema>;
export type UpdateShopFormData = z.infer<typeof updateShopSchema>;

