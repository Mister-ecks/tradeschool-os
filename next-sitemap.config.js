/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://tradeschool-os.vercel.app',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/api/*', '/admin/*'],
  additionalPaths: async (config) => [
    await config.transform(config, '/courses'),
    await config.transform(config, '/courses/cdl-fundamentals'),
    await config.transform(config, '/courses/air-brake-certification'),
    await config.transform(config, '/courses/fiber-otdr-training'),
    await config.transform(config, '/courses/fiber-otdr-training/virtual-labs'),
    await config.transform(config, '/learning-platform'),
    await config.transform(config, '/learning-platform/road-signs'),
    await config.transform(config, '/learning-platform/youth-repair'),
    await config.transform(config, '/learning-platform/vr-ar'),
    await config.transform(config, '/learning-platform/tool-scanner'),
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
    ],
    additionalSitemaps: [
      'https://tradeschool-os.vercel.app/sitemap.xml',
    ],
  },
}
