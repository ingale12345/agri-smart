import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@agri-smart/shared/components/ui/dialog';
import { Button } from '@agri-smart/shared/components/ui/button';
import { Input } from '@agri-smart/shared/components/ui/input';
import { useState } from 'react';

type ShopFormProps = {
  initial?: { name: string; location: string };
  onSubmit: (data: { name: string; location: string }) => void;
};

export function ShopFormDialog({ initial, onSubmit }: ShopFormProps) {
  const [form, setForm] = useState(initial || { name: '', location: '' });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{initial ? 'Edit' : 'Add Shop'}</Button>
      </DialogTrigger>
      <DialogContent className="space-y-4">
        <h2 className="text-lg font-semibold">
          {initial ? 'Edit Shop' : 'New Shop'}
        </h2>
        <Input
          placeholder="Shop Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <Input
          placeholder="Location"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />
        <Button
          variant="destructive"
          onClick={() => onSubmit(form)}
          className="w-full"
        >
          {initial ? 'Update' : 'Create'}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
