"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AuthButtons({ isLoggedIn }: { isLoggedIn: boolean }) {
  const baseBtn =
    "h-10 px-6 w-full md:w-auto justify-center transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] cursor-pointer";

  return (
    <div className="flex flex-col md:flex-row gap-2 md:gap-3 w-full md:w-auto">
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
          <Link href="/dashboard/my-events" className="w-full md:w-auto">
            <Button
              variant="secondary"
              className={`${baseBtn} shadow-sm hover:shadow-md`}
            >
              Create Event
            </Button>
          </Link>

          <Link href="/dashboard" className="w-full md:w-auto">
            <Button className={`${baseBtn} shadow-sm hover:shadow-md`}>
              Dashboard
            </Button>
          </Link>
        </>
      )}
    </div>
  );
}
