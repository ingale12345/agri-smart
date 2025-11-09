import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import type {
  IUser,
  IEntitlementPermission,
  IAuthResponse,
} from '@agri-smart/types';
import { authAPI } from '../api/auth/auth.api';

interface AuthContextType {
  user: IUser | null;
  token: string | null;
  shopId?: string;
  role?: string;
  permissions?: IEntitlementPermission[];
  isLoading: boolean;
  login: (email: string, password: string, shopId?: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isSuperAdmin: boolean;
  isShopAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const loadUser = () => {
      try {
        const storedToken =
          localStorage.getItem('token') || sessionStorage.getItem('token');
        const storedUser =
          localStorage.getItem('user') || sessionStorage.getItem('user');

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error loading user from storage:', error);
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        localStorage.removeItem('user');
        sessionStorage.removeItem('user');
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (
    email: string,
    password: string,
    shopIdentifier?: string
  ) => {
    try {
      setIsLoading(true);
      let response: IAuthResponse;

      if (shopIdentifier) {
        // shopIdentifier could be a shop code or ID
        // We need to resolve it to an actual shop ID for the backend
        // Import shopAPI to resolve shop code to ID
        const { shopAPI } = await import('../api/shops/shop.api');
        let actualShopId = shopIdentifier;

        try {
          // Try to get shop by code first (more user-friendly URLs use codes)
          const shop = await shopAPI.getByCode(shopIdentifier);
          actualShopId = shop.id;
        } catch {
          // If not found by code, assume it's an ID
          actualShopId = shopIdentifier;
        }

        response = await authAPI.shopLogin({
          email,
          password,
          shopId: actualShopId,
        });
      } else {
        response = await authAPI.login({ email, password });
      }

      const { accessToken, user: userData } = response;

      setToken(accessToken);
      setUser(userData);

      // Store in localStorage
      localStorage.setItem('token', accessToken);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Always clear local state and storage
      setToken(null);
      setUser(null);
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
      localStorage.removeItem('user');
      sessionStorage.removeItem('user');
    }
  };

  const isAuthenticated = !!token && !!user;
  const isSuperAdmin = user?.role === 'SUPER_ADMIN';
  const isShopAdmin = user?.role === 'SHOP_ADMIN';

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        shopId: user?.shopId,
        role: user?.role,
        permissions: user?.permissions,
        isLoading,
        login,
        logout,
        isAuthenticated,
        isSuperAdmin,
        isShopAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
