import EventDetailsClient from "@/components/modules/events/EventDetailsClient";
import { EventService } from "@/service/event/event.service";

export default async function EventDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const event = await EventService.getSingleEvent(id);

  return <EventDetailsClient event={event} />;
}
