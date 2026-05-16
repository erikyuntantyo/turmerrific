import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  output: "standalone",
  reactCompiler: true,
  pageExtensions: ["ts", "tsx", "mdx"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "media.licdn.com" },
      { protocol: "https", hostname: "www.gravatar.com" },
    ],
  },
};

const withMDX = createMDX();
export default withMDX(nextConfig);
