import { expect, test } from '@playwright/test';

const ROOT_VARS = {
  '--bg': '#0c0d0f',
  '--bg2': '#121316',
  '--panel': '#17181c',
  '--panel2': '#1d1e23',
  '--line': '#2a2b31',
  '--line2': '#35363e',
  '--text': '#f2efe6',
  '--muted': '#a8a49a',
  '--muted2': '#7d7a72',
  '--gold': '#c9a227',
  '--gold2': '#e8c85a',
  '--gold-dim': 'rgba(201, 162, 39, .14)',
  '--green': '#3ecf7a',
  '--red': '#ff6b5e',
  '--radius': '14px',
};

const columns = (page, selector) =>
  page.locator(selector).evaluate((el) => getComputedStyle(el).gridTemplateColumns.split(' ').filter(Boolean).length);

test('TC-1 (AC-1): language, title, favicon and viewport meta', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR');
  await expect(page).toHaveTitle('Teste Antes de Lançar, o mini curso para SaaS feito com IA');

  const icon = await page.locator('link[rel="icon"]').getAttribute('href');
  expect(icon).toMatch(/^data:/);

  const viewport = await page.locator('meta[name="viewport"]').getAttribute('content');
  expect(viewport).toContain('viewport-fit=cover');
});

test('TC-2 (AC-2): sections are in the source order', async ({ page }) => {
  await page.goto('/');

  const order = await page
    .locator('main > [data-section]')
    .evaluateAll((sections) => sections.map((section) => section.getAttribute('data-section')));

  expect(order).toEqual([
    'hero',
    'proof',
    'diagnostico',
    'problema',
    'formato',
    'aulas',
    'publico',
    'instrutor',
    'faq',
    'final-cta',
  ]);

  await expect(page.locator('.site-header')).toBeVisible();
  await expect(page.locator('.site-footer')).toBeVisible();
});

test('TC-3 (AC-2): hero, conference card and proof strip copy is exact', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('.hero .pill')).toHaveText('Mini curso, 8 aulas curtas');
  await expect(page.locator('.hero h1')).toHaveText('Sem esses testes, seu SaaS pode quebrar em produção');
  await expect(page.locator('.hero-lead').nth(0)).toHaveText(
    'Você construiu rápido com IA, e isso é ótimo. O problema é que o agente entrega o código e diz que está pronto, mas ninguém conferiu se funciona de verdade. Este mini curso mostra os 7 testes que separam um lançamento tranquilo de um lançamento apagando incêndio.',
  );
  await expect(page.locator('.hero-lead').nth(1)).toHaveText(
    'Aulas curtas e diretas, feitas para quem programa com agente, Cursor, Claude, Copilot ou qualquer LLM, e quer validar o próprio produto sem virar especialista em QA.',
  );

  await expect(page.locator('.cta-box-title')).toHaveText('Descubra onde seu SaaS pode quebrar');
  await expect(page.locator('.cta-box-text')).toHaveText(
    'Responda 7 perguntas, uma para cada teste do curso, e veja na tela sua pontuação de 0 a 14, suas áreas descobertas e as aulas prioritárias para o seu caso.',
  );
  await expect(page.locator('.cta-note')).toHaveText(
    'Leva cerca de 1 minuto. O resultado aparece na tela, com o status de cada área.',
  );

  const card = page.locator('.conf-card');
  await expect(card).toHaveAttribute('aria-label', 'Exemplo de conferência de testes antes do lançamento');
  await expect(page.locator('.conf-label')).toHaveText('CONFERÊNCIA PRÉ-LANÇAMENTO');
  await expect(page.locator('.conf-badge')).toHaveText('AO VIVO NA AULA');

  await expect(page.locator('.conf-row .conf-text strong')).toHaveText([
    'Login e sessão',
    'Pagamento e checkout',
    'Salvamento de dados',
    'Permissões de acesso',
    'Fluxo principal ponta a ponta',
  ]);
  await expect(page.locator('.conf-row .conf-text')).toHaveText([
    'Login e sessãoUsuário entra, sai e volta sem perder o acesso',
    'Pagamento e checkoutCartão recusado ainda cobra o cliente, bug clássico de SaaS novo',
    'Salvamento de dadosO que o usuário salva continua lá depois de atualizar a página',
    'Permissões de acessoUm cliente consegue ver dados de outro cliente',
    'Fluxo principal ponta a pontaCadastro, uso e pagamento, na ordem em que o cliente faz',
  ]);
  await expect(page.locator('.conf-foot')).toHaveText(
    '2 falhas encontradas antes do lançamento CUSTO: R$ 0 em cliente perdido',
  );

  await expect(page.locator('.proof-num')).toHaveText(['10+', '3 dias → 24h', '98%', 'CTFL 2026']);
  await expect(page.locator('.proof-text')).toHaveText([
    'anos de experiência em TI, de desenvolvimento a qualidade de software',
    'foi a redução no tempo de triagem de bugs, com processo e bug report padronizado',
    'no prazo das entregas nos últimos 6 meses, verificando software que não pode ir ao ar com erro',
    'certificação internacional em testes de software, ISTQB',
  ]);
});

