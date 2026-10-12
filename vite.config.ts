import { existsSync } from 'node:fs';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { siteConfig } from './src/data/siteConfig.ts';

function normalizeBase(base: string | undefined): string {
  if (!base || base === '/') return '/';
  return `/${base.replace(/^\/+|\/+$/g, '')}/`;
}

/**
 * Generates robots.txt and sitemap.xml at build time and injects absolute
 * canonical / Open Graph URLs when VITE_SITE_URL is configured.
 */
function seoFiles(siteUrl: string): Plugin {
  const url = siteUrl.replace(/\/+$/, '');
  return {
    name: 'portfolio-seo-files',
    transformIndexHtml(html) {
      if (!url) return html;
      const tags = [
        `<link rel="canonical" href="${url}/" />`,
        `<meta property="og:url" content="${url}/" />`,
        `<meta property="og:image" content="${url}/og-image.png" />`,
        `<meta name="twitter:image" content="${url}/og-image.png" />`,
      ].join('\n    ');
      return html.replace('<!-- seo:absolute -->', tags);
    },
    generateBundle() {
      const robots = ['User-agent: *', 'Allow: /'];
      if (url) robots.push('', `Sitemap: ${url}/sitemap.xml`);
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `${robots.join('\n')}\n` });

      if (!url) {
        this.warn('VITE_SITE_URL is not set — sitemap.xml was skipped (it requires absolute URLs).');
        return;
      }
      const lastmod = new Date().toISOString().slice(0, 10);
      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${url}/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemap });
    },
  };
}

/** Warns when the configured CV file is missing, so no broken link ships unnoticed. */
function checkCvFile(): Plugin {
  return {
    name: 'portfolio-check-cv',
    buildStart() {
      if (!siteConfig.cvPath) return;
      const file = fileURLToPath(new URL(`./public/${siteConfig.cvPath}`, import.meta.url));
      if (!existsSync(file)) {
        this.warn(
          `CV file not found at public/${siteConfig.cvPath}. Add the PDF or set cvPath to null in src/data/siteConfig.ts.`,
        );
      }
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    base: normalizeBase(env.VITE_BASE_PATH),
    plugins: [react(), seoFiles(env.VITE_SITE_URL ?? ''), checkCvFile()],
    resolve: {
      alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
    },
    build: {
      target: 'es2020',
      rollupOptions: {
        input: {
          main: fileURLToPath(new URL('./index.html', import.meta.url)),
          notFound: fileURLToPath(new URL('./404.html', import.meta.url)),
        },
      },
    },
  };
});
