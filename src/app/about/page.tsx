import { generatePageMetadata } from "@/server/seo/seo";
import { Header } from "@/shared/layout/header";
import { Footer } from "@/shared/layout/footer";
import AboutContent from "@/content/about.mdx";

export const metadata = generatePageMetadata({
  title: "About",
  description: "Learn more about the developer behind this project.",
});

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <AboutContent />
      </main>
      <Footer />
    </div>
  );
}
