import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

interface AppLayoutProps {
  children: ReactNode;
  breadcrumb: { label: string; path?: string }[];
}

export function AppLayout({ children, breadcrumb }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="ml-16">
        <Header breadcrumb={breadcrumb} />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
