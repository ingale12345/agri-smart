import { Card, CardContent, CardHeader, CardTitle } from '@agri-smart/shared/components/ui/card';
import { usePermission } from '../../../hooks/usePermission';
import { Button } from '@agri-smart/shared/components/ui/button';

export default function ShopOrders() {
  const canRead = usePermission('ORD_MGMT', 'read');
  const canCreate = usePermission('ORD_MGMT', 'create');

  if (!canRead) {
    return <div>You don't have permission to view orders.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Orders</h1>
        {canCreate && <Button>Create Order</Button>}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Order List</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Order management coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
}

