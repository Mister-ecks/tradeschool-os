/** @type {import('next').NextConfig} */
const nextConfig = {
  // Conditionally set output for GitHub Pages
  ...(process.env.GITHUB_PAGES && {
    output: 'export',
    trailingSlash: true,
    images: { unoptimized: true }
  }),
  images: {
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

