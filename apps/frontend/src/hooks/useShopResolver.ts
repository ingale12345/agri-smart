import { useMemo } from 'react';
import { useShopConfig } from '../api/shops/shop.hooks';

/**
 * Hook to resolve shop identifier (code or ID) to actual shop ID
 * This is useful when working with shop routes that might use shop codes
 */
export function useShopResolver(shopIdentifier: string | undefined) {
  const { data: shopConfig, isLoading, error } = useShopConfig(shopIdentifier || '');

  const shopId = useMemo(() => {
    if (!shopConfig) return shopIdentifier;
    // If we got shop config, we have the actual shop ID
    return shopConfig.id;
  }, [shopConfig, shopIdentifier]);

  return {
    shopId,
    isLoading,
    error,
    shopConfig,
  };
}

