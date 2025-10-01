import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    experimental: {
    serverActions: {
      allowedOrigins: [
         "localhost:3000",
        "*.inc1.devtunnels.ms"
      ],
      // allowedForwardedHosts: ["localhost:3000"],
      // ^ You might have to use this property depending on your exact version.
    }
  }
};

export default nextConfig;
