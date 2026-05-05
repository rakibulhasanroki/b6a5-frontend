import type { Metadata } from "next";
import PageContainer from "@/components/custom/PageContainer";
import Section from "@/components/custom/Section";
import PageHeader from "@/components/custom/PageHeader";
import { SectionTitle, BodyText } from "@/components/custom/Typography";

export const metadata: Metadata = {
  title: "Terms & Conditions",
};

export default function TermsPage() {
  return (
    <PageContainer className="py-6 md:py-8">
      <div className="mx-auto max-w-3xl space-y-5">
        <PageHeader
          title="Terms & Conditions"
          subtitle="Platform rules for users and organizers"
        />

        <Section className="space-y-2">
          <SectionTitle>Platform Usage</SectionTitle>
          <BodyText>
            Users must use Planora only for legitimate event participation,
            booking, and management activities.
          </BodyText>
        </Section>

        <Section className="space-y-2">
          <SectionTitle>Bookings</SectionTitle>
          <BodyText>
            All participation is handled through bookings. A booking is only
            valid when successfully created and confirmed by the system.
          </BodyText>
        </Section>

        <Section className="space-y-2">
          <SectionTitle>Payments</SectionTitle>
          <BodyText>
            Paid events require successful Stripe payment before confirmation.
            Failed or incomplete payments do not create bookings.
          </BodyText>
        </Section>

        <Section className="space-y-2">
          <SectionTitle>Organizer Responsibility</SectionTitle>
          <BodyText>
            Organizers are responsible for event accuracy, schedule integrity,
            and participant management.
          </BodyText>
        </Section>
      </div>
    </PageContainer>
  );
}
