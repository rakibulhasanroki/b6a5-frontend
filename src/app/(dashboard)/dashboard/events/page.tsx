import DashboardEventsTabs from "@/components/modules/dashboard/events/DasboardEventsTabs";
import DashboardEventsHeader from "@/components/modules/dashboard/events/DashboardEventsHeader";
import DashboardEventsList from "@/components/modules/dashboard/events/DashboardEventsList";
import DashboardEmptyState from "@/components/modules/dashboard/events/DashboardEventsState";
import DashboardPagination from "@/components/modules/dashboard/events/DashboardPagination";
import {
  getMyEventsAction,
  getJoinedEventsAction,
} from "@/service/event/event.actions";
import { Suspense } from "react";

export const metadata = {
  title: "Events",
};

export default async function EventsPage({
  searchParams,
}: {
  searchParams: {
    tab?: string;
    page?: string;
    search?: string;
    status?: string;
  };
}) {
  const params = await searchParams;

  const tab = params?.tab || "organizer";
  const page = Number(params?.page || 1);
  const limit = 6;

  const rawStatus = params?.status;

  const status: "UPCOMING" | "ONGOING" | "ENDED" | undefined =
    rawStatus === "UPCOMING" || rawStatus === "ONGOING" || rawStatus === "ENDED"
      ? rawStatus
      : undefined;

  const query = {
    page,
    limit,
    search: params?.search || "",
    status,
  };

  const res =
    tab === "my-events"
      ? await getJoinedEventsAction(query)
      : await getMyEventsAction(query);

  const events = res.data;
  const meta = res.meta;

  return (
    <div className="space-y-6">
      <DashboardEventsHeader />

      <DashboardEventsTabs activeTab={tab} />

      {events.length > 0 ? (
        <>
          <DashboardEventsList events={events} tab={tab} />
          <Suspense fallback={null}>
            <DashboardPagination meta={meta} tab={tab} />
          </Suspense>
        </>
      ) : (
        <DashboardEmptyState tab={tab} />
      )}
    </div>
  );
}
