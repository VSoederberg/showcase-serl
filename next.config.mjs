const nextBasePath = process.env.NEXT_BASE_PATH || ''

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: nextBasePath,
  images: {
    domains: ['github.com'],
    unoptimized: true,
  },

  // Other configurations can be added here
  reactStrictMode: true, // Enable React's Strict Mode for development
  typescript: {
    // Enable TypeScript checking during development
    ignoreBuildErrors: false, // Set to true to ignore TypeScript errors
  },
  eslint: {
    // Enable ESLint checks during development
    ignoreDuringBuilds: false, // Set to true to ignore ESLint errors
  },
}

export default nextConfig
