import { generatePageMetadata } from "@/server/seo/seo";
import { SettingsContent } from "./settings-content";

export const dynamic = "force-static";

export const metadata = generatePageMetadata({
  title: "Settings",
  description: "Configure application settings.",
});

export default function SettingsPage() {
  return <SettingsContent />;
}
