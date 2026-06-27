import type { Metadata } from "next";
import { SiteLayout } from "@/components/SiteLayout";
import { ContactCTA } from "@/components/ContactCTA";
import { SectionHeader } from "@/components/ui-primitives";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: `Contact — ${profile.pageTitle}`,
  description:
    "Contact Akbarali Sodikov for EdTech collaborations, developer networking, and exam-tech partnerships.",
};

export default function ContactPage() {
  return (
    <SiteLayout>
      <section className="px-4 py-16 md:px-6 md:py-24">
        <div className="mx-auto max-w-3xl">
          <SectionHeader
            eyebrow="Contact"
            title="Let's connect"
            description={profile.contact.intro}
          />
          <ContactCTA />
        </div>
      </section>
    </SiteLayout>
  );
}
