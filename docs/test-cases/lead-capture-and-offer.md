# Test cases: lead-capture-and-offer

Spec: `docs/specs/lead-capture-and-offer.md`. Branch: `feature/lead-capture-and-offer`.

## Traceability

| AC | Test cases |
| --- | --- |
| AC-1 | TC-1, TC-30, TC-31, TC-32 |
| AC-2 | TC-2, TC-3 |
| AC-3 | TC-4 |
| AC-4 | TC-5, TC-6, TC-7, TC-33 |
| AC-5 | TC-8, TC-9 |
| AC-6 | TC-10 |
| AC-7 | TC-11, TC-12 |
| AC-8 | TC-13, TC-35 |
| AC-9 | TC-14 |
| AC-10 | TC-15, TC-16 |
| AC-11 | TC-17 |
| AC-12 | TC-18 |
| AC-13 | TC-19 |
| AC-14 | TC-20 |
| AC-15 | TC-21, TC-34 |
| AC-16 | TC-22 |
| AC-17 | TC-23 |
| AC-18 | TC-24 |
| AC-19 | TC-25 |
| AC-20 | TC-26 |
| AC-21 | TC-27 |
| AC-22 | TC-28 |
| FR-1 | TC-29 |
| FR-10 | TC-29 |
| FR-3 | TC-36 |

The developer named the acceptance tests by AC only (`AC-n: ...`); they are mapped here by exact test name. Tests added by QA start with their TC ID.

### TC-1: valid submit sends one lead with the right fields
- **Acceptance criterion:** AC-1
- **Priority:** high
- **Type:** functional
- **Preconditions:** Test config with MailerLite IDs, route mocked
- **Test data:** answers 2,1,0,2,1,0,2 (options 0,1,2,0,1,2,0); `ana@site.com`
- **Steps:**
  1. Answer the quiz
  2. Submit the e-mail
  3. Inspect intercepted requests
- **Expected result:** Exactly one request to `/jsonp/100200/forms/300400/subscribe` with email `ana@site.com`, quiz_score `8`, band `Base parcial, buracos abertos`, the 4 open areas in lesson order
- **Automated by:** `tests/e2e/lead.spec.js` › `AC-1: a valid submit sends exactly one MailerLite request with e-mail, score, band and open areas`
- **Status:** Pass

### TC-2: all-first answers send 14 and no open areas
- **Acceptance criterion:** AC-2
- **Priority:** high
- **Type:** boundary
- **Preconditions:** Test config, route mocked
- **Test data:** all first options
- **Steps:**
  1. Answer all with the first option
  2. Submit `ana@site.com`
- **Expected result:** quiz_score `14`, band `Quase pronto, feche as lacunas`, quiz_open_areas empty
- **Automated by:** `tests/e2e/lead.spec.js` › `AC-2: all first options send 14 points, the top band and no open areas`
- **Status:** Pass

### TC-3: all-last answers send 0 and the 7 areas
- **Acceptance criterion:** AC-2
- **Priority:** high
- **Type:** boundary
- **Preconditions:** Test config, route mocked
- **Test data:** all last options
- **Steps:**
  1. Answer all with the last option
  2. Submit `ana@site.com`
- **Expected result:** quiz_score `0`, the 7 areas in lesson order
- **Automated by:** `tests/e2e/lead.spec.js` › `AC-2: all last options send 0 points and list the 7 areas in lesson order`
- **Status:** Pass

### TC-4: invalid e-mail sends nothing
- **Acceptance criterion:** AC-3
- **Priority:** high
- **Type:** negative
- **Preconditions:** Test config, route mocked
- **Test data:** `ana@site`
- **Steps:**
  1. Reach the e-mail screen
  2. Submit the invalid e-mail
- **Expected result:** Error shown, no request sent
- **Automated by:** `tests/e2e/lead.spec.js` › `AC-3: an invalid e-mail sends no request`
- **Status:** Pass

### TC-5: HTTP 500 does not block the result
- **Acceptance criterion:** AC-4
- **Priority:** high
- **Type:** negative
- **Preconditions:** Test config, route answers HTTP 500
- **Test data:** `ana@site.com`
- **Steps:**
  1. Submit a valid e-mail
  2. Watch the screen and the console
