import { useState } from "react";
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
  ChevronLeft,
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

interface SidebarProps {
  breadcrumb: { label: string; path?: string }[];
}

export function Sidebar({ breadcrumb }: SidebarProps) {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <aside 
      className={cn(
        "fixed left-0 top-16 z-40 h-[calc(100vh-64px)] bg-sidebar flex flex-col border-r border-sidebar-border transition-all duration-300",
        isExpanded ? "w-56" : "w-16"
      )}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Breadcrumb inside sidebar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-sidebar-border bg-sidebar-accent/50 min-h-[44px]">
        <Link to="/" className="text-sidebar-foreground/60 hover:text-sidebar-foreground">
          <ChevronLeft className="h-4 w-4" />
        </Link>
        {isExpanded && (
          <nav className="flex items-center gap-1 text-sm overflow-hidden">
            {breadcrumb.map((item, index) => (
              <div key={index} className="flex items-center gap-1 whitespace-nowrap">
                {index > 0 && <span className="text-sidebar-foreground/40">/</span>}
                {item.path ? (
                  <Link to={item.path} className="text-sidebar-foreground/60 hover:text-sidebar-foreground">
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-sidebar-foreground font-medium">{item.label}</span>
                )}
              </div>
            ))}
          </nav>
        )}
      </div>
      
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
                    "flex items-center gap-3 rounded-lg transition-all duration-200 h-11",
                    isExpanded ? "px-3" : "justify-center",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                  )}
                  title={item.label}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  {isExpanded && (
                    <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
