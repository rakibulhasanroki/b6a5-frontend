"use client";

import { Button } from "@/components/ui/button";
import { sendInvitationAction } from "@/service/invitation/invitation.actions";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function InvitationsList({
  invitations,
  eventId,
  eventStatus,
}: any) {
  const [pending, startTransition] = useTransition();
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const router = useRouter();

  const isDisabled = pending || eventStatus !== "UPCOMING";

  const handleReinvite = (inv: any) => {
    if (eventStatus !== "UPCOMING") {
      toast.error("Cannot invite after event started or ended");
      return;
    }

    startTransition(async () => {
      try {
        setLoadingId(inv.id);

        await sendInvitationAction({
          eventId,
          invitedUserId: inv.invitedUser.id,
        });

        router.refresh();
        toast.success("Re-invited");
      } catch (err: any) {
        toast.error(err.message || "Failed to re-invite");
      } finally {
        setLoadingId(null);
      }
    });
  };

  return (
    <div className="rounded-lg border p-4 space-y-4">
      <h2 className="font-semibold">Invitations</h2>

      {invitations.length === 0 && (
        <p className="text-sm text-muted-foreground">No invitations yet</p>
      )}

      {invitations.map((inv: any) => (
        <div
          key={inv.id}
          className="flex items-center justify-between border-b pb-2 last:border-none"
        >
          <div className="min-w-0">
            <p className="text-sm font-medium truncate">
              {inv.invitedUser.name}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {inv.invitedUser.email}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* STATUS BADGE */}
            <span className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground">
              {inv.status}
            </span>

            {/* ONLY FOR DECLINED */}
            {inv.status === "DECLINED" && (
              <Button
                size="sm"
                variant="outline"
                disabled={loadingId === inv.id}
                onClick={() => handleReinvite(inv)}
                className="h-8 px-3 min-w-[100px]"
              >
                {loadingId === inv.id ? "Sending..." : "Re-invite"}
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
