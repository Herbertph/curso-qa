// Public configuration (spec FR-1). MailerLite account and form IDs are public identifiers from the embed
// code, never an API key or token. The values stay empty until Herbert fills them in.
// End-to-end tests switch them through `window.__TEST_CONFIG__` (Playwright `addInitScript`); see CLAUDE.md.

const DEFAULTS = {
  MAILERLITE_ACCOUNT_ID: '',
  MAILERLITE_FORM_ID: '',
  CHECKOUT_URL: '',
  PRIVACY_CONTACT_EMAIL: '',
};

const overrides = (typeof window !== 'undefined' && window.__TEST_CONFIG__) || {};

const value = (key) => {
  const override = overrides[key];
  return typeof override === 'string' ? override : DEFAULTS[key];
};

export const MAILERLITE_ACCOUNT_ID = value('MAILERLITE_ACCOUNT_ID');
export const MAILERLITE_FORM_ID = value('MAILERLITE_FORM_ID');
export const CHECKOUT_URL = value('CHECKOUT_URL');
export const PRIVACY_CONTACT_EMAIL = value('PRIVACY_CONTACT_EMAIL');
