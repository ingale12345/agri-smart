import {
  Sprout,
  LayoutDashboard,
  ShoppingBag,
  GitBranch,
  Users2,
  Boxes,
  ShoppingCart,
  FileText,
  Truck,
  UserCog,
  FlaskConical,
  MapPin,
  UserIcon,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

import {
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarSeparator,
} from '@agri-smart/shared/components/ui/sidebar';
import { cn } from '@agri-smart/shared/lib/utils';

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname.replace('/agri-smart/', '');
  const sideBarGroups = [
    {
      groupLabel: 'Main',
      sidebarMenuItems: [
        {
          menuLabel: 'Dashboard',
          path: 'home',
          icon: <LayoutDashboard size={20} />,
        },
      ],
    },
    {
      groupLabel: 'Shop Management',
      sidebarMenuItems: [
        {
          menuLabel: 'Shops',
          path: 'shops',
          icon: <ShoppingBag size={20} />,
        },
        {
          menuLabel: 'Branches',
          path: 'branches',
          icon: <GitBranch size={20} />,
        },
        {
          menuLabel: 'Shop Users',
          path: 'shop-users',
          icon: <Users2 size={20} />,
        },
      ],
    },
    {
      groupLabel: 'Inventory',
      sidebarMenuItems: [
        {
          menuLabel: 'Inventory Items',
          path: 'inventory',
          icon: <Boxes size={20} />,
        },
      ],
    },
    {
      groupLabel: 'Orders',
      sidebarMenuItems: [
        {
          menuLabel: 'Orders',
          path: 'orders',
          icon: <ShoppingCart size={20} />,
        },
        {
          menuLabel: 'Invoices',
          path: 'invoices',
          icon: <FileText size={20} />,
        },
        {
          menuLabel: 'Deliveries',
          path: 'deliveries',
          icon: <Truck size={20} />,
        },
      ],
    },
    {
      groupLabel: 'Crops',
      sidebarMenuItems: [
        {
          menuLabel: 'Crops',
          path: 'crops',
          icon: <Sprout size={20} />,
        },
        {
          menuLabel: 'Customer Crops',
          path: 'customer-crops',
          icon: <UserCog size={20} />,
        },
        {
          menuLabel: 'Product Applications',
          path: 'product-applications',
          icon: <FlaskConical size={20} />,
        },
        {
          menuLabel: 'Geo Tags',
          path: 'geo-tags',
          icon: <MapPin size={20} />,
        },
      ],
    },
    {
      groupLabel: 'Users',
      sidebarMenuItems: [
        {
          menuLabel: 'Users',
          path: 'users',
          icon: <UserIcon size={20} />,
        },
      ],
    },
  ];
  return (
    <>
      <SidebarHeader className="flex p-4 justify-start items-center flex-row gap-2 text-xl">
        <Sprout className="text-green-500" size={32} />
        <span className="text-2xl font-bold text-green-500">AgriSmart</span>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        {sideBarGroups.map(({ groupLabel, sidebarMenuItems }) => (
          <SidebarGroup>
            <SidebarGroupLabel className="uppercase text-sm font-semibold opacity-50">
              {groupLabel}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {sidebarMenuItems.map(({ icon, menuLabel, path }) => {
                  const isActive = currentPath === path;
                  return (
                    <Link to={path} className="no-underline">
                      <SidebarMenuItem
                        className={cn(
                          'flex gap-4 cursor-pointer hover:bg-gray-200 dark:hover:hover:bg-gray-400 duration-200 hover:text-black hover:scale-105 rounded-lg ml-2 py-2 px-3 mt-1 justify-start items-center text-foreground',
                          isActive
                            ? 'text-black bg-gray-200 dark:bg-gray-400 scale-105'
                            : 'hover:bg-gray-200 hover:scale-105 text-muted-foreground'
                        )}
                      >
                        {icon}
                        <span className="text-md">{menuLabel}</span>
                      </SidebarMenuItem>
                    </Link>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
    </>
  );
};

export default Sidebar;
