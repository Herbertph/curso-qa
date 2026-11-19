# Spec: Lead capture (MailerLite) and course offer at the end of the diagnostic

- Status: ready for development
- Branch: `feature/lead-capture-and-offer`
- Builds on: `docs/specs/landing-page-teste-antes-de-lancar.md` (merged in PR #2). Its rules still apply (exact pt-BR
  copy, no em dash or en dash, truth rule, no waitlist, 8px grid and Refactoring UI tokens, single-file build).
- The pt-BR texts in this spec were approved by Herbert (2026-11-19) or written by the analyst under the same rules.
  Copy them **letter by letter**.

## Context

The landing page is the course's lead machine. Today the e-mail typed in the quiz is only validated and shown on the
result screen, then lost. Herbert needs (1) every e-mail saved as a lead in his MailerLite account together with the
diagnostic result, so he can e-mail each profile later, and (2) the end of the quiz to invite the visitor to buy the
course, which is sold on Kiwify for R$ 9,90.

## Scope

### In scope
- Send the lead to MailerLite when a valid e-mail is submitted: e-mail, score, band and open areas.
- Privacy notice under the e-mail field with a link to a new privacy policy page.
- Privacy policy page in pt-BR.
- Offer block on the result screen with price, guarantee and the "Quero o curso" button to the Kiwify checkout.
- Discreet purchase link at the end of the course content section (`#aulas`).
- FAQ question 3 and footer text updated for a course that is on sale.
- Configuration for the MailerLite IDs, the checkout URL and the privacy contact e-mail, which Herbert fills in later.

### Out of scope
- E-mail sequences and automations (configured by Herbert inside MailerLite).
- Building the Kiwify product or checkout page.
- Analytics, tracking pixels, cookie banner.
- Purchase buttons anywhere else: header, hero, diagnostic section, final CTA and mobile sticky bar keep
  `Fazer o diagnóstico`.
- Discounts, scarcity, countdowns, installments, testimonials (truth rule).

## Functional requirements

