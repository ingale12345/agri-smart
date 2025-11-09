import { Card, CardContent, CardHeader, CardTitle } from '@agri-smart/shared/components/ui/card';

export default function AdminUsers() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Users</h1>
        <p className="text-muted-foreground">Manage all users in the system</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
        </CardHeader>
        <CardContent>
          <p>User management coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
}

