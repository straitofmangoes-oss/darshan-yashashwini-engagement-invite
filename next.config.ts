import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,

  basePath: "/darshan-yashashwini-engagement-invite",

  images: {
    unoptimized: true,
  },

  allowedDevOrigins: ["192.168.31.111"],
};

export default nextConfig;