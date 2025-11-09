import { Outlet, Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Button } from '@agri-smart/shared/components/ui/button';
import {
  Sidebar,
  SidebarProvider,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@agri-smart/shared/components/ui/sidebar';
import { usePermission } from '../../hooks/usePermission';

export function ShopLayout() {
  const { shopId: shopIdentifier } = useParams<{ shopId: string }>();
  const { user, logout } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const canViewRoles = usePermission('ROLE_MGMT', 'read');
  const canViewEntitlements = usePermission('USER_MGMT', 'read');
  const canViewUsers = usePermission('USER_MGMT', 'read');
  const canViewInventory = usePermission('INV_MGMT', 'read');
  const canViewOrders = usePermission('ORD_MGMT', 'read');

  const handleLogout = async () => {
    await logout();
    navigate(`/${shopIdentifier}/login`);
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>
                {theme.logoUrl && <img src={theme.logoUrl} alt={theme.name} className="h-8 mb-2" />}
                {theme.name || 'Shop Portal'}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to={`/${shopIdentifier}/dashboard`}>Dashboard</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  {canViewInventory && (
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link to={`/${shopIdentifier}/inventory`}>Inventory</Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}
                  {canViewOrders && (
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link to={`/${shopIdentifier}/orders`}>Orders</Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}
                  {canViewRoles && (
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link to={`/${shopIdentifier}/roles`}>Roles</Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}
                  {canViewEntitlements && (
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link to={`/${shopIdentifier}/entitlements`}>Entitlements</Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}
                  {canViewUsers && (
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link to={`/${shopIdentifier}/users`}>Users</Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-medium">{user?.name}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
            </div>
            <Button onClick={handleLogout} variant="outline" className="w-full">
              Logout
            </Button>
          </SidebarFooter>
        </Sidebar>
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}

