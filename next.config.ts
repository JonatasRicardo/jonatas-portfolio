import withBundleAnalyzer from "@next/bundle-analyzer"
import { type NextConfig } from "next"

import { env } from "./env.mjs"

const config: NextConfig = {
  reactStrictMode: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  rewrites: async () => [
    { source: "/healthz", destination: "/api/health" },
    { source: "/api/healthz", destination: "/api/health" },
    { source: "/health", destination: "/api/health" },
    { source: "/ping", destination: "/api/health" },
  ],
  turbopack: {
    resolveAlias: {
      "refractor/lib/all": "refractor/all",
      "refractor/lib/core": "refractor/core",
    },
  },
  webpack: (cfg) => {
    cfg.resolve.alias["refractor/lib/all"] = "refractor/all"
    cfg.resolve.alias["refractor/lib/core"] = "refractor/core"
    return cfg
  },
}

export default env.ANALYZE ? withBundleAnalyzer({ enabled: env.ANALYZE })(config) : config
