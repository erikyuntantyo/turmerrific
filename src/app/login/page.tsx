import { generatePageMetadata } from "@/server/seo/seo";
import LoginPage from "./login-content";

export const metadata = generatePageMetadata({
  title: "Login",
  description: "Sign in to your account.",
});

export default function Page() {
  return <LoginPage />;
}