test('TC-4 (AC-2): section headings, leads and instructor card copy are exact', async ({ page }) => {
  await page.goto('/');

  const diagnostico = page.locator('[data-section="diagnostico"]');
  await expect(diagnostico.locator('.eyebrow')).toHaveText('Diagnóstico rápido');
  await expect(diagnostico.locator('h2')).toHaveText('Descubra, em 1 minuto, onde seu SaaS pode quebrar');
  await expect(diagnostico.locator('.section-lead')).toHaveText(
    '7 perguntas, uma para cada teste do curso. No final, você deixa seu e-mail e recebe na tela sua pontuação, suas áreas descobertas e quais aulas atacam exatamente o seu risco.',
  );
  await expect(diagnostico.locator('.diag-copy h3')).toHaveText('Seu SaaS está pronto para o primeiro cliente de verdade?');
  await expect(diagnostico.locator('.diag-copy p')).toHaveText(
    'O diagnóstico abre aqui na página, em uma janelinha no formato de celular. Você responde as 7 perguntas, deixa seu e-mail e vê o resultado completo sem sair desta tela.',
  );

  const problema = page.locator('[data-section="problema"]');
  await expect(problema.locator('h2')).toHaveText('Vibe coding acelerou a construção. A conferência ficou para trás.');
  await expect(problema.locator('.tag')).toHaveText(['SEM TESTE', 'COM OS 7 TESTES']);
  await expect(problema.locator('.card h3')).toHaveText(['Quem descobre o bug é o cliente', 'Quem descobre o bug é você, antes']);

  const formato = page.locator('[data-section="formato"]');
  await expect(formato.locator('h2')).toHaveText('Não é teoria de QA. É um roteiro de trabalho.');
  await expect(formato.locator('.step-num')).toHaveText(['PASSO 1', 'PASSO 2', 'PASSO 3', 'PASSO 4']);
  await expect(formato.locator('.card h3')).toHaveText([
    'Onde você está tocando',
    'Por que testar isso',
    'O prompt pronto',
    'A conferência manual',
  ]);

  const aulas = page.locator('[data-section="aulas"]');
  await expect(aulas.locator('h2')).toHaveText('8 aulas, uma introdução e os 7 testes');
  await expect(aulas.locator('.course-foot')).toHaveText(
    '8 aulas, introdução mais os 7 testes Em cada aula, o prompt pronto e a conferência manual Feito para quem constrói com IA, sem base em QA',
  );

  const publico = page.locator('[data-section="publico"]');
  await expect(publico.locator('h2')).toHaveText('Feito para founder que constrói, não para quem estuda QA');
  await expect(publico.locator('.card h3')).toHaveText(['Este curso é para você se', 'Não é para você se']);

  const instrutor = page.locator('[data-section="instrutor"]');
  await expect(instrutor.locator('h2')).toHaveText('Autoridade de verdade, sem número inventado');
  await expect(instrutor.locator('.instructor-name')).toHaveText('Herbert Parasio');
  await expect(instrutor.locator('.instructor-role')).toHaveText('SQA Team Lead, BMM Test Labs, Canadá');
  await expect(instrutor.locator('.instructor-list li')).toHaveCount(5);
  await expect(instrutor.locator('blockquote')).toHaveText(
    'Eu não tenho coragem de inventar número para parecer autoridade. O que eu tenho é o trabalho, e é ele que está nestas aulas.',
  );

  const faq = page.locator('[data-section="faq"]');
  await expect(faq.locator('h2')).toHaveText('Tire suas dúvidas');

  const finalCta = page.locator('[data-section="final-cta"]');
  await expect(finalCta.locator('h2')).toHaveText('Seu próximo lançamento não precisa ser uma aposta');
  await expect(finalCta.locator('p:not(.eyebrow)')).toHaveText(
    'Faça o diagnóstico, 7 perguntas em cerca de 1 minuto, e veja sua pontuação, suas áreas descobertas e as aulas que atacam exatamente o seu risco. Melhor você encontrar o bug agora do que o seu primeiro cliente encontrar por você.',
  );

  await expect(page.locator('.footer-inner p')).toHaveText([
    'UNFLAKY, Quality Lab, Herbert Parasio',
    'Mini curso em produção. Conteúdo baseado em experiência real de QA, sem resultados financeiros prometidos ou inventados.',
  ]);
});

