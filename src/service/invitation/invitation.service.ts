import { fetcher } from "@/lib/api/fetcher";

export const InvitationService = {
  sendInvitation: (body: { eventId: string; invitedUserId: string }) =>
    fetcher("/invitations", {
      method: "POST",
      body,
      auth: true,
    }),

  getMyInvitations: () =>
    fetcher("/invitations/my", {
      auth: true,
      cache: "force-cache",
      tags: ["my-invitations"],
      revalidate: 60,
    }),

  getEventInvitations: (eventId: string) =>
    fetcher(`/invitations/event/${eventId}`, {
      auth: true,
      cache: "force-cache",
      tags: [`event-invitations-${eventId}`],
      revalidate: 60,
    }),

  updateInvitationStatus: (invitationId: string, body: { status: string }) =>
    fetcher(`/invitations/${invitationId}`, {
      method: "PATCH",
      body,
      auth: true,
    }),
};
