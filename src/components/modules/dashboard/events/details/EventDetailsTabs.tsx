"use client";

import { useState } from "react";
import ParticipantsList from "./ParticipantsList";
import RequestsList from "./RequestList";
import InvitationsList from "./InvitationList";
import { BookingWithUser } from "@/types/booking";
import { BookingRequest } from "@/types/event";
import { InvitationWithUser } from "@/types/invitation";
import { EventReviewsResponse } from "@/types/review";
import ReviewsList from "./ReviewsList";

type Props = {
  participants: BookingWithUser[];
  requests: BookingRequest[];
  invitations: InvitationWithUser[];
  reviews: EventReviewsResponse | null;
  eventId: string;
  eventStatus: string;
  isPrivate: boolean;
};

export default function EventDetailsTabs({
  participants,
  requests,
  invitations,
  reviews,
  eventId,
  eventStatus,
  isPrivate,
}: Props) {
  const [active, setActive] = useState("participants");

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="flex gap-2 border-b pb-2">
        <Tab value="participants" active={active} setActive={setActive}>
          Participants
        </Tab>

        {isPrivate && (
          <Tab value="requests" active={active} setActive={setActive}>
            Requests
          </Tab>
        )}

        <Tab value="invitations" active={active} setActive={setActive}>
          Invitations
        </Tab>
        <Tab value="reviews" active={active} setActive={setActive}>
          Reviews
        </Tab>
      </div>

      {/* Content */}
      {active === "participants" && (
        <ParticipantsList
          participants={participants}
          eventId={eventId}
          eventStatus={eventStatus}
        />
      )}

      {active === "requests" && isPrivate && (
        <RequestsList
          requests={requests}
          eventId={eventId}
          eventStatus={eventStatus}
        />
      )}

      {active === "invitations" && (
        <InvitationsList
          invitations={invitations}
          eventId={eventId}
          eventStatus={eventStatus}
        />
      )}
      {active === "reviews" && (
        <ReviewsList initialData={reviews} eventId={eventId} />
      )}
    </div>
  );
}

function Tab({ value, active, setActive, children }: any) {
  return (
    <button
      onClick={() => setActive(value)}
      className={`px-3 py-1.5 text-sm rounded-md transition cursor-pointer ${
        active === value
          ? "bg-primary text-white"
          : "text-muted-foreground hover:bg-muted"
      }`}
    >
      {children}
    </button>
  );
}
