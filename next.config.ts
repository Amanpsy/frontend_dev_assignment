import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // optional, but recommended
  images: {
    domains: [
      "images.unsplash.com", 
      "randomuser.me"
    ],
  },
};

export default nextConfig;
