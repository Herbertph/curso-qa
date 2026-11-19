import { expect, test } from '@playwright/test';
import { answer, goNext, openQuiz, selectOption } from './helpers.js';

const AREAS = [
  {
    area: 'LOGIN E SESSÃO',
    question:
      'Você já testou o que acontece quando o usuário erra a senha, pede para recuperar a conta ou fica com a sessão expirada?',
    hint: 'Não vale só o login feliz, o problema mora no erro e na volta.',
  },
  {
    area: 'PAGAMENTO E CHECKOUT',
    question:
      'Você já simulou um cartão recusado no seu checkout para ver o que acontece com a cobrança e com o acesso do cliente?',
    hint: 'Pagamento que falha é onde SaaS novo mais cobra errado ou libera sem pagar.',
  },
  {
    area: 'SALVAMENTO E PERDA DE DADOS',
    question:
      'Depois de salvar algo no seu SaaS, você já atualizou a página, fechou tudo e voltou para conferir se continuou lá?',
    hint: 'Dado que some sem aviso é o bug que o cliente menos perdoa.',
  },
  {
    area: 'PERMISSÕES E ACESSO',
    question:
      'Você já tentou acessar dados de outra conta, trocando o endereço da página ou entrando como usuário comum em área restrita?',
    hint: 'O vazamento mais comum não é invasão, é permissão que ninguém testou.',
  },
  {
    area: 'FLUXO PRINCIPAL PONTA A PONTA',
    question:
      'Você já fez a jornada completa como um cliente novo, cadastro, primeiro uso e pagamento, sem pular nenhuma etapa?',
    hint: 'Testar tela por tela esconde o bug que mora entre as telas.',
  },
  {
    area: 'ERROS E CASOS LIMITE',
    question:
      'Você já enviou formulários vazios, clicou duas vezes no botão de pagar ou simulou a internet caindo no meio de um envio?',
    hint: 'Seu usuário vai fazer tudo isso, a pergunta é como seu SaaS responde.',
  },
  {
    area: 'MOBILE E NAVEGADORES',
    question:
      'Você já abriu seu SaaS no celular e em um navegador diferente do seu para conferir se funciona do mesmo jeito?',
    hint: 'Seu cliente não usa o seu computador, nem o seu navegador, nem a sua internet.',
  },
];

const OPTIONS = [
  'Sim, já testei isso de verdade',
  'Testei só o caminho normal, sem erro',
  'Nunca testei isso',
];

const progressRatio = (page) =>
  page.locator('.progress').evaluate((track) => {
    const fill = track.querySelector('.progress-fill');
    return (fill.getBoundingClientRect().width / track.clientWidth) * 100;
  });

test('TC-28 (AC-16): every question shows the exact area, counter, question, hint and options', async ({ page }) => {
  await page.goto('/');
  await openQuiz(page);

  for (let index = 0; index < AREAS.length; index += 1) {
    const entry = AREAS[index];
    await expect(page.locator('.quiz-area')).toHaveText(`ÁREA ${index + 1} DE 7, ${entry.area}`);
    await expect(page.locator('.quiz-count')).toHaveText(`Pergunta ${index + 1} de 7`);
    await expect(page.locator('.quiz-question')).toHaveText(entry.question);
    await expect(page.locator('.quiz-hint')).toHaveText(entry.hint);
    await expect(page.locator('.quiz-option')).toHaveText(OPTIONS);

    if (index < AREAS.length - 1) {
      await selectOption(page, 0);
      await goNext(page);
    }
  }
});

test('TC-29 (AC-17): Continuar is disabled and does not advance without a selected option', async ({ page }) => {
  await page.goto('/');
  await openQuiz(page);

  const next = page.locator('.quiz-next');
  await expect(next).toBeDisabled();
  await next.evaluate((button) => button.click());
  await expect(page.locator('.quiz-count')).toHaveText('Pergunta 1 de 7');
});

test('TC-30 (AC-18): only the last selected option stays pressed and enables Continuar', async ({ page }) => {
  await page.goto('/');
  await openQuiz(page);

  const options = page.locator('.quiz-option');
  await options.nth(1).click();
  await options.nth(2).click();

  await expect(options.nth(1)).toHaveAttribute('aria-pressed', 'false');
  await expect(options.nth(2)).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('.quiz-next')).toBeEnabled();
});

