import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@agri-smart/shared/components/ui/sheet';
import { Button } from '@agri-smart/shared/components/ui/button';
import { Input } from '@agri-smart/shared/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { PlusCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';
import { z } from 'zod';
import axiosInstance from '../../api';

const shopFormSchema = z.object({
  name: z.string().min(2, { message: 'Name is required' }),
  ownerName: z.string().min(2, { message: 'Owner name is required' }),
  contact: z
    .string()
    .regex(/^\+?\d{10,15}$/, 'Enter a valid phone number')
    .optional()
    .or(z.literal('')),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  address: z.string().optional().or(z.literal('')),
  imageUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
});

type ShopFormData = z.infer<typeof shopFormSchema>;

const CreateShop = () => {
  const queryClient = useQueryClient();
  const [openSheet, setOpenSheet] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ShopFormData>({
    resolver: zodResolver(shopFormSchema),
    defaultValues: {
      name: '',
      ownerName: '',
      contact: '',
      email: '',
      address: '',
      imageUrl: '',
    },
  });

  const createShop = useMutation({
    mutationFn: async (shopData: ShopFormData) => {
      const res = await axiosInstance.post('/shops', shopData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shops'] });
      reset();
      toast.success('Shop created', {
        description: 'Your new shop has been added.',
        position: 'top-center',
      });
      setOpenSheet(false);
    },
    onError: (error: any) => {
      toast.error('Shop creation error', {
        description: `Unable to create shop\n${error.message}`,
        position: 'top-center',
      });
    },
  });

  const onSubmit = (data: ShopFormData) => {
    const cleanedData = Object.fromEntries(
      Object.entries(data).map(([key, value]) => [key, value || undefined])
    ) as ShopFormData;

    createShop.mutate(cleanedData);
  };

  return (
    <Sheet open={openSheet} onOpenChange={setOpenSheet}>
      <SheetTrigger asChild>
        <PlusCircle size={24} className="cursor-pointer" />
      </SheetTrigger>
      <SheetContent side="right" className="w-[400px] p-6">
        <h2 className="text-xl font-semibold mb-4">Create New Shop</h2>
        <SheetClose className="flex justify-center items-center" asChild>
          <button className="absolute w-16 top-3 right-3 h-10   text-white hover:text-white outline-0">
            ✕
          </button>
        </SheetClose>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input {...register('name')} placeholder="Shop Name" />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div>
            <Input {...register('ownerName')} placeholder="Owner Name" />
            {errors.ownerName && (
              <p className="text-sm text-red-500">{errors.ownerName.message}</p>
            )}
          </div>
          <div>
            <Input
              {...register('contact')}
              placeholder="Contact (+1234567890)"
            />
            {errors.contact && (
              <p className="text-sm text-red-500">{errors.contact.message}</p>
            )}
          </div>
          <div>
            <Input {...register('email')} placeholder="Email" type="email" />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div>
            <Input {...register('address')} placeholder="Address" />
            {errors.address && (
              <p className="text-sm text-red-500">{errors.address.message}</p>
            )}
          </div>
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                // Example: simulate upload and return dummy URL
                const fakeUpload = async (file: File) => {
                  return new Promise<string>((resolve) => {
                    setTimeout(() => resolve(URL.createObjectURL(file)), 1000); // Replace with real upload logic
                  });
                };

                try {
                  const uploadedUrl = await fakeUpload(file);
                  // Set value in form
                  setValue('imageUrl', uploadedUrl, { shouldValidate: true });
                  toast.success('Image uploaded');
                } catch (err: any) {
                  toast.error('Image upload failed', {
                    description: err.message || 'Something went wrong',
                  });
                }
              }}
            />
            {errors.imageUrl && (
              <p className="text-sm text-red-500">{errors.imageUrl.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full dark:text-white"
            disabled={createShop.isPending}
          >
            {createShop.isPending ? 'Creating...' : 'Create Shop'}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default CreateShop;
