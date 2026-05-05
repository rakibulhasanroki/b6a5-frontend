import type { Metadata } from "next";
import PageContainer from "@/components/custom/PageContainer";
import Section from "@/components/custom/Section";
import PageHeader from "@/components/custom/PageHeader";
import { SectionTitle, BodyText } from "@/components/custom/Typography";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPolicyPage() {
  return (
    <PageContainer className="py-6 md:py-8">
      <div className="mx-auto max-w-3xl space-y-5 md:space-y-6">
        <PageHeader
          title="Privacy Policy"
          subtitle="How Planora handles your data and protects your privacy."
        />

        <Section className="space-y-2">
          <SectionTitle>Information We Collect</SectionTitle>
          <BodyText>
            When you create an account, we collect your name, email address, and
            authentication data. When you use Planora, we also store event
            registrations, bookings, payments, and reviews you submit.
          </BodyText>
        </Section>

        <Section className="space-y-2">
          <SectionTitle>How We Use Your Data</SectionTitle>
          <BodyText>
            Your data is used to operate the platform, process event bookings,
            manage payments via Stripe, display event participation, and improve
            user experience. We do not sell personal data.
          </BodyText>
        </Section>

        <Section className="space-y-2">
          <SectionTitle>Payments & Billing</SectionTitle>
          <BodyText>
            Payments are securely processed through Stripe. We do not store full
            card details. Transaction records are stored for booking
            confirmation, refunds, and invoice generation.
          </BodyText>
        </Section>

        <Section className="space-y-2">
          <SectionTitle>Event & Participation Data</SectionTitle>
          <BodyText>
            When you join or create events, we store event participation
            records, organizer details, and booking status to manage capacity,
            access, and event history.
          </BodyText>
        </Section>

        <Section className="space-y-2">
          <SectionTitle>Data Security</SectionTitle>
          <BodyText>
            We use industry-standard security practices including encrypted
            connections, secure authentication, and protected database access to
            safeguard your data.
          </BodyText>
        </Section>

        <Section className="space-y-2">
          <SectionTitle>Third-Party Services</SectionTitle>
          <BodyText>
            We use trusted services such as authentication providers and Stripe
            for payments. These providers handle data according to their own
            privacy policies.
          </BodyText>
        </Section>
      </div>
    </PageContainer>
  );
}
