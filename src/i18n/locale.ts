export type Locale = 'nb' | 'en';
export const localeStorageKey = 'godsikt-language';

/** Norwegian is the default regardless of browser or operating-system language. */
export function resolveLocale(saved: string | null): Locale {
  return saved === 'en' ? 'en' : 'nb';
}

export const metadata = {
  nb: {
    title: 'God Sikt — Et Android-prosjekt fra Universitetet i Oslo',
    description: 'Utforsk God Sikt: en Android-app som samler interaktive kart, lokale værvarsler og maritime skilt. Prøv demoen og bli kjent med teknologien bak.',
    socialTitle: 'God Sikt — Bedre oversikt på sjøen',
    socialDescription: 'Et Android-prosjekt med kart, vær og maritim kunnskap. Utforsk appen, designet og utviklingsarbeidet bak God Sikt.',
    image: '/social-preview.png',
    imageAlt: 'God Sikt — bedre oversikt på sjøen. Et Android-prosjekt fra Universitetet i Oslo.',
    openGraphLocale: 'nb_NO',
  },
  en: {
    title: 'God Sikt — Android Software Engineering Project',
    description: 'Explore God Sikt, an Android application combining interactive maps, location-based weather insights, and maritime information.',
    socialTitle: 'God Sikt — A clearer view, out on the water',
    socialDescription: 'An Android project bringing maps, weather, and maritime knowledge together. Explore the app, the design, and the engineering behind God Sikt.',
    image: '/social-preview-en.png',
    imageAlt: 'God Sikt — an Android engineering project for a clearer view out on the water.',
    openGraphLocale: 'en_GB',
  },
} satisfies Record<Locale, { title: string; description: string; socialTitle: string; socialDescription: string; image: string; imageAlt: string; openGraphLocale: string }>;
