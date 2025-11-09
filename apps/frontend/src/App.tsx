import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useParams,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { ThemeProvider as ShadcnThemeProvider } from './components/theme-provider';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ThemeProvider } from './context/ThemeContext';
import { HQLayout, ShopLayout } from './components/layouts';
import AdminLoginPage from './features/auth/pages/AdminLoginPage';
import ShopLoginPage from './features/auth/pages/ShopLoginPage';
import Unauthorized from './pages/Unauthorized';
import NotFound from './pages/NotFound';
import adminRoutes from './routes/admin.routes';
import shopRoutes from './routes/shop.routes';
import NavigationInitializer from './components/NavigationInitializer';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

// App wrapper that includes NavigationInitializer inside router context
function AppWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavigationInitializer />
      {children}
    </>
  );
}

// Redirect component for root path
function RootRedirect() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/admin/login');
  }, [navigate]);
  return null;
}

// Wrapper component to provide ThemeProvider for shop routes
function ShopProtectedWrapper() {
  const { shopId: shopIdentifier } = useParams<{ shopId: string }>();

  if (!shopIdentifier) {
    return <div>Invalid shop</div>;
  }

  return (
    <ThemeProvider shopId={shopIdentifier}>
      <Outlet />
    </ThemeProvider>
  );
}

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  });

  const router = createBrowserRouter([
    {
      element: (
        <AppWrapper>
          <Outlet />
        </AppWrapper>
      ),
      children: [
        {
          path: '/',
          element: <RootRedirect />,
        },
        {
          path: '/admin/login',
          element: <AdminLoginPage />,
        },
        {
          path: '/:shopId/login',
          element: <ShopLoginPage />,
        },
        {
          path: '/unauthorized',
          element: <Unauthorized />,
        },
        {
          element: <ProtectedRoute allowedRoles={['SUPER_ADMIN']} />,
          children: [
            {
              path: '/admin',
              element: <HQLayout />,
              children: adminRoutes,
            },
          ],
        },
        {
          element: (
            <ProtectedRoute
              allowedRoles={['SUPER_ADMIN', 'SHOP_ADMIN', 'STAFF', 'DELIVERY']}
            />
          ),
          children: [
            {
              path: '/:shopId',
              element: <ShopProtectedWrapper />,
              children: [
                {
                  element: <ShopLayout />,
                  children: shopRoutes,
                },
              ],
            },
          ],
        },
        {
          path: '*',
          element: <NotFound />,
        },
      ],
    },
  ]);

  return (
    <ShadcnThemeProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
          <Toaster richColors position="top-right" />
        </AuthProvider>
      </QueryClientProvider>
    </ShadcnThemeProvider>
  );
}

export default App;
