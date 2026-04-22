"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

import DashboardNavItem from "./DashboardNavItem";
import { NAV_ITEMS } from "@/lib/utils/dashboard-nav";
import Link from "next/link";
import { Home } from "lucide-react";

export default function DashboardMobileDrawer({
  open,
  setOpen,
  user,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
  user: any;
}) {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        side="left"
        className="w-[260px] p-0 bg-sidebar flex flex-col h-full"
      >
        {/* SAME HEADER STYLE */}
        <SheetHeader className="px-4 h-14 flex justify-center border-b">
          <SheetTitle className="text-sm font-semibold">Planora</SheetTitle>
          <SheetDescription className="sr-only">
            Dashboard navigation
          </SheetDescription>
        </SheetHeader>

        {/* SAME NAV STRUCTURE */}
        <nav className="flex-1 mt-3 px-2 space-y-1">
          {NAV_ITEMS.filter((item) => {
            if (item.adminOnly && user?.role !== "ADMIN") return false;
            return true;
          }).map((item) => (
            <DashboardNavItem key={item.href} item={item} collapsed={false} />
          ))}
        </nav>
        {/* Bottom Home Button */}
        <div className="p-2 border-t border-border">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="group flex items-center h-9 w-full rounded-lg text-sm cursor-pointer
  transition-all duration-200
  px-2.5 gap-2.5
  text-muted-foreground hover:bg-primary/90 hover:text-white"
          >
            <Home
              size={18}
              className="transition-transform group-hover:scale-105"
            />
            <span>Back to Home</span>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
