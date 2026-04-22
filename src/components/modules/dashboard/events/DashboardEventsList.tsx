import DashboardEventCard from "./DashboardEventCard";

export default function DashboardEventsList({
  events,
  tab,
}: {
  events: any[];
  tab: string;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {events.map((event) => (
        <DashboardEventCard key={event.id} event={event} tab={tab} />
      ))}
    </div>
  );
}
