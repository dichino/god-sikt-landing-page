import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { localeStorageKey, metadata, resolveLocale } from './locale';
import type { Locale } from './locale';
import { socialImageUrl } from '../lib/urls';

type LocaleContextValue = { locale: Locale; setLocale: (locale: Locale) => void };
const LocaleContext = createContext<LocaleContextValue | null>(null);

function readLocale(): Locale {
  try { return resolveLocale(typeof window === 'undefined' ? null : window.localStorage.getItem(localeStorageKey)); }
  catch { return 'nb'; }
}

export function LocaleProvider({ children, initialLocale }: { children: ReactNode; initialLocale?: Locale }) {
  const [locale, updateLocale] = useState<Locale>(() => initialLocale ?? readLocale());
  const setLocale = (next: Locale) => {
    updateLocale(next);
    try { window.localStorage.setItem(localeStorageKey, next); } catch { /* Switching still works for this visit if browser storage is unavailable. */ }
  };

  useEffect(() => {
    const copy = metadata[locale];
    document.documentElement.lang = locale;
    document.title = copy.title;
    const values: Record<string, string> = {
      'meta[name="description"]': copy.description,
      'meta[property="og:title"]': copy.socialTitle,
      'meta[property="og:description"]': copy.socialDescription,
      'meta[property="og:locale"]': copy.openGraphLocale,
      'meta[property="og:image"]': socialImageUrl(copy.image),
      'meta[property="og:image:alt"]': copy.imageAlt,
      'meta[name="twitter:title"]': copy.socialTitle,
      'meta[name="twitter:description"]': copy.socialDescription,
      'meta[name="twitter:image"]': socialImageUrl(copy.image),
    };
    Object.entries(values).forEach(([selector, value]) => document.querySelector(selector)?.setAttribute('content', value));
  }, [locale]);

  return <LocaleContext.Provider value={{ locale, setLocale }}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const value = useContext(LocaleContext);
  if (!value) throw new Error('useLocale must be used inside LocaleProvider');
  return value;
}
