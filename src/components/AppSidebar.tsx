import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Wheat,
  Sprout,
  TrendingUp,
  Bell,
  MapPin,
  Plus,
  Settings,
  LogOut,
  User as UserIcon,
  Leaf,
  ChevronDown,
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
  useSidebar,
} from "@/components/ui/sidebar";
import { NavLink } from "@/components/NavLink";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { farms, alerts } from "@/data/mockData";
import { authStorage } from "@/lib/auth";
import { AddFarmDialog } from "@/components/AddFarmDialog";

const mainItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Farms", url: "/farms", icon: Wheat },
  { title: "All Fields", url: "/fields", icon: Sprout },
  { title: "Predictions", url: "/predictions", icon: TrendingUp },
  { title: "Alerts", url: "/alerts", icon: Bell, badgeKey: "alerts" as const },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const navigate = useNavigate();
  const user = authStorage.getUser();

  const [addFarmOpen, setAddFarmOpen] = useState(false);
  const [showAllFarms, setShowAllFarms] = useState(false);

  const highAlertCount = alerts.filter((a) => a.severity === "high").length;
  const visibleFarms = showAllFarms ? farms : farms.slice(0, 5);

  const handleLogout = () => {
    authStorage.clear();
    navigate("/");
  };

  const linkBase = "hover:bg-muted/50";
  const linkActive = "bg-muted text-primary font-medium";

  return (
    <>
      <Sidebar collapsible="icon">
        <SidebarHeader className="border-b">
          <div className="flex items-center gap-2 px-2 py-1.5 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:justify-center">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0 group-data-[collapsible=icon]:w-7 group-data-[collapsible=icon]:h-7">
              <Leaf className="text-primary-foreground h-[18px] w-[18px] group-data-[collapsible=icon]:h-4 group-data-[collapsible=icon]:w-4" />
            </div>
            {!collapsed && (
              <span className="font-display font-bold text-base">SmartDrop</span>
            )}
          </div>
        </SidebarHeader>

        <SidebarContent>
          {/* Main nav */}
          <SidebarGroup>
            <SidebarGroupLabel>Main</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {mainItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild tooltip={item.title}>
                      <NavLink
                        to={item.url}
                        end
                        className={linkBase}
                        activeClassName={linkActive}
                      >
                        <item.icon className="h-4 w-4" />
                        {!collapsed && (
                          <>
                            <span className="flex-1">{item.title}</span>
                            {item.badgeKey === "alerts" && highAlertCount > 0 && (
                              <span className="ml-auto inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-destructive px-1.5 text-[10px] font-bold text-destructive-foreground">
                                {highAlertCount}
                              </span>
                            )}
                          </>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Your Farms */}
          <SidebarGroup>
            <SidebarGroupLabel>Your Farms</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {visibleFarms.map((farm) => (
                  <SidebarMenuItem key={farm.id}>
                    <SidebarMenuButton asChild tooltip={farm.name}>
                      <NavLink
                        to={`/farm/${farm.id}`}
                        className={linkBase}
                        activeClassName={linkActive}
                      >
                        <MapPin className="h-4 w-4" />
                        {!collapsed && <span className="truncate">{farm.name}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}

                {!collapsed && farms.length > 5 && (
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => setShowAllFarms((v) => !v)}
                      className="text-muted-foreground"
                    >
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${showAllFarms ? "rotate-180" : ""}`}
                      />
                      <span>{showAllFarms ? "Show less" : `Show all (${farms.length})`}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}

                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => setAddFarmOpen(true)}
                    tooltip="Add Farm"
                    className="text-primary hover:text-primary"
                  >
                    <Plus className="h-4 w-4" />
                    {!collapsed && <span>Add Farm</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="border-t">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Settings">
                <Settings className="h-4 w-4" />
                {!collapsed && <span>Settings</span>}
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton tooltip={user?.fullName ?? "Account"}>
                    <UserIcon className="h-4 w-4" />
                    {!collapsed && (
                      <span className="truncate">{user?.fullName ?? "Account"}</span>
                    )}
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="top" align="start" className="w-56">
                  {user && (
                    <>
                      <div className="px-2 py-1.5">
                        <p className="text-sm font-medium truncate">{user.fullName}</p>
                        <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                      </div>
                      <DropdownMenuSeparator />
                    </>
                  )}
                  <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                    <LogOut className="h-4 w-4 mr-2" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      <AddFarmDialog open={addFarmOpen} onOpenChange={setAddFarmOpen} />
    </>
  );
}
