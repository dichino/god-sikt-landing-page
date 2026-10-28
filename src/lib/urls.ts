export const siteUrl = 'https://dichino.github.io/god-sikt-landing-page/';

/** Public files must retain Vite's repository prefix, including paths from JSON. */
export function assetUrl(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
}

export function socialImageUrl(path: string): string {
  return new URL(path.replace(/^\/+/, ''), siteUrl).href;
}
