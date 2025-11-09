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
});

export const updateShopSchema = createShopSchema.partial();

export type CreateShopFormData = z.infer<typeof createShopSchema>;
export type UpdateShopFormData = z.infer<typeof updateShopSchema>;

