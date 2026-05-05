import Container from "@/components/custom/Container";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative py-16  overflow-hidden">
      {/* background glow */}
      <div className="absolute top-[-140px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/20 blur-[140px] rounded-full -z-10" />

      {/* subtle grid background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.05)_1px,transparent_0)] [background-size:24px_24px] opacity-30 -z-20" />

      <Container>
        <div className="flex flex-col items-center text-center gap-6 max-w-3xl mx-auto">
          {/* badge */}
          <div className="px-3 py-1 rounded-full border border-border bg-card text-xs text-muted-foreground">
            Event Management Platform
          </div>

          {/* heading */}
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            Create, Join & Manage Events
            <span className="text-primary"> Seamlessly</span>
          </h1>

          {/* description */}
          <p className="text-base md:text-lg text-muted-foreground max-w-xl">
            Planora enables any user to create events, join others, and manage
            bookings from a unified dashboard with full control and simplicity.
          </p>

          {/* CTA */}
          <div className="flex gap-4 mt-2">
            <Button
              asChild
              className="
                px-6 h-10
                bg-primary text-primary-foreground
                hover:bg-primary/90
                transition-all duration-300
                shadow-sm hover:shadow-md
                hover:scale-[1.03]
                active:scale-[0.97]
              "
            >
              <Link href="/events">Explore Events</Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="
                px-6 h-10
                hover:scale-[1.03]
                active:scale-[0.97]
                transition-all duration-300
              "
            >
              <Link href="/dashboard/events/create">Create Event</Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
