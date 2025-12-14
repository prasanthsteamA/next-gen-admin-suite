import { Link, useNavigate } from "react-router-dom";
import { Menu, X, User, Settings, LogOut } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GlobalSearch } from "./GlobalSearch";
import { useSidebarContext } from "@/contexts/SidebarContext";

export function Header() {
  const navigate = useNavigate();
  const { isExpanded, toggleSidebar } = useSidebarContext();

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top bar with menu, logos, search and user - full width */}
      <div className="flex h-16 items-center justify-between border-b border-border bg-card px-4">
        {/* Left: Menu + Logo */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
          >
            {isExpanded ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          <Link to="/" className="flex items-center gap-1">
            <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center">
              <span className="text-xs font-bold text-primary-foreground">bp</span>
            </div>
            <span className="text-lg font-semibold text-foreground">pulse</span>
            <span className="text-primary">○</span>
          </Link>
        </div>

        {/* Center Logo */}
        <div className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
          <span className="text-xl font-light tracking-wide text-foreground">IRIS</span>
          <span className="text-sm text-primary align-super">fleet</span>
        </div>

        {/* Right: Search + User */}
        <div className="flex items-center gap-4">
          {/* Global Search */}
          <GlobalSearch />

          {/* User Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-foreground">Alex Johnson</p>
                  <p className="text-xs text-muted-foreground">Fleet Manager</p>
                </div>
                <Avatar className="h-9 w-9 bg-info cursor-pointer">
                  <AvatarFallback className="bg-info text-info-foreground text-sm font-medium">
                    AJ
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-popover border border-border shadow-lg">
              <div className="px-3 py-2 border-b border-border">
                <p className="text-sm font-medium text-foreground">Alex Johnson</p>
                <p className="text-xs text-muted-foreground">alex.johnson@company.com</p>
              </div>
              <DropdownMenuItem 
                onClick={() => navigate("/settings")}
                className="cursor-pointer"
              >
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => navigate("/settings")}
                className="cursor-pointer"
              >
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
