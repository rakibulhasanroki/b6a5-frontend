import EventsPageClient from "@/components/modules/events/EventsPageClient";
import { Suspense } from "react";

export default function EventsPage() {
  return (
    <Suspense fallback={null}>
      <EventsPageClient />
    </Suspense>
  );
}