test('TC-5 (AC-2): card, step, audience, instructor and FAQ copy is exact', async ({ page }) => {
  await page.goto('/');

  const problema = page.locator('[data-section="problema"]');
  await expect(problema.locator('.eyebrow')).toHaveText('O problema');
  await expect(problema.locator('.section-lead')).toHaveText(
    'Hoje qualquer founder monta um SaaS em semanas. Só que velocidade sem teste cria um tipo novo de bug, o bug que ninguém viu porque ninguém procurou.',
  );
  await expect(problema.locator('.card > p:not(.tag)')).toHaveText([
    'O agente diz que terminou, você publica, e o primeiro pagamento real falha, o primeiro cliente perde os dados que salvou, ou pior, enxerga os dados de outro cliente. A correção vem depois do estrago, com pressa e com o cliente já desconfiando do produto.',
    'Você roda uma conferência curta e metódica nas áreas que realmente quebram um SaaS. Cada falha aparece na sua tela, em ambiente de teste, com tempo de pedir a correção para o agente e conferir de novo. Lançar vira uma decisão, não uma aposta.',
  ]);

  const formato = page.locator('[data-section="formato"]');
  await expect(formato.locator('.eyebrow')).toHaveText('O formato de cada aula');
  await expect(formato.locator('.section-lead')).toHaveText(
    'Cada um dos 7 testes segue o mesmo formato, para você aplicar no seu produto no mesmo dia, mesmo sem escrever código na mão.',
  );
  await expect(formato.locator('.card-step > p:not(.step-num)')).toHaveText([
    'Qual área do seu SaaS aquele teste cobre, pagamento, login, dados, permissões, e onde o risco mora nela.',
    'O que quebra se essa área falhar, traduzido para a linguagem do founder, venda perdida, dado perdido, cliente perdido.',
    'Um prompt completo para colar no seu agente e pedir a implementação ou a correção do teste, sem você precisar saber programá-lo.',
    'O passo a passo curto, na tela, para você mesmo confirmar se funcionou. Porque o agente diz que fez, mas quem valida é você.',
  ]);

  const aulas = page.locator('[data-section="aulas"]');
  await expect(aulas.locator('.eyebrow')).toHaveText('Conteúdo do curso');
  await expect(aulas.locator('.section-lead')).toHaveText(
    'Toque em cada aula para ver o que ela cobre. Aulas curtas, sem enrolação, cada uma termina com a conferência feita no seu próprio produto.',
  );

  const publico = page.locator('[data-section="publico"]');
  await expect(publico.locator('.eyebrow')).toHaveText('Para quem é');
  await expect(publico.locator('.card-yes .check-list li')).toHaveText([
    'Você está criando um SaaS com IA, vibe coding ou agente de código',
    'Você vai lançar, ou já lançou, sem ninguém testando além de você',
    'Seu maior medo é quebrar em produção na frente dos primeiros clientes',
    'Você quer um método curto de conferência, para repetir em todo lançamento',
  ]);
  await expect(publico.locator('.card-no .check-list li')).toHaveText([
    'Você quer uma formação completa em QA ou preparação para certificação',
    'Você procura automação avançada de testes e frameworks de código',
    'Seu produto já tem uma equipe de qualidade dedicada',
    'Você quer promessa de resultado financeiro, aqui não tem nenhuma',
  ]);

  const instrutor = page.locator('[data-section="instrutor"]');
  await expect(instrutor.locator('.eyebrow')).toHaveText('Quem ensina');
  await expect(instrutor.locator('.section-lead')).toHaveText(
    'Você vai ver por aí curso vendido com print de faturamento e promessa de resultado. Aqui a credibilidade é outra, é trabalho real, verificável, feito todos os dias.',
  );
  await expect(instrutor.locator('.instructor-list li')).toHaveText([
    'Team Lead de QA em laboratório de testes no Canadá, com software que não pode ir ao ar com erro',
    '95% de aprovação na primeira verificação dos produtos testados nos últimos 6 meses',
    'Reduziu uma triagem de bugs de 3 dias para menos de 24 horas',
    'Certificado CTFL, ISTQB, em 2026',
    'Mais de 10 anos em TI, de desenvolvedor full stack a líder de QA',
  ]);
  await expect(instrutor.locator('.instructor-text p')).toHaveText([
    'Eu trabalho testando software que não pode ir ao ar com erro. No laboratório onde lidero a área de QA, cada produto passa por uma verificação rigorosa antes de qualquer liberação, e cada problema encontrado volta para quem desenvolveu corrigir, com o processo rodando até ficar certo.',
    'É esse olhar que falta no SaaS feito com IA. Não é falta de código, o agente entrega código o dia inteiro. É falta de alguém conferindo o que importa, na ordem certa, antes do cliente. Foi exatamente esse método, simplificado para quem não é de QA, que virou as 7 aulas deste curso.',
    'Nada aqui é teoria de livro. É o mesmo raciocínio de priorização e conferência que eu uso no trabalho, traduzido para a realidade de quem constrói sozinho, com agente, e precisa lançar sem medo.',
  ]);

  await expect(page.locator('[data-section="faq"] .eyebrow')).toHaveText('Perguntas frequentes');
  await expect(page.locator('.final-cta .eyebrow')).toHaveText('Diagnóstico rápido');
});

