import { EventService } from "@/service/event/event.service";
import UpcomingEventsClient from "./UpcommingEventsClient";

export default async function UpcomingEvents() {
  const res = await EventService.getEvents(
    {
      limit: 9,
      status: "ENDED",
    },
    {
      cache: "force-cache",
      revalidate: 60,
    },
  );

  const events = res.data.data;

  return <UpcomingEventsClient events={events} />;
}
