import { createCheckoutControl } from './checkout.js';
import { sendLead } from './lead.js';
import { AREAS, EMAIL_COPY, OFFER_COPY, OPTIONS, QUESTIONS_COPY, RESULT_COPY } from './quiz-data.js';
import {
  bandFor,
  formatPriorityList,
  isValidEmail,
  priorityAreas,
  statusFor,
  totalScore,
} from './scoring.js';

const ICONS = { check: '✓', dot: '•', x: 'x' };
const STATUS_CLASS = { check: 'status-ok', dot: 'status-pending', x: 'status-fail' };

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

export function createQuiz(root, { onSeeLessons } = {}) {
  const state = {
    step: 'question',
    index: 0,
    answers: Array(AREAS.length).fill(null),
    email: '',
  };

  function reset() {
    state.step = 'question';
    state.index = 0;
    state.answers = Array(AREAS.length).fill(null);
    state.email = '';
    render();
  }

  function scrollScreenToTop() {
    const screen = root.closest('.phone-screen');
    if (screen) screen.scrollTop = 0;
  }

  function topRow(leftText, rightText, rightClass = 'quiz-count') {
    const row = el('div', 'quiz-top');
    row.append(el('span', 'quiz-area', leftText), el('span', rightClass, rightText));
    return row;
  }

  function progressBar(percent) {
    const track = el('div', 'progress');
    track.setAttribute('role', 'progressbar');
    track.setAttribute('aria-valuemin', '0');
    track.setAttribute('aria-valuemax', '100');
    track.setAttribute('aria-valuenow', String(Math.round(percent)));
    const fill = el('div', 'progress-fill');
    fill.style.width = `${percent}%`;
    track.append(fill);
    return track;
  }

  function renderQuestion() {
    const entry = AREAS[state.index];
    const fragment = document.createDocumentFragment();

    fragment.append(
      topRow(`${QUESTIONS_COPY.areaLabel} ${state.index + 1} ${QUESTIONS_COPY.ofSeven}, ${entry.area.toUpperCase()}`, QUESTIONS_COPY.counter(state.index + 1)),
      progressBar((state.index / AREAS.length) * 100),
      el('h2', 'quiz-question', entry.question),
      el('p', 'quiz-hint', entry.hint),
    );

    const options = el('div', 'quiz-options');
    options.setAttribute('role', 'group');
    options.setAttribute('aria-label', 'Respostas');

    const selectedPoints = state.answers[state.index];
    const buttons = OPTIONS.map((option) => {
      const button = el('button', 'quiz-option');
      button.type = 'button';
      button.setAttribute('aria-pressed', String(option.points === selectedPoints));
      button.append(el('span', 'option-dot'), el('span', 'option-label', option.label));
      button.addEventListener('click', () => {
        state.answers[state.index] = option.points;
        buttons.forEach((other) => other.setAttribute('aria-pressed', String(other === button)));
        next.disabled = false;
      });
      return button;
    });
    options.append(...buttons);

    const nav = el('div', 'quiz-nav');
    const back = el('button', 'btn btn-ghost quiz-back', QUESTIONS_COPY.back);
    back.type = 'button';
    if (state.index === 0) {
      back.classList.add('is-hidden');
      back.tabIndex = -1;
    }
    back.addEventListener('click', () => {
      if (state.index === 0) return;
      state.index -= 1;
      render();
    });

    const isLast = state.index === AREAS.length - 1;
    const next = el('button', 'btn btn-gold quiz-next', isLast ? QUESTIONS_COPY.last : QUESTIONS_COPY.next);
    next.type = 'button';
    next.disabled = selectedPoints === null;
    next.addEventListener('click', () => {
      if (state.answers[state.index] === null) return;
      if (isLast) {
        state.step = 'email';
      } else {
        state.index += 1;
      }
      render();
    });

    nav.append(back, next);
    fragment.append(options, nav);
    root.replaceChildren(fragment);
    scrollScreenToTop();
  }

  function renderEmail() {
    const fragment = document.createDocumentFragment();
    fragment.append(
      topRow(EMAIL_COPY.eyebrow, EMAIL_COPY.counter),
      progressBar(100),
      el('h2', 'quiz-question', EMAIL_COPY.title),
      el('p', 'quiz-hint', EMAIL_COPY.text),
    );

    const panel = el('div', 'email-panel');
    const form = el('form', 'email-form');
    form.noValidate = true;

    const row = el('div', 'email-row');
    const label = el('label', 'email-label', EMAIL_COPY.label);
    label.htmlFor = 'quiz-email';

    const input = el('input', 'email-input');
    input.id = 'quiz-email';
    input.type = 'email';
    input.autocomplete = 'email';
    input.placeholder = EMAIL_COPY.placeholder;
    input.setAttribute('aria-describedby', 'quiz-email-error');

    const submit = el('button', 'btn btn-gold btn-lg email-submit', EMAIL_COPY.button);
    submit.type = 'submit';

    const error = el('p', 'email-error');
    error.id = 'quiz-email-error';
    error.hidden = true;
    error.setAttribute('role', 'alert');

    row.append(label, input, error, submit);
    form.append(row);

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!isValidEmail(input.value)) {
        error.textContent = EMAIL_COPY.error;
        error.hidden = false;
        input.focus();
        return;
      }
      error.hidden = true;
      state.email = input.value;
      state.step = 'result';
      render();
      sendLead(state.email, state.answers);
    });

    const privacy = el('p', 'email-privacy');
    const privacyLink = el('a', 'privacy-link', EMAIL_COPY.privacyLink);
    privacyLink.href = 'privacidade.html';
    privacyLink.target = '_blank';
    privacyLink.rel = 'noopener';
    privacy.append(document.createTextNode(EMAIL_COPY.privacyNotice), document.createTextNode(' '), privacyLink);

    panel.append(form, el('p', 'email-note', EMAIL_COPY.note), privacy);
    fragment.append(panel);
    root.replaceChildren(fragment);
    scrollScreenToTop();
  }

  function renderOffer(openCount) {
    const offer = el('section', 'offer');
    offer.id = 'oferta';
    offer.append(
      el('p', 'offer-eyebrow', OFFER_COPY.eyebrow),
      el('h3', 'offer-headline', OFFER_COPY.headline(openCount)),
      el('p', 'offer-text', OFFER_COPY.text),
    );

    const list = el('ul', 'offer-list');
    for (const item of OFFER_COPY.items) {
      const check = el('span', 'offer-check', ICONS.check);
      check.setAttribute('aria-hidden', 'true');
      const row = el('li', 'offer-item');
      row.append(check, el('span', null, item));
      list.append(row);
    }

    const price = el('p', 'offer-price');
    price.append(
      el('span', 'offer-price-value', OFFER_COPY.price),
      el('span', 'offer-price-label', OFFER_COPY.priceLabel),
    );

    offer.append(
      list,
      price,
      createCheckoutControl(OFFER_COPY.button, 'btn btn-gold btn-lg btn-block offer-cta'),
      el('p', 'offer-note', OFFER_COPY.note),
    );
    return offer;
  }

  function renderResult() {
    const score = totalScore(state.answers);
    const band = bandFor(score);
    const fragment = document.createDocumentFragment();

    fragment.append(topRow(RESULT_COPY.eyebrow, state.email, 'quiz-email'), progressBar(100));

    const head = el('div', 'result-head');
    const points = el('p', 'result-points', String(score));
    points.append(el('span', 'result-total', '/14'));
    const bandBox = el('div', 'result-band');
    bandBox.append(el('h2', 'result-band-title', band.title), el('p', 'result-band-text', band.text));
    head.append(points, bandBox);
    fragment.append(head);

    const list = el('ul', 'result-areas');
    AREAS.forEach((entry, index) => {
      const status = statusFor(state.answers[index]);
      const box = el('span', `status-box ${STATUS_CLASS[status.icon]}`, ICONS[status.icon]);
      box.setAttribute('aria-hidden', 'true');
      const row = el('li', 'result-area');
      row.append(
        box,
        el('span', 'area-name', entry.area),
        el('span', 'area-status', status.label),
        el('span', 'area-lesson', `AULA ${entry.lesson}`),
      );
      list.append(row);
    });
    fragment.append(list);

    const priorities = priorityAreas(state.answers);
    const priority = el('p', 'result-priority');
    if (priorities.length > 0) {
      priority.append(
        el('strong', null, RESULT_COPY.priorityIntro),
        document.createTextNode(`: ${formatPriorityList(priorities)}. ${RESULT_COPY.priorityOutro}`),
      );
    } else {
      priority.append(
        el('strong', null, RESULT_COPY.noneTitle),
        document.createTextNode(`. ${RESULT_COPY.noneText}`),
      );
    }
    fragment.append(priority, renderOffer(priorities.length));

    const actions = el('div', 'result-actions');
    const lessons = el('button', 'btn btn-ghost btn-lg', RESULT_COPY.lessonsButton);
    lessons.type = 'button';
    lessons.addEventListener('click', () => {
      if (onSeeLessons) onSeeLessons();
    });
    const redo = el('button', 'btn btn-ghost', RESULT_COPY.redoButton);
    redo.type = 'button';
    redo.addEventListener('click', reset);
    actions.append(lessons, redo);
    fragment.append(actions, el('p', 'result-note', RESULT_COPY.note));

    root.replaceChildren(fragment);
    scrollScreenToTop();
  }

  function render() {
    if (state.step === 'question') {
      renderQuestion();
    } else if (state.step === 'email') {
      renderEmail();
    } else {
      renderResult();
    }
  }

  render();

  return {
    reset,
    getState: () => ({ ...state, answers: [...state.answers] }),
  };
}
