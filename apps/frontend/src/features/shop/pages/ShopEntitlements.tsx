import { useParams } from 'react-router-dom';
import { useShopEntitlements } from '../../../api/entitlements/entitlements.hooks';
import { useShopResolver } from '../../../hooks/useShopResolver';
import { Card, CardContent, CardHeader, CardTitle } from '@agri-smart/shared/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@agri-smart/shared/components/ui/table';
import { Badge } from '@agri-smart/shared/components/ui/badge';

export default function ShopEntitlements() {
  const { shopId: shopIdentifier } = useParams<{ shopId: string }>();
  const { shopId } = useShopResolver(shopIdentifier);
  const { data: entitlements, isLoading, error } = useShopEntitlements(shopId || '');

  if (isLoading) {
    return <div>Loading entitlements...</div>;
  }

  if (error) {
    return <div>Error loading entitlements: {error.message}</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Shop Entitlements</h1>
        <p className="text-muted-foreground">Entitlements assigned to this shop</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Assigned Entitlements</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Module</TableHead>
                <TableHead>Permissions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entitlements?.map((entitlement) => (
                <TableRow key={entitlement.id}>
                  <TableCell className="font-mono">{entitlement.entitlementCode}</TableCell>
                  <TableCell>{entitlement.moduleName}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {entitlement.allowedPermissions.read && <Badge variant="outline">R</Badge>}
                      {entitlement.allowedPermissions.create && <Badge variant="outline">C</Badge>}
                      {entitlement.allowedPermissions.update && <Badge variant="outline">U</Badge>}
                      {entitlement.allowedPermissions.delete && <Badge variant="outline">D</Badge>}
                      {entitlement.allowedPermissions.download && <Badge variant="outline">DL</Badge>}
                    </div>
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

