"use client";

import { useState } from "react";
import { IUser } from "@/types/user";
import { Event } from "@/types/event";
import { PaginationMeta } from "@/types/api";
import UsersSection from "./UserSection";
import EventsSection from "./EventsSections";
import CreateAdminSection from "./CreateAdmin";

export default function AdminTabs({
  users,
  usersMeta,
  events,
  eventsMeta,
}: {
  users: IUser[];
  usersMeta: PaginationMeta;
  events: Event[];
  eventsMeta: PaginationMeta;
}) {
  const [tab, setTab] = useState<"users" | "events" | "create">("users");

  return (
    <div className="space-y-4">
      <div className="flex gap-2 border-b pb-2 overflow-x-auto">
        <TabButton active={tab === "users"} onClick={() => setTab("users")}>
          Users
        </TabButton>

        <TabButton active={tab === "events"} onClick={() => setTab("events")}>
          Events
        </TabButton>
        <TabButton active={tab === "create"} onClick={() => setTab("create")}>
          Create Admin
        </TabButton>
      </div>

      {tab === "users" && <UsersSection users={users} meta={usersMeta} />}

      {tab === "events" && <EventsSection events={events} meta={eventsMeta} />}
      {tab === "create" && <CreateAdminSection />}
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
        active ? "bg-primary text-white" : "bg-muted text-muted-foreground"
      }`}
    >
      {children}
    </button>
  );
}
