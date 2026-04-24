import MyInvitationsList from "@/components/modules/dashboard/invitations/MyInvitationList";
import { getMyInvitationsAction } from "@/service/invitation/invitation.actions";

export default async function MyInvitationsPage() {
  const invitations: any = await getMyInvitationsAction();

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">My Invitations</h1>

      <MyInvitationsList invitations={invitations.data} />
    </div>
  );
}
