"use client";

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProfileDropdown from "@/components/modules/profile/ProfileDropdown";
import { IUser } from "@/types/user";
import { Suspense } from "react";

export default function DashboardTopBar({
  open,
  setOpen,
  user,
}: {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  open: boolean;
  setOpen: (v: boolean) => void;
  user: IUser;
}) {
  return (
    <header className="h-14 border-b border-border flex items-center justify-between px-4">
      {/* Left */}
      <div className="flex items-center gap-2">
        <Button
          size="icon"
          variant="ghost"
          className="h-9 w-9 md:hidden cursor-pointer hover:bg-primary/90 hover:text-white"
          onClick={() => setOpen(true)}
        >
          <Menu size={20} />
        </Button>

        <span className="text-base font-medium hidden md:block">Dashboard</span>
      </div>

      {/* Right */}
      <Suspense fallback={null}>
        <ProfileDropdown user={user} />
      </Suspense>
    </header>
  );
}
