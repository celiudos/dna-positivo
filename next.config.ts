import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{ hostname: "blogger.googleusercontent.com" }],
  },
  reactStrictMode: true,
};

export default nextConfig;
