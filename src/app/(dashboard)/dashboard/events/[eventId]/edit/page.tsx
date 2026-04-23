import EditEventForm from "@/components/modules/dashboard/events/details/EditEventForm";
import { getEventDetailsAction } from "@/service/event/event.actions";

export default async function EditEventPage({ params }: any) {
  const { eventId } = await params;

  const event = await getEventDetailsAction(eventId, { auth: true });

  return <EditEventForm event={event} />;
}
