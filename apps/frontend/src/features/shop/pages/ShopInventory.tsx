import { Card, CardContent, CardHeader, CardTitle } from '@agri-smart/shared/components/ui/card';
import { usePermission } from '../../../hooks/usePermission';
import { Button } from '@agri-smart/shared/components/ui/button';

export default function ShopInventory() {
  const canCreate = usePermission('INV_MGMT', 'create');
  const canRead = usePermission('INV_MGMT', 'read');

  if (!canRead) {
    return <div>You don't have permission to view inventory.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Inventory</h1>
        {canCreate && <Button>Add Product</Button>}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Products</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Inventory management coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
}

