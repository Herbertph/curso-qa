import { expect, test } from '@playwright/test';
import { reachResult, TEST_CONFIG, useConfig } from './helpers.js';

const EVERYTHING_OPEN = [2, 2, 2, 2, 2, 2, 2];

async function openResultWith(page, answers) {
  await page.goto('/');
  await reachResult(page, answers);
}

test('AC-11: the footer shows the new text and the privacy link', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('.footer-inner p').nth(1)).toHaveText(
    'Conteúdo baseado em experiência real de QA, sem resultados financeiros prometidos ou inventados. Política de privacidade',
  );
  const link = page.getByRole('link', { name: 'Política de privacidade' });
  await expect(link).toHaveAttribute('href', 'privacidade.html');
  await expect(page.locator('body')).not.toContainText('Mini curso em produção');
});

test('AC-12: the result screen shows the full offer below the priority paragraph', async ({ page }) => {
  await openResultWith(page, [0, 0, 0, 0, 0, 0, 0]);

  const offer = page.locator('#oferta');
  await expect(offer).toBeVisible();
  await expect(offer.locator('.offer-eyebrow')).toHaveText('PRÓXIMO PASSO');
  await expect(offer.locator('.offer-text')).toHaveText(
    'Mini curso Teste Antes de Lançar: 8 aulas curtas, cada uma com o prompt pronto para o seu agente e a conferência manual para você validar no seu próprio produto.',
  );
  await expect(offer.locator('.offer-item > span:last-child')).toHaveText([
    '8 aulas curtas, introdução mais os 7 testes',
    'Prompt pronto em cada aula',
    'Conferência manual passo a passo',
    'Lista de liberação para repetir em todo lançamento',
  ]);
  await expect(offer.locator('.offer-price-value')).toHaveText('R$ 9,90');
  await expect(offer.locator('.offer-price-label')).toHaveText('à vista');
  await expect(offer.getByRole('button', { name: 'Quero o curso' })).toBeVisible();
  await expect(offer.locator('.offer-note')).toHaveText('Pagamento pela Kiwify. 7 dias de garantia.');

  const afterPriority = await page.locator('.phone-screen').evaluate((screen) => {
    const priority = screen.querySelector('.result-priority');
    const offerBlock = screen.querySelector('#oferta');
    return Boolean(priority.compareDocumentPosition(offerBlock) & Node.DOCUMENT_POSITION_FOLLOWING);
  });
  expect(afterPriority).toBe(true);
});

for (const scenario of [
  {
    openAreas: 0,
    answers: [0, 0, 0, 0, 0, 0, 0],
    headline: 'Sua base é boa, o curso transforma isso em método',
  },
  {
    openAreas: 1,
    answers: [0, 0, 0, 0, 0, 0, 1],
    headline: 'Sua área aberta é exatamente o que o curso ensina a conferir',
  },
  {
    openAreas: 3,
    answers: [0, 0, 1, 2, 1, 0, 0],
    headline: 'Suas 3 áreas abertas são exatamente o que o curso ensina a conferir',
  },
  {
    openAreas: 7,
    answers: EVERYTHING_OPEN,
    headline: 'Suas 7 áreas abertas são exatamente o que o curso ensina a conferir',
  },
]) {
  test(`AC-13: ${scenario.openAreas} open areas give the right headline`, async ({ page }) => {
    await openResultWith(page, scenario.answers);
    await expect(page.locator('#oferta .offer-headline')).toHaveText(scenario.headline);
  });
}

test('AC-14: "Quero o curso" is the only gold button and both other actions are ghost buttons', async ({ page }) => {
  await openResultWith(page, [0, 0, 0, 0, 0, 0, 0]);

  const gold = page.locator('.phone-screen .btn-gold');
  await expect(gold).toHaveCount(1);
  await expect(gold).toHaveText('Quero o curso');

  const actions = page.locator('.result-actions button');
  await expect(actions).toHaveText(['Ver as aulas do curso', 'Refazer o diagnóstico']);
  for (const className of await actions.evaluateAll((nodes) => nodes.map((node) => node.className))) {
    expect(className).toContain('btn-ghost');
    expect(className).not.toContain('btn-gold');
  }
});

test('AC-15: with CHECKOUT_URL set both "Quero o curso" controls navigate in the same tab', async ({ page }) => {
  await useConfig(page);
  await page.route('https://pay.kiwify.com.br/**', (route) =>
    route.fulfill({ status: 200, contentType: 'text/html', body: '<h1>Checkout</h1>' }),
  );

  await openResultWith(page, [0, 0, 0, 0, 0, 0, 0]);
  await expect(page.locator('#oferta .offer-cta')).toHaveAttribute('href', TEST_CONFIG.CHECKOUT_URL);
  await page.locator('#oferta .offer-cta').click();
  await page.waitForURL(TEST_CONFIG.CHECKOUT_URL);

  await page.goto('/');
  const courseControl = page.locator('#course-offer .course-cta');
  await expect(courseControl).toHaveAttribute('href', TEST_CONFIG.CHECKOUT_URL);
  await courseControl.click();
  await page.waitForURL(TEST_CONFIG.CHECKOUT_URL);
});

