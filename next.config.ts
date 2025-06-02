import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns: [
      {
        protocol: "http",
        hostname: "178.128.101.64",
      }
    ]
  }
};

export default nextConfig;
