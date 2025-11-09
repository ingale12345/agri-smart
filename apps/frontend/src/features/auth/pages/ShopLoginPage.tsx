import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../../../context/AuthContext';
import { ThemeProvider, useTheme } from '../../../context/ThemeContext';
import { Button } from '@agri-smart/shared/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@agri-smart/shared/components/ui/form';
import { Input } from '@agri-smart/shared/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@agri-smart/shared/components/ui/card';
import { toast } from 'sonner';
import { loginSchema, type LoginFormData } from '../../../lib/validations';

function ShopLoginForm() {
  const { shopId } = useParams<{ shopId: string }>();
  const { login } = useAuth();
  const { theme, isLoading: themeLoading } = useTheme();
  const navigate = useNavigate();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    if (!shopId) {
      toast.error('Shop identifier is missing');
      return;
    }

    try {
      await login(data.email, data.password, shopId);
      toast.success('Login successful!');
      navigate(`/${shopId}/dashboard`);
    } catch (error: any) {
      // Handle different error types
      const errorMessage =
        error?.message ||
        error?.response?.data?.message ||
        (Array.isArray(error?.response?.data?.message)
          ? error.response.data.message.join(', ')
          : error?.response?.data?.message) ||
        'Login failed. Please check your credentials.';
      toast.error(errorMessage);
    }
  };

  if (themeLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: theme.primaryColor || '#f3f4f6' }}
    >
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          {theme.logoUrl && (
            <div className="flex justify-center mb-4">
              <img
                src={theme.logoUrl}
                alt={theme.name || 'Shop Logo'}
                className="h-12"
              />
            </div>
          )}
          <CardTitle className="text-2xl font-bold text-center">
            {theme.name || 'Shop Login'}
          </CardTitle>
          <CardDescription className="text-center">
            Sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        disabled={form.formState.isSubmitting}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        disabled={form.formState.isSubmitting}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting}
                style={{
                  backgroundColor: theme.primaryColor,
                }}
              >
                {form.formState.isSubmitting ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default function ShopLoginPage() {
  const { shopId } = useParams<{ shopId: string }>();

  if (!shopId) {
    return <div>Invalid shop</div>;
  }

  return (
    <ThemeProvider shopId={shopId}>
      <ShopLoginForm />
    </ThemeProvider>
  );
}