test('TC-6 (AC-3): no em dash or en dash in the rendered page, attributes or quiz screens', async ({ page }) => {
  await page.goto('/');
  const html = await page.evaluate(() => document.documentElement.outerHTML);
  expect(html).not.toMatch(/[\u2013\u2014]/);

  await page.locator('button[data-open-quiz]:visible').first().click();
  for (let i = 0; i < 7; i += 1) {
    const quizText = await page.locator('.quiz').innerText();
    expect(quizText).not.toMatch(/[\u2013\u2014]/);
    await page.locator('.quiz-option').first().click();
    await page.locator('.quiz-next').click();
  }
  await page.getByLabel('Seu e-mail para ver o diagnóstico').fill('ana@site.com');
  await page.getByRole('button', { name: 'Ver meu diagnóstico' }).click();
  await expect(page.getByText('SEU DIAGNÓSTICO')).toBeVisible();
  const resultHtml = await page.evaluate(() => document.documentElement.outerHTML);
  expect(resultHtml).not.toMatch(/[\u2013\u2014]/);
});

test('TC-7 (AC-4): no waitlist wording, no e-mail field and no form outside the quiz modal', async ({ page }) => {
  await page.goto('/');
  const body = await page.locator('body').innerText();
  for (const wording of ['lista de espera', 'avise-me', 'garanta sua vaga', 'entrar na lista']) {
    expect(body.toLowerCase()).not.toContain(wording);
  }

  const outsideForms = await page.evaluate(
    () => document.querySelectorAll('main form, footer form, header form, main input[type="email"], footer input[type="email"]').length,
  );
  expect(outsideForms).toBe(0);
});