test('TC-31 (AC-19): Voltar is invisible on question 1 but keeps the Continuar position', async ({ page }) => {
  await page.goto('/');
  await openQuiz(page);

  const back = page.locator('.quiz-back');
  await expect(back).toHaveCSS('visibility', 'hidden');
  const firstPosition = await page.locator('.quiz-next').boundingBox();

  await selectOption(page, 0);
  await goNext(page);

  await expect(back).toHaveCSS('visibility', 'visible');
  const secondPosition = await page.locator('.quiz-next').boundingBox();
  expect(secondPosition.x).toBeCloseTo(firstPosition.x, 0);
});

test('TC-32 (AC-20): going back keeps the previous answer selected and Continuar enabled', async ({ page }) => {
  await page.goto('/');
  await openQuiz(page);

  await selectOption(page, 1);
  await goNext(page);
  await page.locator('.quiz-back').click();

  await expect(page.locator('.quiz-count')).toHaveText('Pergunta 1 de 7');
  await expect(page.locator('.quiz-option').nth(1)).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('.quiz-next')).toBeEnabled();
});

test('TC-33 (AC-21): the progress bar follows (N-1)/7 and reaches 100% on the e-mail screen', async ({ page }) => {
  await page.goto('/');
  await openQuiz(page);

  expect(await progressRatio(page)).toBeCloseTo(0, 0);

  await selectOption(page, 0);
  await goNext(page);
  expect(await progressRatio(page)).toBeCloseTo(14.3, 0);

  for (let index = 2; index < 7; index += 1) {
    await selectOption(page, 0);
    await goNext(page);
  }
  expect(await progressRatio(page)).toBeCloseTo(85.7, 0);

  await selectOption(page, 0);
  await goNext(page);
  await expect(page.getByLabel('Seu e-mail para ver o diagnóstico')).toBeVisible();
  expect(await progressRatio(page)).toBeCloseTo(100, 0);
});

test('TC-34 (AC-22): question 7 reads "Ver o que falta" and leads to the e-mail screen', async ({ page }) => {
  await page.goto('/');
  await openQuiz(page);

  for (let index = 0; index < 6; index += 1) {
    await selectOption(page, 0);
    await goNext(page);
  }

  const next = page.locator('.quiz-next');
  await expect(next).toHaveText('Ver o que falta');
  await selectOption(page, 0);
  await next.click();

  await expect(page.getByLabel('Seu e-mail para ver o diagnóstico')).toBeVisible();
  await expect(page.getByText('SEU DIAGNÓSTICO')).toHaveCount(0);
});

test('TC-35 (AC-23): the phone screen scrolls back to the top on every screen change', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 500 });
  await page.goto('/');
  await openQuiz(page);

  const screen = page.locator('.phone-screen');
  await screen.evaluate((el) => {
    el.scrollTop = el.scrollHeight;
  });
  expect(await screen.evaluate((el) => el.scrollTop)).toBeGreaterThan(0);

  await selectOption(page, 0);
  await goNext(page);

  expect(await screen.evaluate((el) => el.scrollTop)).toBe(0);
});

test('TC-36 (AC-23): the phone screen scrolls back to the top on the e-mail and result screens', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 400 });
  await page.goto('/');
  await openQuiz(page);

  for (let index = 0; index < 6; index += 1) {
    await selectOption(page, 0);
    await goNext(page);
  }
  await selectOption(page, 0);

  const screen = page.locator('.phone-screen');
  await screen.evaluate((el) => {
    el.scrollTop = el.scrollHeight;
  });
  expect(await screen.evaluate((el) => el.scrollTop)).toBeGreaterThan(0);

  await page.locator('.quiz-next').click();
  await expect(page.getByLabel('Seu e-mail para ver o diagnóstico')).toBeVisible();
  expect(await screen.evaluate((el) => el.scrollTop)).toBe(0);

  await screen.evaluate((el) => {
    el.scrollTop = el.scrollHeight;
  });
  expect(await screen.evaluate((el) => el.scrollTop)).toBeGreaterThan(0);

  await page.getByLabel('Seu e-mail para ver o diagnóstico').fill('ana@site.com');
  await page.getByRole('button', { name: 'Ver meu diagnóstico' }).click();
  await expect(page.getByText('SEU DIAGNÓSTICO')).toBeVisible();
  expect(await screen.evaluate((el) => el.scrollTop)).toBe(0);
});
