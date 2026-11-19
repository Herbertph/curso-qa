import { describe, expect, it } from 'vitest';
import {
  bandFor,
  formatPriorityList,
  isValidEmail,
  pointsFor,
  priorityAreas,
  statusFor,
  totalScore,
} from '../../src/scoring.js';

const all = (points) => Array(7).fill(points);

describe('totalScore', () => {
  it('sums the 7 answers, 0 to 14', () => {
    expect(totalScore(all(2))).toBe(14);
    expect(totalScore(all(0))).toBe(0);
    expect(totalScore([2, 1, 0, 2, 1, 0, 2])).toBe(8);
  });

  it('counts an unanswered question as zero', () => {
    expect(totalScore([2, null, 1, undefined, 2, 2, 2])).toBe(9);
  });
});

describe('pointsFor', () => {
  it('maps option order to 2, 1 and 0 points', () => {
    expect(pointsFor(0)).toBe(2);
    expect(pointsFor(1)).toBe(1);
    expect(pointsFor(2)).toBe(0);
  });
});

describe('bandFor', () => {
  it.each([
    [0, 'Lançamento em risco'],
    [4, 'Lançamento em risco'],
    [5, 'Base parcial, buracos abertos'],
    [9, 'Base parcial, buracos abertos'],
    [10, 'Quase pronto, feche as lacunas'],
    [14, 'Quase pronto, feche as lacunas'],
  ])('score %i belongs to "%s"', (score, title) => {
    expect(bandFor(score).title).toBe(title);
  });
});

describe('statusFor', () => {
  it('maps 2, 1 and 0 points to the three statuses', () => {
    expect(statusFor(2)).toEqual({ label: 'conferido', icon: 'check' });
    expect(statusFor(1)).toEqual({ label: 'parcial', icon: 'dot' });
    expect(statusFor(0)).toEqual({ label: 'descoberto', icon: 'x' });
  });
});

describe('priorityAreas', () => {
  it('returns no area when every answer has 2 points', () => {
    expect(priorityAreas(all(2))).toEqual([]);
  });

  it('lists every area below 2 points in lesson order', () => {
    const areas = priorityAreas(all(0));
    expect(areas).toHaveLength(7);
    expect(areas[0]).toEqual({ lesson: '01', area: 'Login e sessão' });
    expect(areas[6]).toEqual({ lesson: '07', area: 'Mobile e navegadores' });
  });

  it('includes partial answers and keeps question order', () => {
    const areas = priorityAreas([2, 1, 0, 2, 1, 0, 2]);
    expect(areas.map((item) => item.lesson)).toEqual(['02', '03', '05', '06']);
  });
});

describe('formatPriorityList', () => {
  it('formats areas as Aula NN (Área), comma separated', () => {
    expect(
      formatPriorityList([
        { lesson: '01', area: 'Login e sessão' },
        { lesson: '02', area: 'Pagamento e checkout' },
      ]),
    ).toBe('Aula 01 (Login e sessão), Aula 02 (Pagamento e checkout)');
  });

  it('returns an empty string for no areas', () => {
    expect(formatPriorityList([])).toBe('');
  });
});

describe('isValidEmail', () => {
  it.each(['ana@site.com', 'a.b+c@sub.dominio.com.br'])('accepts %s', (value) => {
    expect(isValidEmail(value)).toBe(true);
  });

  it.each([
    '',
    '   ',
    'ana',
    'ana@',
    '@site.com',
    'ana@site',
    'ana@site.c',
    'ana silva@site.com',
    'ana@@site.com',
  ])('rejects %j', (value) => {
    expect(isValidEmail(value)).toBe(false);
  });
});
