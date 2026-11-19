import { expect, test } from '@playwright/test';
import { mockMailerLite, parseBody, reachEmail, reachResult, submitEmail, TEST_CONFIG, useConfig } from './helpers.js';

// Exploratory findings for lead-capture-and-offer, see docs/test-cases/lead-capture-and-offer.md.

const MIXED = [0, 1, 2, 0, 1, 2, 0];

test('TC-30 (AC-1): pressing Enter repeatedly on a valid e-mail sends exactly one request', async ({ page }) => {
  await useConfig(page);
  const requests = await mockMailerLite(page);

  await page.goto('/');
  await reachEmail(page, MIXED);
  const input = page.getByLabel('Seu e-mail para ver o diagnóstico');
  await input.fill('ana@site.com');
  await input.press('Enter');
  await page.keyboard.press('Enter');
  await page.keyboard.press('Enter');

  await expect(page.getByText('SEU DIAGNÓSTICO')).toBeVisible();
  await page.waitForTimeout(500);
  expect(requests).toHaveLength(1);
});

test('TC-31 (AC-1): redoing the diagnostic and submitting again sends one request per submit', async ({ page }) => {
  await useConfig(page);
  const requests = await mockMailerLite(page);

  await page.goto('/');
  await reachResult(page, MIXED);
  await page.getByRole('button', { name: 'Refazer o diagnóstico' }).click();
  for (let i = 0; i < 7; i += 1) {
    await page.locator('.quiz-option').nth(0).click();
    await page.locator('.quiz-next').click();
  }
  await submitEmail(page, 'bia@site.com');
  await expect(page.getByText('SEU DIAGNÓSTICO')).toBeVisible();

  await expect.poll(() => requests.length).toBe(2);
  expect(parseBody(requests[1]).get('fields[email]')).toBe('bia@site.com');
  expect(parseBody(requests[1]).get('fields[quiz_score]')).toBe('14');
});

test('TC-32 (AC-1): surrounding spaces are trimmed and plus/subdomain e-mails are sent intact', async ({ page }) => {
  await useConfig(page);
  const requests = await mockMailerLite(page);

  await page.goto('/');
  await reachEmail(page, MIXED);
  await submitEmail(page, '  a.b+c@sub.dominio.com.br  ');
  await expect.poll(() => requests.length).toBe(1);

  expect(parseBody(requests[0]).get('fields[email]')).toBe('a.b+c@sub.dominio.com.br');
});

test('TC-33 (AC-4): the page-side 8 s timeout aborts a hanging request with no console message at all', async ({ page }) => {
  test.setTimeout(30000);
  await useConfig(page);
  await mockMailerLite(page, { hang: true });
  const messages = [];
  page.on('console', (message) => {
    if (message.type() === 'error' || message.type() === 'warning') messages.push(message.text());
  });
  page.on('pageerror', (error) => messages.push(error.message));
  const failed = [];
  page.on('requestfailed', (request) => failed.push(request.url()));

  await page.goto('/');
  await reachEmail(page, MIXED);
  await submitEmail(page, 'ana@site.com');
  await expect(page.locator('#oferta')).toBeVisible();

  await page.waitForTimeout(10000);
  expect(failed).toHaveLength(1);
  expect(messages).toEqual([]);
  await expect(page.locator('#oferta')).toBeVisible();
});

test('TC-34 (AC-15): keyboard-only users reach "Quero o curso" in the offer and open the checkout', async ({ page }) => {
  await useConfig(page);
  await mockMailerLite(page);
  await page.route('https://pay.kiwify.com.br/**', (route) =>
    route.fulfill({ status: 200, contentType: 'text/html', body: '<h1>Checkout</h1>' }),
  );

  await page.goto('/');
  await reachResult(page, MIXED);
  const cta = page.locator('#oferta').getByRole('link', { name: 'Quero o curso' });
  for (let i = 0; i < 30; i += 1) {
    if (await cta.evaluate((node) => node === document.activeElement)) break;
    await page.keyboard.press('Tab');
  }
  await expect(cta).toBeFocused();
  await page.keyboard.press('Enter');
  await page.waitForURL(TEST_CONFIG.CHECKOUT_URL);
});

test('TC-35 (AC-8): the e-mail error state keeps the privacy notice and link visible', async ({ page }) => {
  await page.goto('/');
  await reachEmail(page, MIXED);
  await submitEmail(page, 'ana@site');
  await expect(page.locator('.email-error')).toBeVisible();

  await expect(
    page.getByText('Ao continuar, você aceita receber e-mails da Unflaky sobre o curso. Dá para sair quando quiser.'),
  ).toBeVisible();
  await expect(page.getByRole('link', { name: 'Política de privacidade' }).first()).toBeVisible();
});
