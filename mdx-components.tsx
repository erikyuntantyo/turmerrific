import type { MDXComponents } from "mdx/types";
import { ProfileHero } from "@/features/profile/components/profile-hero";
import { SkillsGrid } from "@/features/profile/components/skills-grid";
import { ExperienceList } from "@/features/profile/components/experience-list";
import { EducationGrid } from "@/features/profile/components/education-grid";
import { OpportunityCard } from "@/features/profile/components/opportunity-card";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ProfileHero,
    SkillsGrid,
    ExperienceList,
    EducationGrid,
    OpportunityCard,
    ...components,
  };
}
