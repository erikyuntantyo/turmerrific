import { generatePageMetadata } from "@/server/seo/seo";
import { UsersContent } from "./users-content";

export const dynamic = "force-static";

export const metadata = generatePageMetadata({
  title: "Users",
  description: "Manage users and their roles.",
});

export default function UsersPage() {
  return <UsersContent />;
}