test('TC-8 (AC-5): the 15 source variables and both Google Fonts are loaded', async ({ page }) => {
  await page.goto('/');

  const values = await page.evaluate(
    (names) => {
      const style = getComputedStyle(document.documentElement);
      return Object.fromEntries(names.map((name) => [name, style.getPropertyValue(name).trim()]));
    },
    Object.keys(ROOT_VARS),
  );
  expect(values).toEqual(ROOT_VARS);

  const fontLink = await page.locator('link[href*="fonts.googleapis.com/css2"]').getAttribute('href');
  expect(fontLink).toContain('Archivo');
  expect(fontLink).toContain('IBM+Plex+Mono');

  await expect(page.locator('link[rel="preconnect"][href="https://fonts.googleapis.com"]')).toHaveCount(1);
  await expect(page.locator('link[rel="preconnect"][href="https://fonts.gstatic.com"]')).toHaveCount(1);
});

test('TC-9 (AC-6): the shield SVG sits complete inside the header logo box', async ({ page }) => {
  await page.goto('/');

  const logo = page.locator('.logo');
  await expect(logo).toHaveAttribute('href', '#topo');
  await expect(logo).toHaveAttribute('aria-label', 'Unflaky, Quality Lab');
  await expect(page.locator('.logo-name')).toHaveText('UNFLAKY');
  await expect(page.locator('.logo-sub')).toHaveText('QUALITY LAB');

  const box = await page.locator('.logo-box').boundingBox();
  const shield = await page.locator('.logo-shield').boundingBox();
  expect(box.width).toBeCloseTo(48, 0);
  expect(box.height).toBeCloseTo(48, 0);
  expect(shield.width).toBeCloseTo(32, 0);
  expect(shield.height).toBeCloseTo(32, 0);
  expect(shield.x).toBeGreaterThanOrEqual(box.x);
  expect(shield.y).toBeGreaterThanOrEqual(box.y);
  expect(shield.x + shield.width).toBeLessThanOrEqual(box.x + box.width);
  expect(shield.y + shield.height).toBeLessThanOrEqual(box.y + box.height);
});

test('TC-11 (AC-7): no console errors and no failed requests except optional Google Fonts', async ({ page }) => {
  const errors = [];
  const failed = [];

  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('requestfailed', (request) => {
    if (!/fonts\.(googleapis|gstatic)\.com/.test(request.url())) failed.push(request.url());
  });

  await page.goto('/');
  await page.waitForLoadState('networkidle');

  const relevant = errors.filter(
    (text) => !/fonts\.(googleapis|gstatic)\.com|ERR_(NAME|CONNECTION|INTERNET|CERT|BLOCKED)/.test(text),
  );
  expect(relevant).toEqual([]);
  expect(failed).toEqual([]);
});

test('TC-55 (AC-37): no horizontal overflow and the layout breaks at 900px and 620px', async ({ page }) => {
  await page.goto('/');

  for (const width of [320, 390, 620, 621, 900, 901, 1280]) {
    await page.setViewportSize({ width, height: 800 });
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow, `horizontal overflow at ${width}px`).toBeLessThanOrEqual(0);
  }

  await page.setViewportSize({ width: 901, height: 800 });
  expect(await columns(page, '.hero-grid')).toBe(2);
  expect(await columns(page, '.proof-grid')).toBe(4);
  expect(await columns(page, '[data-section="formato"] .grid-4')).toBe(4);
  expect(await columns(page, '.instructor')).toBe(2);

  await page.setViewportSize({ width: 900, height: 800 });
  expect(await columns(page, '.hero-grid')).toBe(1);
  expect(await columns(page, '.proof-grid')).toBe(2);
  expect(await columns(page, '[data-section="formato"] .grid-4')).toBe(2);
  expect(await columns(page, '.instructor')).toBe(1);
  expect(await columns(page, '[data-section="problema"] .grid-2')).toBe(2);

  await page.setViewportSize({ width: 621, height: 800 });
  expect(await columns(page, '[data-section="problema"] .grid-2')).toBe(2);
  expect(await columns(page, '[data-section="publico"] .grid-2')).toBe(2);

  await page.setViewportSize({ width: 620, height: 800 });
  expect(await columns(page, '[data-section="problema"] .grid-2')).toBe(1);
  expect(await columns(page, '[data-section="publico"] .grid-2')).toBe(1);
  expect(await columns(page, '[data-section="formato"] .grid-4')).toBe(1);
});

