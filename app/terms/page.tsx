import { LegalPage } from "@/components/LegalPage";
import { getContent } from "@/lib/api";
import { pageMeta } from "@/lib/site";

export const metadata = pageMeta({ title: "Terms and Conditions", description: "The terms that govern use of the rnrm Technology website.", path: "/terms" });

export default async function TermsPage() {
  const { contact_email } = await getContent();
  return (
    <LegalPage
      title="Terms and Conditions"
      intro="These terms apply to your use of this website. Project work is governed by a separate written agreement with each client."
      updated="12 November 2026"
      sections={[
        {
          heading: "Use of this website",
          paragraphs: ["You may browse this website and contact us through it for lawful purposes. You agree not to misuse the site, attempt to gain unauthorised access to it, or interfere with its operation."],
        },
        {
          heading: "Intellectual property",
          paragraphs: [
            "The rnrm Technology name, logo, text, design and other content on this website belong to rnrm Technology unless stated otherwise, and may not be reproduced without our written permission.",
          ],
        },
        {
          heading: "Services and proposals",
          paragraphs: [
            "Information on this website describes our services in general terms and is not a binding offer. The scope, price, timeline and ownership terms of any engagement are set out in a proposal or contract agreed with the client.",
          ],
        },
        {
          heading: "Third-party links",
          paragraphs: ["This website may link to sites we do not control. We are not responsible for the content or practices of those sites."],
        },
        {
          heading: "Limitation of liability",
          paragraphs: ["This website is provided as is. To the extent permitted by law, rnrm Technology is not liable for any loss arising from use of, or reliance on, the information published here."],
        },
        {
          heading: "Governing law",
          paragraphs: ["These terms are governed by the laws of India."],
        },
        {
          heading: "Contact",
          paragraphs: [`Questions about these terms can be sent to ${contact_email}.`],
        },
      ]}
    />
  );
}
