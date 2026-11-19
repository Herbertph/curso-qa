import { describe, expect, it } from 'vitest';
import { buildLeadBody, leadEndpoint, sendLead } from '../../src/lead.js';

const ANSWERS = [2, 1, 0, 2, 1, 0, 2];

describe('leadEndpoint', () => {
  it('uses the public MailerLite embedded-form subscribe URL', () => {
    expect(leadEndpoint('123', '456')).toBe('https://assets.mailerlite.com/jsonp/123/forms/456/subscribe');
  });
});

describe('buildLeadBody', () => {
  it('maps the lead to the MailerLite custom fields plus the embedded-form flags', () => {
    const body = buildLeadBody({
      email: 'ana@site.com',
      quiz_score: 8,
      quiz_band: 'Base parcial, buracos abertos',
      quiz_open_areas: 'Pagamento e checkout, Erros e casos limite',
    });

    expect(body.get('fields[email]')).toBe('ana@site.com');
    expect(body.get('fields[quiz_score]')).toBe('8');
    expect(body.get('fields[quiz_band]')).toBe('Base parcial, buracos abertos');
    expect(body.get('fields[quiz_open_areas]')).toBe('Pagamento e checkout, Erros e casos limite');
    expect(body.get('ml-submit')).toBe('1');
    expect(body.get('anticsrf')).toBe('true');
  });
});

describe('sendLead', () => {
  it('sends nothing while either MailerLite ID is empty', () => {
    let calls = 0;
    const fetchImpl = () => {
      calls += 1;
      return Promise.resolve({});
    };

    expect(sendLead('ana@site.com', ANSWERS, { accountId: '', formId: '456', fetchImpl })).toBeNull();
    expect(sendLead('ana@site.com', ANSWERS, { accountId: '123', formId: '', fetchImpl })).toBeNull();
    expect(calls).toBe(0);
  });

  it('posts the lead once to the configured form', async () => {
    const calls = [];
    const fetchImpl = (url, init) => {
      calls.push({ url, init });
      return Promise.resolve({ ok: true });
    };

    await sendLead(' ana@site.com ', ANSWERS, { accountId: '123', formId: '456', fetchImpl });

    expect(calls).toHaveLength(1);
    expect(calls[0].url).toBe('https://assets.mailerlite.com/jsonp/123/forms/456/subscribe');
    expect(calls[0].init.method).toBe('POST');
    expect(calls[0].init.mode).toBe('no-cors');

    const body = new URLSearchParams(calls[0].init.body);
    expect(body.get('fields[email]')).toBe('ana@site.com');
    expect(body.get('fields[quiz_score]')).toBe('8');
  });

  it('swallows every request failure', async () => {
    const fetchImpl = () => Promise.reject(new Error('network down'));
    await expect(sendLead('ana@site.com', ANSWERS, { accountId: '123', formId: '456', fetchImpl })).resolves.toBeUndefined();
  });
});
