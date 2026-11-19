import { expect } from '@playwright/test';

export const TEST_CONFIG = {
  MAILERLITE_ACCOUNT_ID: '100200',
  MAILERLITE_FORM_ID: '300400',
  CHECKOUT_URL: 'https://pay.kiwify.com.br/test',
  PRIVACY_CONTACT_EMAIL: 'contato@unflaky.com',
};

export const MAILERLITE_PATTERN = /https:\/\/assets\.mailerlite\.com\/jsonp\//;

// Must run before page.goto: overrides src/config.js without touching the committed empty defaults.
export async function useConfig(page, overrides = TEST_CONFIG) {
  await page.addInitScript((config) => {
    window.__TEST_CONFIG__ = config;
  }, overrides);
}

export async function mockMailerLite(page, { status = 200, abort = false, hang = false } = {}) {
  const requests = [];
  await page.route(MAILERLITE_PATTERN, async (route) => {
    requests.push({ url: route.request().url(), body: route.request().postData() ?? '' });
    if (hang) return;
    if (abort) {
      await route.abort('failed');
      return;
    }
    await route.fulfill({ status, contentType: 'application/json', body: '' });
  });
  return requests;
}

export function parseBody(request) {
  return new URLSearchParams(request.body);
}

export const OPTION_LABELS = [
  'Sim, já testei isso de verdade',
  'Testei só o caminho normal, sem erro',
  'Nunca testei isso',
];

export async function openQuiz(page) {
  await page.locator('button[data-open-quiz]:visible').first().click();
  await expect(page.getByRole('dialog', { name: 'Diagnóstico rápido, 7 perguntas' })).toBeVisible();
}

export async function selectOption(page, index) {
  await page.locator('.quiz-option').nth(index).click();
}

export async function goNext(page) {
  await page.locator('.quiz-next').click();
}

export async function answer(page, index) {
  await selectOption(page, index);
  await goNext(page);
}

export async function answerAll(page, answers) {
  for (const index of answers) {
    await answer(page, index);
  }
}

export async function fillEmail(page, value) {
  await page.getByLabel('Seu e-mail para ver o diagnóstico').fill(value);
}

export async function submitEmail(page, value) {
  await fillEmail(page, value);
  await page.getByRole('button', { name: 'Ver meu diagnóstico' }).click();
}

export async function reachEmail(page, answers = Array(7).fill(0)) {
  await openQuiz(page);
  await answerAll(page, answers);
  await expect(page.getByLabel('Seu e-mail para ver o diagnóstico')).toBeVisible();
}

export async function reachResult(page, answers = Array(7).fill(0), email = 'ana@site.com') {
  await reachEmail(page, answers);
  await submitEmail(page, email);
  await expect(page.getByText('SEU DIAGNÓSTICO')).toBeVisible();
}

export async function closeQuiz(page) {
  await page.locator('.modal-close').click();
  await expect(page.locator('#quiz-modal')).toBeHidden();
}