test('TC-56 (AC-38): reduced motion turns smooth scrolling and the plus rotation off', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');

  const scrollBehavior = await page.locator('html').evaluate((el) => getComputedStyle(el).scrollBehavior);
  expect(scrollBehavior).toBe('auto');

  const plusTransition = await page.locator('.acc-plus').first().evaluate((el) => getComputedStyle(el).transitionDuration);
  expect(plusTransition).toBe('0s');
});

test('TC-60 (AC-40): radii come from the token scale', async ({ page }) => {
  await page.goto('/');

  const radii = await page.evaluate(() => ({
    button: getComputedStyle(document.querySelector('.btn')).borderRadius,
    card: getComputedStyle(document.querySelector('.card')).borderRadius,
    logo: getComputedStyle(document.querySelector('.logo-box')).borderRadius,
  }));
  expect(radii).toEqual({ button: '8px', card: '16px', logo: '8px' });

  await page.locator('button[data-open-quiz]:visible').first().click();
  const phone = await page.locator('.phone-frame').evaluate((el) => getComputedStyle(el).borderRadius);
  expect(phone).toBe('40px');
});

test('TC-61 (AC-41): computed padding, margin and gap values belong to the spacing scale', async ({ page }) => {
  await page.goto('/');
  await page.locator('button[data-open-quiz]:visible').first().click();
  for (let i = 0; i < 7; i += 1) {
    await page.locator('.quiz-option').first().click();
    await page.locator('.quiz-next').click();
  }
  await page.getByLabel('Seu e-mail para ver o diagnóstico').fill('ana@site.com');
  await page.getByRole('button', { name: 'Ver meu diagnóstico' }).click();
  await expect(page.getByText('SEU DIAGNÓSTICO')).toBeVisible();

  const samples = await page.evaluate(() => {
    const selectors = [
      '.site-header .wrap',
      '.header-inner',
      '.logo',
      '.hero',
      '.hero h1',
      '.pill',
      '.cta-box',
      '.cta-box-title',
      '.conf-card',
      '.conf-head',
      '.conf-row',
      '.conf-foot',
      '.proof-item',
      '.section',
      '.section-head',
      '.diag-box',
      '.diag-copy h3',
      '.grid-2',
      '.card',
      '.card h3',
      '.tag',
      '.acc-trigger',
      '.acc-panel',
      '.instructor',
      '.instructor-card',
      '.check-list li',
      '.final-cta',
      '.footer-inner',
      '.phone-frame',
      '.quiz',
      '.quiz-top',
      '.quiz-question',
      '.quiz-hint',
      '.quiz-options',
      '.quiz-option',
      '.quiz-nav',
      '.progress',
      '.email-panel',
      '.email-row',
      '.result-head',
      '.result-areas',
      '.result-area',
      '.result-priority',
      '.result-actions',
      '.result-note',
    ];
    const properties = [
      'paddingTop',
      'paddingRight',
      'paddingBottom',
      'paddingLeft',
      'marginTop',
      'marginBottom',
      'gap',
      'rowGap',
      'columnGap',
    ];
    const out = [];
    for (const selector of selectors) {
      for (const node of document.querySelectorAll(selector)) {
        const style = getComputedStyle(node);
        for (const property of properties) {
          out.push({ selector, property, value: style[property] });
        }
      }
    }
    return out;
  });

  const allowed = new Set([0, 4, 8, 12, 16, 24, 32, 40, 48, 56, 64, 80, 96]);
  const offenders = samples.filter(({ value }) => {
    if (!value.endsWith('px')) return false;
    return !allowed.has(Number.parseFloat(value));
  });
  expect(offenders).toEqual([]);
});

test('TC-62 (AC-42): every font size comes from the type scale', async ({ page }) => {
  await page.goto('/');

  const sizes = await page.evaluate(() => {
    const out = [];
    for (const node of document.querySelectorAll('*')) {
      const size = getComputedStyle(node).fontSize;
      if (size.endsWith('px')) out.push({ tag: node.tagName, className: node.className, size });
    }
    return out;
  });

  const allowed = new Set([12, 14, 16, 18, 20, 24, 30, 36, 48, 60]);
  const offenders = sizes.filter(({ size }) => !allowed.has(Number.parseFloat(size)));
  expect(offenders).toEqual([]);
});
