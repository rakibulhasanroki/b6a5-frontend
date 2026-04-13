"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DesktopNav() {
  const pathname = usePathname();

  const linkClass = (path: string) =>
    `text-sm font-medium transition-colors ${
      pathname === path
        ? "text-primary"
        : "text-muted-foreground hover:text-primary"
    }`;

  return (
    <nav className="hidden items-center gap-8 md:flex">
      <Link href="/" className={linkClass("/")}>
        Home
      </Link>

      <Link href="/events" className={linkClass("/events")}>
        Events
      </Link>

      <Link href="/about" className={linkClass("/about")}>
        About
      </Link>
    </nav>
  );
}
