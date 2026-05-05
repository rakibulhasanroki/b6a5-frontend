"use client";

import { useState } from "react";
import Container from "@/components/custom/Container";
import Section from "@/components/custom/Section";
import { SectionTitle } from "@/components/custom/Typography";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "How do I join an event?",
    a: "Go to any event and click Join. If payment is required, you’ll be redirected to Stripe.",
  },
  {
    q: "Can I create events?",
    a: "Yes, registered users can create and manage events from the dashboard.",
  },
  {
    q: "How does payment work?",
    a: "All payments are securely handled via Stripe with automatic booking confirmation.",
  },
  {
    q: "Can I cancel a booking?",
    a: "Yes, cancellation is allowed based on event rules and status.",
  },
  {
    q: "Can any user create events?",
    a: "Yes. Any registered user can create events. Users can also join other events and manage their own events and bookings directly from the dashboard.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // first open by default

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Section className="pt-12">
      <Container>
        <SectionTitle>Frequently Asked Questions</SectionTitle>

        <div className="mt-8 max-w-2xl mx-auto space-y-3">
          {faqs.map((f, i) => {
            const isOpen = openIndex === i;

            return (
              <div
                key={i}
                className="
                  rounded-xl border border-border bg-card
                  overflow-hidden
                "
              >
                {/* Question */}
                <button
                  onClick={() => toggle(i)}
                  className="
                    w-full flex items-center justify-between
                    px-4 py-3 text-left
                    hover:bg-accent/40
                    transition-colors
                  "
                >
                  <span className="text-sm font-medium">{f.q}</span>

                  <ChevronDown
                    className={`
                      h-4 w-4 transition-transform duration-300
                      ${isOpen ? "rotate-180" : ""}
                    `}
                  />
                </button>

                {/* Answer */}
                <div
                  className={`
                    overflow-hidden transition-all duration-300
                    ${isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}
                  `}
                >
                  <p className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed">
                    {f.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
