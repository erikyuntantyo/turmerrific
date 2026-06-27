import { faEnvelope, faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@/shared/ui/button";
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
              <a href={`mailto:${email}`}>
                <Button className="gap-2">
                  <FontAwesomeIcon icon={faEnvelope} className="h-4 w-4" />
                  {email}
                </Button>
              </a>
              <a href={calLink} target="_blank" rel="noopener noreferrer">
                <Button className="gap-2">
                  <FontAwesomeIcon icon={faCalendarDays} className="h-4 w-4" />
                  {calLink.replace("https://", "")}
                </Button>
              </a>
            </div>
          </Card>
        </div>
      </Container>
    </Section>
  );
}
