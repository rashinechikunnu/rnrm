import { LegalPage } from "@/components/LegalPage";
import { getContent } from "@/lib/api";
import { pageMeta } from "@/lib/site";

export const metadata = pageMeta({ title: "Privacy Policy", description: "How rnrm Technology collects, uses and protects personal information.", path: "/privacy" });

export default async function PrivacyPage() {
  const { contact_email } = await getContent();
  return (
    <LegalPage
      title="Privacy Policy"
      intro="We collect as little personal information as we can, and we use it only to respond to you and provide our services."
      updated="12 November 2026"
      sections={[
        {
          heading: "Information we collect",
          paragraphs: [
            "When you submit the contact form we collect your name, email address, company name (if provided), the service you are interested in and the details of your enquiry. We also record the IP address the enquiry was sent from, to protect the form against abuse.",
            "If analytics is enabled on this website, we collect aggregated, non-identifying usage information such as pages visited and approximate location.",
          ],
        },
        {
          heading: "How we use your information",
          paragraphs: [
            "We use the information you provide to reply to your enquiry, prepare proposals and deliver services you have requested. We do not sell your information or share it with third parties for their marketing.",
          ],
        },
        {
          heading: "Storage and security",
          paragraphs: [
            "Enquiries are stored in our own database with access limited to authorised rnrm Technology staff. We apply technical and organisational measures to protect personal information against unauthorised access, loss or misuse.",
          ],
        },
        {
          heading: "Retention",
          paragraphs: ["We keep enquiry records for as long as needed to respond and maintain a business relationship, and delete them when they are no longer required or when you ask us to."],
        },
        {
          heading: "Your rights",
          paragraphs: [`You may ask us for a copy of the personal information we hold about you, or ask us to correct or delete it, by emailing ${contact_email}.`],
        },
        {
          heading: "Changes to this policy",
          paragraphs: ["We may update this policy from time to time. The date at the top of this page shows when it was last revised."],
        },
      ]}
    />
  );
}
