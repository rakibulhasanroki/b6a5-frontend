// import Container from "@/components/custom/Container";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";

// export default function CTASection() {
//   return (
//     <section className="py-14">
//       <Container>
//         <div className="relative rounded-2xl border border-border p-8 flex flex-col items-center text-center gap-4 overflow-hidden">
//           {/* blended gradient background */}
//           <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 pointer-events-none" />

//           <h2 className="text-xl font-semibold">
//             Ready to host your own event?
//           </h2>

//           <p className="text-sm text-muted-foreground max-w-md">
//             Start creating and managing events with ease using Planora.
//           </p>

//           <Button
//             asChild
//             className="
//     mt-2 px-6 h-10
//     bg-primary text-primary-foreground
//     hover:bg-primary/90
//     transition-all duration-300
//     shadow-sm hover:shadow-md
//     hover:scale-[1.03]
//     active:scale-[0.97]
//     cursor-pointer
//   "
//           >
//             <Link href="/dashboard/events/create">Create Event</Link>
//           </Button>
//         </div>
//       </Container>
//     </section>
//   );
// }

import Container from "@/components/custom/Container";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="pt-12 pb-20">
      <Container>
        <div
          className="
            relative rounded-2xl
            border border-border
            px-6 py-10
            flex flex-col items-center text-center gap-2
            overflow-hidden
          "
        >
          {/* background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10 pointer-events-none" />

          {/* subtle inner highlight */}
          <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5 pointer-events-none" />

          {/* content */}
          <h2 className="text-2xl font-semibold tracking-tight">
            Ready to create your next event?
          </h2>

          <p className="text-sm text-muted-foreground max-w-md">
            Start building and managing events effortlessly with Planora.
            Create, join, and track everything from one place.
          </p>

          <Button
            asChild
            className="
              mt-3 px-6 h-10
              bg-primary text-primary-foreground
              hover:bg-primary/90
              transition-all duration-300
              shadow-sm hover:shadow-md
              hover:scale-[1.03]
              active:scale-[0.97]
            "
          >
            <Link href="/dashboard/events/create">Create Event</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
