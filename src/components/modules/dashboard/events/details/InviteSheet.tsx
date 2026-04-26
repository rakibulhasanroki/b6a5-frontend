"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { getAllParticipantsAction } from "@/service/event/event.actions";
import { sendInvitationAction } from "@/service/invitation/invitation.actions";
import { toast } from "sonner";
import { AllParticipant, EventStatus } from "@/types/event";

export default function InviteSheet({
  eventId,
  eventStatus,
}: {
  eventId: string;
  eventStatus: EventStatus;
}) {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState<AllParticipant[]>([]);
  const [loadingUserId, setLoadingUserId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const isBlocked = eventStatus === "ENDED" || eventStatus === "ONGOING";

  const loadUsers = async () => {
    const res = await getAllParticipantsAction();

    if (!res.success) {
      toast.error(res.message || "Failed to load users");
      return;
    }

    setUsers(res.data || []);
  };

  useEffect(() => {
    if (open && !isBlocked) loadUsers();
  }, [open]);

  const handleInvite = async (userId: string) => {
    if (isBlocked) {
      toast.error("Cannot invite users after event started or ended");
      return;
    }

    setLoadingUserId(userId);

    const res = await sendInvitationAction({
      eventId,
      invitedUserId: userId,
    });

    if (!res?.success) {
      toast.error(res?.message || "Failed to send invitation");
      setLoadingUserId(null);
      return;
    }

    toast.success("Invitation sent");
    setLoadingUserId(null);
  };

  const filteredUsers = users.filter((u) =>
    u.name?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      <Button
        onClick={() => {
          if (isBlocked) {
            toast.error("Cannot invite users after event started or ended");
            return;
          }

          setOpen(true);
        }}
        disabled={isBlocked}
        className="h-9 px-4 cursor-pointer"
      >
        Invite
      </Button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="w-full sm:w-[420px] p-0">
          <div className="flex flex-col h-full">
            {/* Header */}
            <SheetHeader className="px-4 py-4 border-b">
              <SheetTitle>Invite Users</SheetTitle>
              <SheetDescription>
                Search and invite users to this event.
              </SheetDescription>
            </SheetHeader>

            {/* Body */}
            <div className="flex-1 px-4 py-4 overflow-hidden flex flex-col">
              <input
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                disabled={isBlocked}
                className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
              />

              <div className="mt-4 space-y-3 overflow-y-auto pr-1">
                {filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between border rounded-md p-3"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">
                        {user.name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {user.email}
                      </p>
                    </div>

                    <Button
                      size="sm"
                      disabled={isBlocked || loadingUserId === user.id}
                      className="min-w-[80px] cursor-pointer"
                      onClick={() => handleInvite(user.id)}
                    >
                      {loadingUserId === user.id ? "Inviting..." : "Invite"}
                    </Button>
                  </div>
                ))}

                {filteredUsers.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center mt-6">
                    No users found
                  </p>
                )}
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
