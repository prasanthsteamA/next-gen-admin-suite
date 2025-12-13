import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

interface AppLayoutProps {
  children: ReactNode;
  breadcrumb: { label: string; path?: string }[];
}

export function AppLayout({ children, breadcrumb }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header spans full width at top */}
      <Header breadcrumb={breadcrumb} />
      
      {/* Below header: sidebar + main content */}
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 ml-16 p-6">{children}</main>
      </div>
    </div>
  );
}
