import Container from "@/components/custom/Container";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full -z-10" />

      <Container>
        <div className="flex flex-col items-center text-center gap-6 max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Discover & Manage Events Effortlessly
          </h1>

          <p className="text-base text-muted-foreground">
            Planora helps you create, manage, and join events seamlessly — all
            in one place.
          </p>

          <div className="flex gap-4 mt-4">
            {/* Explore */}
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
                cursor-pointer
              "
            >
              <Link href="/events">Explore Events</Link>
            </Button>

            {/* Create */}
            <Button
              asChild
              variant="secondary"
              className="
                px-6 h-10
                hover:scale-[1.03]
                active:scale-[0.97]
                transition-all duration-300
                cursor-pointer
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