- **FR-1 Config.** A single module `src/config.js` exports `MAILERLITE_ACCOUNT_ID`, `MAILERLITE_FORM_ID`,
  `CHECKOUT_URL` and `PRIVACY_CONTACT_EMAIL`, all empty strings for now. These are public identifiers, not secrets
  (they appear in MailerLite's own embed code). No API key or token is ever put in the page or the repository.
- **FR-2 Lead payload.** On a valid e-mail submit, build the lead with a pure function
  `buildLead(email, answers)` returning: `email` (trimmed), `quiz_score` (0 to 14), `quiz_band` (exact band title),
  `quiz_open_areas` (names of areas with fewer than 2 points, in lesson order, joined by `, `; empty string when none).
- **FR-3 Send to MailerLite.** Send the lead from the browser to MailerLite's public embedded-form subscribe endpoint
  for the configured account and form (the same request MailerLite's own embed code makes, no API key), with the
  e-mail in the email field and the three values in custom fields `quiz_score`, `quiz_band`, `quiz_open_areas`.
  Send once per valid submit. If either MailerLite ID is empty, send nothing.
- **FR-4 Never block the result.** The result screen appears immediately on a valid submit, without waiting for the
  request. A failed, slow (timeout) or blocked request is silent: no error message to the visitor, no console error,
  the result and offer work normally.
- **FR-5 Privacy notice.** Under the e-mail form (above or replacing nothing, keep the existing note), show:
  `Ao continuar, você aceita receber e-mails da Unflaky sobre o curso. Dá para sair quando quiser.` followed by the
  link `Política de privacidade` to the privacy page (opens in a new tab so the quiz is not lost).
- **FR-6 Privacy page.** A page `privacidade.html` (pt-BR, same visual identity, header logo linking back to the
  landing page) with the text in "Privacy page copy" below. Footer of the landing page gets a
  `Política de privacidade` link to it.
- **FR-7 Offer block.** On the result screen, right after the priority-lessons paragraph and before the buttons, an
  offer block (anchor id `oferta`) with the copy in "Offer copy" below, the headline varying with the number of open
  areas. The primary button `Quero o curso` is a link to `CHECKOUT_URL`, opening in the same tab.
- **FR-8 Result actions.** `Quero o curso` is the only gold (primary) button on the result screen. `Ver as aulas do
  curso` and `Refazer o diagnóstico` become ghost (secondary) buttons and keep their behavior.
- **FR-9 Lessons section link.** Below the curriculum footer of `#aulas`, a discreet line:
  `Curso completo por R$ 9,90, à vista, com 7 dias de garantia.` and a ghost button or text link `Quero o curso` to
  `CHECKOUT_URL`. Not gold, not larger than body text.
- **FR-10 Checkout not set yet.** While `CHECKOUT_URL` is empty, both `Quero o curso` controls are still rendered (so
  Herbert can review the layout) but clicking them does nothing (no navigation, no console error). A unit test makes
  the empty value visible: it is a named, skipped-or-todo reminder, not a failing test.
- **FR-11 FAQ 3.** Replace FAQ item 3 with question `Quanto custa o curso?` and answer
  `R$ 9,90, à vista, com 7 dias de garantia. O pagamento é feito pela Kiwify.`
- **FR-12 Footer.** Replace the footer's right text `Mini curso em produção. ...` with
  `Conteúdo baseado em experiência real de QA, sem resultados financeiros prometidos ou inventados.` and add the
  `Política de privacidade` link.
- **FR-13 Design.** All new UI uses the existing design tokens (8px grid, type scale, radius, shadows, colors);
  `tests/unit/tokens.test.js` keeps passing. The offer block follows Refactoring UI: price is the largest element in
  the block, one primary action, list items de-emphasized in `--muted`.

## Offer copy (exact, pt-BR)

- Eyebrow (mono, gold): `PRÓXIMO PASSO`
- Headline, by number `n` of open areas (fewer than 2 points):
  - `n >= 2`: `Suas {n} áreas abertas são exatamente o que o curso ensina a conferir` (number as digits, e.g. `Suas 3 áreas abertas ...`)
  - `n = 1`: `Sua área aberta é exatamente o que o curso ensina a conferir`
  - `n = 0`: `Sua base é boa, o curso transforma isso em método`
- Text: `Mini curso Teste Antes de Lançar: 8 aulas curtas, cada uma com o prompt pronto para o seu agente e a conferência manual para você validar no seu próprio produto.`
- List (4 items, check icon):
  - `8 aulas curtas, introdução mais os 7 testes`
  - `Prompt pronto em cada aula`
  - `Conferência manual passo a passo`
  - `Lista de liberação para repetir em todo lançamento`
- Price: `R$ 9,90` with the label `à vista` next to or below it.
- Primary button: `Quero o curso`
- Note under the button: `Pagamento pela Kiwify. 7 dias de garantia.`

## Privacy page copy (exact, pt-BR)

- Tab title: `Política de privacidade, Teste Antes de Lançar`
- H1: `Política de privacidade`
- Intro: `Esta página explica quais dados o diagnóstico Teste Antes de Lançar coleta, para que eles servem e como você pode pedir para apagá-los.`
- H2 `Quem cuida dos seus dados` / `Herbert Parasio, responsável pela Unflaky, Quality Lab.`
- H2 `O que coletamos` / `Quando você faz o diagnóstico e confirma seu e-mail, guardamos o e-mail, a pontuação, a faixa do resultado e as áreas que ficaram abertas. Não coletamos nome, telefone, documento ou dados de pagamento nesta página.`
- H2 `Para que usamos` / `Para enviar e-mails sobre o curso Teste Antes de Lançar e conteúdos de qualidade de software ligados ao seu resultado. Não vendemos nem compartilhamos sua lista com terceiros para fins de marketing.`
- H2 `Onde os dados ficam` / `Os dados ficam guardados no MailerLite, a ferramenta que usamos para enviar os e-mails. Os servidores do MailerLite podem ficar fora do Brasil. Os pagamentos do curso são feitos na Kiwify, que tem a própria política de privacidade.`
- H2 `Por quanto tempo` / `Enquanto você continuar inscrito. Se você sair da lista, seus dados deixam de ser usados para envio.`
- H2 `Seus direitos` / `Pela LGPD, você pode pedir acesso, correção ou exclusão dos seus dados a qualquer momento. Todo e-mail tem um link para sair da lista, e você também pode escrever para {PRIVACY_CONTACT_EMAIL}.`
- Back link: `Voltar para a página do curso`

`{PRIVACY_CONTACT_EMAIL}` comes from `src/config.js`. While empty, the sentence ends at `... para sair da lista.` and
the "você também pode escrever" part is omitted.

## Acceptance criteria

Lead capture (tests must intercept the MailerLite request with Playwright routing; **never call the real MailerLite**):

- **AC-1** Given the MailerLite IDs are configured (test config) and I answer the quiz with 2,1,0,2,1,0,2 points, when
  I submit `ana@site.com`, then exactly one request goes to the MailerLite subscribe endpoint containing the e-mail
  `ana@site.com`, `quiz_score` `8`, `quiz_band` `Base parcial, buracos abertos` and `quiz_open_areas`
  `Pagamento e checkout, Salvamento e perda de dados, Fluxo principal ponta a ponta, Erros e casos limite`.
- **AC-2** Given all answers are the first option, then `quiz_score` is `14`, `quiz_band` is
  `Quase pronto, feche as lacunas` and `quiz_open_areas` is empty. Given all answers are the last option, then
  `quiz_score` is `0` and `quiz_open_areas` lists the 7 areas in lesson order.
- **AC-3** Given an invalid e-mail is submitted, then no request is sent.
- **AC-4** Given the MailerLite endpoint returns HTTP 500, or the request is aborted, or it does not answer for 10
  seconds, when I submit a valid e-mail, then the result screen and the offer appear immediately and normally, no
  error is shown to the visitor and page code raises no console error (no `console.error`, no uncaught exception
  or unhandled rejection). The browser's own network line `Failed to load resource: ...` is outside page control
  and is accepted (analyst decision, 2026-11-19).
- **AC-5** Given the MailerLite IDs are empty (the committed default), when I submit a valid e-mail, then no network
  request is made and the result appears.
- **AC-6** Given the page source, the built `dist/` files and the repository, then no MailerLite API key or token
  exists (search for `api_key`, `apiKey`, `Bearer`, `connect.mailerlite.com/api`).
- **AC-7** Unit: `buildLead` returns the trimmed e-mail, the correct score, band and open-areas string for the
  all-2, all-0 and mixed answer sets, and for band boundaries 4, 5, 9 and 10.

Privacy:

- **AC-8** Given the e-mail screen, then the exact notice of FR-5 is visible under the form, with a link named
  `Política de privacidade` pointing to the privacy page and opening in a new tab.
- **AC-9** Given I open the privacy page, then it has `lang="pt-BR"`, the exact tab title, H1 and all sections of
  "Privacy page copy", no em dash or en dash, and a working link back to the landing page.
- **AC-10** Given `PRIVACY_CONTACT_EMAIL` is empty, then the "Seus direitos" text ends at `... para sair da lista.`;
  given it is set (test config), then the sentence includes that e-mail as text.
- **AC-11** Given the landing page footer, then it shows the new right text of FR-12 and a `Política de privacidade`
  link, and the text `Mini curso em produção` no longer appears anywhere.

Offer and purchase:

- **AC-12** Given the result screen, then below the priority paragraph there is the offer block with `PRÓXIMO PASSO`,
  the text, the 4 list items, `R$ 9,90`, `à vista`, the button `Quero o curso` and the note
  `Pagamento pela Kiwify. 7 dias de garantia.`
- **AC-13** Given 0, 1 and 3 open areas, then the offer headline is respectively
  `Sua base é boa, o curso transforma isso em método`,
  `Sua área aberta é exatamente o que o curso ensina a conferir` and
  `Suas 3 áreas abertas são exatamente o que o curso ensina a conferir`; with 7 open areas, `Suas 7 áreas abertas ...`.
- **AC-14** Given the result screen, then `Quero o curso` is the only gold button; `Ver as aulas do curso` and
  `Refazer o diagnóstico` are ghost buttons and still close-and-scroll to `#aulas` / restart on question 1.
- **AC-15** Given `CHECKOUT_URL` is set (test config, e.g. `https://pay.kiwify.com.br/test`), when I click
  `Quero o curso` in the result or in `#aulas`, then the browser navigates to that URL in the same tab.
- **AC-16** Given `CHECKOUT_URL` is empty, when I click either `Quero o curso`, then nothing happens (URL unchanged,
  modal state unchanged) and there is no console error.
- **AC-17** Given the `#aulas` section, then below the curriculum footer there is
  `Curso completo por R$ 9,90, à vista, com 7 dias de garantia.` and a non-gold `Quero o curso` control.
- **AC-18** Given the header, hero, diagnostic section, final CTA and mobile sticky bar, then they still show
  `Fazer o diagnóstico` and none of them shows `Quero o curso` or a price.
- **AC-19** Given the FAQ, then item 3 is `Quanto custa o curso?` with the exact answer of FR-11, and the other 4
  items are unchanged.
- **AC-20** Given mobile (390×844) and desktop, then the offer block fits the phone screen without horizontal
  overflow, the `Quero o curso` button is full width inside the phone screen with at least 48px height, and the page
  and privacy page have no horizontal overflow at 320px.
- **AC-21** Given the whole landing page, quiz screens and privacy page, then no `—` or `–` appears, no waitlist
  wording appears, and the only prices shown are `R$ 9,90` in the offer, the `#aulas` line and FAQ 3.
- **AC-22** All existing acceptance tests of the first spec still pass, except where this spec intentionally changes
  them (FAQ 3, footer text, result button styles, and the old AC-27 "no network request with the e-mail", which is
  replaced by AC-1 to AC-5 here). Update those tests, don't delete coverage.

## Assumptions to confirm (Herbert)

1. Footer: "Mini curso em produção" is removed because the course is on sale. FAQ 4 (`... Pedimos seu e-mail antes de
   mostrar o resultado, só isso.`) stays unchanged.
2. `Quero o curso` opens the Kiwify checkout in the same tab (better conversion; the visitor already saw the result).
3. The privacy page copy above names you as the person responsible for the data and needs a contact e-mail; it stays
   hidden until you tell me which address to publish.
4. Open areas sent to MailerLite are the areas with fewer than 2 points (parcial or descoberto), the same rule as the
   priority lessons.

## What Herbert does in MailerLite (goes into the PR "How to check it yourself")

1. Create three custom fields: `quiz_score` (number), `quiz_band` (text), `quiz_open_areas` (text).
2. Create an embedded form (any design) linked to a group such as "Diagnóstico", with those fields enabled.
3. Paste the form's embed code to the analyst, who copies the account ID and form ID into `src/config.js`.

## Technical notes

- Current code: `src/quiz.js` renders the e-mail screen (line ~132) and the result screen (line ~183); the valid
  submit sets `state.step = 'result'` (line ~168). Scoring helpers are in `src/scoring.js`; copy lives in
  `src/quiz-data.js`; FAQ and footer copy in `index.html`.
- MailerLite: use the same public endpoint MailerLite's "embedded form" HTML posts to (account ID + form ID, fields
  `fields[email]`, `fields[quiz_score]`, ...). Verify the exact URL and field names against MailerLite's current
  embedded form documentation and write them down in `CLAUDE.md`. Use `fetch` with `mode: 'no-cors'` or the endpoint's
  CORS-friendly variant, plus an `AbortController` timeout (~8 s); fire and forget, catch every error.
- Tests need to switch config: e.g. read overrides from a `window.__TEST_CONFIG__` set by Playwright
  `addInitScript`, or another approach that keeps the committed defaults empty. Document it in `CLAUDE.md`.
- Privacy page: `privacidade.html` built by Vite next to `index.html`. If `vite-plugin-singlefile` cannot handle two
  inputs, ship the privacy page as a static self-contained HTML; either way `dist/` must contain both pages and work
  when opened from any static host.
- Render all dynamic text with `textContent` (existing rule).

### Ordered tasks
1. `src/config.js` + test-override mechanism; `buildLead` in `src/scoring.js` (or a new `src/lead.js`) with unit tests.
2. `src/lead.js` sender (fire and forget, timeout, silent failure) wired to the valid submit in `src/quiz.js`.
3. Privacy notice on the e-mail screen; `privacidade.html`; footer text and link.
4. Offer block on the result screen with variable headline; result buttons restyled; `#aulas` purchase line.
5. FAQ 3 update; `CHECKOUT_URL` empty-state behavior.
6. Update the affected existing tests; add e2e tests for AC-1 to AC-21 with MailerLite routes mocked.
7. Update `CLAUDE.md` (config, MailerLite endpoint, test overrides, privacy page) and `README.md`.
