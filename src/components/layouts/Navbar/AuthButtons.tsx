"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import ProfileDropdown from "@/components/modules/profile/ProfileDropdown";

export default function AuthButtons({
  isLoggedIn,
  user,
}: {
  isLoggedIn: boolean;
  user: any;
}) {
  const baseBtn =
    "h-9 px-4 w-full md:w-auto justify-center text-sm transition-all duration-200 active:scale-[0.97] cursor-pointer";

  return (
    <div className="flex flex-col gap-3 w-full md:flex-row md:gap-3 md:w-auto">
      {!isLoggedIn ? (
        <>
          <Link href="/login" className="w-full md:w-auto">
            <Button variant="ghost" className={`${baseBtn} hover:bg-accent`}>
              Login
            </Button>
          </Link>

          <Link href="/register" className="w-full md:w-auto">
            <Button className={`${baseBtn} shadow-sm hover:shadow-md`}>
              Register
            </Button>
          </Link>
        </>
      ) : (
        <>
          {/* Mobile: side by side */}
          <div className="flex gap-2 md:contents">
            <Link href="/dashboard/my-events" className="w-full md:w-auto">
              <Button
                variant="secondary"
                className={`${baseBtn} shadow-sm hover:shadow-md w-full`}
              >
                Create
              </Button>
            </Link>

            <Link href="/dashboard" className="w-full md:w-auto">
              <Button className={`${baseBtn} shadow-sm hover:shadow-md w-full`}>
                Dashboard
              </Button>
            </Link>
          </div>

          {/* Profile stays below */}
          <div className="flex justify-end md:justify-center">
            <ProfileDropdown user={user} />
          </div>
        </>
      )}
    </div>
  );
}
