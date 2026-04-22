"use client";

import { useState } from "react";
import DashboardSidebar from "./DashboardSidebar";
import DashboardTopbar from "./DashboardTopBar";
import DashboardMobileDrawer from "./DashboardMobileDrawer";

export default function DashboardLayout({
  children,
  user,
}: {
  children: React.ReactNode;
  user: any;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <DashboardSidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          user={user}
        />
      </div>

      {/* Mobile Drawer */}
      <DashboardMobileDrawer open={open} setOpen={setOpen} user={user} />

      {/* Main */}
      <div className="flex flex-col flex-1">
        <DashboardTopbar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          open={open}
          setOpen={setOpen}
          user={user}
        />

        <main className="flex-1 overflow-y-auto bg-muted/30">
          <div className="w-full px-6 py-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
