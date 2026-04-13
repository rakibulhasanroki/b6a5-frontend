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
      <div className="mx-auto max-w-3xl space-y-5 md:space-y-6">
        <PageHeader
          title="Terms & Conditions"
          subtitle="Guidelines for using Planora."
        />

        <Section className="rounded-lg border border-border bg-card p-4 md:p-5">
          <SectionTitle>Use</SectionTitle>
          <BodyText>Use the platform responsibly and legally.</BodyText>
        </Section>

        <Section className="rounded-lg border border-border bg-card p-4 md:p-5">
          <SectionTitle>Accounts</SectionTitle>
          <BodyText>You are responsible for your account activity.</BodyText>
        </Section>

        <Section className="rounded-lg border border-border bg-card p-4 md:p-5">
          <SectionTitle>Content</SectionTitle>
          <BodyText>You own and manage your event content.</BodyText>
        </Section>

        <Section className="rounded-lg border border-border bg-card p-4 md:p-5">
          <SectionTitle>Liability</SectionTitle>
          <BodyText>We are not liable for platform misuse.</BodyText>
        </Section>
      </div>
    </PageContainer>
  );
}
