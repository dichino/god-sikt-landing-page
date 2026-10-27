import { describe, expect, it } from 'vitest';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { readFileSync, existsSync } from 'node:fs';
import App from '../src/App';
import { LocaleProvider } from '../src/i18n/LocaleContext';
import { resolveLocale, metadata } from '../src/i18n/locale';
import { commonCopy } from '../src/i18n/common';
import { heroCopy } from '../src/i18n/hero';
import { demoCopy } from '../src/i18n/demo';
import { featuresCopy } from '../src/i18n/features';
import { engineeringCopy } from '../src/i18n/engineering';
import { processCopy } from '../src/i18n/process';
import { teamCopy } from '../src/i18n/team';
import { navigationByLocale, technologiesByLocale, architectureByLocale, demoModesByLocale } from '../src/data/project';

function leaves(value: unknown, prefix = ''): Record<string, string> {
  if (typeof value === 'string') return { [prefix]: value };
  return Object.fromEntries(Object.entries(value as object).flatMap(([key, child]) => Object.entries(leaves(child, `${prefix}.${key}`))));
}

describe('complete language support', () => {
  const dictionaries = { commonCopy, heroCopy, demoCopy, featuresCopy, engineeringCopy, processCopy, teamCopy, metadata, navigationByLocale, technologiesByLocale, architectureByLocale, demoModesByLocale };
  for (const [name, dictionary] of Object.entries(dictionaries)) {
    it(`${name} has matching Norwegian and English content`, () => {
      const norwegian = leaves(dictionary.nb);
      const english = leaves(dictionary.en);
      expect(Object.keys(norwegian).sort()).toEqual(Object.keys(english).sort());
      expect(Object.values(norwegian).every(value => value.trim().length > 0)).toBe(true);
      expect(Object.values(english).every(value => value.trim().length > 0)).toBe(true);
    });
  }

  it('defaults to Bokmål and honors only a supported saved preference', () => {
    expect(resolveLocale(null)).toBe('nb');
    expect(resolveLocale('')).toBe('nb');
    expect(resolveLocale('fr')).toBe('nb');
    expect(resolveLocale('nb')).toBe('nb');
    expect(resolveLocale('en')).toBe('en');
  });

  it('renders Norwegian by default using the complete shared page', () => {
    const html = renderToStaticMarkup(createElement(LocaleProvider, null, createElement(App)));
    expect(html).toContain('Bedre oversikt.');
    expect(html).toContain('Nettside laget av Dichino Nguyen');
    expect(html).toContain('API-INTEGRASJON');
    expect(html).toContain('Velg språk');
    expect(html).not.toContain('A clearer view.');
    expect(html).not.toContain('Website created by Dichino Nguyen');
  });

  it('renders English while preserving the Norwegian app interface', () => {
    const html = renderToStaticMarkup(createElement(LocaleProvider, { initialLocale: 'en' }, createElement(App)));
    expect(html).toContain('A clearer view.');
    expect(html).toContain('Website created by Dichino Nguyen');
    expect(html).toContain('API INTEGRATION');
    expect(html).toContain('class="phone demo-phone" lang="nb"');
    expect(html).toContain('Vis vær');
    expect(html).toContain('Appnavigasjon');
    expect(html).not.toContain('Show weather');
  });

  it('ships Norwegian metadata before JavaScript and a social image for each language', () => {
    const html = readFileSync('index.html', 'utf8');
    expect(html).toContain('<html lang="nb">');
    expect(html).toContain(`<title>${metadata.nb.title}</title>`);
    expect(html).toContain(`content="${metadata.nb.description}"`);
    expect(html).toContain('content="nb_NO"');
    for (const locale of ['nb', 'en'] as const) expect(existsSync(`public${metadata[locale].image}`)).toBe(true);
  });
});
