"use client";

import Container from "@/components/custom/Container";
import Section from "@/components/custom/Section";

const stats = [
  { label: "Events Created", value: "1.2K+" },
  { label: "Registered Users", value: "8.5K+" },
  { label: "Total Bookings", value: "15K+" },
  { label: "System Uptime", value: "99.8%" },
];

export default function PlatformStats() {
  return (
    <Section className="pt-16">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div
              key={i}
              className="
                flex flex-col items-center text-center
                gap-1
              "
            >
              <div className="text-2xl font-semibold tracking-tight">
                {s.value}
              </div>

              <div className="text-xs text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
