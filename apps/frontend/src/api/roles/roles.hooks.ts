import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { rolesAPI } from './roles.api';
import type { IRole, ICreateRolePayload, IUpdateRolePayload } from '@agri-smart/types';

export const useRoles = (shopId?: string) => {
  return useQuery({
    queryKey: ['roles', shopId],
    queryFn: () => rolesAPI.getAll(shopId),
    enabled: !!shopId || shopId === undefined,
  });
};

export const useRole = (roleId: string) => {
  return useQuery({
    queryKey: ['role', roleId],
    queryFn: () => rolesAPI.getById(roleId),
    enabled: !!roleId,
  });
};

export const useCreateRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ shopId, payload }: { shopId: string; payload: ICreateRolePayload }) =>
      rolesAPI.create(shopId, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['roles', variables.shopId] });
    },
  });
};

export const useUpdateRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ roleId, payload }: { roleId: string; payload: IUpdateRolePayload }) =>
      rolesAPI.update(roleId, payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
      queryClient.invalidateQueries({ queryKey: ['role', data.id] });
    },
  });
};

export const useDeleteRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (roleId: string) => rolesAPI.delete(roleId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
    },
  });
};

export const useAssignRoleToUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, roleId }: { userId: string; roleId: string }) =>
      rolesAPI.assignToUser(userId, roleId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

