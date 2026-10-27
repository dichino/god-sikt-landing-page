export type Position = { x: number; y: number; name: string; lat: number; lon: number };
export const places: Position[] = [
  { x: 55, y: 38, name: 'Hovedøya', lat: 59.895, lon: 10.737 },
  { x: 29, y: 30, name: 'Bygdøy', lat: 59.904, lon: 10.680 },
  { x: 47, y: 68, name: 'Nesoddtangen', lat: 59.865, lon: 10.663 },
];
export function positionFromPoint(x: number, y: number): Position {
  const boundedX = Math.max(3, Math.min(97, x));
  const boundedY = Math.max(3, Math.min(97, y));
  return { x: boundedX, y: boundedY, name: 'Valgt posisjon', lat: 59.96 - boundedY * 0.0018, lon: 10.57 + boundedX * 0.0035 };
}
export function sampleWeather(position: Position) {
  const variant = Math.floor(position.x + position.y) % 3;
  return [
    { temperature: 16, wind: 3.8, direction: 'SV · 225°', rain: 0.0, fog: 0, condition: 'Delvis skyet' },
    { temperature: 14, wind: 5.2, direction: 'S · 180°', rain: 0.4, fog: 12, condition: 'Lette regnbyger' },
    { temperature: 18, wind: 2.1, direction: 'V · 258°', rain: 0.0, fog: 0, condition: 'Klarvær' },
  ][variant];
}
export type Sign = { id: number; category: string; name: string; description: string; image: string };
export const signCategories = [
  { id: 'markeringsskilt', label: 'Markeringsskilt', description: 'Merker for ferdsel', symbol: '◈' },
  { id: 'varselskilt', label: 'Varselskilt', description: 'Vær oppmerksom på farer', symbol: '△' },
  { id: 'opplysningsskilt', label: 'Opplysningsskilt', description: 'Nyttig informasjon', symbol: 'i' },
  { id: 'forbudsskilt', label: 'Forbudsskilt', description: 'Begrensninger og forbud', symbol: '⊘' },
  { id: 'underskilt', label: 'Underskilt', description: 'Tilleggsinformasjon', symbol: '▱' },
];
