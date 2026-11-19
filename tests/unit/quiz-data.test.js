import { describe, expect, it } from 'vitest';
import {
  AREAS,
  BANDS,
  EMAIL_COPY,
  OFFER_COPY,
  OPTIONS,
  PRIVACY_COPY,
  QUESTIONS_COPY,
  RESULT_COPY,
  STATUS,
} from '../../src/quiz-data.js';

const strings = (value) => {
  if (typeof value === 'string') return [value];
  if (Array.isArray(value)) return value.flatMap(strings);
  if (value && typeof value === 'object') return Object.values(value).flatMap(strings);
  return [];
};

describe('quiz data', () => {
  it('has the 7 areas with their lesson numbers, questions and hints', () => {
    expect(AREAS).toHaveLength(7);
    expect(AREAS.map((entry) => entry.lesson)).toEqual(['01', '02', '03', '04', '05', '06', '07']);
    for (const entry of AREAS) {
      expect(entry.area.length).toBeGreaterThan(0);
      expect(entry.question.length).toBeGreaterThan(0);
      expect(entry.hint.length).toBeGreaterThan(0);
    }
  });

  it('has the 3 options in order with 2, 1 and 0 points', () => {
    expect(OPTIONS.map((option) => option.label)).toEqual([
      'Sim, já testei isso de verdade',
      'Testei só o caminho normal, sem erro',
      'Nunca testei isso',
    ]);
    expect(OPTIONS.map((option) => option.points)).toEqual([2, 1, 0]);
  });

  it('has the 3 bands with exact limits', () => {
    expect(BANDS.map(({ min, max }) => [min, max])).toEqual([
      [0, 4],
      [5, 9],
      [10, 14],
    ]);
    expect(BANDS.map((band) => band.title)).toEqual([
      'Lançamento em risco',
      'Base parcial, buracos abertos',
      'Quase pronto, feche as lacunas',
    ]);
  });

  it('uses the three status labels in lowercase', () => {
    expect(STATUS[2].label).toBe('conferido');
    expect(STATUS[1].label).toBe('parcial');
    expect(STATUS[0].label).toBe('descoberto');
  });

  it('has the exact quiz, e-mail and result strings', () => {
    expect(QUESTIONS_COPY.counter(3)).toBe('Pergunta 3 de 7');
    expect(QUESTIONS_COPY.last).toBe('Ver o que falta');
    expect(EMAIL_COPY.error).toBe('Confira o e-mail digitado, parece que falta alguma coisa nele.');
    expect(EMAIL_COPY.label).toBe('Seu e-mail para ver o diagnóstico');
    expect(RESULT_COPY.priorityIntro).toBe('Suas aulas prioritárias');
    expect(RESULT_COPY.redoButton).toBe('Refazer o diagnóstico');
  });

  it('has the exact privacy notice, offer and privacy page strings', () => {
    expect(EMAIL_COPY.privacyNotice).toBe(
      'Ao continuar, você aceita receber e-mails da Unflaky sobre o curso. Dá para sair quando quiser.',
    );
    expect(EMAIL_COPY.privacyLink).toBe('Política de privacidade');
    expect(OFFER_COPY.eyebrow).toBe('PRÓXIMO PASSO');
    expect(OFFER_COPY.headline(0)).toBe('Sua base é boa, o curso transforma isso em método');
    expect(OFFER_COPY.headline(1)).toBe('Sua área aberta é exatamente o que o curso ensina a conferir');
    expect(OFFER_COPY.headline(3)).toBe('Suas 3 áreas abertas são exatamente o que o curso ensina a conferir');
    expect(OFFER_COPY.items).toHaveLength(4);
    expect(OFFER_COPY.price).toBe('R$ 9,90');
    expect(OFFER_COPY.priceLabel).toBe('à vista');
    expect(OFFER_COPY.button).toBe('Quero o curso');
    expect(OFFER_COPY.note).toBe('Pagamento pela Kiwify. 7 dias de garantia.');
    expect(OFFER_COPY.courseLine).toBe('Curso completo por R$ 9,90, à vista, com 7 dias de garantia.');
    expect(PRIVACY_COPY.title).toBe('Política de privacidade');
    expect(PRIVACY_COPY.sections).toHaveLength(5);
    expect(PRIVACY_COPY.rights('')).toBe(
      'Pela LGPD, você pode pedir acesso, correção ou exclusão dos seus dados a qualquer momento. Todo e-mail tem um link para sair da lista.',
    );
    expect(PRIVACY_COPY.rights('oi@site.com')).toBe(
      'Pela LGPD, você pode pedir acesso, correção ou exclusão dos seus dados a qualquer momento. Todo e-mail tem um link para sair da lista, e você também pode escrever para oi@site.com.',
    );
    expect(PRIVACY_COPY.back).toBe('Voltar para a página do curso');
  });

  it('never uses an em dash or an en dash', () => {
    const all = strings([
      AREAS,
      BANDS,
      OPTIONS,
      STATUS,
      EMAIL_COPY,
      RESULT_COPY,
      OFFER_COPY,
      PRIVACY_COPY,
    ]);
    for (const text of all) {
      expect(text).not.toMatch(/[\u2013\u2014]/);
    }
  });
});
