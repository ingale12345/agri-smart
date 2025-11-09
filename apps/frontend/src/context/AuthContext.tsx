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
        let actualShopId: string | undefined;

        // Check if it looks like a MongoDB ObjectId (24 hex characters)
        const isObjectId = /^[0-9a-fA-F]{24}$/.test(shopIdentifier);

        if (isObjectId) {
          // It's already an ID, use it directly
          actualShopId = shopIdentifier;
          console.log(`Using shopIdentifier as ID: ${actualShopId}`);
        } else {
          // It's likely a code, try to resolve it to an ID
          console.log(`Attempting to resolve shop code: "${shopIdentifier}"`);
          try {
            const shop = await shopAPI.getByCode(shopIdentifier);
            console.log('Shop found:', shop);

            // Backend should now return id field (after our fix)
            // But handle both _id (MongoDB) and id (transformed) properties as fallback
            const shopId = shop?.id || (shop as any)?._id;
            if (!shopId) {
              console.error('Shop response missing ID:', shop);
              throw new Error(
                `Shop ID not found in response for code "${shopIdentifier}"`
              );
            }
            actualShopId =
              typeof shopId === 'string' ? shopId : shopId.toString();
            console.log(
              `Resolved shop code "${shopIdentifier}" to shop ID: ${actualShopId}`
            );
          } catch (error: any) {
            console.error('Error resolving shop by code:', error);
            // If shop not found by code, throw a more descriptive error
            if (
              error?.response?.status === 404 ||
              error?.response?.statusCode === 404
            ) {
              const errorMsg = `Shop with code "${shopIdentifier}" not found. Please verify the shop code exists in the system.`;
              console.error(errorMsg);
              throw new Error(errorMsg);
            }
            // Check if error message indicates shop not found
            if (
              error?.message?.includes('not found') ||
              error?.response?.data?.message?.includes('not found')
            ) {
              throw new Error(
                `Shop with code "${shopIdentifier}" not found. Please verify the shop code exists in the system.`
              );
            }
            // For other errors (network, etc.), re-throw with context
            throw new Error(
              error?.message ||
                `Failed to resolve shop code "${shopIdentifier}": ${
                  error?.response?.data?.message || 'Unknown error'
                }`
            );
          }
        }

        // Ensure we have a valid shopId before attempting login
        if (
          !actualShopId ||
          typeof actualShopId !== 'string' ||
          actualShopId.trim() === ''
        ) {
          console.error('Invalid shopId:', actualShopId);
          throw new Error(
            `Unable to resolve shop identifier "${shopIdentifier}" to a valid shop ID. Shop may not exist.`
          );
        }

        console.log(`Calling shopLogin with shopId: ${actualShopId}`);
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
