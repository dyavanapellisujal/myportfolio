import type { NextConfig } from "next";

// Fully static site: `next build` writes plain HTML/CSS/JS to ./out.
// No server, no API routes, no runtime data fetching.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
};

export default nextConfig;
