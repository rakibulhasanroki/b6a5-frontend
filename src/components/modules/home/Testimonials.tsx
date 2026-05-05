"use client";

import Container from "@/components/custom/Container";
import Section from "@/components/custom/Section";
import { SectionTitle } from "@/components/custom/Typography";
import Image from "next/image";

const testimonials = [
  {
    name: "Arafat Rahman",
    role: "Event Organizer",
    image: "/user1.png",
    text: "Planora made it easy to manage registrations and track participants without manual work.",
  },
  {
    name: "Nusrat Jahan",
    role: "Attendee",
    image: "/user2.png",
    text: "I can join events instantly and track my bookings in one place. Very smooth experience.",
  },
  {
    name: "Tanvir Hasan",
    role: "Workshop Host",
    image: "/user3.png",
    text: "Payment handling and participant limits are perfectly managed. Saves a lot of time.",
  },
];

export default function Testimonials() {
  return (
    <Section className="pt-12">
      <Container>
        <SectionTitle>What Users Say</SectionTitle>

        <div className="grid md:grid-cols-3 gap-5 mt-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="
                rounded-xl border border-border
                bg-card
                p-5
                flex flex-col justify-between
                min-h-[160px]
                transition-all duration-300
                hover:shadow-sm
              "
            >
              {/* text */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                "{t.text}"
              </p>

              {/* user */}
              <div className="flex items-center gap-3 mt-5">
                <div className="relative w-9 h-9">
                  <Image
                    src={t.image}
                    alt={t.name}
                    fill
                    sizes="36px"
                    className="rounded-full object-cover"
                  />
                </div>

                <div>
                  <p className="text-sm font-medium leading-none">{t.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
