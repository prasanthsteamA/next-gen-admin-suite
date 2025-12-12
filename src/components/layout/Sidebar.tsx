import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Car,
  Calendar,
  Zap,
  Bus,
  BarChart3,
  Settings,
  Menu,
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: Car, label: "Vehicles", path: "/vehicles" },
  { icon: Calendar, label: "Schedule", path: "/schedule" },
  { icon: Zap, label: "Charging", path: "/charging" },
  { icon: Bus, label: "Depots", path: "/depots" },
  { icon: BarChart3, label: "Analytics", path: "/analytics" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-16 bg-sidebar flex flex-col border-r border-sidebar-border">
      <div className="flex h-16 items-center justify-center">
        <Menu className="h-6 w-6 text-sidebar-foreground cursor-pointer hover:text-sidebar-foreground/80" />
      </div>
      
      <nav className="flex-1 py-2">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || 
              (item.path !== "/" && location.pathname.startsWith(item.path));
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex h-11 w-11 items-center justify-center rounded-lg transition-all duration-200",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                  )}
                  title={item.label}
                >
                  <item.icon className="h-5 w-5" />
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
