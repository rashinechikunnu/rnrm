import { ProjectCard } from "@/components/cards";
import { Reveal } from "@/components/Reveal";
import { CtaBanner } from "@/components/sections";
import { PageHero, Tag } from "@/components/ui";
import { getProjects } from "@/lib/api";
import { pageMeta } from "@/lib/site";

export const metadata = pageMeta({
  title: "Projects",
  description: "Selected projects and case studies from rnrm Technology — web applications, SaaS platforms, mobile apps and business automation.",
  path: "/projects",
});

export default async function ProjectsPage() {
  const projects = await getProjects();
  const categories = [...new Set(projects.map((p) => p.category))];

  return (
    <>
      <PageHero eyebrow="Portfolio" title="Projects that show how we think and build." text="Each case study covers the problem, the approach we took and the technology behind it.">
        {categories.map((category) => (
          <Tag key={category}>{category}</Tag>
        ))}
      </PageHero>

      <section className="py-20 sm:py-28">
        <div className="container-page">
          {projects.length === 0 ? (
            <p className="text-lg text-body">Case studies are on their way. In the meantime, get in touch and we will walk you through our recent work.</p>
          ) : (
            <div className="grid gap-x-10 gap-y-16 md:grid-cols-2">
              {projects.map((project, i) => (
                <Reveal key={project.slug} delay={(i % 2) * 0.08}>
                  <ProjectCard project={project} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <CtaBanner title="Your project could be the next case study." />
    </>
  );
}
