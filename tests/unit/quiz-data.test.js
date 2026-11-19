import { describe, expect, it } from 'vitest';
import { AREAS, BANDS, EMAIL_COPY, OPTIONS, QUESTIONS_COPY, RESULT_COPY, STATUS } from '../../src/quiz-data.js';

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

  it('never uses an em dash or an en dash', () => {
    const all = strings([AREAS, BANDS, OPTIONS, STATUS, EMAIL_COPY, RESULT_COPY]);
    for (const text of all) {
      expect(text).not.toMatch(/[\u2013\u2014]/);
    }
  });
});
