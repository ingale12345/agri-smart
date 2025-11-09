import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const shopLoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  shopId: z.string().optional(),
});

export const signupSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  role: z.string().optional(),
  shopId: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type ShopLoginFormData = z.infer<typeof shopLoginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;

