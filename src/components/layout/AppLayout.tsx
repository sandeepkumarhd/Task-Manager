// src/components/layout/AppLayout.tsx
import React from "react";
import { Outlet } from "react-router";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../AppSidebar";
import SiteHeader from "../SiteHeader";
import { SidebarInset } from "@/components/ui/sidebar"; // 👈 make sure ye import ho

const AppLayout: React.FC = () => {
  return (
    <SidebarProvider /* yaha className mat do */>
      <div className="flex min-h-screen w-full bg-gray-100">
        {/* Left: Sidebar */}
        <div className="">
          <AppSidebar />
        </div>

        {/* Right: Content area that automatically shifts with sidebar */}
        <SidebarInset className="flex flex-col w-full">
          {/* Top header */}
          <SiteHeader />

          {/* Page content */}
          <main className="flex-1 overflow-auto bg-white p-4 md:ml-[120px]">
            <Outlet />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
