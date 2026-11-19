import { expect, test } from '@playwright/test';

test('TC-10 (AC-6): the shield sits complete inside the header logo box on mobile', async ({ page }) => {
  await page.goto('/');

  const box = await page.locator('.logo-box').boundingBox();
  const shield = await page.locator('.logo-shield').boundingBox();

  expect(shield.width).toBeCloseTo(32, 0);
  expect(shield.height).toBeCloseTo(32, 0);
  expect(shield.x).toBeGreaterThanOrEqual(box.x);
  expect(shield.y).toBeGreaterThanOrEqual(box.y);
  expect(shield.x + shield.width).toBeLessThanOrEqual(box.x + box.width);
  expect(shield.y + shield.height).toBeLessThanOrEqual(box.y + box.height);
});

test('TC-16 (AC-9): the sticky bar opens the quiz on question 1 and the header button is hidden', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('.header-cta')).toBeHidden();
  const bar = page.locator('.mobile-bar');
  await expect(bar).toBeVisible();

  await bar.getByRole('button', { name: 'Fazer o diagnóstico' }).click();
  await expect(page.getByRole('dialog', { name: 'Diagnóstico rápido, 7 perguntas' })).toBeVisible();
  await expect(page.locator('.quiz-count')).toHaveText('Pergunta 1 de 7');
  await expect(page.locator('.quiz-option[aria-pressed="true"]')).toHaveCount(0);
});

test('TC-25 (AC-14): on mobile the frame fills the viewport with no border radius', async ({ page }) => {
  await page.goto('/');
  await page.locator('.mobile-bar button').click();

  const frame = page.locator('.phone-frame');
  const box = await frame.boundingBox();
  expect(box.width).toBeCloseTo(390, 0);
  expect(box.height).toBeCloseTo(844, 0);

  const radius = await frame.evaluate((el) => getComputedStyle(el).borderRadius);
  expect(radius).toBe('0px');

  await expect(page.locator('.notch')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Fechar o diagnóstico' })).toBeVisible();
});