- **Expected result:** Result and offer appear immediately, no visible error, no console error raised by the page
- **Automated by:** `tests/e2e/lead.spec.js` › `AC-4: a HTTP 500 never blocks the result and shows no error`
- **Status:** Pass

### TC-6: aborted request does not block the result
- **Acceptance criterion:** AC-4
- **Priority:** high
- **Type:** negative
- **Preconditions:** Test config, route aborts
- **Test data:** `ana@site.com`
- **Steps:**
  1. Submit a valid e-mail
  2. Watch the screen and the console
- **Expected result:** Same as TC-5
- **Automated by:** `tests/e2e/lead.spec.js` › `AC-4: a aborted request never blocks the result and shows no error`
- **Status:** Pass

### TC-7: hanging request does not block the result
- **Acceptance criterion:** AC-4
- **Priority:** high
- **Type:** negative
- **Preconditions:** Test config, route never answers
- **Test data:** `ana@site.com`
- **Steps:**
  1. Submit a valid e-mail
  2. Wait 9 s
- **Expected result:** Result stays usable, no console error
- **Automated by:** `tests/e2e/lead.spec.js` › `AC-4: a request that never answers times out silently`
- **Status:** Pass

### TC-8: empty IDs send nothing
- **Acceptance criterion:** AC-5
- **Priority:** high
- **Type:** functional
- **Preconditions:** Committed empty config
- **Test data:** `ana@site.com`
- **Steps:**
  1. Submit a valid e-mail
  2. Record MailerLite requests
- **Expected result:** No MailerLite request, result appears
- **Automated by:** `tests/e2e/lead.spec.js` › `AC-5: with the committed empty IDs no request is made and the result appears`
- **Status:** Pass

### TC-9: empty config never leaks the e-mail
- **Acceptance criterion:** AC-5
- **Priority:** medium
- **Type:** functional
- **Preconditions:** Committed empty config
- **Test data:** `ana@site.com`
- **Steps:**
  1. Submit
  2. Record every request URL and body
- **Expected result:** No request to mailerlite.com or containing the e-mail
- **Automated by:** `tests/e2e/email.spec.js` › `TC-41 (AC-5): with the committed empty config the e-mail is never sent to MailerLite`
- **Status:** Pass

### TC-10: no API key or token anywhere
- **Acceptance criterion:** AC-6
- **Priority:** high
- **Type:** security
- **Preconditions:** Built `dist/`
- **Test data:** patterns `api_key`, `apiKey`, `Bearer`, `connect.mailerlite.com/api`
- **Steps:**
  1. Scan source, pages and dist
- **Expected result:** No match
- **Automated by:** `tests/e2e/lead.spec.js` › `AC-6: no MailerLite API key or token exists in the source, the pages or the build`
- **Status:** Pass

### TC-11: buildLead builds the lead
- **Acceptance criterion:** AC-7
- **Priority:** high
- **Type:** functional
- **Preconditions:** None (unit)
- **Test data:** mixed, all 2, all 0, `  ana@site.com  `
- **Steps:**
  1. Call `buildLead`
- **Expected result:** Trimmed e-mail, correct score, band and open areas
- **Automated by:** `tests/unit/scoring.test.js` › `buildLead › trims the e-mail…, all 2 points…, all 0 points…`
- **Status:** Pass

### TC-12: buildLead band boundaries
- **Acceptance criterion:** AC-7
- **Priority:** high
- **Type:** boundary
- **Preconditions:** None (unit)
- **Test data:** totals 4, 5, 9, 10
- **Steps:**
  1. Call `buildLead`
- **Expected result:** 4 risk band, 5 and 9 partial band, 10 top band
- **Automated by:** `tests/unit/scoring.test.js` › `buildLead › band boundaries: …`
- **Status:** Pass

### TC-13: privacy notice on the e-mail screen
- **Acceptance criterion:** AC-8
- **Priority:** high
- **Type:** functional
- **Preconditions:** E-mail screen
- **Test data:** none
- **Steps:**
  1. Reach the e-mail screen
- **Expected result:** Exact FR-5 notice under the form; link `Política de privacidade` to `privacidade.html` with `target=_blank`
- **Automated by:** `tests/e2e/privacy.spec.js` › `AC-8: the e-mail screen shows the privacy notice and the new-tab privacy link`
- **Status:** Pass

