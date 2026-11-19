import { expect, test } from '@playwright/test';
import { answer, closeQuiz, reachResult, openQuiz } from './helpers.js';

const triggers = [
  ['TC-12', 'header', '.header-cta'],
  ['TC-13', 'hero box', '.cta-box .btn'],
  ['TC-14', 'diagnostic box', '.diag-box .btn'],
  ['TC-15', 'final CTA', '.final-cta .btn'],
];

for (const [tc, label, selector] of triggers) {
  test(`${tc} (AC-8): the ${label} button opens the quiz on question 1 with no answer selected`, async ({ page }) => {
    await page.goto('/');
    await page.locator(selector).click();

    await expect(page.getByRole('dialog', { name: 'Diagnóstico rápido, 7 perguntas' })).toBeVisible();
    await expect(page.locator('.quiz-count')).toHaveText('Pergunta 1 de 7');
    await expect(page.locator('.quiz-option[aria-pressed="true"]')).toHaveCount(0);

    await closeQuiz(page);
  });
}

test('TC-17 (AC-9): on desktop the sticky bar is hidden and the header button is visible', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.mobile-bar')).toBeHidden();
  await expect(page.locator('.header-cta')).toBeVisible();
});

test('TC-18 (AC-10): one quiz instance exists, inside the modal, never visible in the page body', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('#quiz')).toHaveCount(1);
  await expect(page.locator('#quiz-modal #quiz')).toHaveCount(1);
  await expect(page.locator('#quiz-modal')).toBeHidden();
  await expect(page.locator('.quiz-question')).toBeHidden();
  await expect(page.getByLabel('Seu e-mail para ver o diagnóstico')).toHaveCount(0);
});

test('TC-19 (AC-11): dialog role, accessible name, focus on close and locked body scroll', async ({ page }) => {
  await page.goto('/');
  await openQuiz(page);

  const dialog = page.getByRole('dialog', { name: 'Diagnóstico rápido, 7 perguntas' });
  await expect(dialog).toHaveAttribute('aria-modal', 'true');
  await expect(page.locator('.modal-close')).toBeFocused();

  const overflow = await page.evaluate(() => getComputedStyle(document.body).overflow);
  expect(overflow).toBe('hidden');
});

test('TC-20 (AC-12): closes with Escape', async ({ page }) => {
  await page.goto('/');
  await openQuiz(page);

  await page.keyboard.press('Escape');
  await expect(page.locator('#quiz-modal')).toBeHidden();
  const overflow = await page.evaluate(() => getComputedStyle(document.body).overflow);
  expect(overflow).not.toBe('hidden');
});

test('TC-21 (AC-12): closes with the close button', async ({ page }) => {
  await page.goto('/');
  await openQuiz(page);

  await page.getByRole('button', { name: 'Fechar o diagnóstico' }).click();
  await expect(page.locator('#quiz-modal')).toBeHidden();
  const overflow = await page.evaluate(() => getComputedStyle(document.body).overflow);
  expect(overflow).not.toBe('hidden');
});

test('TC-22 (AC-12): closes when the dimmed area outside the phone frame is clicked', async ({ page }) => {
  await page.goto('/');
  await openQuiz(page);

  await page.locator('#quiz-modal').click({ position: { x: 4, y: 4 } });
  await expect(page.locator('#quiz-modal')).toBeHidden();
});

test('TC-23 (AC-13): clicking inside the phone frame keeps the modal open', async ({ page }) => {
  await page.goto('/');
  await openQuiz(page);

  await page.locator('.phone-top').click({ position: { x: 60, y: 20 } });
  await expect(page.getByRole('dialog', { name: 'Diagnóstico rápido, 7 perguntas' })).toBeVisible();
});

test('TC-24 (AC-14): the desktop frame is 400px wide, 40px rounded, centered and shows the notch', async ({ page }) => {
  await page.goto('/');
  await openQuiz(page);

  const frame = page.locator('.phone-frame');
  const box = await frame.boundingBox();
  expect(box.width).toBeCloseTo(400, 0);
  expect(box.x).toBeCloseTo((1280 - 400) / 2, 0);

  const radius = await frame.evaluate((el) => getComputedStyle(el).borderRadius);
  expect(radius).toBe('40px');
  await expect(page.locator('.notch')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Fechar o diagnóstico' })).toBeVisible();
});

test('TC-26 (AC-15): closing and reopening restarts on question 1 after some answers', async ({ page }) => {
  await page.goto('/');
  await openQuiz(page);
  await answer(page, 0);
  await answer(page, 1);

  await closeQuiz(page);
  await openQuiz(page);

  await expect(page.locator('.quiz-count')).toHaveText('Pergunta 1 de 7');
  await expect(page.locator('.quiz-option[aria-pressed="true"]')).toHaveCount(0);
});

test('TC-27 (AC-15): closing and reopening restarts on question 1 after the result', async ({ page }) => {
  await page.goto('/');
  await reachResult(page, Array(7).fill(0));

  await closeQuiz(page);
  await openQuiz(page);

  await expect(page.locator('.quiz-count')).toHaveText('Pergunta 1 de 7');
  await expect(page.locator('.quiz-option[aria-pressed="true"]')).toHaveCount(0);
});

test('TC-48 (AC-32): "Ver as aulas do curso" closes the modal and scrolls to #aulas', async ({ page }) => {
  await page.goto('/');
  await reachResult(page, Array(7).fill(0));

  await page.getByRole('button', { name: 'Ver as aulas do curso' }).click();

  await expect(page.locator('#quiz-modal')).toBeHidden();
  await expect
    .poll(() => page.evaluate(() => Math.round(document.getElementById('aulas').getBoundingClientRect().top)))
    .toBeLessThanOrEqual(120);
  const scrollY = await page.evaluate(() => window.scrollY);
  expect(scrollY).toBeGreaterThan(0);
});

test('TC-49 (AC-33): "Refazer o diagnóstico" keeps the modal open and restarts on question 1', async ({ page }) => {
  await page.goto('/');
  await reachResult(page, Array(7).fill(2));

  await page.getByRole('button', { name: 'Refazer o diagnóstico' }).click();

  await expect(page.getByRole('dialog', { name: 'Diagnóstico rápido, 7 perguntas' })).toBeVisible();
  await expect(page.locator('.quiz-count')).toHaveText('Pergunta 1 de 7');
  await expect(page.locator('.quiz-option[aria-pressed="true"]')).toHaveCount(0);
});
