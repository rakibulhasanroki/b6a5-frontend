import Container from "@/components/custom/Container";
import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <section className="py-14">
      <Container>
        <div className="relative rounded-2xl border border-border p-8 flex flex-col items-center text-center gap-4 overflow-hidden">
          {/* blended gradient background */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 pointer-events-none" />

          <h2 className="text-xl font-semibold">
            Ready to host your own event?
          </h2>

          <p className="text-sm text-muted-foreground max-w-md">
            Start creating and managing events with ease using Planora.
          </p>

          <Button
            className="
              mt-2 px-6 h-10
              bg-primary text-primary-foreground
              hover:bg-primary/90
              transition-all duration-300
              shadow-sm hover:shadow-md
              hover:scale-[1.03]
              active:scale-[0.97]
              cursor-pointer
            "
          >
            Create Event
          </Button>
        </div>
      </Container>
    </section>
  );
}
