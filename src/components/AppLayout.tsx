import { Outlet, useLocation } from "react-router-dom";
import { Bell } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { alerts } from "@/data/mockData";

const titleMap: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/farms": "Farms",
  "/fields": "All Fields",
  "/predictions": "Predictions",
  "/alerts": "Alerts",
};

function getPageTitle(pathname: string): string {
  if (titleMap[pathname]) return titleMap[pathname];
  if (pathname.startsWith("/farm/")) return "Farm";
  if (pathname.startsWith("/field/")) return "Field";
  return "SmartDrop";
}

export default function AppLayout() {
  const location = useLocation();
  const title = getPageTitle(location.pathname);
  const highAlertCount = alerts.filter((a) => a.severity === "high").length;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />

        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 border-b bg-card/80 backdrop-blur-sm sticky top-0 z-40 flex items-center px-4 gap-3">
            <SidebarTrigger />
            <h1 className="font-display font-semibold text-base truncate">{title}</h1>
            <div className="ml-auto flex items-center gap-2">
              <Button variant="outline" size="icon" className="relative">
                <Bell size={18} />
                {highAlertCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center">
                    {highAlertCount}
                  </span>
                )}
              </Button>
            </div>
          </header>

          <main className="flex-1 min-w-0">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
