import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { existsSync, readFileSync } from 'node:fs';
import App from '../src/App';
import { LocaleProvider } from '../src/i18n/LocaleContext';
import { metadata } from '../src/i18n/locale';
import { assetUrl, siteUrl, socialImageUrl } from '../src/lib/urls';
import viteConfig from '../vite.config';

const base = '/god-sikt-landing-page/';

describe('GitHub Pages project subdirectory', () => {
  // Vitest serves modules from /; emulate the base that Vite injects in production.
  beforeAll(() => vi.stubEnv('BASE_URL', viteConfig.base));
  afterAll(() => vi.unstubAllEnvs());

  it('prefixes public paths, including the original sign records, with the repository path', () => {
    expect(assetUrl('assets/logo.png')).toBe(`${base}assets/logo.png`);
    expect(assetUrl('/assets/signs.json')).toBe(`${base}assets/signs.json`);
    const signs = JSON.parse(readFileSync('public/assets/signs.json', 'utf8'));
    for (const sign of signs) {
      const url = assetUrl(sign.image);
      expect(url.startsWith(`${base}assets/signs/`)).toBe(true);
      expect(existsSync(`public/${url.slice(base.length)}`)).toBe(true);
    }
  });

  for (const locale of ['nb', 'en'] as const) {
    it(`keeps ${locale} images and section navigation inside the project path`, () => {
      const html = renderToStaticMarkup(createElement(LocaleProvider, { initialLocale: locale }, createElement(App)));
      const sources = [...html.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/g)].map(match => match[1]);
      expect(sources.length).toBeGreaterThan(10);
      for (const source of sources) {
        expect(source.startsWith(base)).toBe(true);
        expect(existsSync(`public/${source.slice(base.length)}`)).toBe(true);
      }
      const anchors = [...html.matchAll(/href="#([^"]+)"/g)].map(match => match[1]);
      expect(anchors).toContain('experience');
      expect(anchors).toContain('engineering');
      expect(anchors).toContain('process');
      for (const id of anchors) {
        expect(html).toContain(`id="${id}"`);
        expect(new URL(`#${id}`, siteUrl).pathname).toBe(base);
      }
    });
  }

  it('uses the Pages URL for canonical and social metadata in both languages', () => {
    const html = readFileSync('index.html', 'utf8');
    expect(html).toContain(`<link rel="canonical" href="${siteUrl}"`);
    expect(html).toContain(`property="og:url" content="${siteUrl}"`);
    expect(html).toContain(`content="${socialImageUrl(metadata.nb.image)}"`);
    for (const locale of ['nb', 'en'] as const) {
      expect(socialImageUrl(metadata[locale].image)).toBe(`${siteUrl}${metadata[locale].image.slice(1)}`);
    }
    expect(html).not.toContain('chatgpt.site');
  });
});
