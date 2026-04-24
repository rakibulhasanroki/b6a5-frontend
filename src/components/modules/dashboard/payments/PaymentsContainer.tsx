"use client";

import { useState } from "react";
import MyPaymentsList from "./MyPaymentsList";
import OrganizerPaymentsList from "./OrganizerPaymentsList";

export default function PaymentsContainer({
  initialMyPayments,
  initialOrganizerPayments,
}: any) {
  const [tab, setTab] = useState<"my" | "organizer">("my");

  return (
    <div className="space-y-6">
      {/* TABS */}
      <div className="flex gap-2 border-b pb-2">
        <button
          onClick={() => setTab("my")}
          className={`px-3 py-1 text-sm rounded-md ${
            tab === "my" ? "bg-primary text-white" : "text-muted-foreground"
          }`}
        >
          My Payments
        </button>

        <button
          onClick={() => setTab("organizer")}
          className={`px-3 py-1 text-sm rounded-md ${
            tab === "organizer"
              ? "bg-primary text-white"
              : "text-muted-foreground"
          }`}
        >
          Organizer
        </button>
      </div>

      {/* CONTENT */}
      {tab === "my" ? (
        <MyPaymentsList initialData={initialMyPayments} />
      ) : (
        <OrganizerPaymentsList initialData={initialOrganizerPayments} />
      )}
    </div>
  );
}
