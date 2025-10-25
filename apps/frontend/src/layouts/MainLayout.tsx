import {
  Sidebar,
  SidebarProvider,
} from '@agri-smart/shared/components/ui/sidebar';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import AppSidebar from '../components/AppSidebar';

function MainLayout() {
  const [isSideBarOpen, setSideBarOpen] = useState<boolean>(true);
  return (
    <SidebarProvider open={isSideBarOpen} onOpenChange={setSideBarOpen}>
      <div className="flex h-screen w-full overflow-hidden">
        {/* Sidebar (fixed width) */}
        <Sidebar>
          <AppSidebar />
        </Sidebar>
        {/* Main content area */}
        <div className="flex flex-col flex-1 h-full">
          <Navbar
            isSideBarOpen={isSideBarOpen}
            setSideBarOpen={setSideBarOpen}
          />
          <main className="flex-1 overflow-auto p-4">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default MainLayout;
