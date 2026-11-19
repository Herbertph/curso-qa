import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { expect, test } from '@playwright/test';
import {
  mockMailerLite,
  parseBody,
  reachEmail,
  submitEmail,
  useConfig,
} from './helpers.js';

const MIXED = [0, 1, 2, 0, 1, 2, 0];
const ALL_OPEN = [2, 2, 2, 2, 2, 2, 2];
const ALL_CLOSED = [0, 0, 0, 0, 0, 0, 0];
const ALL_OPEN_AREAS =
  'Login e sessão, Pagamento e checkout, Salvamento e perda de dados, Permissões e acesso, Fluxo principal ponta a ponta, Erros e casos limite, Mobile e navegadores';

function collectErrors(page) {
  const errors = [];
  page.on('console', (message) => {
    // Chrome logs failed network loads itself; only errors raised by page code count.
    if (message.type() === 'error' && !message.text().startsWith('Failed to load resource')) errors.push(message.text());
  });
  page.on('pageerror', (error) => errors.push(error.message));
  return errors;
}

test('AC-1: a valid submit sends exactly one MailerLite request with e-mail, score, band and open areas', async ({ page }) => {
  await useConfig(page);
  const requests = await mockMailerLite(page);

  await page.goto('/');
  await reachEmail(page, MIXED);
  await submitEmail(page, 'ana@site.com');
  await expect(page.getByText('SEU DIAGNÓSTICO')).toBeVisible();

  await expect.poll(() => requests.length).toBe(1);
  expect(requests[0].url).toContain('/jsonp/100200/forms/300400/subscribe');

  const body = parseBody(requests[0]);
  expect(body.get('fields[email]')).toBe('ana@site.com');
  expect(body.get('fields[quiz_score]')).toBe('8');
  expect(body.get('fields[quiz_band]')).toBe('Base parcial, buracos abertos');
  expect(body.get('fields[quiz_open_areas]')).toBe(
    'Pagamento e checkout, Salvamento e perda de dados, Fluxo principal ponta a ponta, Erros e casos limite',
  );
});

test('AC-2: all first options send 14 points, the top band and no open areas', async ({ page }) => {
  await useConfig(page);
  const requests = await mockMailerLite(page);

  await page.goto('/');
  await reachEmail(page, ALL_CLOSED);
  await submitEmail(page, 'ana@site.com');
  await expect.poll(() => requests.length).toBe(1);

  const body = parseBody(requests[0]);
  expect(body.get('fields[quiz_score]')).toBe('14');
  expect(body.get('fields[quiz_band]')).toBe('Quase pronto, feche as lacunas');
  expect(body.get('fields[quiz_open_areas]')).toBe('');
});

test('AC-2: all last options send 0 points and list the 7 areas in lesson order', async ({ page }) => {
  await useConfig(page);
  const requests = await mockMailerLite(page);

  await page.goto('/');
  await reachEmail(page, ALL_OPEN);
  await submitEmail(page, 'ana@site.com');
  await expect.poll(() => requests.length).toBe(1);

  const body = parseBody(requests[0]);
  expect(body.get('fields[quiz_score]')).toBe('0');
  expect(body.get('fields[quiz_band]')).toBe('Lançamento em risco');
  expect(body.get('fields[quiz_open_areas]')).toBe(ALL_OPEN_AREAS);
});

test('AC-3: an invalid e-mail sends no request', async ({ page }) => {
  await useConfig(page);
  const requests = await mockMailerLite(page);

  await page.goto('/');
  await reachEmail(page, MIXED);
  await submitEmail(page, 'ana@site');
  await expect(page.locator('.email-error')).toBeVisible();

  await page.waitForTimeout(300);
  expect(requests).toEqual([]);
});

for (const scenario of [
  { name: 'HTTP 500', options: { status: 500 } },
  { name: 'aborted request', options: { abort: true } },
]) {
  test(`AC-4: a ${scenario.name} never blocks the result and shows no error`, async ({ page }) => {
    await useConfig(page);
    await mockMailerLite(page, scenario.options);
    const errors = collectErrors(page);

    await page.goto('/');
    await reachEmail(page, MIXED);
    await submitEmail(page, 'ana@site.com');

    await expect(page.getByText('SEU DIAGNÓSTICO')).toBeVisible();
    await expect(page.locator('#oferta')).toBeVisible();

    await page.waitForTimeout(1000);
    expect(errors).toEqual([]);
  });
}

test('AC-4: a request that never answers times out silently', async ({ page }) => {
  await useConfig(page);
  await mockMailerLite(page, { hang: true });
  const errors = collectErrors(page);

  await page.goto('/');
  await reachEmail(page, MIXED);
  await submitEmail(page, 'ana@site.com');

  await expect(page.getByText('SEU DIAGNÓSTICO')).toBeVisible();
  await expect(page.locator('#oferta')).toBeVisible();

  await page.waitForTimeout(9000);
  expect(errors).toEqual([]);
  await expect(page.getByText('SEU DIAGNÓSTICO')).toBeVisible();
});

test('AC-5: with the committed empty IDs no request is made and the result appears', async ({ page }) => {
  const requests = await mockMailerLite(page);

  await page.goto('/');
  await reachEmail(page, MIXED);
  await submitEmail(page, 'ana@site.com');

  await expect(page.getByText('SEU DIAGNÓSTICO')).toBeVisible();
  await page.waitForTimeout(300);
  expect(requests).toEqual([]);
});

test('AC-6: no MailerLite API key or token exists in the source, the pages or the build', () => {
  const files = [
    'index.html',
    'privacidade.html',
    ...['config.js', 'lead.js', 'checkout.js', 'quiz.js', 'privacy.js', 'main.js', 'scoring.js', 'quiz-data.js'].map(
      (name) => join('src', name),
    ),
    ...['index.html', 'privacidade.html'].map((name) => join('dist', name)),
  ];

  for (const file of files) {
    const content = readFileSync(join(process.cwd(), file), 'utf8');
    expect(content, file).not.toMatch(/api_key|apiKey|Bearer|connect\.mailerlite\.com\/api/);
  }

  expect(readFileSync(join(process.cwd(), 'src', 'lead.js'), 'utf8')).toContain(
    'assets.mailerlite.com/jsonp/',
  );
});
