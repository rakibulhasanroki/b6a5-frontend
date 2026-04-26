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
  try {
    const res = await InvitationService.sendInvitation(body);

    updateTag(`event-invitations-${body.eventId}`);

    return {
      success: true,
      data: res,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to send invitation",
    };
  }
};

export const updateInvitationStatusAction = async (
  invitationId: string,
  body: { status: string },
) => {
  try {
    const res = await InvitationService.updateInvitationStatus(
      invitationId,
      body,
    );

    updateTag("my-invitations");

    return {
      success: true,
      data: res,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to update invitation",
    };
  }
};
