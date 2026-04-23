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
import { Event } from "@/types/event";

export default async function EventDetailsPage({ params }: any) {
  const { eventId } = await params;

  const event: Event = await getEventDetailsAction(eventId, { auth: true });

  const me = await getMeService();
  const currentUser = me.data;

  const isOrganizer = currentUser.id === event.organizerId;

  if (!isOrganizer && !event.isParticipant) {
    redirect("/dashboard/events");
  }

  let participants: any = { data: [] };
  let requests: any = { data: [] };
  let invitations: any = { data: [] };

  if (isOrganizer) {
    participants = await getEventBookingsAction(eventId);

    if (event.visibility === "PRIVATE") {
      requests = await getEventRequestsAction(eventId);
      invitations = await getEventInvitationsAction(eventId);
    }
  }

  return (
    <div className="space-y-6">
      <EventDetailsHeader event={event} isOrganizer={isOrganizer} />

      {isOrganizer && (
        <EventStatsBar
          participantsCount={participants.data.length}
          requestsCount={requests.length}
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {isOrganizer && (
          <div className="lg:col-span-2">
            <EventDetailsTabs
              participants={participants.data}
              requests={requests}
              invitations={invitations.data}
              eventId={eventId}
              eventStatus={event.status}
              isPrivate={event.visibility === "PRIVATE"}
            />
          </div>
        )}

        <div className={isOrganizer ? "" : "lg:col-span-3"}>
          <EventInfoCard event={event} isOrganizer={isOrganizer} />
        </div>
      </div>
    </div>
  );
}
