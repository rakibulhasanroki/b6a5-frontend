"use client";

import { useRef } from "react";
import Container from "@/components/custom/Container";
import Section from "@/components/custom/Section";
import { SectionTitle } from "@/components/custom/Typography";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import UpcomingEventCard from "./UpcomingEventCard";
import { Event } from "@/types/event";

export default function UpcomingEventsClient({ events }: { events: Event[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  return (
    <Section className="pt-12">
      <Container>
        {/* HEADER */}
        <div className="flex items-end justify-between mb-6">
          <div>
            <SectionTitle>Upcoming Events</SectionTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Explore and join upcoming events happening around you
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* arrows */}
            <div className="hidden md:flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => scroll("left")}
                className="cursor-pointer"
              >
                ←
              </Button>

              <Button
                variant="outline"
                size="icon"
                onClick={() => scroll("right")}
                className="cursor-pointer"
              >
                →
              </Button>
            </div>

            <Link href="/events">
              <Button className="ml-2 cursor-pointer">View All</Button>
            </Link>
          </div>
        </div>

        {/* SLIDER WRAPPER (important change) */}
        <div className="relative">
          {/* fade edges (reduces hard cut feeling) */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-10 bg-gradient-to-r from-background to-transparent z-10 hidden md:block" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-background to-transparent z-10 hidden md:block" />

          {/* SLIDER */}
          <div
            ref={scrollRef}
            className="
              flex gap-5 overflow-x-auto
              snap-x snap-mandatory
              pb-2
              hide-scrollbar
            "
          >
            {events.map((event) => (
              <div
                key={event.id}
                className="
                  snap-start shrink-0
                  w-[260px] md:w-[280px]
                "
              >
                <UpcomingEventCard event={event} />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
