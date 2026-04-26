"use client";

import Link from "next/link";
import { LogOut, User, LayoutDashboard } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function ProfileDropdown({ user }: { user: any }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleLogout = async () => {
    const fullPath =
      pathname + (searchParams.toString() ? `?${searchParams}` : "");

    await authClient.signOut();

    router.push(
      `/login?success=logout&redirectTo=${encodeURIComponent(fullPath)}`,
    );
    router.refresh();
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 rounded-full cursor-pointer">
          <img
            src={user.image || "/avatar.png"}
            alt="avatar"
            className="h-9 w-9 rounded-full object-cover border"
          />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-64">
        <div className="px-4 py-3 border-b">
          <p className="text-sm font-semibold">{user.name}</p>
          <p className="text-xs text-muted-foreground">{user.email}</p>
        </div>

        <DropdownMenuItem asChild>
          <Link
            href="/profile"
            className="flex items-center gap-2 cursor-pointer"
          >
            <User className="h-4 w-4" />
            Profile
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link
            href="/dashboard"
            className="flex items-center gap-2 cursor-pointer"
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          asChild
          className="text-red-500 flex items-center gap-2 cursor-pointer"
        >
          <button
            type="submit"
            onClick={handleLogout}
            className="flex items-center gap-2 w-full"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