test('AC-16: with CHECKOUT_URL empty both controls do nothing and log no error', async ({ page }) => {
  const errors = [];
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.on('pageerror', (error) => errors.push(error.message));

  await openResultWith(page, [0, 0, 0, 0, 0, 0, 0]);
  const before = page.url();
  await page.locator('#oferta .offer-cta').click();
  await page.waitForTimeout(200);
  expect(page.url()).toBe(before);
  await expect(page.getByRole('dialog', { name: 'Diagnóstico rápido, 7 perguntas' })).toBeVisible();

  await page.goto('/');
  const beforeCourse = page.url();
  await page.locator('#course-offer .course-cta').click();
  await page.waitForTimeout(200);
  expect(page.url()).toBe(beforeCourse);
  expect(errors).toEqual([]);
});

test('AC-17: #aulas shows the purchase line and a non-gold "Quero o curso" control', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('#course-offer .course-price')).toHaveText(
    'Curso completo por R$ 9,90, à vista, com 7 dias de garantia.',
  );

  const control = page.locator('#course-offer .course-cta');
  await expect(control).toHaveText('Quero o curso');
  await expect(control).toHaveRole('button');
  const className = await control.getAttribute('class');
  expect(className).toContain('btn-ghost');
  expect(className).not.toContain('btn-gold');
  const fontSize = await control.evaluate((node) => Number.parseFloat(getComputedStyle(node).fontSize));
  expect(fontSize).toBeLessThanOrEqual(16);
});

test('AC-18: the existing CTAs keep "Fazer o diagnóstico" and show no price or course button', async ({ page }) => {
  await page.goto('/');

  const ctas = ['.header-cta', '.cta-box .btn', '.diag-box .btn', '.final-cta .btn', '.mobile-bar .btn'];
  for (const selector of ctas) {
    await expect(page.locator(selector), selector).toHaveText('Fazer o diagnóstico');
  }

  for (const selector of ['.header-inner', '.cta-box', '.diag-box', '.final-cta', '.mobile-bar']) {
    const text = await page.locator(selector).textContent();
    expect(text ?? '', selector).not.toContain('R$');
    expect(text ?? '', selector).not.toContain('Quero o curso');
  }
});

test('AC-20: the offer fits the phone screen and the 320px page has no horizontal overflow', async ({ page }) => {
  await openResultWith(page, [0, 1, 2, 0, 1, 2, 0]);

  for (const viewport of [
    { width: 1280, height: 800 },
    { width: 390, height: 844 },
  ]) {
    await page.setViewportSize(viewport);

    const overflow = await page.locator('.phone-screen').evaluate((el) => el.scrollWidth - el.clientWidth);
    expect(overflow, `phone overflow at ${viewport.width}`).toBeLessThanOrEqual(0);
    const docOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(docOverflow, `document overflow at ${viewport.width}`).toBeLessThanOrEqual(0);

    const metrics = await page.evaluate(() => {
      const button = document.querySelector('#oferta .offer-cta');
      const offer = document.getElementById('oferta');
      const style = getComputedStyle(offer);
      const contentWidth =
        offer.clientWidth - Number.parseFloat(style.paddingLeft) - Number.parseFloat(style.paddingRight);
      const box = button.getBoundingClientRect();
      return { width: box.width, height: box.height, contentWidth };
    });
    expect(metrics.width, `button width at ${viewport.width}`).toBeGreaterThanOrEqual(metrics.contentWidth - 1);
    expect(metrics.height, `button height at ${viewport.width}`).toBeGreaterThanOrEqual(48);
  }

  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto('/');
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth),
  ).toBeLessThanOrEqual(0);

  await page.goto('/privacidade.html');
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth),
  ).toBeLessThanOrEqual(0);
});

test('AC-21: no dashes, no waitlist wording and only the course price shown', async ({ page }) => {
  await page.goto('/');
  const landingText = await page.locator('body').textContent();
  expect(landingText).not.toMatch(/[\u2013\u2014]/);
  for (const wording of ['lista de espera', 'avise-me', 'garanta sua vaga', 'entrar na lista']) {
    expect(landingText.toLowerCase()).not.toContain(wording);
  }
  expect((landingText.match(/R\$ 9,90/g) ?? []).length).toBe(2);

  const prices = landingText.match(/R\$ ?\d[\d.]*(?:,\d+)?/g) ?? [];
  expect(prices.every((price) => price === 'R$ 9,90' || price === 'R$ 0')).toBe(true);

  await page.goto('/');
  await reachResult(page, [2, 2, 2, 2, 2, 2, 2]);
  const resultText = await page.locator('body').textContent();
  expect(resultText).not.toMatch(/[\u2013\u2014]/);
  expect((resultText.match(/R\$ 9,90/g) ?? []).length).toBe(3);

  await page.goto('/privacidade.html');
  const privacyText = await page.locator('body').textContent();
  expect(privacyText).not.toMatch(/[\u2013\u2014]/);
  expect(privacyText).not.toContain('R$');
});
