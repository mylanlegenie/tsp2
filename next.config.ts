import type { NextConfig } from 'next';
import type { Configuration } from 'webpack';

const nextConfig: NextConfig = {
  reactStrictMode: true,

  webpack(config: Configuration) {
    config.module?.rules?.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/, // fichiers .ts, .tsx, .js, .jsx
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

export default nextConfig;
