import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { siteConfig } from "@/shared/config/site.config";

export function Footer() {
  return (
    <footer className="border-t pb-24 md:pb-0">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="text-muted-foreground text-center text-sm">
            &copy; 2025 {siteConfig.author.name}
          </p>

          <div className="flex items-center justify-center gap-4">
            <a
              href={`https://github.com/${siteConfig.author.github}`}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <FontAwesomeIcon icon={faGithub} className="h-6! w-6!" />
            </a>
            <a
              href={`mailto:${siteConfig.author.email}`}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Email"
            >
              <FontAwesomeIcon icon={faEnvelope} className="h-6! w-6!" />
            </a>
            <a
              href={`https://linkedin.com/in/${siteConfig.author.linkedin}`}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <FontAwesomeIcon icon={faLinkedin} className="h-6! w-6!" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
