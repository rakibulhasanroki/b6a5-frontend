"use client";

import { useState } from "react";
import ParticipantStats from "./ParticipantStats";
import OrganizerStats from "./OrganizerStats";
import AdminStats from "./AdminStats";

export default function StatsTabs({ stats }: { stats: any }) {
  const [tab, setTab] = useState<"participant" | "organizer" | "admin">(
    "participant",
  );

  const showAdmin = !!stats?.admin;

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="flex gap-2 border-b pb-2 overflow-x-auto">
        <TabButton
          active={tab === "participant"}
          onClick={() => setTab("participant")}
        >
          Activity
        </TabButton>

        <TabButton
          active={tab === "organizer"}
          onClick={() => setTab("organizer")}
        >
          Organizer
        </TabButton>

        {showAdmin && (
          <TabButton active={tab === "admin"} onClick={() => setTab("admin")}>
            Admin
          </TabButton>
        )}
      </div>

      {/* Content */}
      {tab === "participant" && <ParticipantStats stats={stats} />}
      {tab === "organizer" && <OrganizerStats stats={stats} />}
      {tab === "admin" && showAdmin && <AdminStats stats={stats} />}
    </div>
  );
}

function TabButton({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1.5 rounded-md text-sm whitespace-nowrap cursor-pointer ${
        active
          ? "bg-primary text-white"
          : "bg-muted text-muted-foreground cursor-pointer"
      }`}
    >
      {children}
    </button>
  );
}
