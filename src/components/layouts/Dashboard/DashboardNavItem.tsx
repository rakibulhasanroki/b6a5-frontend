"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardNavItem({
  item,
  collapsed,
}: {
  item: any;
  collapsed: boolean;
}) {
  const pathname = usePathname();

  const isDashboardRoot = item.href === "/dashboard";

  const isActive = isDashboardRoot
    ? pathname === "/dashboard"
    : pathname === item.href || pathname.startsWith(item.href + "/");

  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className={`
  group relative flex items-center h-9 w-full rounded-lg text-sm cursor-pointer
  transition-all duration-200
  px-2.5
  ${collapsed ? "justify-center" : "justify-start gap-2.5"}
  
  ${
    isActive
      ? "bg-primary text-white"
      : "text-muted-foreground hover:bg-primary/90 hover:text-white"
  }
`}
    >
      {/* Active indicator */}
      {isActive && !collapsed && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-r bg-primary" />
      )}

      <Icon
        size={18}
        className={`
          shrink-0 transition-transform duration-200
          group-hover:scale-105
          ${isActive ? "text-primary-foreground" : ""}
        `}
      />

      {!collapsed && <span className="truncate">{item.label}</span>}
    </Link>
  );
}