### TC-14: privacy page copy and back link
- **Acceptance criterion:** AC-9
- **Priority:** high
- **Type:** functional
- **Preconditions:** None
- **Test data:** none
- **Steps:**
  1. Open `/privacidade.html`
  2. Click the back link
- **Expected result:** `lang="pt-BR"`, exact title, H1 and sections, no dashes, back link reaches the landing page
- **Automated by:** `tests/e2e/privacy.spec.js` › `AC-9: the privacy page has the exact copy, language, title and a working back link`
- **Status:** Pass

### TC-15: contact e-mail hidden when empty
- **Acceptance criterion:** AC-10
- **Priority:** medium
- **Type:** functional
- **Preconditions:** Empty PRIVACY_CONTACT_EMAIL
- **Test data:** none
- **Steps:**
  1. Open the privacy page
- **Expected result:** "Seus direitos" ends at `... para sair da lista.`
- **Automated by:** `tests/e2e/privacy.spec.js` › `AC-10: the contact e-mail is hidden while PRIVACY_CONTACT_EMAIL is empty`
- **Status:** Pass

### TC-16: contact e-mail shown when set
- **Acceptance criterion:** AC-10
- **Priority:** medium
- **Type:** functional
- **Preconditions:** Test config contact `contato@unflaky.com`
- **Test data:** none
- **Steps:**
  1. Open the privacy page
- **Expected result:** The sentence includes the e-mail as text
- **Automated by:** `tests/e2e/privacy.spec.js` › `AC-10: the contact e-mail appears as text when PRIVACY_CONTACT_EMAIL is set`
- **Status:** Pass

### TC-17: footer text and privacy link
- **Acceptance criterion:** AC-11
- **Priority:** medium
- **Type:** functional
- **Preconditions:** Landing page
- **Test data:** none
- **Steps:**
  1. Read the footer
- **Expected result:** FR-12 text, privacy link, no `Mini curso em produção`
- **Automated by:** `tests/e2e/offer.spec.js` › `AC-11: the footer shows the new text and the privacy link`
- **Status:** Pass

### TC-18: offer block content
- **Acceptance criterion:** AC-12
- **Priority:** high
- **Type:** functional
- **Preconditions:** Result screen
- **Test data:** mixed answers
- **Steps:**
  1. Reach the result
- **Expected result:** Offer block below the priority paragraph with all copy
- **Automated by:** `tests/e2e/offer.spec.js` › `AC-12: the result screen shows the full offer below the priority paragraph`
- **Status:** Pass

### TC-19: offer headline by open-area count
- **Acceptance criterion:** AC-13
- **Priority:** high
- **Type:** boundary
- **Preconditions:** Result screen
- **Test data:** 0, 1, 3 and 7 open areas
- **Steps:**
  1. Reach the result for each answer set
- **Expected result:** Headline as in the spec for each count
- **Automated by:** `tests/e2e/offer.spec.js` › `AC-13: <n> open areas give the right headline`
- **Status:** Pass

### TC-20: result button hierarchy and behavior
- **Acceptance criterion:** AC-14
- **Priority:** high
- **Type:** functional
- **Preconditions:** Result screen
- **Test data:** none
- **Steps:**
  1. Inspect the buttons
  2. Click both ghost buttons
- **Expected result:** Only `Quero o curso` is gold; ghosts keep their behavior
- **Automated by:** `tests/e2e/offer.spec.js` › `AC-14: "Quero o curso" is the only gold button and both other actions are ghost buttons`
- **Status:** Pass

### TC-21: checkout navigation when configured
- **Acceptance criterion:** AC-15
- **Priority:** high
- **Type:** functional
- **Preconditions:** Test config CHECKOUT_URL, Kiwify route mocked
- **Test data:** `https://pay.kiwify.com.br/test`
- **Steps:**
  1. Click the offer CTA
  2. Click the #aulas CTA
- **Expected result:** Same-tab navigation to the URL
- **Automated by:** `tests/e2e/offer.spec.js` › `AC-15: with CHECKOUT_URL set both "Quero o curso" controls navigate in the same tab`
- **Status:** Pass

