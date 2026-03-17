import { Tag } from "@/shared/ui/tag";
import { Card } from "@/shared/ui/card";
import { Section, Container } from "@/shared/ui/section";

type SkillsGridProps = {
  skills: { category: string; items: string[] }[];
};

export function SkillsGrid({ skills }: SkillsGridProps) {
  return (
    <Section border>
      <Container>
        <div className="max-w-5xl">
          <h2 className="mb-6 text-xl font-bold">Skills &amp; Expertise</h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((skill, categoryIndex) => (
              <Card key={skill.category}>
                <h3 className="text-muted-foreground mb-2 text-xs font-semibold tracking-wider uppercase">
                  {skill.category}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {skill.items.map((item) => (
                    <Tag key={item} text={item} variant="color" colorIndex={categoryIndex} />
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
