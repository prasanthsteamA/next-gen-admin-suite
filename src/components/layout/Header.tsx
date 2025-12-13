import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Search, User, Settings, LogOut, X } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results or filter current view
      console.log("Searching for:", searchQuery);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top bar with menu, logos, search and user - full width */}
      <div className="flex h-16 items-center justify-between border-b border-border bg-card px-4">
        {/* Left: Menu + Logo */}
        <div className="flex items-center gap-4">
          <Menu className="h-6 w-6 text-muted-foreground cursor-pointer hover:text-foreground" />
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
          {searchOpen ? (
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search vehicles, depots, alerts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 pl-9 pr-8 h-9 bg-muted/50"
                autoFocus
              />
              <button
                type="button"
                onClick={() => {
                  setSearchOpen(false);
                  setSearchQuery("");
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </form>
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-muted/50 transition-colors"
            >
              <Search className="h-4 w-4" />
              <span className="hidden md:inline">Search</span>
              <kbd className="hidden md:inline-flex h-5 items-center gap-1 rounded border bg-muted px-1.5 text-xs text-muted-foreground">
                ⌘K
              </kbd>
            </button>
          )}

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
