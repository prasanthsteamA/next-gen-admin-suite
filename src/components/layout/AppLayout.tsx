import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { SidebarProvider } from "@/contexts/SidebarContext";

interface AppLayoutProps {
  children: ReactNode;
  breadcrumb: { label: string; path?: string }[];
}

export function AppLayout({ children, breadcrumb }: AppLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background flex flex-col">
        {/* Header spans full width at top */}
        <Header />
        
        {/* Below header: sidebar + main content */}
        <div className="flex flex-1">
          <Sidebar />
          <div className="flex-1 min-w-0">
            {/* Breadcrumb bar - in page layout */}
            <div className="flex h-10 items-center bg-muted/50 border-b border-border px-6">
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
            
            {/* Main content */}
            <main className="p-6">{children}</main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
