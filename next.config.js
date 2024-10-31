/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      crypto: false,
      path: false,
      os: false,
      stream: false,
      http: false,
      https: false,
      zlib: false,
      child_process: false,
      http2: false,
      util: false,
      url: false,
      events: false
    };
    config.module = {
      ...config.module,
      exprContextCritical: false
    };
    return config;
  }
};

module.exports = nextConfig;