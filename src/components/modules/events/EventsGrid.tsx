import EventCard from "./EventCard";
import { Event } from "@/types/event";

interface Props {
  events: Event[];
}

export default function EventsGrid({ events }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
