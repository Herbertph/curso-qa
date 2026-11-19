import { expect, test } from '@playwright/test';
import { reachResult } from './helpers.js';

const LESSON_LABELS = ['AULA 01', 'AULA 02', 'AULA 03', 'AULA 04', 'AULA 05', 'AULA 06', 'AULA 07'];

test('TC-43 (AC-28): all first options give 14/14, the top band and every area conferido', async ({ page }) => {
  await page.goto('/');
  await reachResult(page, Array(7).fill(0), 'ana@site.com');

  await expect(page.locator('.result-points')).toHaveText('14/14');
  await expect(page.locator('.result-band-title')).toHaveText('Quase pronto, feche as lacunas');
  await expect(page.locator('.result-band-text')).toHaveText(
    'Sua base de conferência é boa. O que falta é transformar isso em método, para repetir a conferência inteira a cada lançamento.',
  );
  await expect(page.locator('.result-area .area-status')).toHaveText(Array(7).fill('conferido'));
  await expect(page.locator('.result-priority')).toHaveText(
    'Nenhuma área descoberta. No curso, seu ganho é o método completo e a lista de liberação para repetir isso em todo lançamento.',
  );
  await expect(page.locator('.result-note')).toHaveText(
    'Guarde suas áreas descobertas, elas viram o seu plano de conferência antes do próximo lançamento.',
  );
});

test('TC-44 (AC-29): all last options give 0/14, the risk band and every area descoberto', async ({ page }) => {
  await page.goto('/');
  await reachResult(page, Array(7).fill(2));

  await expect(page.locator('.result-points')).toHaveText('0/14');
  await expect(page.locator('.result-band-title')).toHaveText('Lançamento em risco');
  await expect(page.locator('.result-band-text')).toHaveText(
    'A maior parte das áreas críticas nunca foi conferida. Se um cliente encontrar esses bugs antes de você, ele encontra todos de uma vez.',
  );
  await expect(page.locator('.result-area .area-status')).toHaveText(Array(7).fill('descoberto'));
  await expect(page.locator('.result-priority')).toHaveText(
    'Suas aulas prioritárias: Aula 01 (Login e sessão), Aula 02 (Pagamento e checkout), Aula 03 (Salvamento e perda de dados), Aula 04 (Permissões e acesso), Aula 05 (Fluxo principal ponta a ponta), Aula 06 (Erros e casos limite), Aula 07 (Mobile e navegadores). São exatamente essas áreas que o curso destrincha, com o prompt pronto e a conferência manual de cada uma.',
  );
});

test('TC-45 (AC-30): a total of 4 stays in the risk band', async ({ page }) => {
  await page.goto('/');
  await reachResult(page, [0, 0, 2, 2, 2, 2, 2]);
  await expect(page.locator('.result-points')).toHaveText('4/14');
  await expect(page.locator('.result-band-title')).toHaveText('Lançamento em risco');
});

test('TC-46 (AC-30): a total of 10 enters the top band', async ({ page }) => {
  await page.goto('/');
  await reachResult(page, [0, 0, 0, 0, 1, 1, 2]);
  await expect(page.locator('.result-points')).toHaveText('10/14');
  await expect(page.locator('.result-band-title')).toHaveText('Quase pronto, feche as lacunas');
});

test('TC-47 (AC-31): mixed answers show each area status, its lesson and only the weak areas as priority', async ({ page }) => {
  await page.goto('/');
  await reachResult(page, [0, 1, 2, 0, 1, 2, 0]);

  await expect(page.locator('.result-points')).toHaveText('8/14');
  await expect(page.locator('.result-area .area-name')).toHaveText([
    'Login e sessão',
    'Pagamento e checkout',
    'Salvamento e perda de dados',
    'Permissões e acesso',
    'Fluxo principal ponta a ponta',
    'Erros e casos limite',
    'Mobile e navegadores',
  ]);
  await expect(page.locator('.result-area .area-status')).toHaveText([
    'conferido',
    'parcial',
    'descoberto',
    'conferido',
    'parcial',
    'descoberto',
    'conferido',
  ]);
  await expect(page.locator('.result-area .area-lesson')).toHaveText(LESSON_LABELS);
  await expect(page.locator('.result-priority')).toHaveText(
    'Suas aulas prioritárias: Aula 02 (Pagamento e checkout), Aula 03 (Salvamento e perda de dados), Aula 05 (Fluxo principal ponta a ponta), Aula 06 (Erros e casos limite). São exatamente essas áreas que o curso destrincha, com o prompt pronto e a conferência manual de cada uma.',
  );
});
