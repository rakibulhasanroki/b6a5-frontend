"use server";

import { InvitationService } from "./invitation.service";
import { updateTag } from "next/cache";

// READ

export const getMyInvitationsAction = async () => {
  return await InvitationService.getMyInvitations();
};

export const getEventInvitationsAction = async (eventId: string) => {
  const res = await InvitationService.getEventInvitations(eventId);

  return res.data;
};

export const sendInvitationAction = async (body: {
  eventId: string;
  invitedUserId: string;
}) => {
  const res = await InvitationService.sendInvitation(body);

  updateTag(`event-invitations-${body.eventId}`);

  return res;
};

export const updateInvitationStatusAction = async (
  invitationId: string,
  body: { status: string },
) => {
  const res = await InvitationService.updateInvitationStatus(
    invitationId,
    body,
  );

  updateTag("my-invitations");

  return res;
};