### TC-22: checkout controls inert when empty
- **Acceptance criterion:** AC-16
- **Priority:** high
- **Type:** negative
- **Preconditions:** Committed empty CHECKOUT_URL
- **Test data:** none
- **Steps:**
  1. Click both CTAs
- **Expected result:** URL and modal unchanged, no console error
- **Automated by:** `tests/e2e/offer.spec.js` › `AC-16: with CHECKOUT_URL empty both controls do nothing and log no error`
- **Status:** Pass

### TC-23: #aulas purchase line
- **Acceptance criterion:** AC-17
- **Priority:** medium
- **Type:** functional
- **Preconditions:** Landing page
- **Test data:** none
- **Steps:**
  1. Read #aulas
- **Expected result:** Purchase line and a non-gold `Quero o curso`
- **Automated by:** `tests/e2e/offer.spec.js` › `AC-17: #aulas shows the purchase line and a non-gold "Quero o curso" control`
- **Status:** Pass

### TC-24: other CTAs unchanged
- **Acceptance criterion:** AC-18
- **Priority:** medium
- **Type:** negative
- **Preconditions:** Landing page, desktop and mobile bar
- **Test data:** none
- **Steps:**
  1. Read header, hero, diagnostic, final CTA and sticky bar
- **Expected result:** `Fazer o diagnóstico`, no price or course button
- **Automated by:** `tests/e2e/offer.spec.js` › `AC-18: the existing CTAs keep "Fazer o diagnóstico" and show no price or course button`
- **Status:** Pass

### TC-25: FAQ 3 updated
- **Acceptance criterion:** AC-19
- **Priority:** medium
- **Type:** functional
- **Preconditions:** Landing page
- **Test data:** none
- **Steps:**
  1. Read the FAQ
- **Expected result:** Item 3 new copy, the other 4 unchanged
- **Automated by:** `tests/e2e/accordion.spec.js` › `AC-19: FAQ item 3 asks the price and keeps the other 4 items unchanged`
- **Status:** Pass

### TC-26: offer layout and overflow
- **Acceptance criterion:** AC-20
- **Priority:** high
- **Type:** boundary
- **Preconditions:** 390×844, desktop and 320px
- **Test data:** none
- **Steps:**
  1. Reach the result
  2. Measure the CTA and overflow
- **Expected result:** No horizontal overflow, CTA full width and at least 48px high, 320px pages fit
- **Automated by:** `tests/e2e/offer.spec.js` › `AC-20: the offer fits the phone screen and the 320px page has no horizontal overflow`
- **Status:** Pass

### TC-27: no dashes, waitlist wording or extra prices
- **Acceptance criterion:** AC-21
- **Priority:** medium
- **Type:** functional
- **Preconditions:** Landing, quiz and privacy page
- **Test data:** none
- **Steps:**
  1. Scan the text
- **Expected result:** No dashes, no waitlist wording, only R$ 9,90 in the 3 allowed places
- **Automated by:** `tests/e2e/offer.spec.js` › `AC-21: no dashes, no waitlist wording and only the course price shown`
- **Status:** Pass

### TC-28: regression of the first spec
- **Acceptance criterion:** AC-22
- **Priority:** high
- **Type:** functional
- **Preconditions:** Full suite
- **Test data:** none
- **Steps:**
  1. Run unit and e2e suites
- **Expected result:** All previous tests pass, updated only where the spec changed them
- **Automated by:** `tests/e2e/*.spec.js` › `full suite`
- **Status:** Pass

### TC-29: committed config is empty with a todo reminder
- **Acceptance criterion:** FR-1, FR-10
- **Priority:** medium
- **Type:** functional
- **Preconditions:** None (unit)
- **Test data:** none
- **Steps:**
  1. Import `src/config.js`
- **Expected result:** All four values empty; named todo reminder for CHECKOUT_URL
- **Automated by:** `tests/unit/config.test.js` › `config › ships every public value empty in the repository, plus it.todo`
- **Status:** Pass

### TC-30: rapid repeated submit sends once
- **Acceptance criterion:** AC-1
- **Priority:** medium
- **Type:** negative
- **Preconditions:** Test config, route mocked
- **Test data:** `ana@site.com`, Enter pressed 3 times
- **Steps:**
  1. Fill the e-mail
  2. Press Enter three times fast
