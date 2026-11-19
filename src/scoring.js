// Pure quiz logic. No DOM access in this module (spec, technical notes).

import { AREAS, BANDS, OPTIONS, STATUS } from './quiz-data.js';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function pointsFor(optionIndex) {
  const option = OPTIONS[optionIndex];
  return option ? option.points : 0;
}

export function totalScore(answers) {
  return answers.reduce((sum, points) => sum + (typeof points === 'number' ? points : 0), 0);
}

export function bandFor(score) {
  return BANDS.find((band) => score >= band.min && score <= band.max) ?? BANDS[0];
}

export function statusFor(points) {
  return STATUS[points] ?? STATUS[0];
}

export function priorityAreas(answers) {
  return AREAS.map((entry, index) => ({ ...entry, points: answers[index] }))
    .filter((entry) => (typeof entry.points === 'number' ? entry.points : 0) < 2)
    .map(({ lesson, area }) => ({ lesson, area }));
}

export function formatPriorityList(areas) {
  return areas.map(({ lesson, area }) => `Aula ${lesson} (${area})`).join(', ');
}

export function isValidEmail(value) {
  return EMAIL_PATTERN.test(value);
}
