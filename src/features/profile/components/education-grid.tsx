import { Card } from "@/shared/ui/card";
import { Section, Container } from "@/shared/ui/section";

type EducationGridProps = {
  education: { degree: string; period: string }[];
  certifications: { name: string; issuer: string; url?: string }[];
};

export function EducationGrid({ education, certifications }: EducationGridProps) {
  return (
    <Section border>
      <Container>
        <div className="max-w-5xl">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <h2 className="mb-4 text-xl font-bold">Education</h2>
              {education.map((edu, index) => (
                <Card key={index}>
                  <h3 className="font-semibold">{edu.degree}</h3>
                  <p className="text-muted-foreground text-xs">{edu.period}</p>
                </Card>
              ))}
            </div>

            <div>
              <h2 className="mb-4 text-xl font-bold">Certifications</h2>
              <div className="space-y-3">
                {certifications.map((cert, index) => (
                  <Card key={index}>
                    {cert.url ? (
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary font-semibold transition-colors"
                      >
                        {cert.name}
                      </a>
                    ) : (
                      <h3 className="font-semibold">{cert.name}</h3>
                    )}
                    <p className="text-muted-foreground text-xs">{cert.issuer}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