- **Expected result:** Exactly one request
- **Automated by:** `tests/e2e/lead-explore.spec.js` › `TC-30 (AC-1): pressing Enter repeatedly on a valid e-mail sends exactly one request`
- **Status:** Pass

### TC-31: one request per submit after redo
- **Acceptance criterion:** AC-1
- **Priority:** medium
- **Type:** functional
- **Preconditions:** Test config, route mocked
- **Test data:** `ana@site.com`, then `bia@site.com`
- **Steps:**
  1. Reach the result
  2. Redo the diagnostic
  3. Submit again
- **Expected result:** Two requests, the second with `bia@site.com` and score 14
- **Automated by:** `tests/e2e/lead-explore.spec.js` › `TC-31 (AC-1): redoing the diagnostic and submitting again sends one request per submit`
- **Status:** Pass

### TC-32: special-character e-mail sent intact
- **Acceptance criterion:** AC-1
- **Priority:** medium
- **Type:** boundary
- **Preconditions:** Test config, route mocked
- **Test data:** `  a.b+c@sub.dominio.com.br  `
- **Steps:**
  1. Submit
- **Expected result:** Body has `a.b+c@sub.dominio.com.br` (trimmed, `+` intact)
- **Automated by:** `tests/e2e/lead-explore.spec.js` › `TC-32 (AC-1): surrounding spaces are trimmed and plus/subdomain e-mails are sent intact`
- **Status:** Pass

### TC-33: timeout is silent without any console filter
- **Acceptance criterion:** AC-4
- **Priority:** high
- **Type:** negative
- **Preconditions:** Test config, route never answers
- **Test data:** `ana@site.com`
- **Steps:**
  1. Submit
  2. Wait 10 s
- **Expected result:** The page aborts the request itself; no console error or warning at all, unfiltered
- **Automated by:** `tests/e2e/lead-explore.spec.js` › `TC-33 (AC-4): the page-side 8 s timeout aborts a hanging request with no console message at all`
- **Status:** Pass

### TC-34: keyboard access to the checkout link
- **Acceptance criterion:** AC-15
- **Priority:** medium
- **Type:** accessibility
- **Preconditions:** Test config, Kiwify mocked
- **Test data:** keyboard only
- **Steps:**
  1. Tab to the offer CTA
  2. Press Enter
- **Expected result:** Focus reaches the link and Enter opens the checkout
- **Automated by:** `tests/e2e/lead-explore.spec.js` › `TC-34 (AC-15): keyboard-only users reach "Quero o curso" in the offer and open the checkout`
- **Status:** Pass

### TC-35: notice persists in the error state
- **Acceptance criterion:** AC-8
- **Priority:** low
- **Type:** negative
- **Preconditions:** E-mail screen
- **Test data:** `ana@site`
- **Steps:**
  1. Submit an invalid e-mail
- **Expected result:** Notice and link stay visible
- **Automated by:** `tests/e2e/lead-explore.spec.js` › `TC-35 (AC-8): the e-mail error state keeps the privacy notice and link visible`
- **Status:** Pass

### TC-36: setup documentation exists
- **Acceptance criterion:** FR-3
- **Priority:** low
- **Type:** functional
- **Preconditions:** Branch checked out
- **Test data:** none
- **Steps:**
  1. Grep `CLAUDE.md` and `README.md` for MailerLite, `__TEST_CONFIG__`, privacidade
- **Expected result:** Setup is documented (spec technical notes, task 7)
- **Automated by:** `manual (code review)` › `n/a`
- **Status:** Fail (#3)

## Not covered

- Real MailerLite delivery: tests never call MailerLite (spec rule). The endpoint and field names match MailerLite's public embedded-form format, but only a manual submit after Herbert fills in the IDs proves the lead lands with the custom fields.
- Real Kiwify checkout page: out of scope; navigation is verified against a mocked URL.
- Lead capture tests run in the desktop project only; the request logic does not depend on the viewport, and AC-20 covers the mobile layout.
- Browser-generated `Failed to load resource` console lines for HTTP 500 and aborted requests are filtered in TC-5 and TC-6; see the spec issue in the test report.
