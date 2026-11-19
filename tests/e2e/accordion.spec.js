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
  'Quanto custa o curso?',
  'O diagnóstico é gratuito?',
  'Eu já lancei meu SaaS. Ainda faz sentido?',
];

const FAQ_ANSWERS = [
  'Não. O curso foi desenhado para quem constrói com agente. Em cada aula, o prompt pronto faz a parte técnica com a sua LLM, e a conferência manual é feita na tela, clicando e observando, sem escrever código.',
  'Sim. Os prompts e as conferências não dependem de uma ferramenta específica. Servem para Cursor, Claude, Copilot, ChatGPT e qualquer outro agente ou LLM que você já use para construir seu SaaS.',
  'R$ 9,90, à vista, com 7 dias de garantia. O pagamento é feito pela Kiwify.',
  'Sim. São 7 perguntas, leva cerca de 1 minuto, e o resultado aparece na tela com sua pontuação de 0 a 14 e o status de cada área. Pedimos seu e-mail antes de mostrar o resultado, só isso.',
  'Faz, e talvez faça ainda mais. Os 7 testes viram um ritual de conferência para cada nova versão, cada nova funcionalidade e cada correção que o agente entregar. Produto lançado quebra em atualização do mesmo jeito que quebra em lançamento.',
];

test('AC-19: FAQ item 3 asks the price and keeps the other 4 items unchanged', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('.faq-accordion .acc-title')).toHaveText(FAQ_QUESTIONS);
  await expect(page.locator('.faq-accordion .acc-panel p')).toHaveText(FAQ_ANSWERS);
});

test('TC-50 (AC-34): the course accordion has the 8 exact lessons and lesson 00 is open', async ({ page }) => {
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

test('TC-52 (AC-35): opening a lesson closes the previous one and clicking it again closes everything', async ({ page }) => {
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

test('TC-53 (AC-36): the FAQ has the 5 exact questions, all closed, one open at a time', async ({ page }) => {
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

test('TC-51 (AC-34): every lesson body and all course tags are exact', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('.course-accordion .acc-panel p')).toHaveText([
    'Software feito com agente falha de um jeito próprio, o agente resolve o que foi pedido e não avisa o que ficou de fora, caso limite, erro de pagamento, permissão aberta. Nesta aula você entende esse padrão, monta seu ambiente de conferência e aprende a ordem certa de testar antes de qualquer lançamento.',
    'Login é a porta do seu SaaS, e porta quebrada não aparece no seu teste rápido, aparece para o cliente às 22h de um domingo. Você confere cadastro, login, logout, recuperação de senha, sessão que expira e o que acontece quando o usuário tenta entrar duas vezes ou com a senha errada.',
    'Pagamento aprovado, pagamento recusado, assinatura que renova, assinatura que cancela, reembolso. Você testa o caminho do dinheiro inteiro, incluindo o cartão que falha, porque é justamente no erro que os SaaS novos cobram errado, liberam acesso sem pagar ou bloqueiam quem pagou.',
    'Criar, editar, apagar e recarregar. Você confere se tudo que o usuário salva sobrevive a atualizar a página, fechar e voltar, editar duas vezes e apagar sem querer. Perder dado do cliente é o bug que menos se perdoa, e um dos mais simples de prevenir.',
    'O vazamento mais comum em SaaS feito rápido não é invasão, é permissão que ninguém testou, trocar um número na URL e abrir a conta de outra pessoa. Você aprende a testar papéis de usuário, acesso de administrador e isolamento entre contas, do jeito que um testador profissional faz.',
    'Testar tela por tela esconde o bug que mora entre as telas. Nesta aula você percorre a jornada inteira como um cliente novo, cadastro, primeiro uso, pagamento e resultado final, e descobre onde a experiência quebra no meio do caminho.',
    'Campo vazio, texto gigante, clique duplo no botão de pagar, internet que cai no meio do envio. Você testa o comportamento do seu SaaS quando algo dá errado, para ele responder com uma mensagem clara em vez de uma tela quebrada ou uma cobrança duplicada.',
    'Seu cliente abre no celular, no navegador que ele já usa, com a internet que ele tem. Na aula final você confere responsivo, navegadores principais e velocidade percebida, e monta sua lista final de liberação, o ritual de conferência para repetir em todo lançamento daqui para frente.',
  ]);

  const tags = [
    ['AULA DE ABERTURA', 'MAPA DOS 7 TESTES', 'AMBIENTE DE TESTE'],
    ['ÁREA, AUTENTICAÇÃO', 'PROMPT INCLUSO', 'CHECKLIST MANUAL'],
    ['ÁREA, RECEITA', 'PROMPT INCLUSO', 'CHECKLIST MANUAL'],
    ['ÁREA, DADOS', 'PROMPT INCLUSO', 'CHECKLIST MANUAL'],
    ['ÁREA, SEGURANÇA BÁSICA', 'PROMPT INCLUSO', 'CHECKLIST MANUAL'],
    ['ÁREA, JORNADA DO CLIENTE', 'PROMPT INCLUSO', 'CHECKLIST MANUAL'],
    ['ÁREA, RESILIÊNCIA', 'PROMPT INCLUSO', 'CHECKLIST MANUAL'],
    ['ÁREA, EXPERIÊNCIA FINAL', 'PROMPT INCLUSO', 'LISTA DE LIBERAÇÃO'],
  ];
  for (let index = 0; index < tags.length; index += 1) {
    await expect(page.locator(`#aula-0${index} .tag`)).toHaveText(tags[index]);
  }
});

test('TC-54 (AC-36): every FAQ answer is exact', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('.faq-accordion .acc-panel p')).toHaveText(FAQ_ANSWERS);
});
