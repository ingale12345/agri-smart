import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { shopAPI } from './shop.api';
import type { IShop, IShopConfig, ICreateShopPayload, IUpdateShopPayload } from '@agri-smart/types';

export const useShops = () => {
  return useQuery({
    queryKey: ['shops'],
    queryFn: () => shopAPI.getAll(),
  });
};

export const useShop = (shopId: string) => {
  return useQuery({
    queryKey: ['shop', shopId],
    queryFn: () => shopAPI.getById(shopId),
    enabled: !!shopId,
  });
};

export const useShopByCode = (code: string) => {
  return useQuery({
    queryKey: ['shop', 'code', code],
    queryFn: () => shopAPI.getByCode(code),
    enabled: !!code,
  });
};

export const useShopConfig = (shopId: string) => {
  return useQuery({
    queryKey: ['shop-config', shopId],
    queryFn: () => shopAPI.getConfig(shopId),
    enabled: !!shopId,
  });
};

export const useCreateShop = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ICreateShopPayload) => shopAPI.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shops'] });
    },
  });
};

export const useUpdateShop = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ shopId, payload }: { shopId: string; payload: IUpdateShopPayload }) =>
      shopAPI.update(shopId, payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['shops'] });
      queryClient.invalidateQueries({ queryKey: ['shop', data.id] });
      queryClient.invalidateQueries({ queryKey: ['shop-config', data.id] });
    },
  });
};

export const useDeleteShop = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (shopId: string) => shopAPI.delete(shopId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shops'] });
    },
  });
};

