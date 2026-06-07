/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // use a separate build directory (no leading dot) to avoid Windows permission issues
  distDir: 'next_build',
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push('gsap/ScrollTrigger');
    }
    return config;
  },
};

module.exports = nextConfig;
