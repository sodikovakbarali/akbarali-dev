import { SiteLayout } from "@/components/SiteLayout";
import { ContactCTA } from "@/components/ContactCTA";
import { PageShell, SectionHeader } from "@/components/ui-primitives";
import { profile } from "@/data/profile";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Contact — ${profile.pageTitle}`,
  description:
    "Contact Akbarali Sodikov for EdTech collaborations, developer networking, and exam-tech partnerships.",
};

export default function ContactPage() {
  return (
    <SiteLayout>
      <PageShell>
        <SectionHeader
          number="—"
          eyebrow="Contact"
          title="Start a conversation"
          description={profile.contact.intro}
        />
        <ContactCTA />
      </PageShell>
    </SiteLayout>
  );
}
