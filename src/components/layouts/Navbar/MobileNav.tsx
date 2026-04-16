"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import AuthButtons from "./AuthButtons";

export default function MobileNav({
  isLoggedIn,
  user,
}: {
  isLoggedIn: boolean;
  user: any;
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div ref={menuRef} className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        className="cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {open && (
        <div className="absolute left-0 top-16 w-full border-t border-border bg-background shadow-md">
          <div className="flex flex-col p-5">
            {/* Links */}
            <div className="flex flex-col gap-1">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="flex items-center rounded-lg px-4 py-2.5 text-[15px] font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-all duration-200"
              >
                Home
              </Link>

              <Link
                href="/events"
                onClick={() => setOpen(false)}
                className="flex items-center rounded-lg px-4 py-2.5 text-[15px] font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-all duration-200"
              >
                Events
              </Link>

              <Link
                href="/about"
                onClick={() => setOpen(false)}
                className="flex items-center rounded-lg px-4 py-2.5 text-[15px] font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-all duration-200"
              >
                About
              </Link>
            </div>

            {/* Auth */}
            <div className="mt-4">
              <AuthButtons isLoggedIn={isLoggedIn} user={user} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
