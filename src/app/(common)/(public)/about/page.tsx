import type { Metadata } from "next";
import PageContainer from "@/components/custom/PageContainer";
import Section from "@/components/custom/Section";
import PageHeader from "@/components/custom/PageHeader";
import { BodyText, SectionTitle } from "@/components/custom/Typography";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <PageContainer className="py-6 md:py-8">
      <div className="mx-auto max-w-3xl space-y-6 md:space-y-7">
        <PageHeader
          title="About Planora"
          subtitle="A modern platform for managing and joining events."
        />

        <Section className="rounded-lg border border-border bg-card p-4 md:p-5">
          <SectionTitle>Our Mission</SectionTitle>
          <BodyText>
            Planora simplifies event management with a fast, intuitive, and
            reliable experience.
          </BodyText>
        </Section>

        <Section className="rounded-lg border border-border bg-card p-4 md:p-5">
          <SectionTitle>What We Offer</SectionTitle>
          <BodyText>
            Manage events, registrations, and participants efficiently in one
            place.
          </BodyText>
        </Section>

        <Section className="rounded-lg border border-border bg-card p-4 md:p-5">
          <SectionTitle>Why Planora</SectionTitle>
          <BodyText>
            Clean UI, modern architecture, and performance-focused design.
          </BodyText>
        </Section>
      </div>
    </PageContainer>
  );
}
