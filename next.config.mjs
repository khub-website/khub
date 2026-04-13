/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: [
    process.env.REPLIT_DEV_DOMAIN,
    '*.replit.dev',
    '*.spock.replit.dev',
  ].filter(Boolean),
  devIndicators: false,
};

export default nextConfig;
