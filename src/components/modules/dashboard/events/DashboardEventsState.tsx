"use client";

import { CTA } from "@/components/shared/DashboardShared";

export default function DashboardEmptyState({ tab }: { tab: string }) {
  const isParticipant = tab === "my-events";

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
      {isParticipant ? (
        <CTA
          text="Join events to see them here"
          action="Explore Events"
          href="/events"
        />
      ) : (
        <CTA
          text="Start by creating your first event"
          action="Create Event"
          href="/dashboard/events/create"
        />
      )}
    </div>
  );
}
