"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { RelatedEvent } from "@/types/event";
import { ArrowRight } from "lucide-react";

export default function RelatedEvents({ events }: { events: RelatedEvent[] }) {
  if (!events?.length) return null;

  return (
    <div className="space-y-2">
      <h2 className="text-sm font-medium">Related Events</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {events.map((e) => (
          <Link key={e.id} href={`/events/${e.id}`}>
            <Card className="group hover:shadow-md transition cursor-pointer">
              <CardContent className="p-2.5 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <div className="text-sm font-medium line-clamp-1">
                    {e.title}
                  </div>

                  {/* Arrow indicator */}
                  <ArrowRight
                    size={14}
                    className="text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition"
                  />
                </div>

                <div className="text-xs text-muted-foreground line-clamp-1">
                  {e.organizer?.name || "N/A"}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
