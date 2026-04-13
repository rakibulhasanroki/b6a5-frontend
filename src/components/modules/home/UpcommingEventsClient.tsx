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
      left: dir === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  return (
    <Section className="pt-14">
      <Container>
        {/* HEADER */}
        <div className="flex items-center justify-between mb-5">
          <SectionTitle>Upcoming Events</SectionTitle>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("left")}
              className="hidden md:flex cursor-pointer"
            >
              ←
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("right")}
              className="hidden md:flex cursor-pointer"
            >
              →
            </Button>

            <Link href="/events">
              <Button className="ml-2 cursor-pointer">View All</Button>
            </Link>
          </div>
        </div>

        {/* SLIDER */}
        <div
          ref={scrollRef}
          className="
            flex gap-4 overflow-x-auto
            snap-x snap-mandatory
            pb-2
            hide-scrollbar
          "
        >
          {events.map((event) => (
            <div key={event.id} className="snap-start shrink-0 w-[280px]">
              <UpcomingEventCard event={event} />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
