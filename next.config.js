/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for GitHub Pages
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: 'out',
  // Only use basePath for production/GitHub Pages
  ...(process.env.NODE_ENV === 'production' && {
    basePath: '/tradeschool-os',
    assetPrefix: '/tradeschool-os',
  }),
  images: {
    unoptimized: true,
    domains: ['localhost', 'supabase.co', 'youtube.com'],
    formats: ['image/webp', 'image/avif'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
  // PWA optimization
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
}

module.exports = nextConfig

