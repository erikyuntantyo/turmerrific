import Link from "next/link";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { Tag } from "@/shared/ui/tag";
import { Section, Container } from "@/shared/ui/section";
import { Header } from "@/shared/layout/header";
import { Footer } from "@/shared/layout/footer";
import { generatePageMetadata } from "@/server/seo/seo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export const metadata = generatePageMetadata({
  title: "Home",
  description: "A modern Next.js starter kit with UI components, dark mode, and MDX support.",
});

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <Section className="py-8 md:py-24">
          <Container>
            <div className="max-w-2xl">
              <span className="border-primary bg-primary/10 text-primary animate-fade-in-up mb-4 inline-block rounded-full border px-4 py-1.5 text-sm font-medium">
                Starter Kit
              </span>

              <h1 className="animate-fade-in-up mb-4 text-4xl font-bold tracking-tight delay-100 md:text-6xl">
                Build Something Great
              </h1>

              <p className="text-muted-foreground animate-fade-in-up mb-6 text-lg delay-200">
                A clean Next.js starter with UI components, dark mode, MDX content, and everything
                you need to ship fast.
              </p>

              <div className="animate-fade-in-up flex gap-3 delay-300">
                <Link href="/about">
                  <Button
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary group gap-2 hover:text-white"
                  >
                    View About Page
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className="h-4 w-4 group-hover:text-white"
                    />
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </Section>

        {/* What's Included */}
        <Section>
          <Container>
            <div className="max-w-5xl">
              <h2 className="animate-fade-in-up mb-2 text-2xl font-bold">What&apos;s Included</h2>
              <p className="text-muted-foreground animate-fade-in-up mb-8 text-sm delay-100">
                Everything you need to start building — nothing you don&apos;t
              </p>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="hover-lift animate-fade-in-up p-5 delay-200 md:p-6">
                  <h3 className="mb-2 font-semibold">UI Components</h3>
                  <p className="text-muted-foreground text-sm">
                    Button, Card, Input, Badge, Table, Toast, Modal, Tag, and more — all built with
                    Tailwind CSS and ready to use.
                  </p>
                </Card>

                <Card className="hover-lift animate-fade-in-up p-5 delay-300 md:p-6">
                  <h3 className="mb-2 font-semibold">Dark Mode</h3>
                  <p className="text-muted-foreground text-sm">
                    Light and dark themes out of the box. oklch color palette with zero-chroma
                    neutrals and a customizable accent color.
                  </p>
                </Card>

                <Card className="hover-lift animate-fade-in-up p-5 delay-400 md:p-6">
                  <h3 className="mb-2 font-semibold">MDX Content</h3>
                  <p className="text-muted-foreground text-sm">
                    Write pages in MDX with custom components. The About page is a working example
                    you can edit and extend.
                  </p>
                </Card>

                <Card className="hover-lift animate-fade-in-up p-5 delay-500 md:p-6">
                  <h3 className="mb-2 font-semibold">SEO Ready</h3>
                  <p className="text-muted-foreground text-sm">
                    Centralized metadata generation, robots.txt, and sitemap. Every page gets proper
                    meta tags automatically.
                  </p>
                </Card>

                <Card className="hover-lift animate-fade-in-up p-5 delay-500 md:p-6">
                  <h3 className="mb-2 font-semibold">Responsive Layout</h3>
                  <p className="text-muted-foreground text-sm">
                    Header with mobile bottom navigation, footer, and section components. Works on
                    all screen sizes.
                  </p>
                </Card>

                <Card className="hover-lift animate-fade-in-up p-5 delay-500 md:p-6">
                  <h3 className="mb-2 font-semibold">Developer Experience</h3>
                  <p className="text-muted-foreground text-sm">
                    TypeScript strict mode, ESLint, Prettier, and Turbopack. Clean code from the
                    start.
                  </p>
                </Card>
              </div>
            </div>
          </Container>
        </Section>

        {/* Tech Stack */}
        <Section>
          <Container>
            <div className="max-w-5xl">
              <h2 className="animate-fade-in-up mb-2 text-2xl font-bold">Tech Stack</h2>
              <p className="text-muted-foreground animate-fade-in-up mb-8 text-sm delay-100">
                Modern tools, minimal dependencies
              </p>

              <div className="animate-fade-in-up flex flex-wrap gap-2 delay-200">
                {[
                  "Next.js 16",
                  "React 19",
                  "TypeScript",
                  "Tailwind CSS v4",
                  "MDX",
                  "Font Awesome 7",
                  "Geist Font",
                ].map((tech) => (
                  <Tag key={tech} text={tech} variant="primary" />
                ))}
              </div>
            </div>
          </Container>
        </Section>
      </main>

      <Footer />
    </div>
  );
}
