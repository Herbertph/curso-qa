import { expect, test } from '@playwright/test';

const LESSON_TITLES = [
  'Introdução, por que SaaS feito com IA quebra diferente',
  'Login e sessão',
  'Pagamento e checkout',
  'Salvamento e perda de dados',
  'Permissões e acesso',
  'Fluxo principal ponta a ponta',
  'Erros e casos limite',
  'Mobile, navegadores e o lançamento',
];

const LESSON_SUBTITLES = [
  'O erro não está no código que você vê, está no que ninguém conferiu',
  'Se o usuário não entra, nada mais importa',
  'A área onde um bug vira prejuízo na hora',
  'O usuário confia que o que salvou vai estar lá',
  'Um cliente nunca pode ver o que é de outro',
  'A jornada completa, na ordem do cliente',
  'Seu usuário vai fazer tudo que você não imaginou',
  'Conferir onde seu cliente realmente acessa',
];

const FAQ_QUESTIONS = [
  'Preciso saber programar para fazer o curso?',
  'Funciona com a ferramenta que eu uso?',
  'Quando o curso lança e quanto vai custar?',
  'O diagnóstico é gratuito?',
  'Eu já lancei meu SaaS. Ainda faz sentido?',
];

test('AC-34: the course accordion has the 8 exact lessons and lesson 00 is open', async ({ page }) => {
  await page.goto('/');

  const triggers = page.locator('.course-accordion .acc-trigger');
  await expect(triggers).toHaveCount(8);
  await expect(page.locator('.course-accordion .acc-title')).toHaveText(LESSON_TITLES);
  await expect(page.locator('.course-accordion .acc-sub')).toHaveText(LESSON_SUBTITLES);

  await expect(triggers.nth(0)).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('#aula-00')).toBeVisible();
  await expect(page.locator('#aula-00 p')).toHaveText(
    'Software feito com agente falha de um jeito próprio, o agente resolve o que foi pedido e não avisa o que ficou de fora, caso limite, erro de pagamento, permissão aberta. Nesta aula você entende esse padrão, monta seu ambiente de conferência e aprende a ordem certa de testar antes de qualquer lançamento.',
  );

  for (let index = 1; index < 8; index += 1) {
    await expect(triggers.nth(index)).toHaveAttribute('aria-expanded', 'false');
    await expect(page.locator(`#aula-0${index}`)).toBeHidden();
  }

  await expect(page.locator('#aula-00 .tag')).toHaveText([
    'AULA DE ABERTURA',
    'MAPA DOS 7 TESTES',
    'AMBIENTE DE TESTE',
  ]);
  await expect(page.locator('#aula-01 .tag')).toHaveText([
    'ÁREA, AUTENTICAÇÃO',
    'PROMPT INCLUSO',
    'CHECKLIST MANUAL',
  ]);
  await expect(page.locator('#aula-07 .tag')).toHaveText([
    'ÁREA, EXPERIÊNCIA FINAL',
    'PROMPT INCLUSO',
    'LISTA DE LIBERAÇÃO',
  ]);
});

test('AC-35: opening a lesson closes the previous one and clicking it again closes everything', async ({ page }) => {
  await page.goto('/');

  const triggers = page.locator('.course-accordion .acc-trigger');
  await triggers.nth(3).click();

  await expect(triggers.nth(3)).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('#aula-03')).toBeVisible();
  await expect(triggers.nth(0)).toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator('#aula-00')).toBeHidden();

  await triggers.nth(3).click();
  await expect(triggers.nth(3)).toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator('#aula-03')).toBeHidden();

  const expanded = await triggers.evaluateAll((nodes) => nodes.map((node) => node.getAttribute('aria-expanded')));
  expect(expanded).toEqual(Array(8).fill('false'));
});

test('AC-36: the FAQ has the 5 exact questions, all closed, one open at a time', async ({ page }) => {
  await page.goto('/');

  const triggers = page.locator('.faq-accordion .acc-trigger');
  await expect(triggers).toHaveCount(5);
  await expect(page.locator('.faq-accordion .acc-title')).toHaveText(FAQ_QUESTIONS);

  for (let index = 0; index < 5; index += 1) {
    await expect(triggers.nth(index)).toHaveAttribute('aria-expanded', 'false');
    await expect(page.locator(`#faq-${index + 1}`)).toBeHidden();
  }

  await triggers.nth(0).click();
  await expect(triggers.nth(0)).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('#faq-1')).toBeVisible();
  await expect(page.locator('#faq-1 p')).toHaveText(
    'Não. O curso foi desenhado para quem constrói com agente. Em cada aula, o prompt pronto faz a parte técnica com a sua LLM, e a conferência manual é feita na tela, clicando e observando, sem escrever código.',
  );

  await triggers.nth(1).click();
  await expect(triggers.nth(1)).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('#faq-2')).toBeVisible();
  await expect(triggers.nth(0)).toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator('#faq-1')).toBeHidden();

  await triggers.nth(1).click();
  await expect(triggers.nth(1)).toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator('#faq-2')).toBeHidden();
});
