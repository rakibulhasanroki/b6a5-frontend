import { redirect } from "next/navigation";

import EventDetailsHeader from "@/components/modules/dashboard/events/details/EventDetailsHeader";
import EventDetailsTabs from "@/components/modules/dashboard/events/details/EventDetailsTabs";
import EventInfoCard from "@/components/modules/dashboard/events/details/EventInfoCard";
import EventStatsBar from "@/components/modules/dashboard/events/details/EventStatsBar";

import { getEventBookingsAction } from "@/service/bookings/booking.actions";
import {
  getEventDetailsAction,
  getEventRequestsAction,
} from "@/service/event/event.actions";
import { getEventInvitationsAction } from "@/service/invitation/invitation.actions";

import { getMeService } from "@/service/user/user.service";
import { BookingRequest, Event } from "@/types/event";
import { BookingWithUser } from "@/types/booking";
import { InvitationWithUser } from "@/types/invitation";
import { EventReviewsResponse } from "@/types/review";
import { getEventReviewsAction } from "@/service/review/review.actions";
import EventParticipantReview from "@/components/modules/dashboard/events/details/EventParticipantReview";

export default async function EventDetailsPage({ params }: any) {
  const { eventId } = await params;

  const event: Event = await getEventDetailsAction(eventId, { auth: true });

  const me = await getMeService();
  const currentUser = me.data;

  const isOrganizer = currentUser.id === event.organizerId;

  if (!isOrganizer && !event.isParticipant) {
    redirect("/dashboard/events");
  }

  let participants: BookingWithUser[] = [];
  let requests: BookingRequest[] = [];
  let invitations: InvitationWithUser[] = [];
  let reviews: EventReviewsResponse | null = null;

  if (isOrganizer) {
    participants = await getEventBookingsAction(eventId);

    if (event.visibility === "PRIVATE") {
      requests = await getEventRequestsAction(eventId);
      invitations = await getEventInvitationsAction(eventId);
    }
    reviews = await getEventReviewsAction(eventId, { page: 1, limit: 5 });
  }

  return (
    <div className="space-y-6">
      <EventDetailsHeader event={event} isOrganizer={isOrganizer} />

      {isOrganizer && (
        <EventStatsBar
          participantsCount={participants.length}
          requestsCount={requests.length}
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {isOrganizer && (
          <div className="lg:col-span-2">
            <EventDetailsTabs
              participants={participants}
              requests={requests}
              invitations={invitations}
              reviews={reviews}
              eventId={eventId}
              eventStatus={event.status}
              isPrivate={event.visibility === "PRIVATE"}
            />
          </div>
        )}

        {/* ✅ NON-ORGANIZER LAYOUT */}
        {!isOrganizer && event.isParticipant && (
          <div className="lg:col-span-2">
            <EventParticipantReview eventId={eventId} />
          </div>
        )}

        {/* ✅ Event Info */}
        <div
          className={
            isOrganizer
              ? ""
              : event.isParticipant
                ? "lg:col-span-1"
                : "lg:col-span-3"
          }
        >
          <EventInfoCard event={event} isOrganizer={isOrganizer} />
        </div>
      </div>
    </div>
  );
}
