"use client";

import Link from "next/link";

export default function DashboardEventsTabs({
  activeTab,
}: {
  activeTab: string;
}) {
  return (
    <div className="flex items-center gap-2 border-b pb-2">
      <Tab
        label="Organizer"
        href="/dashboard/events"
        active={activeTab === "organizer"}
      />

      <Tab
        label="My Events"
        href="/dashboard/events?tab=my-events"
        active={activeTab === "my-events"}
      />
    </div>
  );
}

function Tab({
  label,
  href,
  active,
}: {
  label: string;
  href: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`px-3 py-1.5 text-sm rounded-md transition ${
        active
          ? "bg-primary text-white"
          : "text-muted-foreground hover:bg-muted"
      }`}
    >
      {label}
    </Link>
  );
}
