import type { Metadata } from "next";
import PageContainer from "@/components/custom/PageContainer";
import Section from "@/components/custom/Section";
import PageHeader from "@/components/custom/PageHeader";
import { BodyText, SectionTitle } from "@/components/custom/Typography";
import { Calendar, CreditCard, Users, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <PageContainer className="py-6 md:py-8">
      <div className="mx-auto max-w-3xl space-y-6">
        <PageHeader
          title="About Planora"
          subtitle="Event booking and management system"
        />

        <Section className="space-y-3">
          <SectionTitle>System Overview</SectionTitle>
          <BodyText>
            Planora is a booking-based event management system where users join
            events through controlled capacity, authentication, and optional
            payment flows.
          </BodyText>
        </Section>

        <Section className="space-y-3">
          <SectionTitle>Core Features</SectionTitle>

          <div className="space-y-3 text-sm">
            <div className="flex gap-2">
              <Calendar className="w-4 h-4 mt-0.5 text-muted-foreground" />
              Event creation with scheduling (start/end time)
            </div>

            <div className="flex gap-2">
              <Users className="w-4 h-4 mt-0.5 text-muted-foreground" />
              Booking-based participant system (no direct joining)
            </div>

            <div className="flex gap-2">
              <CreditCard className="w-4 h-4 mt-0.5 text-muted-foreground" />
              Stripe-based payment flow for paid events
            </div>

            <div className="flex gap-2">
              <ShieldCheck className="w-4 h-4 mt-0.5 text-muted-foreground" />
              Organizer-controlled event lifecycle (upcoming, ongoing, ended)
            </div>
          </div>
        </Section>
      </div>
    </PageContainer>
  );
}
