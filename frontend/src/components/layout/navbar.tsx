"use client";

import { usePathname } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

export function Navbar() {
  const pathname = usePathname();
  
  // Create a simple title based on pathname
  const getTitle = () => {
    if (!pathname) return "Dashboard";
    
    if (pathname.includes("/dashboard")) return "Dashboard";
    if (pathname.includes("/trips")) return "My Trips";
    if (pathname.includes("/community")) return "Community";
    if (pathname.includes("/settings")) return "Settings";
    if (pathname.includes("/profile")) return "Profile";
    
    return "ZUno";
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-2 border-b bg-background/80 px-4 backdrop-blur-sm">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <div className="flex items-center gap-2 font-medium">
        {getTitle()}
      </div>
      <div className="ml-auto flex items-center space-x-4">
        {/* We can add search or notifications here later */}
      </div>
    </header>
  );
}
