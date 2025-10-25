import { Button } from '@agri-smart/shared/components/ui/button';
import { Input } from '@agri-smart/shared/components/ui/input';
import { Label } from '@agri-smart/shared/components/ui/label';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@agri-smart/shared/components/ui/card';
import { Sprout } from 'lucide-react';
import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { useLogin } from '../api/auth/authHooks';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { mutate: login, isPending, error } = useLogin();
  const navigate = useNavigate();
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    if (token) {
      navigate('/agri-smart', { replace: true });
    }
  }, [token, navigate]);
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login({ email, password });
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
          <CardHeader className="text-center">
            <Sprout className="mx-auto text-green-500" size={40} />
            <CardTitle className="text-2xl font-bold text-green-600">
              AgriSmart
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Sign in to your agriculture dashboard
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button
                variant="destructive"
                type="submit"
                className="w-full "
                disabled={isPending}
              >
                Login
              </Button>
              {error && <p>Login failed</p>}
            </form>
            <p className="text-sm text-center mt-4 text-muted-foreground">
              Don’t have an account?{' '}
              <a href="/register" className="text-green-600 hover:underline">
                Register
              </a>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
