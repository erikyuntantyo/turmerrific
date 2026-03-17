import { faEnvelope, faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { PillButton } from "@/shared/ui/pill-button";
import { Card } from "@/shared/ui/card";
import { Section, Container } from "@/shared/ui/section";

type OpportunityCardProps = {
  title: string;
  description: string;
  email: string;
  calLink: string;
};

export function OpportunityCard({ title, description, email, calLink }: OpportunityCardProps) {
  return (
    <Section border>
      <Container>
        <div className="max-w-5xl">
          <Card className="border-4 border-yellow-400/30 bg-yellow-50 p-6 md:p-8 dark:border-yellow-300/20 dark:bg-yellow-900/10">
            <h2 className="mb-2 text-lg font-bold">{title}</h2>
            <p className="text-muted-foreground mb-4 text-sm">{description}</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <PillButton icon={faEnvelope} text={email} href={`mailto:${email}`} />
              <PillButton
                icon={faCalendarDays}
                text={calLink.replace("https://", "")}
                href={calLink}
                external
              />
            </div>
          </Card>
        </div>
      </Container>
    </Section>
  );
}
