import { Card, CardContent, CardHeader, CardTitle } from '@agri-smart/shared/components/ui/card';

export default function ShopUsers() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Shop Users</h1>
        <p className="text-muted-foreground">Manage users for this shop</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Shop Users</CardTitle>
        </CardHeader>
        <CardContent>
          <p>User management coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
}

