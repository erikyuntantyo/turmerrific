import { Tag } from "@/shared/ui/tag";
import { Card } from "@/shared/ui/card";
import { Section, Container } from "@/shared/ui/section";

type Experience = {
  title: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
  technologies: string[];
};

type SkillCategory = {
  category: string;
  items: string[];
};

type ExperienceListProps = {
  experiences: Experience[];
  skills?: SkillCategory[];
};

function buildTechColorMap(skills: SkillCategory[]): Map<string, number> {
  const map = new Map<string, number>();
  skills.forEach((skill, index) => {
    skill.items.forEach((item) => map.set(item.toLowerCase(), index));
  });
  return map;
}

export function ExperienceList({ experiences, skills }: ExperienceListProps) {
  const techColorMap = skills ? buildTechColorMap(skills) : null;
  return (
    <Section border>
      <Container>
        <div className="max-w-5xl">
          <h2 className="mb-6 text-xl font-bold">Experience</h2>

          <div className="space-y-4">
            {experiences.map((exp, index) => (
              <Card key={index} className="p-5 md:p-6">
                <div className="mb-3 flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
                  <div>
                    <h3 className="font-semibold">{exp.title}</h3>
                    <p className="text-primary text-sm font-medium">
                      {exp.company}{" "}
                      <span className="text-muted-foreground font-normal">— {exp.location}</span>
                    </p>
                  </div>
                  <span className="text-muted-foreground shrink-0 text-xs md:text-right">
                    {exp.period}
                  </span>
                </div>

                <ul className="text-muted-foreground mb-3 space-y-1 text-sm">
                  {exp.bullets.map((bullet, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="bg-primary mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5">
                  {exp.technologies.map((tech) => {
                    const colorIndex = techColorMap?.get(tech.toLowerCase());
                    return (
                      <Tag
                        key={tech}
                        text={tech}
                        variant={colorIndex !== undefined ? "color" : "muted"}
                        colorIndex={colorIndex}
                      />
                    );
                  })}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
