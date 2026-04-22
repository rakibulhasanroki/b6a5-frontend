"use client";

import DashboardNavItem from "./DashboardNavItem";
import { Home, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NAV_ITEMS } from "@/lib/utils/dashboard-nav";
import Link from "next/link";

export default function DashboardSidebar({
  collapsed,
  setCollapsed,
  user,
}: {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  user: any;
}) {
  return (
    <aside
      className={`
        h-screen border-r border-sidebar-border bg-sidebar
        transition-all duration-300 ease-in-out
        flex flex-col
       ${collapsed ? "w-[64px]" : "w-[260px]"}
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 h-14 border-b">
        {!collapsed && (
          <span className="text-base font-semibold tracking-tight">
            Planora
          </span>
        )}

        <Button
          size="icon"
          variant="ghost"
          onClick={() => setCollapsed(!collapsed)}
          className="h-9 w-9 cursor-pointer hover:bg-primary/90 hover:text-white"
        >
          {collapsed ? (
            <PanelLeftOpen size={18} />
          ) : (
            <PanelLeftClose size={18} />
          )}
        </Button>
      </div>

      {/* Nav */}
      <nav className="flex-1 mt-3 px-2 space-y-1">
        {NAV_ITEMS.filter((item) => {
          if (item.adminOnly && user?.role !== "ADMIN") return false;
          return true;
        }).map((item) => (
          <DashboardNavItem key={item.href} item={item} collapsed={collapsed} />
        ))}
      </nav>
      <div className="p-2 border-t border-border">
        <Link
          href="/"
          className={`
  group flex items-center h-9 w-full rounded-lg text-sm cursor-pointer
  transition-all duration-200
  px-2.5
  ${collapsed ? "justify-center" : "justify-start gap-2.5"}
  text-muted-foreground hover:bg-primary/90 hover:text-white
`}
        >
          <Home
            size={18}
            className="transition-transform group-hover:scale-105"
          />

          {!collapsed && <span>Back to Home</span>}
        </Link>
      </div>
    </aside>
  );
}
