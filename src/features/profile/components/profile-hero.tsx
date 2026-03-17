import { faFileArrowDown } from "@fortawesome/free-solid-svg-icons";
import { PillButton } from "@/shared/ui/pill-button";
import { Section, Container } from "@/shared/ui/section";
import { Avatar, AvatarImage } from "@/shared/ui/avatar";

type ProfileHeroProps = {
  name: string;
  title: string;
  location: string;
  email: string;
  links: { label: string; href: string }[];
  bio: string;
  cvHref: string;
};

export function ProfileHero({
  name,
  title,
  location,
  email,
  links,
  bio,
  cvHref,
}: ProfileHeroProps) {
  return (
    <Section className="py-8 md:py-24">
      <Container>
        <div className="max-w-5xl">
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:gap-8">
            <div className="animate-fade-in-up shrink-0">
              <Avatar className="h-28 w-28 sm:h-32 sm:w-32">
                <AvatarImage email={email} alt={name} />
              </Avatar>
            </div>

            <div>
              <div className="bg-primary animate-expand-width mb-4 h-0.5 w-12" />

              <h1 className="animate-fade-in-up mb-3 text-4xl font-bold tracking-tight md:text-6xl">
                {name}
              </h1>

              <p className="text-primary animate-fade-in-up mb-3 text-lg font-medium delay-100">
                {title}
              </p>

              <div className="text-muted-foreground animate-fade-in-up mb-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm delay-200">
                <span>{location}</span>
                {links.map((link) => (
                  <span key={link.label}>
                    <span className="hidden sm:inline">|</span>{" "}
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {link.label}
                    </a>
                  </span>
                ))}
              </div>

              <p className="text-muted-foreground animate-fade-in-up mb-4 max-w-3xl leading-relaxed delay-300">
                {bio}
              </p>

              <div className="animate-fade-in-up delay-400">
                <PillButton icon={faFileArrowDown} text="Download CV" href={cvHref} download />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
