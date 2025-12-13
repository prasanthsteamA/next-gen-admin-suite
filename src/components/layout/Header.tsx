import { ChevronLeft, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface HeaderProps {
  breadcrumb: { label: string; path?: string }[];
}

export function Header({ breadcrumb }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top bar with menu, logos and user - full width */}
      <div className="flex h-16 items-center justify-between border-b border-border bg-card px-4">
        {/* Left: Menu + Logo */}
        <div className="flex items-center gap-4">
          <Menu className="h-6 w-6 text-muted-foreground cursor-pointer hover:text-foreground" />
          <div className="flex items-center gap-1">
            <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center">
              <span className="text-xs font-bold text-primary-foreground">bp</span>
            </div>
            <span className="text-lg font-semibold text-foreground">pulse</span>
            <span className="text-primary">○</span>
          </div>
        </div>

        {/* Center Logo */}
        <div className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
          <span className="text-xl font-light tracking-wide text-foreground">IRIS</span>
          <span className="text-sm text-primary align-super">fleet</span>
        </div>

        {/* User */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-medium text-foreground">Alex Johnson</p>
            <p className="text-xs text-muted-foreground">Fleet Manager</p>
          </div>
          <Avatar className="h-9 w-9 bg-info">
            <AvatarFallback className="bg-info text-info-foreground text-sm font-medium">
              AJ
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Breadcrumb bar - light background, full width */}
      <div className="flex h-10 items-center bg-muted/50 border-b border-border px-4">
        <nav className="flex items-center gap-2 text-sm">
          <Link to="/" className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
            <ChevronLeft className="h-4 w-4" />
          </Link>
          {breadcrumb.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              {index > 0 && <span className="text-muted-foreground">/</span>}
              {item.path ? (
                <Link to={item.path} className="text-muted-foreground hover:text-foreground">
                  {item.label}
                </Link>
              ) : (
                <span className="text-foreground font-medium">{item.label}</span>
              )}
            </div>
          ))}
        </nav>
      </div>
    </header>
  );
}
