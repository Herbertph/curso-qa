import { expect, test } from '@playwright/test';
import { openQuiz } from './helpers.js';

test('TC-57 (AC-39): every interactive element is reachable by Tab with a visible focus indicator', async ({ page }) => {
  await page.goto('/');

  const trail = [];
  for (let index = 0; index < 12; index += 1) {
    await page.keyboard.press('Tab');
    trail.push(
      await page.evaluate(() => {
        const element = document.activeElement;
        const style = getComputedStyle(element);
        return {
          tag: element.tagName,
          className: String(element.className),
          outlineStyle: style.outlineStyle,
          outlineWidth: Number.parseFloat(style.outlineWidth),
        };
      }),
    );
  }

  for (const stop of trail) {
    expect(stop.outlineStyle, `focus ring on ${stop.tag}.${stop.className}`).not.toBe('none');
    expect(stop.outlineWidth).toBeGreaterThanOrEqual(2);
  }

  expect(trail[0].className).toContain('logo');
  expect(trail[1].className).toContain('header-cta');
  expect(trail[2].className).toContain('btn');
  expect(trail[3].className).toContain('btn');
  expect(trail[4].className).toContain('acc-trigger');
});

test('TC-58 (AC-39): the quiz opens and options are selected with Space and Enter', async ({ page }) => {
  await page.goto('/');

  await page.locator('.header-cta').focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('dialog', { name: 'Diagnóstico rápido, 7 perguntas' })).toBeVisible();
  await expect(page.locator('.modal-close')).toBeFocused();

  await page.keyboard.press('Tab');
  const first = page.locator('.quiz-option').nth(0);
  await expect(first).toBeFocused();

  await page.keyboard.press('Space');
  await expect(first).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('.quiz-next')).toBeEnabled();

  await page.keyboard.press('Tab');
  const second = page.locator('.quiz-option').nth(1);
  await expect(second).toBeFocused();
  await page.keyboard.press('Enter');

  await expect(second).toHaveAttribute('aria-pressed', 'true');
  await expect(first).toHaveAttribute('aria-pressed', 'false');
});

test('TC-59 (AC-39): the close button and the primary quiz button are keyboard reachable', async ({ page }) => {
  await page.goto('/');
  await openQuiz(page);

  await page.keyboard.press('Tab');
  await expect(page.locator('.quiz-option').nth(0)).toBeFocused();
  await page.keyboard.press('Space');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await expect(page.locator('.quiz-next')).toBeFocused();

  await page.keyboard.press('Shift+Tab');
  await page.keyboard.press('Shift+Tab');
  await page.keyboard.press('Shift+Tab');
  await expect(page.locator('.quiz-option').nth(0)).toBeFocused();

  await page.keyboard.press('Shift+Tab');
  await expect(page.locator('.modal-close')).toBeFocused();
});
