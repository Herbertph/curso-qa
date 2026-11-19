// Checkout controls. While CHECKOUT_URL is empty the control still renders (layout review) but does nothing.

import { CHECKOUT_URL } from './config.js';
import { OFFER_COPY } from './quiz-data.js';

export function createCheckoutControl(label, className) {
  if (!CHECKOUT_URL) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = className;
    button.textContent = label;
    return button;
  }

  const link = document.createElement('a');
  link.className = className;
  link.href = CHECKOUT_URL;
  link.textContent = label;
  return link;
}

export function initCourseOffer(root) {
  if (!root) return;

  const line = document.createElement('p');
  line.className = 'course-price';
  line.textContent = OFFER_COPY.courseLine;

  root.append(line, createCheckoutControl(OFFER_COPY.button, 'btn btn-ghost course-cta'));
}
