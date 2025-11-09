import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateEntitlement } from '../../../api/entitlements/entitlements.hooks';
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
import { Textarea } from '@agri-smart/shared/components/ui/textarea';
import { Checkbox } from '@agri-smart/shared/components/ui/checkbox';
import { toast } from 'sonner';
import { createEntitlementSchema, type CreateEntitlementFormData } from '../../../lib/validations';

interface CreateEntitlementDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateEntitlementDialog({ open, onOpenChange }: CreateEntitlementDialogProps) {
  const createEntitlement = useCreateEntitlement();

  const form = useForm<CreateEntitlementFormData>({
    resolver: zodResolver(createEntitlementSchema),
    defaultValues: {
      entitlementCode: '',
      entitlementName: '',
      moduleCode: '',
      moduleName: '',
      applicablePermissions: {
        read: { enabled: true },
        create: { enabled: true },
        update: { enabled: true },
        delete: { enabled: true },
        download: { enabled: false },
      },
      category: '',
      description: '',
    },
  });

  const onSubmit = async (data: CreateEntitlementFormData) => {
    try {
      await createEntitlement.mutateAsync({
        ...data,
        entitlementCode: data.entitlementCode.toUpperCase(),
        moduleCode: data.moduleCode.toUpperCase(),
      });
      toast.success('Entitlement created successfully!');
      form.reset();
      onOpenChange(false);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Failed to create entitlement');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Entitlement</DialogTitle>
          <DialogDescription>Add a new entitlement to the system</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="entitlementCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Entitlement Code</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="INV_MGMT"
                        {...field}
                        onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="moduleCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Module Code</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="INV_MGMT"
                        {...field}
                        onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="entitlementName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Entitlement Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Inventory Management" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="moduleName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Module Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Inventory" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input placeholder="AGRI" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Entitlement description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="applicablePermissions"
              render={() => (
                <FormItem>
                  <FormLabel>Applicable Permissions</FormLabel>
                  <FormDescription>Select which permissions are available for this entitlement</FormDescription>
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="applicablePermissions.read.enabled"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel>Read</FormLabel>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="applicablePermissions.create.enabled"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel>Create</FormLabel>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="applicablePermissions.update.enabled"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel>Update</FormLabel>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="applicablePermissions.delete.enabled"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel>Delete</FormLabel>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="applicablePermissions.download.enabled"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel>Download</FormLabel>
                        </FormItem>
                      )}
                    />
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
                {form.formState.isSubmitting ? 'Creating...' : 'Create Entitlement'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

