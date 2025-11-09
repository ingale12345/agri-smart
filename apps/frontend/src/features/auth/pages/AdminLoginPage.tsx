import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../../../context/AuthContext';
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

export default function AdminLoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password);
      toast.success('Login successful!');
      navigate('/admin/dashboard');
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          'Login failed. Please check your credentials.'
      );
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-white">
      {/* Left image panel (hidden on mobile) */}
      <div className="hidden md:block bg-green-100">
        <img
          src="https://steg.cepr.org/sites/default/files/styles/max_2600x2600/public/2021-10/adele-payman-2oYMwuFgnTg-unsplash.jpg?itok=8n-HZJ9i"
          alt="Agri field"
          className="h-[100vh] w-full object-cover"
        />
      </div>

      {/* Right login form */}
      <div className="flex items-center justify-center px-6 py-12 bg-white">
        <Card className="w-full max-w-md shadow-md border border-green-100">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              AgriSmart Admin
            </CardTitle>
            <CardDescription className="text-center">
              Sign in to your admin account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="admin@agrismart.com"
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
                >
                  {form.formState.isSubmitting ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
