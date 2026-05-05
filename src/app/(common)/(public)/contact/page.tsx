import type { Metadata } from "next";
import PageContainer from "@/components/custom/PageContainer";
import Section from "@/components/custom/Section";
import PageHeader from "@/components/custom/PageHeader";
import { BodyText } from "@/components/custom/Typography";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <PageContainer className="py-6 md:py-8">
      <div className="mx-auto max-w-2xl space-y-6">
        <PageHeader
          title="Contact Support"
          subtitle="Event, booking, or payment related assistance."
        />

        <Section className="space-y-4">
          <BodyText>
            For booking issues, payment failures, event disputes, or organizer
            support, contact the Planora support team.
          </BodyText>

          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2 font-medium">
              <Mail className="w-4 h-4 text-muted-foreground" />
              planora@gmail.com
            </div>

            <div className="flex items-center gap-2 font-medium">
              <Phone className="w-4 h-4 text-muted-foreground" />
              +880 1712-345678
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button asChild className="flex-1">
              <a href="mailto:support@planora.app">
                <Mail className="w-4 h-4 mr-2" />
                Email
              </a>
            </Button>

            <Button asChild variant="outline" className="flex-1">
              <a href="https://wa.me/8801712345678" target="_blank">
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp
              </a>
            </Button>
          </div>
        </Section>
      </div>
    </PageContainer>
  );
}
