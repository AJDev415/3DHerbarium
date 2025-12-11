/** @type {import('next').NextConfig} */
const nextConfig = {reactStrictMode: false}

module.exports = {
    reactStrictMode: false,
    typescript: {
        ignoreBuildErrors: true,
      },
      images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'media.sketchfab.com',
            port: '',
            pathname: '/**',
          },
        ],
      },
      turbopack: {
        root: process.env.TURBOPACK_ROOT,
      }
    }
