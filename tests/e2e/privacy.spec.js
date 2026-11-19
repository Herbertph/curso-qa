import { expect, test } from '@playwright/test';
import { reachEmail, useConfig, TEST_CONFIG } from './helpers.js';

const NOTICE =
  'Ao continuar, você aceita receber e-mails da Unflaky sobre o curso. Dá para sair quando quiser.';
const RIGHTS_WITHOUT_CONTACT =
  'Pela LGPD, você pode pedir acesso, correção ou exclusão dos seus dados a qualquer momento. Todo e-mail tem um link para sair da lista.';

const SECTIONS = [
  ['Quem cuida dos seus dados', 'Herbert Parasio, responsável pela Unflaky, Quality Lab.'],
  [
    'O que coletamos',
    'Quando você faz o diagnóstico e confirma seu e-mail, guardamos o e-mail, a pontuação, a faixa do resultado e as áreas que ficaram abertas. Não coletamos nome, telefone, documento ou dados de pagamento nesta página.',
  ],
  [
    'Para que usamos',
    'Para enviar e-mails sobre o curso Teste Antes de Lançar e conteúdos de qualidade de software ligados ao seu resultado. Não vendemos nem compartilhamos sua lista com terceiros para fins de marketing.',
  ],
  [
    'Onde os dados ficam',
    'Os dados ficam guardados no MailerLite, a ferramenta que usamos para enviar os e-mails. Os servidores do MailerLite podem ficar fora do Brasil. Os pagamentos do curso são feitos na Kiwify, que tem a própria política de privacidade.',
  ],
  [
    'Por quanto tempo',
    'Enquanto você continuar inscrito. Se você sair da lista, seus dados deixam de ser usados para envio.',
  ],
];

test('AC-8: the e-mail screen shows the privacy notice and the new-tab privacy link', async ({ page }) => {
  await page.goto('/');
  await reachEmail(page);

  const notice = page.locator('.email-privacy');
  await expect(notice).toHaveText(`${NOTICE} Política de privacidade`);

  const link = notice.getByRole('link', { name: 'Política de privacidade' });
  await expect(link).toHaveAttribute('href', 'privacidade.html');
  await expect(link).toHaveAttribute('target', '_blank');
  await expect(link).toHaveAttribute('rel', 'noopener');
});

test('AC-9: the privacy page has the exact copy, language, title and a working back link', async ({ page }) => {
  await page.goto('/privacidade.html');

  await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR');
  await expect(page).toHaveTitle('Política de privacidade, Teste Antes de Lançar');
  await expect(page.locator('.privacy-title')).toHaveText('Política de privacidade');
  await expect(page.locator('.privacy-intro')).toHaveText(
    'Esta página explica quais dados o diagnóstico Teste Antes de Lançar coleta, para que eles servem e como você pode pedir para apagá-los.',
  );
  await expect(page.locator('.privacy-section h2')).toHaveText([...SECTIONS.map(([title]) => title), 'Seus direitos']);
  await expect(page.locator('.privacy-section p')).toHaveText([
    ...SECTIONS.map(([, body]) => body),
    RIGHTS_WITHOUT_CONTACT,
  ]);

  const html = await page.evaluate(() => document.documentElement.outerHTML);
  expect(html).not.toMatch(/[\u2013\u2014]/);

  const back = page.getByRole('link', { name: 'Voltar para a página do curso' });
  await expect(back).toHaveAttribute('href', 'index.html');
  await back.click();
  await expect(page.locator('.hero h1')).toBeVisible();
});

test('AC-10: the contact e-mail is hidden while PRIVACY_CONTACT_EMAIL is empty', async ({ page }) => {
  await page.goto('/privacidade.html');

  const rights = page.locator('.privacy-section').last();
  await expect(rights.locator('p')).toHaveText(RIGHTS_WITHOUT_CONTACT);
  await expect(rights).not.toContainText('você também pode escrever');
});

test('AC-10: the contact e-mail appears as text when PRIVACY_CONTACT_EMAIL is set', async ({ page }) => {
  await useConfig(page, { ...TEST_CONFIG, PRIVACY_CONTACT_EMAIL: 'privacidade@unflaky.com' });
  await page.goto('/privacidade.html');

  const rights = page.locator('.privacy-section').last();
  await expect(rights.locator('p')).toHaveText(
    'Pela LGPD, você pode pedir acesso, correção ou exclusão dos seus dados a qualquer momento. Todo e-mail tem um link para sair da lista, e você também pode escrever para privacidade@unflaky.com.',
  );
});
