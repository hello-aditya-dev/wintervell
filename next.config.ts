import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  allowedDevOrigins: [
    "0.0.0.0",
    "21.0.19.58",
    "localhost",
  ],
};

export default nextConfig;
