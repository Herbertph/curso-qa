// Fire-and-forget MailerLite lead capture (spec FR-2 to FR-4). Never awaited by the quiz, never shows an error.

import { MAILERLITE_ACCOUNT_ID, MAILERLITE_FORM_ID } from './config.js';
import { buildLead } from './scoring.js';

const TIMEOUT_MS = 8000;

export function leadEndpoint(accountId, formId) {
  return `https://assets.mailerlite.com/jsonp/${accountId}/forms/${formId}/subscribe`;
}

export function buildLeadBody(lead) {
  const body = new URLSearchParams();
  body.set('fields[email]', lead.email);
  body.set('fields[quiz_score]', String(lead.quiz_score));
  body.set('fields[quiz_band]', lead.quiz_band);
  body.set('fields[quiz_open_areas]', lead.quiz_open_areas);
  body.set('ml-submit', '1');
  body.set('anticsrf', 'true');
  return body;
}

export function sendLead(
  email,
  answers,
  { accountId = MAILERLITE_ACCOUNT_ID, formId = MAILERLITE_FORM_ID, fetchImpl = globalThis.fetch, timeoutMs = TIMEOUT_MS } = {},
) {
  if (!accountId || !formId || typeof fetchImpl !== 'function') return null;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return Promise.resolve(
      fetchImpl(leadEndpoint(accountId, formId), {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: buildLeadBody(buildLead(email, answers)).toString(),
        signal: controller.signal,
      }),
    )
      .catch(() => {})
      .finally(() => clearTimeout(timer));
  } catch {
    clearTimeout(timer);
    return null;
  }
}
