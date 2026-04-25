import { generatePageMetadata } from "@/server/seo/seo";
import { FormsContent } from "./forms-content";

export const dynamic = "force-static";

export const metadata = generatePageMetadata({
  title: "Forms",
  description: "Login and registration form previews.",
});

export default function FormsPage() {
  return <FormsContent />;
}
