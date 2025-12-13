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
    <aside className="fixed left-0 top-16 z-40 h-[calc(100vh-64px)] w-16 bg-sidebar flex flex-col border-r border-sidebar-border group hover:w-56 transition-all duration-300">
      <nav className="flex-1 py-2 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || 
              (item.path !== "/" && location.pathname.startsWith(item.path));
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 rounded-lg transition-all duration-200 h-11 px-3",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                  )}
                  title={item.label}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  <span className="text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
