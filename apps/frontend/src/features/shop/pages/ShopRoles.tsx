import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRoles } from '../../../api/roles/roles.hooks';
import { useShopResolver } from '../../../hooks/useShopResolver';
import { Card, CardContent, CardHeader, CardTitle } from '@agri-smart/shared/components/ui/card';
import { Button } from '@agri-smart/shared/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@agri-smart/shared/components/ui/table';
import { Badge } from '@agri-smart/shared/components/ui/badge';
import { usePermission } from '../../../hooks/usePermission';
import { CreateRoleDialog } from '../components/CreateRoleDialog';

export default function ShopRoles() {
  const { shopId: shopIdentifier } = useParams<{ shopId: string }>();
  const { shopId } = useShopResolver(shopIdentifier);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const { data: roles, isLoading, error } = useRoles(shopId || '');
  const canCreate = usePermission('ROLE_MGMT', 'create');

  if (isLoading) {
    return <div>Loading roles...</div>;
  }

  if (error) {
    return <div>Error loading roles: {error.message}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Roles</h1>
        {canCreate && <Button onClick={() => setCreateDialogOpen(true)}>Create Role</Button>}
      </div>

      <CreateRoleDialog open={createDialogOpen} onOpenChange={setCreateDialogOpen} />

      <Card>
        <CardHeader>
          <CardTitle>Shop Roles</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Role Name</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Entitlements</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roles?.map((role) => (
                <TableRow key={role.id}>
                  <TableCell className="font-medium">{role.roleName}</TableCell>
                  <TableCell className="font-mono">{role.roleCode}</TableCell>
                  <TableCell>
                    <div className="flex gap-1 flex-wrap">
                      {role.entitlementPermissions.map((ep) => (
                        <Badge key={ep.entitlementCode} variant="outline">
                          {ep.entitlementCode}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={role.isActive ? 'default' : 'secondary'}>
                      {role.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
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

