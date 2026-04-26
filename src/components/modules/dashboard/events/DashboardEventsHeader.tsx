"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DashboardEventsHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-xl font-semibold">Events</h1>
        <p className="text-sm text-muted-foreground">
          Manage and track your events
        </p>
      </div>

      <Button
        asChild
        className="h-9 px-4 hover:bg-primary/90 hover:text-white cursor-pointer"
      >
        <Link href="/dashboard/events/create">Create Event</Link>
      </Button>
    </div>
  );
}
