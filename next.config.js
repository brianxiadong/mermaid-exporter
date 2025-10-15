/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['mermaid'],
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false,
      };
    }
    return config;
  },
  // 启用静态导出优化
  output: 'standalone',
  // 图片优化配置
  images: {
    domains: [],
    unoptimized: true
  },
  // 环境变量配置
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  // 重定向配置
  async redirects() {
    return [];
  },
  // 重写配置
  async rewrites() {
    return [];
  },
};

module.exports = nextConfig;