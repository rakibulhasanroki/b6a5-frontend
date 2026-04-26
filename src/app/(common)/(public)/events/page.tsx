import EventsPageClient from "@/components/modules/events/EventsPageClient";
import { Suspense } from "react";
export const metadata = {
  title: "Events",
};

export default function EventsPage() {
  return (
    <Suspense fallback={null}>
      <EventsPageClient />
    </Suspense>
  );
}
