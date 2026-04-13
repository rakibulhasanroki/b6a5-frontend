"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import AuthButtons from "./AuthButtons";

export default function MobileNav({ isLoggedIn }: { isLoggedIn: boolean }) {
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
          <div className="flex flex-col p-6">
            {/* Links */}
            <div className="flex flex-col gap-1">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-base font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                Home
              </Link>

              <Link
                href="/events"
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-base font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                Events
              </Link>
              <Link
                href="/about"
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-base font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                About
              </Link>
            </div>

            {/* Divider */}
            <div className="my-4 h-px bg-border" />

            {/* Auth */}
            <div className="flex flex-col gap-2">
              <AuthButtons isLoggedIn={isLoggedIn} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
