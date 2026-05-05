// "use client";

// import Link from "next/link";
// import { Button } from "@/components/ui/button";

// export default function DashboardEventsHeader() {
//   return (
//     <div className="flex items-center justify-between">
//       <div>
//         <h1 className="text-xl font-semibold">Events</h1>
//         <p className="text-sm text-muted-foreground">
//           Manage and track your events
//         </p>
//       </div>

//       <Button
//         asChild
//         className="h-9 px-4 hover:bg-primary/90 hover:text-white cursor-pointer"
//       >
//         <Link href="/dashboard/events/create">Create Event</Link>
//       </Button>
//     </div>
//   );
// }

"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

export default function DashboardEventsHeader() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();

  const currentSearch = searchParams.get("search") || "";
  const currentStatus = searchParams.get("status") || "";

  const updateQuery = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    params.set("page", "1"); // reset page on filter

    startTransition(() => {
      router.push(`/dashboard/events?${params.toString()}`);
    });
  };

  return (
    <div className="space-y-4">
      {/* Top Row */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Events</h1>
          <p className="text-sm text-muted-foreground">
            Manage and track your events
          </p>
        </div>

        <Button
          asChild
          className="h-9 px-4 hover:bg-primary/90 hover:text-white cursor-pointer"
        >
          <Link href="/dashboard/events/create">Create Event</Link>
        </Button>
      </div>

      {/* Filters Row */}
      <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        {/* Search */}
        <Input
          placeholder="Search events..."
          defaultValue={currentSearch}
          onChange={(e) => updateQuery("search", e.target.value)}
          className="md:max-w-xs"
        />

        {/* Status Filter */}
        <Select
          value={currentStatus || "ALL"}
          onValueChange={(value) =>
            updateQuery("status", value === "ALL" ? "" : value)
          }
        >
          <SelectTrigger className="md:w-[180px]">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="ALL">All</SelectItem>
            <SelectItem value="UPCOMING">Upcoming</SelectItem>
            <SelectItem value="ONGOING">Ongoing</SelectItem>
            <SelectItem value="ENDED">Ended</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
