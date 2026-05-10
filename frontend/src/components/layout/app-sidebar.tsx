"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Map, 
  Settings, 
  User, 
  Plus, 
  LayoutDashboard,
  LogOut,
  Wallet,
  FlightTakeoff
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { logoutAction } from "@/app/actions/auth";
import { cn } from "@/lib/utils";

const navMain = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "My Trips",
    url: "/trips",
    icon: Map,
  },
  {
    title: "Expenses",
    url: "/expenses",
    icon: Wallet,
  },
];

const navFooter = [
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: User,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar 
      variant="inset" 
      collapsible="icon" 
      className="border-r border-white/10 bg-white/5 backdrop-blur-[20px]"
    >
      <SidebarHeader className="flex flex-col gap-8 py-6 px-4">
        <Link href="/dashboard" className="flex items-center gap-3 px-2 group">
          <div className="w-10 h-10 rounded-lg primary-gradient flex items-center justify-center transition-transform group-hover:scale-110">
            <FlightTakeoff className="h-6 w-6 text-white" />
          </div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <h1 className="text-xl font-bold text-primary tracking-tight">ZUno</h1>
            <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Premium Travel</p>
          </div>
        </Link>
      </SidebarHeader>
      
      <SidebarContent className="px-4">
        <SidebarGroup>
          <div className="py-2 group-data-[collapsible=icon]:hidden">
            <Link 
              href="/trips/new" 
              className="flex items-center justify-center gap-2 primary-gradient text-white hover:opacity-90 px-4 py-3 rounded-xl font-bold text-sm transition-all shadow-lg active:scale-95"
            >
              <Plus className="h-4 w-4" />
              <span>New Trip</span>
            </Link>
          </div>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-white/40 text-[10px] uppercase tracking-widest font-bold px-4 mb-2">Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {navMain.map((item) => {
                const isActive = pathname === item.url || pathname?.startsWith(item.url + "/");
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={isActive}
                      tooltip={item.title}
                      className={cn(
                        "h-11 transition-all duration-300",
                        isActive ? "bg-white/10 text-secondary scale-105" : "text-white/60 hover:bg-white/5 hover:text-secondary"
                      )}
                    >
                      <Link href={item.url} className="flex items-center gap-3">
                        <item.icon className="h-5 w-5" />
                        <span className="font-medium">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {navFooter.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={isActive}
                      tooltip={item.title}
                      className={cn(
                        "h-11 transition-all duration-300",
                        isActive ? "bg-white/10 text-secondary" : "text-white/60 hover:bg-white/5 hover:text-secondary"
                      )}
                    >
                      <Link href={item.url} className="flex items-center gap-3">
                        <item.icon className="h-5 w-5" />
                        <span className="font-medium">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarSeparator className="bg-white/5" />
      
      <SidebarFooter className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              className="w-full justify-start h-auto py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all"
              tooltip="Profile Settings"
            >
              <Avatar className="h-9 w-9 rounded-lg border border-secondary/20">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback className="rounded-lg bg-primary/10 text-primary">
                  KG
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start gap-0.5 ml-2 group-data-[collapsible=icon]:hidden overflow-hidden">
                <span className="text-sm font-bold text-white leading-none truncate">Kishor G</span>
                <span className="text-[10px] text-white/40 truncate w-full">Premium Member</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem className="mt-2">
            <form action={logoutAction} className="w-full">
              <button 
                type="submit" 
                className="flex items-center gap-2 text-sm text-red-400 hover:bg-red-400/10 w-full p-3 rounded-xl transition-all"
              >
                <LogOut className="h-4 w-4" />
                <span className="font-bold group-data-[collapsible=icon]:hidden">Logout</span>
              </button>
            </form>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
