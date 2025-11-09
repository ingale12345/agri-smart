import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { shopAPI } from '../api/shops/shop.api';

interface ThemeConfig {
  logoUrl?: string;
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  name?: string;
  code?: string;
}

interface ThemeContextType {
  theme: ThemeConfig;
  isLoading: boolean;
  error: Error | null;
  refreshTheme: () => Promise<void>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  shopId: string;
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ shopId, children }) => {
  const [theme, setTheme] = useState<ThemeConfig>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchTheme = async () => {
    if (!shopId) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      // Get shop config (handles both ID and code)
      const shopConfig = await shopAPI.getConfig(shopId);
      
      const themeConfig: ThemeConfig = {
        logoUrl: shopConfig.logoUrl,
        primaryColor: shopConfig.theme?.primary || shopConfig.primaryColor,
        secondaryColor: shopConfig.theme?.secondary || shopConfig.secondaryColor,
        accentColor: shopConfig.accentColor,
        name: shopConfig.name,
        code: shopConfig.code,
      };

      setTheme(themeConfig);

      // Apply CSS variables for theming
      if (themeConfig.primaryColor) {
        document.documentElement.style.setProperty('--primary', themeConfig.primaryColor);
      }
      if (themeConfig.secondaryColor) {
        document.documentElement.style.setProperty('--secondary', themeConfig.secondaryColor);
      }
      if (themeConfig.accentColor) {
        document.documentElement.style.setProperty('--accent', themeConfig.accentColor);
      }
    } catch (err) {
      console.error('Error fetching theme:', err);
      setError(err instanceof Error ? err : new Error('Failed to load theme'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTheme();
  }, [shopId]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        isLoading,
        error,
        refreshTheme: fetchTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

