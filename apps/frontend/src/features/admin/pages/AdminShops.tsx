import { useState } from 'react';
import { useShops } from '../../../api/shops/shop.hooks';
import { Card, CardContent, CardHeader, CardTitle } from '@agri-smart/shared/components/ui/card';
import { Button } from '@agri-smart/shared/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@agri-smart/shared/components/ui/table';
import { CreateShopDialog } from '../components/CreateShopDialog';

export default function AdminShops() {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const { data: shops, isLoading, error } = useShops();

  if (isLoading) {
    return <div>Loading shops...</div>;
  }

  if (error) {
    return <div>Error loading shops: {error.message}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Shops</h1>
        <Button onClick={() => setCreateDialogOpen(true)}>Create Shop</Button>
      </div>

      <CreateShopDialog open={createDialogOpen} onOpenChange={setCreateDialogOpen} />

      <Card>
        <CardHeader>
          <CardTitle>All Shops</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shops?.map((shop) => (
                <TableRow key={shop.id}>
                  <TableCell>{shop.name}</TableCell>
                  <TableCell>{shop.code}</TableCell>
                  <TableCell>{shop.email || '-'}</TableCell>
                  <TableCell>{shop.contact || '-'}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">Edit</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

