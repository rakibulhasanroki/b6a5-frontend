import type { Metadata } from "next";
import PageContainer from "@/components/custom/PageContainer";
import Section from "@/components/custom/Section";
import PageHeader from "@/components/custom/PageHeader";
import { BodyText } from "@/components/custom/Typography";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <PageContainer className="py-6 md:py-8">
      <div className="mx-auto max-w-2xl space-y-6">
        <PageHeader
          title="Contact"
          subtitle="Reach out for support or inquiries."
        />

        <Section className="rounded-lg border border-border bg-card p-4 md:p-5">
          <BodyText>
            For any questions or feedback, contact us via email.
          </BodyText>

          <div className="mt-3 text-sm font-medium text-foreground">
            planora@gmail.com
          </div>
        </Section>
      </div>
    </PageContainer>
  );
}
