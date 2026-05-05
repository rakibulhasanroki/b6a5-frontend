"use client";

import Container from "@/components/custom/Container";
import Section from "@/components/custom/Section";
import { SectionTitle } from "@/components/custom/Typography";

const steps = [
  {
    title: "Create or Join Events",
    desc: "Any registered user can create events or join existing ones instantly based on availability and type.",
  },
  {
    title: "Discover Events",
    desc: "Browse public or private events using filters like category, pricing, and access type.",
  },
  {
    title: "Join & Pay Securely",
    desc: "Join events and complete payments through Stripe when required. Free events require instant confirmation.",
  },
  {
    title: "Manage Everything",
    desc: "Track your created events, bookings, participants, and statuses directly from your dashboard.",
  },
];

export default function HowItWorks() {
  return (
    <Section className="pt-12">
      <Container>
        <SectionTitle>How Planora Works</SectionTitle>

        {/* WRAPPER */}
        <div className="relative mt-10">
          {/* vertical line (mobile) */}
          <div className="absolute left-5 top-0 h-full w-[2px] bg-border md:hidden" />

          {/* horizontal line (desktop) */}
          <div className="hidden md:block absolute top-6 left-0 w-full h-[2px] bg-border" />

          <div className="flex flex-col md:grid md:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <div
                key={i}
                className="relative flex items-start md:flex-col md:items-center text-left md:text-center"
              >
                {/* STEP INDICATOR */}
                <div
                  className="
                  w-10 h-10 rounded-full
                  bg-primary text-primary-foreground
                  flex items-center justify-center
                  text-sm font-medium
                  shrink-0 z-10
                "
                >
                  {i + 1}
                </div>

                {/* CONTENT */}
                <div className="ml-4 md:ml-0 md:mt-6 max-w-[240px]">
                  <div className="text-sm font-semibold">{s.title}</div>
                  <div className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    {s.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
