import { useState } from 'react';
import { useEntitlements } from '../../../api/entitlements/entitlements.hooks';
import { Card, CardContent, CardHeader, CardTitle } from '@agri-smart/shared/components/ui/card';
import { Button } from '@agri-smart/shared/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@agri-smart/shared/components/ui/table';
import { Badge } from '@agri-smart/shared/components/ui/badge';
import { CreateEntitlementDialog } from '../components/CreateEntitlementDialog';

export default function AdminEntitlements() {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const { data: entitlements, isLoading, error } = useEntitlements();

  if (isLoading) {
    return <div>Loading entitlements...</div>;
  }

  if (error) {
    return <div>Error loading entitlements: {error.message}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Entitlements</h1>
        <Button onClick={() => setCreateDialogOpen(true)}>Create Entitlement</Button>
      </div>

      <CreateEntitlementDialog open={createDialogOpen} onOpenChange={setCreateDialogOpen} />

      <Card>
        <CardHeader>
          <CardTitle>All Entitlements</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Module</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Permissions</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entitlements?.map((entitlement) => (
                <TableRow key={entitlement.id}>
                  <TableCell className="font-mono">{entitlement.entitlementCode}</TableCell>
                  <TableCell>{entitlement.entitlementName}</TableCell>
                  <TableCell>{entitlement.moduleName}</TableCell>
                  <TableCell>
                    <Badge>{entitlement.category || 'N/A'}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {entitlement.applicablePermissions.read.enabled && <Badge variant="outline">R</Badge>}
                      {entitlement.applicablePermissions.create.enabled && <Badge variant="outline">C</Badge>}
                      {entitlement.applicablePermissions.update.enabled && <Badge variant="outline">U</Badge>}
                      {entitlement.applicablePermissions.delete.enabled && <Badge variant="outline">D</Badge>}
                      {entitlement.applicablePermissions.download.enabled && <Badge variant="outline">DL</Badge>}
                    </div>
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

