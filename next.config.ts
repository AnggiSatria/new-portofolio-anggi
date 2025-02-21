import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.module?.rules?.push({
      test: /\.glb$/,
      use: {
        loader: "file-loader",
        options: {
          outputPath: "static/models/",
          publicPath: "/_next/static/models/",
        },
      },
    });
    return config;
  },
};

export default nextConfig;
