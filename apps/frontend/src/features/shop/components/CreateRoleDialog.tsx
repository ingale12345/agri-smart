import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'react-router-dom';
import { useCreateRole } from '../../../api/roles/roles.hooks';
import { useShopEntitlements } from '../../../api/entitlements/entitlements.hooks';
import { useShopResolver } from '../../../hooks/useShopResolver';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@agri-smart/shared/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@agri-smart/shared/components/ui/form';
import { Input } from '@agri-smart/shared/components/ui/input';
import { Button } from '@agri-smart/shared/components/ui/button';
import { Checkbox } from '@agri-smart/shared/components/ui/checkbox';
import { Textarea } from '@agri-smart/shared/components/ui/textarea';
import { toast } from 'sonner';
import { createRoleSchema, type CreateRoleFormData } from '../../../lib/validations';
import { useState } from 'react';

interface CreateRoleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateRoleDialog({ open, onOpenChange }: CreateRoleDialogProps) {
  const { shopId: shopIdentifier } = useParams<{ shopId: string }>();
  const { shopId } = useShopResolver(shopIdentifier);
  const createRole = useCreateRole();
  const { data: shopEntitlements } = useShopEntitlements(shopId || '');
  const [selectedEntitlements, setSelectedEntitlements] = useState<Set<string>>(new Set());

  const form = useForm<CreateRoleFormData>({
    resolver: zodResolver(createRoleSchema),
    defaultValues: {
      roleName: '',
      roleCode: '',
      entitlementPermissions: [],
      description: '',
    },
  });

  const onSubmit = async (data: CreateRoleFormData) => {
    if (!shopId) {
      toast.error('Shop ID is required');
      return;
    }

    try {
      await createRole.mutateAsync({
        shopId,
        payload: {
          ...data,
          roleCode: data.roleCode.toUpperCase(),
        },
      });
      toast.success('Role created successfully!');
      form.reset();
      setSelectedEntitlements(new Set());
      onOpenChange(false);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Failed to create role');
    }
  };

  const handleEntitlementToggle = (entitlementCode: string, checked: boolean) => {
    const newSelected = new Set(selectedEntitlements);
    if (checked) {
      newSelected.add(entitlementCode);
    } else {
      newSelected.delete(entitlementCode);
    }
    setSelectedEntitlements(newSelected);

    // Update form with entitlement permissions
    const shopEntitlement = shopEntitlements?.find((e) => e.entitlementCode === entitlementCode);
    if (shopEntitlement) {
      const currentPermissions = form.getValues('entitlementPermissions') || [];
      if (checked) {
        form.setValue('entitlementPermissions', [
          ...currentPermissions,
          {
            entitlementCode: shopEntitlement.entitlementCode,
            entitlementName: shopEntitlement.moduleName, // Use moduleName as entitlement name
            moduleCode: shopEntitlement.entitlementCode,
            moduleName: shopEntitlement.moduleName,
            permissions: {
              read: { 
                enabled: shopEntitlement.allowedPermissions.read, 
                isAllowed: false 
              },
              create: { 
                enabled: shopEntitlement.allowedPermissions.create, 
                isAllowed: false 
              },
              update: { 
                enabled: shopEntitlement.allowedPermissions.update, 
                isAllowed: false 
              },
              delete: { 
                enabled: shopEntitlement.allowedPermissions.delete, 
                isAllowed: false 
              },
              download: { 
                enabled: shopEntitlement.allowedPermissions.download, 
                isAllowed: false 
              },
            },
          },
        ]);
      } else {
        form.setValue(
          'entitlementPermissions',
          currentPermissions.filter((p) => p.entitlementCode !== entitlementCode)
        );
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Role</DialogTitle>
          <DialogDescription>Create a new role with specific permissions</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="roleName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Manager" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="roleCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role Code</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="MANAGER"
                        {...field}
                        onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Role description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="entitlementPermissions"
              render={() => (
                <FormItem>
                  <FormLabel>Entitlements</FormLabel>
                  <FormDescription>Select entitlements assigned to this shop to assign to this role</FormDescription>
                  <div className="space-y-2">
                    {shopEntitlements && shopEntitlements.length > 0 ? (
                      shopEntitlements.map((shopEntitlement) => (
                        <div key={shopEntitlement.id} className="flex items-center space-x-2">
                          <Checkbox
                            checked={selectedEntitlements.has(shopEntitlement.entitlementCode)}
                            onCheckedChange={(checked) =>
                              handleEntitlementToggle(shopEntitlement.entitlementCode, checked as boolean)
                            }
                          />
                          <label className="text-sm font-medium">
                            {shopEntitlement.moduleName} ({shopEntitlement.entitlementCode})
                          </label>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        No entitlements assigned to this shop. Please assign entitlements first.
                      </p>
                    )}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Creating...' : 'Create Role'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

