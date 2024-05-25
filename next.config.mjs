/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["three"],
  experimental: {
    appDir: true,
  },
};

export default nextConfig;
