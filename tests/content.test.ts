import { describe, expect, it } from 'vitest';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { places, positionFromPoint, sampleWeather, signCategories } from '../src/data/demo';
import { links } from '../src/data/project';

describe('demo position handling', () => {
  it('keeps selected points within the local chart, including after zooming near an edge', () => {
    for (const [x, y] of [[-100, 200], [0, 0], [100, 100], [55, 38]]) {
      const position = positionFromPoint(x, y);
      expect(position.x).toBeGreaterThanOrEqual(3);
      expect(position.x).toBeLessThanOrEqual(97);
      expect(position.y).toBeGreaterThanOrEqual(3);
      expect(position.y).toBeLessThanOrEqual(97);
      expect(position.lat).toBeGreaterThan(59.7);
      expect(position.lat).toBeLessThan(60);
      expect(position.lon).toBeGreaterThan(10.5);
      expect(position.lon).toBeLessThan(11);
    }
  });
  it('provides repeatable sample weather for every preset and arbitrary selections', () => {
    for (const position of [...places, positionFromPoint(33.2, 61.9)]) {
      const weather = sampleWeather(position);
      expect(weather).toEqual(sampleWeather(position));
      expect(weather.fog).toBeGreaterThanOrEqual(0);
      expect(weather.fog).toBeLessThanOrEqual(100);
      expect(Number.isFinite(weather.temperature)).toBe(true);
    }
  });
});

describe('authentic public assets', () => {
  const signs = JSON.parse(readFileSync('public/assets/signs.json', 'utf8'));
  it('includes the complete original sign library and a readable image for every entry', () => {
    expect(signs).toHaveLength(27);
    expect(new Set(signs.map((sign: { id: number }) => sign.id)).size).toBe(27);
    for (const category of signCategories) expect(signs.some((sign: { category: string }) => sign.category === category.id)).toBe(true);
    for (const sign of signs) {
      expect(sign.name.length).toBeGreaterThan(0);
      expect(sign.description.length).toBeGreaterThan(0);
      expect(sign.image).toMatch(/^\/assets\/signs\/[a-z_]+\.webp$/);
      expect(existsSync(`public${sign.image}`)).toBe(true);
    }
  });
  it('exposes no report or internal source documents as website assets', () => {
    const files = readdirSync('public', { recursive: true }).map(String);
    expect(files.some(path => /\.(pdf|md|kt|db)$/i.test(path))).toBe(false);
    expect(Object.values(links)).toEqual([
      'https://github.com/dichino/GodSikt-app',
      'https://www.figma.com/proto/WTGT0fELq5jkFXX33YFUXI/IN2000-High-Fidelity?node-id=1-404',
    ]);
  });
});
