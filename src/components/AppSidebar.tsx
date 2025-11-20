import * as React from "react";
import { LogOut, SquareCheckBig, PenSquare } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";

import { useAppSelector } from "@/app/hooks";
import type { RootState } from "@/app/stote";
import { NavMain } from "./nav-main";
export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const userInfo = useAppSelector((state: RootState) => state.auth);
  console.log(userInfo, "userInfo");
  const allNavItems: any[] = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: PenSquare,
      roles: ["user"],
    },
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: SquareCheckBig,
      roles: ["admin"],
    },
  ];
  const handleLogout = () => {};

  const menuButtonBaseClass =
    "transition-all  duration-300 ease-in-out h-full w-full cursor-pointer active:bg-primary hover:bg-primary hover:text-white [&>svg]:size-7";

  return (
    <Sidebar collapsible="icon" {...props}>
      <div className="flex justify-end md:pt-[80px] px-2"></div>
      <SidebarSeparator />
      <SidebarContent className="flex justify-between">
        <NavMain items={allNavItems} />
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuButton
            onClick={handleLogout}
            tooltip="Logout"
            asChild
            className={`${menuButtonBaseClass} hidden sm:flex`}
          >
            <div className="flex items-center gap-2">
              <LogOut size={24} />
              <span>Exit</span>
            </div>
          </SidebarMenuButton>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
