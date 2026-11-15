import { PageHero } from "./ui";

export type LegalSection = { heading: string; paragraphs: string[] };

export function LegalPage({ title, intro, updated, sections }: { title: string; intro: string; updated: string; sections: LegalSection[] }) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} text={intro} />
      <section className="py-16 sm:py-24">
        <div className="container-page">
          <div className="max-w-3xl">
            <p className="text-sm text-muted">Last updated: {updated}</p>
            {sections.map((section) => (
              <section key={section.heading} className="mt-12">
                <h2 className="text-2xl">{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)} className="mt-4 text-lg leading-relaxed text-body">
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
