import type { NextConfig } from "next";
import createMDX from "@next/mdx";

// HSTS is required on a custom domain — Vercel/your host only sends it on *.vercel.app.
const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  // CSP: this is an AUTH app — prefer a strict nonce-based policy over 'unsafe-inline'.
  // Emit a per-request nonce in proxy.ts and reference it here (script-src 'self' 'nonce-...').
  // Set connect-src to your BACKEND_URL. Enable only after verifying login/session flows.
  // {
  //   key: "Content-Security-Policy",
  //   value: [
  //     "default-src 'self'",
  //     "img-src 'self' data: https://avatars.githubusercontent.com https://media.licdn.com https://www.gravatar.com",
  //     "script-src 'self'",
  //     "style-src 'self' 'unsafe-inline'",
  //     "font-src 'self' data:",
  //     "connect-src 'self'",
  //     "frame-ancestors 'none'",
  //     "base-uri 'self'",
  //     "form-action 'self'",
  //   ].join("; "),
  // },
];

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
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

const withMDX = createMDX();
export default withMDX(nextConfig);
