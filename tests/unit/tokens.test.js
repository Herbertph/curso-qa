import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const css = readFileSync(new URL('../../src/styles.css', import.meta.url), 'utf8');

const rootMatch = css.match(/:root\s*\{([\s\S]*?)\n\}/);
const rootBlock = rootMatch ? rootMatch[1] : '';
const componentCss = css
  .replace(/:root\s*\{[\s\S]*?\n\}/, '')
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .replace(/@media[^{]+\{/g, '{');

const tokenValue = (name) => {
  const match = rootBlock.match(new RegExp(`${name}\\s*:\\s*([^;]+);`));
  return match ? match[1].trim() : undefined;
};

const declarations = [...componentCss.matchAll(/([a-z-]+)\s*:\s*([^;{}]+);/g)].map(([, property, value]) => ({
  property: property.trim(),
  value: value.trim(),
}));

const spacingProperties = new Set([
  'padding',
  'padding-top',
  'padding-right',
  'padding-bottom',
  'padding-left',
  'padding-block',
  'padding-inline',
  'margin',
  'margin-top',
  'margin-right',
  'margin-bottom',
  'margin-left',
  'margin-block',
  'margin-inline',
  'gap',
  'row-gap',
  'column-gap',
  'width',
  'height',
  'min-width',
  'min-height',
  'max-width',
  'max-height',
  'border-radius',
  'top',
  'right',
  'bottom',
  'left',
  'inset',
  'font-size',
]);

describe('design tokens', () => {
  it('defines the 8px spacing scale', () => {
    expect(tokenValue('--space-1')).toBe('4px');
    expect(tokenValue('--space-2')).toBe('8px');
    expect(tokenValue('--space-3')).toBe('12px');
    expect(tokenValue('--space-4')).toBe('16px');
    expect(tokenValue('--space-5')).toBe('24px');
    expect(tokenValue('--space-6')).toBe('32px');
    expect(tokenValue('--space-7')).toBe('40px');
    expect(tokenValue('--space-8')).toBe('48px');
    expect(tokenValue('--space-9')).toBe('56px');
    expect(tokenValue('--space-10')).toBe('64px');
    expect(tokenValue('--space-11')).toBe('80px');
    expect(tokenValue('--space-12')).toBe('96px');
  });

  it('defines the type scale', () => {
    expect(['--font-xs', '--font-sm', '--font-base', '--font-md', '--font-lg', '--font-xl', '--font-2xl', '--font-3xl', '--font-4xl', '--font-5xl'].map(tokenValue)).toEqual([
      '12px',
      '14px',
      '16px',
      '18px',
      '20px',
      '24px',
      '30px',
      '36px',
      '48px',
      '60px',
    ]);
  });

  it('defines the radius and shadow scales', () => {
    expect(tokenValue('--radius-sm')).toBe('8px');
    expect(tokenValue('--radius-md')).toBe('16px');
    expect(tokenValue('--radius-lg')).toBe('24px');
    expect(tokenValue('--radius-xl')).toBe('32px');
    expect(tokenValue('--radius-phone')).toBe('40px');
    expect(tokenValue('--radius-full')).toBe('999px');
    expect(tokenValue('--shadow-sm')).toBeDefined();
    expect(tokenValue('--shadow-md')).toBeDefined();
    expect(tokenValue('--shadow-lg')).toBeDefined();
  });

  it('keeps the §5 identity variable --radius exactly as the source', () => {
    expect(tokenValue('--radius')).toBe('14px');
  });

  it('never uses a raw px value for spacing, size, radius or font size outside the token block', () => {
    const offenders = declarations.filter(
      (declaration) => spacingProperties.has(declaration.property) && /\d+(\.\d+)?px/.test(declaration.value),
    );
    expect(offenders).toEqual([]);
  });

  it('uses only font size tokens', () => {
    const offenders = declarations.filter(
      (declaration) =>
        declaration.property === 'font-size' &&
        declaration.value !== 'inherit' &&
        !declaration.value.startsWith('var(--font-'),
    );
    expect(offenders).toEqual([]);
  });

  it('never uses a raw hex or rgb color in component rules', () => {
    expect(componentCss).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    expect(componentCss).not.toMatch(/\brgba?\(/);
  });
});
