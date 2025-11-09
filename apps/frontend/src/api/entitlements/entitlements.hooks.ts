import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { entitlementsAPI } from './entitlements.api';
import type {
  IEntitlement,
  IShopEntitlement,
  IAssignMultipleShopEntitlementsPayload,
  ICreateEntitlementPayload,
  IUpdateEntitlementPayload,
} from '@agri-smart/types';

export const useEntitlements = () => {
  return useQuery({
    queryKey: ['entitlements'],
    queryFn: () => entitlementsAPI.getAll(),
  });
};

export const useEntitlement = (entitlementId: string) => {
  return useQuery({
    queryKey: ['entitlement', entitlementId],
    queryFn: () => entitlementsAPI.getById(entitlementId),
    enabled: !!entitlementId,
  });
};

export const useCreateEntitlement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ICreateEntitlementPayload) => entitlementsAPI.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['entitlements'] });
    },
  });
};

export const useUpdateEntitlement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ entitlementId, payload }: { entitlementId: string; payload: IUpdateEntitlementPayload }) =>
      entitlementsAPI.update(entitlementId, payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['entitlements'] });
      queryClient.invalidateQueries({ queryKey: ['entitlement', data.id] });
    },
  });
};

export const useDeleteEntitlement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (entitlementId: string) => entitlementsAPI.delete(entitlementId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['entitlements'] });
    },
  });
};

// Shop Entitlements
export const useShopEntitlements = (shopId: string) => {
  return useQuery({
    queryKey: ['shop-entitlements', shopId],
    queryFn: () => entitlementsAPI.getShopEntitlements(shopId),
    enabled: !!shopId,
  });
};

export const useAssignEntitlementsToShop = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ shopId, payload }: { shopId: string; payload: IAssignMultipleShopEntitlementsPayload }) =>
      entitlementsAPI.assignToShop(shopId, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['shop-entitlements', variables.shopId] });
    },
  });
};

