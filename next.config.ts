import type { NextConfig } from "next";
import os from "os";

const localIPs = Object.values(os.networkInterfaces())
  .flat()
  .filter((iface): iface is os.NetworkInterfaceInfo => Boolean(iface && iface.family === "IPv4"))
  .map((iface) => iface.address);

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: Array.from(
    new Set(["localhost", "127.0.0.1", "0.0.0.0", "192.168.1.28", "*.local", ...localIPs])
  ),
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
