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
          subtitle="How we handle your data."
        />

        <Section className="rounded-lg border border-border bg-card p-4 md:p-5">
          <SectionTitle>Data</SectionTitle>
          <BodyText>We collect only necessary information.</BodyText>
        </Section>

        <Section className="rounded-lg border border-border bg-card p-4 md:p-5">
          <SectionTitle>Usage</SectionTitle>
          <BodyText>Data is used to improve your experience.</BodyText>
        </Section>

        <Section className="rounded-lg border border-border bg-card p-4 md:p-5">
          <SectionTitle>Security</SectionTitle>
          <BodyText>Your data is protected with secure practices.</BodyText>
        </Section>

        <Section className="rounded-lg border border-border bg-card p-4 md:p-5">
          <SectionTitle>Services</SectionTitle>
          <BodyText>We may use trusted third-party services.</BodyText>
        </Section>
      </div>
    </PageContainer>
  );
}
