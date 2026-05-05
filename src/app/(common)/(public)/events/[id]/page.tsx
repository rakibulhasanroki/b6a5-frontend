import EventDetailsClient from "@/components/modules/events/EventDetailsClient";
import { EventService } from "@/service/event/event.service";
import { getEventReviewsAction } from "@/service/review/review.actions";

export const metadata = {
  title: "Event Details",
};

export default async function EventDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const event = await EventService.getSingleEvent(id);
  const reviews = await getEventReviewsAction(id, {
    page: 1,
    limit: 5,
  });

  const relatedEventsRes = await EventService.getRelatedEvents(id);
  const relatedEvents = relatedEventsRes.data;

  return (
    <EventDetailsClient
      event={event}
      reviews={reviews}
      relatedEvents={relatedEvents}
    />
  );
}
