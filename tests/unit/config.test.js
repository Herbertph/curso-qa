import { describe, expect, it } from 'vitest';
import {
  CHECKOUT_URL,
  MAILERLITE_ACCOUNT_ID,
  MAILERLITE_FORM_ID,
  PRIVACY_CONTACT_EMAIL,
} from '../../src/config.js';

describe('config', () => {
  it('ships every public value empty in the repository', () => {
    expect(MAILERLITE_ACCOUNT_ID).toBe('');
    expect(MAILERLITE_FORM_ID).toBe('');
    expect(CHECKOUT_URL).toBe('');
    expect(PRIVACY_CONTACT_EMAIL).toBe('');
  });

  it.todo(
    'CHECKOUT_URL stays empty until Herbert fills it in, so both "Quero o curso" controls render but do nothing',
  );
});
