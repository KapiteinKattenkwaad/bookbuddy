import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  compiler: {
    // shorthand “true” works, but the object lets you tweak options
    styledComponents: {
      ssr: true,          // extract CSS during SSR
      displayName: true,  // keeps component names in dev tools
      minify: true        // smaller CSS in production
    }
  }
};

export default nextConfig;


