"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import ProfileDropdown from "@/components/modules/profile/ProfileDropdown";
import { IUser } from "@/types/user";

export default function AuthButtons({
  isLoggedIn,
  user,
}: {
  isLoggedIn: boolean;
  user: IUser | null;
}) {
  const baseBtn =
    "h-9 px-4 w-full md:w-auto justify-center text-sm transition-all duration-200 active:scale-[0.97] cursor-pointer";

  return (
    <div className="flex flex-col gap-3 w-full md:flex-row md:gap-3 md:w-auto">
      {!isLoggedIn ? (
        <>
          <Button
            asChild
            variant="ghost"
            className={`${baseBtn} hover:bg-accent`}
          >
            <Link href="/login">Login</Link>
          </Button>

          <Button asChild className={`${baseBtn} shadow-sm hover:shadow-md`}>
            <Link href="/register">Register</Link>
          </Button>
        </>
      ) : (
        <>
          <div className="flex gap-2 md:contents">
            <Button
              asChild
              variant="secondary"
              className={`${baseBtn} shadow-sm hover:shadow-md w-full`}
            >
              <Link href="/dashboard/events/create">Create</Link>
            </Button>

            <Button
              asChild
              className={`${baseBtn} shadow-sm hover:shadow-md w-full`}
            >
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </div>

          <div className="flex justify-end md:justify-center">
            <ProfileDropdown user={user} />
          </div>
        </>
      )}
    </div>
  );
}
