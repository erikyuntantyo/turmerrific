import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { cn } from "@/shared/utils/utils";

type PillButtonProps = {
  icon: IconDefinition;
  text: string;
  href?: string;
  download?: boolean;
  external?: boolean;
  className?: string;
};

export function PillButton({ icon, text, href, download, external, className }: PillButtonProps) {
  const content = (
    <>
      <span className="px-3">
        <FontAwesomeIcon icon={icon} className="h-4 w-4" />
      </span>
      <span className="flex items-center self-stretch">
        <span className="bg-primary-foreground/30 h-5 w-px" />
      </span>
      <span className="px-4">{text}</span>
    </>
  );

  const baseClass = cn(
    "inline-flex items-center h-9 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium",
    className,
  );

  if (href) {
    return (
      <a
        href={href}
        download={download}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={baseClass}
      >
        {content}
      </a>
    );
  }

  return <span className={baseClass}>{content}</span>;
}
