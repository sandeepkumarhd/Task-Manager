import React from "react";
import { Outlet } from "react-router";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../AppSidebar";
import SiteHeader from "../SiteHeader";
import { SidebarInset } from "@/components/ui/sidebar";

const AppLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gray-100">
        <div>
          <AppSidebar />
        </div>
        <SidebarInset className="flex flex-col w-full">
          <SiteHeader />
          <main className="flex-1 overflow-auto bg-white p-4 md:ml-[175px]">
            <Outlet />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
