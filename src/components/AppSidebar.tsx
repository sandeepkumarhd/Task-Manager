import * as React from "react";
import { LogOut, User2, UserCheck2 } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

import { NavMain } from "./nav-main";
import { useDispatch } from "react-redux";
import { logout } from "@/features/auth/authSlice";
import { useNavigate } from "react-router";
export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allNavItems: any[] = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: User2,
      roles: ["user"],
    },
    {
      title: "Admin Dashboard",
      url: "/admin/dashboard",
      icon: UserCheck2,
      roles: ["admin"],
    },
  ];
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

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
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <SidebarMenuButton
                tooltip="Logout"
                asChild
                className={`${menuButtonBaseClass} hidden sm:flex`}
              >
                <div className="flex items-center gap-2">
                  <LogOut size={24} />
                  <span>Exit</span>
                </div>
              </SidebarMenuButton>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  You will be logged out of your account.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleLogout}>
                  Logout
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
