# Test cases: landing page "Teste Antes de Lançar"

- Spec: [`docs/specs/landing-page-teste-antes-de-lancar.md`](../specs/landing-page-teste-antes-de-lancar.md)
- Copy source of truth: [`docs/reference/landing-page-source-pt-br.md`](../reference/landing-page-source-pt-br.md) (§N)
- Branch: `feature/landing-page-teste-antes-de-lancar`
- Tested commit: `20365d4` (`style: keep the quiz question counter on one line`)
- Stacks and viewports: Vitest (`tests/unit`), Playwright `desktop` 1280×800 and `mobile` 390×844 (`tests/e2e`)
- Execution date: 2026-11-19

## Traceability summary

| AC | Test cases | Result |
| --- | --- | --- |
| AC-1 | TC-1 | Pass |
| AC-2 | TC-2, TC-3, TC-4, TC-5 | Pass |
| AC-3 | TC-6 | Pass |
| AC-4 | TC-7 | Pass |
| AC-5 | TC-8 | Pass |
| AC-6 | TC-9, TC-10 | Pass |
| AC-7 | TC-11 | Pass |
| AC-8 | TC-12, TC-13, TC-14, TC-15 | Pass |
| AC-9 | TC-16, TC-17 | Pass |
| AC-10 | TC-18 | Pass |
| AC-11 | TC-19 | Pass |
| AC-12 | TC-20, TC-21, TC-22 | Pass |
| AC-13 | TC-23 | Pass |
| AC-14 | TC-24, TC-25 | Pass |
| AC-15 | TC-26, TC-27 | Pass |
| AC-16 | TC-28 | Pass |
| AC-17 | TC-29 | Pass |
| AC-18 | TC-30 | Pass |
| AC-19 | TC-31 | Pass |
| AC-20 | TC-32 | Pass |
| AC-21 | TC-33 | Pass |
| AC-22 | TC-34 | Pass |
| AC-23 | TC-35, TC-36 | Pass |
| AC-24 | TC-37, TC-63 | Pass |
| AC-25 | TC-38 | Pass |
| AC-26 | TC-39, TC-40 | Pass |
| AC-27 | TC-41, TC-42 | Pass |
| AC-28 | TC-43 | Pass |
| AC-29 | TC-44 | Pass |
| AC-30 | TC-45, TC-46 | Pass |
| AC-31 | TC-47 | Pass |
| AC-32 | TC-48 | Pass |
| AC-33 | TC-49 | Pass |
| AC-34 | TC-50, TC-51 | Pass |
| AC-35 | TC-52 | Pass |
| AC-36 | TC-53, TC-54 | Pass |
| AC-37 | TC-55 | Pass |
| AC-38 | TC-56 | Pass |
| AC-39 | TC-57, TC-58, TC-59 | Pass |
| AC-40 | TC-60 | Pass |
| AC-41 | TC-61 | Pass |
| AC-42 | TC-62 | Pass |
| exploration | TC-64 | Fail (#1) |

## Page, copy and content rules

### TC-1: document language, title, favicon and viewport meta
- **Acceptance criterion:** AC-1
- **Priority:** high
- **Type:** functional
- **Preconditions:** page loaded on desktop.
- **Test data:** none.
- **Steps:**
  1. Read the `lang` attribute of `<html>`.
  2. Read the document title.
  3. Read `link[rel="icon"]` and `meta[name="viewport"]`.
- **Expected result:** `lang="pt-BR"`; title `Teste Antes de Lançar, o mini curso para SaaS feito com IA`; favicon is an empty data URI (`data:,`); viewport contains `viewport-fit=cover`.
- **Automated by:** `tests/e2e/page.spec.js` › `TC-1 (AC-1): language, title, favicon and viewport meta`
- **Status:** Pass

### TC-2: section order follows §6
- **Acceptance criterion:** AC-2
- **Priority:** high
- **Type:** functional
- **Preconditions:** page loaded on desktop.
- **Test data:** none.
- **Steps:**
  1. List the `data-section` values of every direct child of `<main>`.
  2. Check the header and footer are visible.
- **Expected result:** hero, proof, diagnostico, problema, formato, aulas, publico, instrutor, faq, final-cta; header above and footer below.
- **Automated by:** `tests/e2e/page.spec.js` › `TC-2 (AC-2): sections are in the source order`
- **Status:** Pass

### TC-3: hero, conference card and proof strip copy
- **Acceptance criterion:** AC-2
- **Priority:** high
- **Type:** functional
- **Preconditions:** page loaded on desktop.
- **Test data:** none.
- **Steps:**
  1. Compare the hero pill, H1, both subtitles, CTA box title, text and note with §8.
  2. Compare the conference card label, badge, 5 rows and footer with §9.
  3. Compare the 4 proof strip numbers and texts with §10.
- **Expected result:** every string matches the source letter by letter, including `3 dias → 24h` and `CUSTO: R$ 0 em cliente perdido`.
- **Automated by:** `tests/e2e/page.spec.js` › `TC-3 (AC-2): hero, conference card and proof strip copy is exact`
- **Status:** Pass

### TC-4: section headings, leads and instructor card copy
- **Acceptance criterion:** AC-2
- **Priority:** high
- **Type:** functional
- **Preconditions:** page loaded on desktop.
- **Test data:** none.
- **Steps:**
  1. Compare the diagnostic section eyebrow, H2, lead, CTA title and CTA text with §11.
  2. Compare the problem, format, course, audience, instructor, FAQ and final CTA headings and cards with §19 to §28.
  3. Compare the instructor name, role, 5 list items, quote, footer texts and 4 steps.
- **Expected result:** every string matches the source.
- **Automated by:** `tests/e2e/page.spec.js` › `TC-4 (AC-2): section headings, leads and instructor card copy are exact`
- **Status:** Pass

### TC-5: card bodies, audience lists, instructor paragraphs and FAQ copy
- **Acceptance criterion:** AC-2
- **Priority:** high
- **Type:** functional
- **Preconditions:** page loaded on desktop (hidden accordion panels included).
- **Test data:** none.
- **Steps:**
  1. Compare the two problem card bodies with §19 and the four step bodies with §20.
  2. Compare the course section lead with §21.
  3. Compare the 8 audience list items with §24.
  4. Compare the three instructor paragraphs with §26.
- **Expected result:** every paragraph matches the source letter by letter, with no rewritten or shortened text.
- **Automated by:** `tests/e2e/page.spec.js` › `TC-5 (AC-2): card, step, audience, instructor and FAQ copy is exact`
- **Status:** Pass

### TC-6: no em dash or en dash
- **Acceptance criterion:** AC-3
- **Priority:** high
- **Type:** functional
- **Preconditions:** page loaded on desktop.
- **Test data:** none.
- **Steps:**
  1. Search the full `outerHTML` at load for U+2013 and U+2014.
  2. Walk all 7 questions, the e-mail screen and the result, searching the visible quiz text and the final `outerHTML`.
- **Expected result:** no en dash or em dash anywhere, in text or attributes.
- **Automated by:** `tests/e2e/page.spec.js` › `TC-6 (AC-3): no em dash or en dash in the rendered page, attributes or quiz screens`
- **Status:** Pass

### TC-7: no waitlist and no e-mail form outside the quiz
- **Acceptance criterion:** AC-4
- **Priority:** high
- **Type:** negative
- **Preconditions:** page loaded, quiz closed.
- **Test data:** none.
- **Steps:**
  1. Search the rendered body text for `lista de espera`, `avise-me`, `garanta sua vaga`, `entrar na lista` (case-insensitive).
  2. Count forms and e-mail inputs inside `main`, `header` and `footer`.
- **Expected result:** no waitlist wording and zero forms/e-mail inputs outside the modal.
- **Automated by:** `tests/e2e/page.spec.js` › `TC-7 (AC-4): no waitlist wording, no e-mail field and no form outside the quiz modal`
- **Status:** Pass

### TC-8: the 15 §5 variables and both Google Fonts
- **Acceptance criterion:** AC-5
- **Priority:** high
- **Type:** functional
- **Preconditions:** page loaded.
- **Test data:** the 15 variable names and exact values of §5.
- **Steps:**
  1. Read every variable from `getComputedStyle(:root)`.
  2. Read the Google Fonts stylesheet link and both preconnect links.
- **Expected result:** all 15 values exact, stylesheet requests Archivo and IBM Plex Mono, both preconnects present.
- **Automated by:** `tests/e2e/page.spec.js` › `TC-8 (AC-5): the 15 source variables and both Google Fonts are loaded`
- **Status:** Pass

### TC-9: complete shield inside the header logo box on desktop
- **Acceptance criterion:** AC-6
- **Priority:** high
- **Type:** functional
- **Preconditions:** desktop 1280×800.
- **Test data:** none.
- **Steps:**
  1. Compare the logo link href and accessible name.
  2. Read `UNFLAKY` and `QUALITY LAB`.
  3. Measure the `.logo-box` and the `.logo-shield` bounding boxes.
- **Expected result:** link to `#topo` named `Unflaky, Quality Lab`; box 48×48 and shield 32×32 (FR-16 mapping of 44px/28px); the shield box is fully inside the logo box.
- **Automated by:** `tests/e2e/page.spec.js` › `TC-9 (AC-6): the shield SVG sits complete inside the header logo box`
- **Status:** Pass

### TC-10: complete shield inside the header logo box on mobile
- **Acceptance criterion:** AC-6
- **Priority:** high
- **Type:** functional
- **Preconditions:** mobile 390×844.
- **Test data:** none.
- **Steps:**
  1. Measure the `.logo-box` and `.logo-shield` bounding boxes.
  2. Assert the SVG is fully inside the box and not cropped.
- **Expected result:** the shield is complete and centered inside the gold box at the mobile viewport too.
- **Automated by:** `tests/e2e/mobile.spec.js` › `TC-10 (AC-6): the shield sits complete inside the header logo box on mobile`
- **Status:** Pass

### TC-11: no console errors and no unexpected failed requests
- **Acceptance criterion:** AC-7
- **Priority:** high
- **Type:** functional
- **Preconditions:** page loaded, network idle.
- **Test data:** none.
- **Steps:**
  1. Record console errors, page errors and failed requests.
  2. Ignore Google Fonts failures (offline) and network error codes.
- **Expected result:** no remaining console error and no failed request.
- **Automated by:** `tests/e2e/page.spec.js` › `TC-11 (AC-7): no console errors and no failed requests except optional Google Fonts`
- **Status:** Pass

## Opening and closing the quiz

### TC-12: header CTA opens directly on question 1
- **Acceptance criterion:** AC-8
- **Priority:** high
- **Type:** functional
- **Preconditions:** page loaded, quiz closed.
- **Test data:** none.
- **Steps:**
  1. Click `Fazer o diagnóstico` in the header.
- **Expected result:** the dialog is visible on `Pergunta 1 de 7` with no option pressed and no intermediate screen.
- **Automated by:** `tests/e2e/modal.spec.js` › `TC-12 (AC-8): the header button opens the quiz on question 1 with no answer selected`
- **Status:** Pass

### TC-13: hero CTA box opens directly on question 1
- **Acceptance criterion:** AC-8
- **Priority:** high
- **Type:** functional
- **Preconditions:** page loaded, quiz closed.
- **Test data:** none.
- **Steps:**
  1. Click the hero CTA box button.
- **Expected result:** dialog on `Pergunta 1 de 7`, no option pressed.
- **Automated by:** `tests/e2e/modal.spec.js` › `TC-13 (AC-8): the hero box button opens the quiz on question 1 with no answer selected`
- **Status:** Pass

### TC-14: diagnostic section CTA opens directly on question 1
- **Acceptance criterion:** AC-8
- **Priority:** high
- **Type:** functional
- **Preconditions:** page loaded, quiz closed.
- **Test data:** none.
- **Steps:**
  1. Click the button in the diagnostic section CTA box.
- **Expected result:** dialog on `Pergunta 1 de 7`, no option pressed.
- **Automated by:** `tests/e2e/modal.spec.js` › `TC-14 (AC-8): the diagnostic box button opens the quiz on question 1 with no answer selected`
- **Status:** Pass

### TC-15: final CTA opens directly on question 1
- **Acceptance criterion:** AC-8
- **Priority:** high
- **Type:** functional
- **Preconditions:** page loaded, quiz closed.
- **Test data:** none.
- **Steps:**
  1. Click the final CTA button.
- **Expected result:** dialog on `Pergunta 1 de 7`, no option pressed.
- **Automated by:** `tests/e2e/modal.spec.js` › `TC-15 (AC-8): the final CTA button opens the quiz on question 1 with no answer selected`
- **Status:** Pass

### TC-16: mobile sticky bar opens the quiz, header button hidden
- **Acceptance criterion:** AC-9
- **Priority:** high
- **Type:** functional
- **Preconditions:** mobile 390×844.
- **Test data:** none.
- **Steps:**
  1. Assert the header button is not visible and the sticky bar is visible.
  2. Tap `Fazer o diagnóstico` in the sticky bar.
- **Expected result:** dialog on `Pergunta 1 de 7`, no option pressed.
- **Automated by:** `tests/e2e/mobile.spec.js` › `TC-16 (AC-9): the sticky bar opens the quiz on question 1 and the header button is hidden`
- **Status:** Pass

### TC-17: sticky bar hidden and header button visible on desktop
- **Acceptance criterion:** AC-9
- **Priority:** high
- **Type:** functional
- **Preconditions:** desktop 1280×800.
- **Test data:** none.
- **Steps:**
  1. Check the visibility of `.mobile-bar` and `.header-cta`.
- **Expected result:** sticky bar hidden, header button visible.
- **Automated by:** `tests/e2e/modal.spec.js` › `TC-17 (AC-9): on desktop the sticky bar is hidden and the header button is visible`
- **Status:** Pass

### TC-18: one quiz instance, inside the modal, never visible in the body
- **Acceptance criterion:** AC-10
- **Priority:** high
- **Type:** functional
- **Preconditions:** page loaded, quiz closed.
- **Test data:** none.
- **Steps:**
  1. Count `#quiz` occurrences and `#quiz-modal #quiz` occurrences.
  2. Assert the quiz modal is hidden and no question or e-mail field is visible.
- **Expected result:** exactly one quiz, inside the modal, not visible while closed.
- **Automated by:** `tests/e2e/modal.spec.js` › `TC-18 (AC-10): one quiz instance exists, inside the modal, never visible in the page body`
- **Status:** Pass

### TC-19: dialog semantics, initial focus and scroll lock
- **Acceptance criterion:** AC-11
- **Priority:** high
- **Type:** accessibility
- **Preconditions:** page loaded, quiz closed.
- **Test data:** none.
- **Steps:**
  1. Open the quiz from the header.
  2. Read the dialog role, `aria-modal` and accessible name.
  3. Read the active element and `body` overflow.
- **Expected result:** `role="dialog"`, `aria-modal="true"`, name `Diagnóstico rápido, 7 perguntas`, focus on `Fechar o diagnóstico`, body overflow `hidden`.
- **Automated by:** `tests/e2e/modal.spec.js` › `TC-19 (AC-11): dialog role, accessible name, focus on close and locked body scroll`
- **Status:** Pass

### TC-20: Esc closes and page scroll works again
- **Acceptance criterion:** AC-12
- **Priority:** high
- **Type:** functional
- **Preconditions:** quiz open.
- **Test data:** none.
- **Steps:**
  1. Press `Esc`.
  2. Read the body overflow.
- **Expected result:** modal hidden, body overflow no longer `hidden`.
- **Automated by:** `tests/e2e/modal.spec.js` › `TC-20 (AC-12): closes with Escape`
- **Status:** Pass

### TC-21: close button closes and restores page scroll
- **Acceptance criterion:** AC-12
- **Priority:** high
- **Type:** functional
- **Preconditions:** quiz open.
- **Test data:** none.
- **Steps:**
  1. Click `Fechar o diagnóstico`.
  2. Read the body overflow.
- **Expected result:** modal hidden, body overflow restored.
- **Automated by:** `tests/e2e/modal.spec.js` › `TC-21 (AC-12): closes with the close button`
- **Status:** Pass

### TC-22: backdrop click closes the modal
- **Acceptance criterion:** AC-12
- **Priority:** high
- **Type:** functional
- **Preconditions:** quiz open on desktop.
- **Test data:** click at (4, 4) of the dimmed overlay.
- **Steps:**
  1. Click the dimmed area outside the phone frame.
- **Expected result:** modal hidden.
- **Automated by:** `tests/e2e/modal.spec.js` › `TC-22 (AC-12): closes when the dimmed area outside the phone frame is clicked`
- **Status:** Pass

### TC-23: clicking inside the phone frame keeps the modal open
- **Acceptance criterion:** AC-13
- **Priority:** medium
- **Type:** negative
- **Preconditions:** quiz open on desktop.
- **Test data:** click at (60, 20) of the frame top strip, not on a control.
- **Steps:**
  1. Click the notch strip.
- **Expected result:** dialog still visible.
- **Automated by:** `tests/e2e/modal.spec.js` › `TC-23 (AC-13): clicking inside the phone frame keeps the modal open`
- **Status:** Pass

### TC-24: desktop phone frame geometry
- **Acceptance criterion:** AC-14
- **Priority:** high
- **Type:** functional
- **Preconditions:** desktop 1280×800.
- **Test data:** none.
- **Steps:**
  1. Open the quiz and read the frame bounding box and computed border radius.
  2. Assert the notch and close button are visible.
- **Expected result:** width 400px, horizontally centered, 40px radius, notch and close button visible.
- **Automated by:** `tests/e2e/modal.spec.js` › `TC-24 (AC-14): the desktop frame is 400px wide, 40px rounded, centered and shows the notch`
- **Status:** Pass

### TC-25: mobile phone frame is full screen without radius
- **Acceptance criterion:** AC-14
- **Priority:** high
- **Type:** functional
- **Preconditions:** mobile 390×844.
- **Test data:** none.
- **Steps:**
  1. Open the quiz from the sticky bar.
  2. Read the frame box and radius.
- **Expected result:** 390×844, radius 0, notch and close button still visible.
- **Automated by:** `tests/e2e/mobile.spec.js` › `TC-25 (AC-14): on mobile the frame fills the viewport with no border radius`
- **Status:** Pass

### TC-26: reopening after partial answers restarts at question 1
- **Acceptance criterion:** AC-15
- **Priority:** high
- **Type:** functional
- **Preconditions:** quiz open.
- **Test data:** answers to questions 1 and 2.
- **Steps:**
  1. Answer questions 1 and 2, close the quiz, reopen it.
- **Expected result:** `Pergunta 1 de 7` with no option pressed.
- **Automated by:** `tests/e2e/modal.spec.js` › `TC-26 (AC-15): closing and reopening restarts on question 1 after some answers`
- **Status:** Pass

### TC-27: reopening after the result restarts at question 1
- **Acceptance criterion:** AC-15
- **Priority:** high
- **Type:** functional
- **Preconditions:** quiz open.
- **Test data:** seven last options and a valid e-mail.
- **Steps:**
  1. Reach the result, close and reopen the quiz.
- **Expected result:** question 1 with no option pressed.
- **Automated by:** `tests/e2e/modal.spec.js` › `TC-27 (AC-15): closing and reopening restarts on question 1 after the result`
- **Status:** Pass

## Question flow

### TC-28: exact content of every question
- **Acceptance criterion:** AC-16
- **Priority:** high
- **Type:** functional
- **Preconditions:** quiz open on question 1.
- **Test data:** the 7 area names, questions and hints of §14/§15.
- **Steps:**
  1. For each question, compare the area line, the counter, the question, the hint and the 3 options in order.
- **Expected result:** `ÁREA N DE 7, <AREA>` uppercase, `Pergunta N de 7`, exact question and hint, the 3 options in the fixed order.
- **Automated by:** `tests/e2e/quiz.spec.js` › `TC-28 (AC-16): every question shows the exact area, counter, question, hint and options`
- **Status:** Pass

### TC-29: Continuar is disabled without a selected option
- **Acceptance criterion:** AC-17
- **Priority:** high
- **Type:** negative
- **Preconditions:** quiz open on question 1.
- **Test data:** none.
- **Steps:**
  1. Assert `Continuar` is disabled.
  2. Force a click on it.
- **Expected result:** still on `Pergunta 1 de 7`.
- **Automated by:** `tests/e2e/quiz.spec.js` › `TC-29 (AC-17): Continuar is disabled and does not advance without a selected option`
- **Status:** Pass

### TC-30: only one option stays selected
- **Acceptance criterion:** AC-18
- **Priority:** high
- **Type:** functional
- **Preconditions:** quiz open on question 1.
- **Test data:** option 2 then option 3.
- **Steps:**
  1. Click the second option, then the third.
  2. Read `aria-pressed` on all options and the `Continuar` state.
- **Expected result:** only the third option pressed, `Continuar` enabled.
- **Automated by:** `tests/e2e/quiz.spec.js` › `TC-30 (AC-18): only the last selected option stays pressed and enables Continuar`
- **Status:** Pass

### TC-31: Voltar is invisible on question 1 but keeps its space
- **Acceptance criterion:** AC-19
- **Priority:** medium
- **Type:** boundary
- **Preconditions:** quiz open.
- **Test data:** none.
- **Steps:**
  1. Read the visibility of `Voltar` and the x of `Continuar` on question 1.
  2. Answer and advance to question 2, read the x of `Continuar` again.
- **Expected result:** `Voltar` hidden on question 1, `Continuar` at the same x on both questions.
- **Automated by:** `tests/e2e/quiz.spec.js` › `TC-31 (AC-19): Voltar is invisible on question 1 but keeps the Continuar position`
- **Status:** Pass

### TC-32: going back keeps the previous answer
- **Acceptance criterion:** AC-20
- **Priority:** high
- **Type:** functional
- **Preconditions:** quiz open.
- **Test data:** second option on question 1.
- **Steps:**
  1. Select the second option, advance, click `Voltar`.
- **Expected result:** question 1 with the second option pressed and `Continuar` enabled.
- **Automated by:** `tests/e2e/quiz.spec.js` › `TC-32 (AC-20): going back keeps the previous answer selected and Continuar enabled`
- **Status:** Pass

### TC-33: progress bar follows (N-1)/7 and reaches 100% on e-mail
- **Acceptance criterion:** AC-21
- **Priority:** high
- **Type:** boundary
- **Preconditions:** quiz open.
- **Test data:** none.
- **Steps:**
  1. Measure the fill/track ratio on questions 1, 2 and 7 and on the e-mail screen.
- **Expected result:** 0%, ~14.3%, ~85.7% and 100%.
- **Automated by:** `tests/e2e/quiz.spec.js` › `TC-33 (AC-21): the progress bar follows (N-1)/7 and reaches 100% on the e-mail screen`
- **Status:** Pass

### TC-34: question 7 reads Ver o que falta and leads to the e-mail screen
- **Acceptance criterion:** AC-22
- **Priority:** high
- **Type:** functional
- **Preconditions:** seven questions answered up to question 6.
- **Test data:** first option on question 7.
- **Steps:**
  1. Read the primary button label on question 7.
  2. Select an option and click it.
- **Expected result:** label `Ver o que falta`; the e-mail screen shows, not the result.
- **Automated by:** `tests/e2e/quiz.spec.js` › `TC-34 (AC-22): question 7 reads "Ver o que falta" and leads to the e-mail screen`
- **Status:** Pass

### TC-35: phone screen scrolls back to the top between questions
- **Acceptance criterion:** AC-23
- **Priority:** medium
- **Type:** boundary
- **Preconditions:** desktop 1280×500.
- **Test data:** none.
- **Steps:**
  1. Open the quiz and scroll the phone screen to the bottom.
  2. Select an option and advance.
- **Expected result:** phone screen `scrollTop` is 0.
- **Automated by:** `tests/e2e/quiz.spec.js` › `TC-35 (AC-23): the phone screen scrolls back to the top on every screen change`
- **Status:** Pass

### TC-36: phone screen scrolls back to the top on e-mail and result
- **Acceptance criterion:** AC-23
- **Priority:** medium
- **Type:** boundary
- **Preconditions:** desktop 1280×400 (phone screen becomes scrollable).
- **Test data:** e-mail `ana@site.com`.
- **Steps:**
  1. Reach question 7, scroll the phone screen to the bottom, click `Ver o que falta`.
  2. Assert `scrollTop` 0 on the e-mail screen.
  3. Scroll the e-mail screen to the bottom and submit a valid e-mail.
  4. Assert `scrollTop` 0 on the result.
- **Expected result:** the phone screen is at the top on the e-mail and result screens.
- **Automated by:** `tests/e2e/quiz.spec.js` › `TC-36 (AC-23): the phone screen scrolls back to the top on the e-mail and result screens`
- **Status:** Pass

## E-mail screen

### TC-37: e-mail screen copy and field attributes
- **Acceptance criterion:** AC-24
- **Priority:** high
- **Type:** functional
- **Preconditions:** seven questions answered with the last option.
- **Test data:** none.
- **Steps:**
  1. Read the eyebrow, counter, title, explanatory text, field label, type, autocomplete, placeholder, button and note.
- **Expected result:** exact §16 texts; `type="email"`, `autocomplete="email"`, placeholder `seu melhor e-mail`, button `Ver meu diagnóstico`, note exact.
- **Automated by:** `tests/e2e/email.spec.js` › `TC-37 (AC-24): the e-mail screen shows the exact copy and field attributes`
- **Status:** Pass

### TC-38: invalid e-mail shows the exact error and no result
- **Acceptance criterion:** AC-25
- **Priority:** high
- **Type:** negative
- **Preconditions:** e-mail screen.
- **Test data:** `''`, `'   '`, `ana`, `ana@`, `@site.com`, `ana@site`, `ana@site.c`, `ana silva@site.com`, `ana@@site.com`.
- **Steps:**
  1. For each value, fill the field and submit.
- **Expected result:** error `Confira o e-mail digitado, parece que falta alguma coisa nele.` below the field, focus on the field, no result screen (native validation does not block the message).
- **Automated by:** `tests/e2e/email.spec.js` › `TC-38 (AC-25): every invalid e-mail shows the exact error, focuses the field and shows no result`
- **Status:** Pass

### TC-39: a valid e-mail clears the error and shows the result
- **Acceptance criterion:** AC-26
- **Priority:** high
- **Type:** functional
- **Preconditions:** e-mail screen with the error already visible.
- **Test data:** `ana`.
- **Steps:**
  1. Submit `ana`, confirm the error.
  2. Submit `ana@site.com`.
- **Expected result:** error gone, result visible immediately, header shows `ana@site.com`.
- **Automated by:** `tests/e2e/email.spec.js` › `TC-39 (AC-26): a valid e-mail clears the error and shows the result immediately`
- **Status:** Pass

### TC-40: plus and subdomain e-mail is accepted
- **Acceptance criterion:** AC-26
- **Priority:** medium
- **Type:** boundary
- **Preconditions:** e-mail screen.
- **Test data:** `a.b+c@sub.dominio.com.br`.
- **Steps:**
  1. Submit the value.
- **Expected result:** result screen shows that e-mail in the header.
- **Automated by:** `tests/e2e/email.spec.js` › `TC-40 (AC-26): accepts a plus and subdomain e-mail`
- **Status:** Pass

### TC-41: the e-mail is never sent or stored
- **Acceptance criterion:** AC-27
- **Priority:** high
- **Type:** security
- **Preconditions:** e-mail screen.
- **Test data:** `ana@site.com`.
- **Steps:**
  1. Record every request URL and body.
  2. Submit the e-mail and reach the result.
- **Expected result:** no request contains the e-mail; nothing is stored.
- **Automated by:** `tests/e2e/email.spec.js` › `TC-41 (AC-27): the e-mail is never sent over the network`
- **Status:** Pass

### TC-42: e-mail markup is rendered as text, not HTML
- **Acceptance criterion:** none in the spec; exploration of FR-1/FR-2 and the technical note "never render user input as HTML"
- **Priority:** high
- **Type:** security
- **Preconditions:** e-mail screen.
- **Test data:** `<b>x</b>@a.bc` (passes the validation regex and contains markup).
- **Steps:**
  1. Submit the value.
  2. Read the result header text and DOM children.
- **Expected result:** the string is displayed literally; no element is created from it and no script runs.
- **Automated by:** `tests/e2e/email.spec.js` › `TC-42 (AC-27): e-mail markup is rendered as text, not HTML`
- **Status:** Pass

## Scoring and result

### TC-43: all first options give 14/14, top band and every area conferido
- **Acceptance criterion:** AC-28
- **Priority:** high
- **Type:** boundary
- **Preconditions:** quiz open.
- **Test data:** first option on all 7 questions, e-mail `ana@site.com`.
- **Steps:**
  1. Answer all 7 questions with the first option and submit the e-mail.
  2. Read score, band title and text, the 7 statuses, the priority paragraph and the final note.
- **Expected result:** `14/14`, `Quase pronto, feche as lacunas` with its exact text, 7× `conferido`, the "Nenhuma área descoberta..." paragraph and the exact note.
- **Automated by:** `tests/e2e/result.spec.js` › `TC-43 (AC-28): all first options give 14/14, the top band and every area conferido`
- **Status:** Pass

### TC-44: all last options give 0/14, risk band and 7 priority lessons
- **Acceptance criterion:** AC-29
- **Priority:** high
- **Type:** boundary
- **Preconditions:** quiz open.
- **Test data:** last option on all 7 questions.
- **Steps:**
  1. Answer all 7 questions with the last option and submit a valid e-mail.
  2. Read score, band, statuses and priority paragraph.
- **Expected result:** `0/14`, `Lançamento em risco` with its exact text, 7× `descoberto`, and `Aula 01 (Login e sessão)` to `Aula 07 (Mobile e navegadores)` comma-separated followed by the supporting sentence.
- **Automated by:** `tests/e2e/result.spec.js` › `TC-44 (AC-29): all last options give 0/14, the risk band and every area descoberto`
- **Status:** Pass

### TC-45: band boundary 4 and the pure band function
- **Acceptance criterion:** AC-30
- **Priority:** high
- **Type:** boundary
- **Preconditions:** quiz open / unit runner.
- **Test data:** answers `[0,0,2,2,2,2,2]` (4 points); scores 0, 4, 5, 9, 10, 14 in the unit test.
- **Steps:**
  1. Answer to a total of 4 and read the band.
  2. Run `bandFor` for scores 0, 4, 5, 9, 10 and 14.
- **Expected result:** 4 → `Lançamento em risco`; 5 and 9 → `Base parcial, buracos abertos`; 10 → `Quase pronto, feche as lacunas`.
- **Automated by:** `tests/e2e/result.spec.js` › `TC-45 (AC-30): a total of 4 stays in the risk band` and `tests/unit/scoring.test.js` › `bandFor`
- **Status:** Pass

### TC-46: band boundary 10 e2e
- **Acceptance criterion:** AC-30
- **Priority:** high
- **Type:** boundary
- **Preconditions:** quiz open.
- **Test data:** answers `[0,0,0,0,1,1,2]` (10 points).
- **Steps:**
  1. Answer to a total of 10 and read the band title.
- **Expected result:** `Quase pronto, feche as lacunas`.
- **Automated by:** `tests/e2e/result.spec.js` › `TC-46 (AC-30): a total of 10 enters the top band`
- **Status:** Pass

### TC-47: mixed answers map each area, lesson and priority list
- **Acceptance criterion:** AC-31
- **Priority:** high
- **Type:** functional
- **Preconditions:** quiz open.
- **Test data:** points 2,1,0,2,1,0,2 (option indexes 0,1,2,0,1,2,0).
- **Steps:**
  1. Answer with the mixed pattern and submit a valid e-mail.
  2. Read score, area order, statuses, lesson labels and priority paragraph.
- **Expected result:** `8/14`; statuses conferido, parcial, descoberto, conferido, parcial, descoberto, conferido; `AULA 01` to `AULA 07`; priorities `Aula 02 (...)`, `Aula 03 (...)`, `Aula 05 (...)`, `Aula 06 (...)` in lesson order.
- **Automated by:** `tests/e2e/result.spec.js` › `TC-47 (AC-31): mixed answers show each area status, its lesson and only the weak areas as priority`
- **Status:** Pass

### TC-48: Ver as aulas closes the modal and scrolls to #aulas
- **Acceptance criterion:** AC-32
- **Priority:** high
- **Type:** functional
- **Preconditions:** result screen.
- **Test data:** none.
- **Steps:**
  1. Click `Ver as aulas do curso`.
  2. Read the modal state, `#aulas` position and the page scroll.
- **Expected result:** modal closes, page scrolled so `#aulas` is in view.
- **Automated by:** `tests/e2e/modal.spec.js` › `TC-48 (AC-32): "Ver as aulas do curso" closes the modal and scrolls to #aulas`
- **Status:** Pass

### TC-49: Refazer keeps the modal open and restarts at question 1
- **Acceptance criterion:** AC-33
- **Priority:** high
- **Type:** functional
- **Preconditions:** result screen.
- **Test data:** none.
- **Steps:**
  1. Click `Refazer o diagnóstico`.
- **Expected result:** dialog still visible on `Pergunta 1 de 7`, no option pressed.
- **Automated by:** `tests/e2e/modal.spec.js` › `TC-49 (AC-33): "Refazer o diagnóstico" keeps the modal open and restarts on question 1`
- **Status:** Pass

## Accordions

### TC-50: 8 lessons with exact titles and subtitles, lesson 00 open
- **Acceptance criterion:** AC-34
- **Priority:** high
- **Type:** functional
- **Preconditions:** page loaded.
- **Test data:** the 8 titles and subtitles of §21/§22.
- **Steps:**
  1. Count the course triggers, compare titles and subtitles.
  2. Check `aria-expanded` for all 8 and the visibility of each panel.
- **Expected result:** 8 lessons; lesson 00 open, the other 7 closed.
- **Automated by:** `tests/e2e/accordion.spec.js` › `TC-50 (AC-34): the course accordion has the 8 exact lessons and lesson 00 is open`
- **Status:** Pass

### TC-51: every lesson body and every course tag is exact
- **Acceptance criterion:** AC-34
- **Priority:** high
- **Type:** functional
- **Preconditions:** page loaded.
- **Test data:** the 8 bodies and the 24 tags of §21/§22.
- **Steps:**
  1. Compare each lesson body text with the source.
  2. Compare the 3 tags of each lesson, including the gold tag.
- **Expected result:** every body and tag matches the source letter by letter.
- **Automated by:** `tests/e2e/accordion.spec.js` › `TC-51 (AC-34): every lesson body and all course tags are exact`
- **Status:** Pass

### TC-52: one lesson open at a time, clicking the open one closes it
- **Acceptance criterion:** AC-35
- **Priority:** high
- **Type:** functional
- **Preconditions:** page loaded with lesson 00 open.
- **Test data:** lesson 03.
- **Steps:**
  1. Click lesson 03 and read all `aria-expanded` values.
  2. Click lesson 03 again.
- **Expected result:** lesson 03 open and lesson 00 closed; second click leaves all lessons closed.
- **Automated by:** `tests/e2e/accordion.spec.js` › `TC-52 (AC-35): opening a lesson closes the previous one and clicking it again closes everything`
- **Status:** Pass

### TC-53: FAQ has 5 exact questions, all closed, one open at a time
- **Acceptance criterion:** AC-36
- **Priority:** high
- **Type:** functional
- **Preconditions:** page loaded.
- **Test data:** the 5 questions of §27.
- **Steps:**
  1. Count and compare the questions; check all panels hidden and `aria-expanded="false"`.
  2. Open item 1, then item 2, then item 2 again.
- **Expected result:** all closed on load; opening 2 closes 1; clicking the open item closes it; `aria-expanded` always matches.
- **Automated by:** `tests/e2e/accordion.spec.js` › `TC-53 (AC-36): the FAQ has the 5 exact questions, all closed, one open at a time`
- **Status:** Pass

### TC-54: every FAQ answer is exact
- **Acceptance criterion:** AC-36
- **Priority:** high
- **Type:** functional
- **Preconditions:** page loaded.
- **Test data:** the 5 answers of §27.
- **Steps:**
  1. Compare each answer text with the source.
- **Expected result:** the 5 answers match letter by letter.
- **Automated by:** `tests/e2e/accordion.spec.js` › `TC-54 (AC-36): every FAQ answer is exact`
- **Status:** Pass

## Responsive and accessibility

### TC-55: no horizontal overflow and the breakpoints at 900px and 620px
- **Acceptance criterion:** AC-37
- **Priority:** high
- **Type:** boundary
- **Preconditions:** page loaded on desktop.
- **Test data:** widths 320, 390, 620, 621, 900, 901 and 1280px.
- **Steps:**
  1. At each width, assert `scrollWidth <= clientWidth`.
  2. Read the computed grid columns of hero, proof, format, instructor, problem and audience at 901/900/621/620px.
- **Expected result:** no overflow at any width; hero 1 column ≤900, proof 2 columns ≤900, format 2 columns ≤900 and 1 at ≤620, instructor 1 column ≤900, problem and audience 1 column ≤620.
- **Automated by:** `tests/e2e/page.spec.js` › `TC-55 (AC-37): no horizontal overflow and the layout breaks at 900px and 620px`
- **Status:** Pass

### TC-56: reduced motion disables smooth scroll and the plus rotation
- **Acceptance criterion:** AC-38
- **Priority:** medium
- **Type:** accessibility
- **Preconditions:** `prefers-reduced-motion: reduce`.
- **Test data:** none.
- **Steps:**
  1. Read `scroll-behavior` on `<html>` and the transition duration of `.acc-plus`.
- **Expected result:** `auto` and `0s`.
- **Automated by:** `tests/e2e/page.spec.js` › `TC-56 (AC-38): reduced motion turns smooth scrolling and the plus rotation off`
- **Status:** Pass

### TC-57: Tab reaches interactive elements with a visible focus ring
- **Acceptance criterion:** AC-39
- **Priority:** high
- **Type:** accessibility
- **Preconditions:** page loaded on desktop.
- **Test data:** none.
- **Steps:**
  1. Press Tab 12 times, recording the focused element and its outline.
- **Expected result:** every stop is an interactive element with a visible outline of at least 2px; logo, header CTA, hero CTA, diagnostic CTA and course accordion appear in order.
- **Automated by:** `tests/e2e/a11y.spec.js` › `TC-57 (AC-39): every interactive element is reachable by Tab with a visible focus indicator`
- **Status:** Pass

### TC-58: quiz options are selected with Space and Enter
- **Acceptance criterion:** AC-39
- **Priority:** high
- **Type:** accessibility
- **Preconditions:** page loaded on desktop.
- **Test data:** none.
- **Steps:**
  1. Focus the header CTA and press Enter; confirm focus on the close button.
  2. Tab to the first option, press Space, then Tab to the second and press Enter.
- **Expected result:** the dialog opens, the first option is selected with Space and the second with Enter, only the last stays pressed.
- **Automated by:** `tests/e2e/a11y.spec.js` › `TC-58 (AC-39): the quiz opens and options are selected with Space and Enter`
- **Status:** Pass

### TC-59: close and primary quiz buttons are keyboard reachable
- **Acceptance criterion:** AC-39
- **Priority:** high
- **Type:** accessibility
- **Preconditions:** quiz open, focus on the close button.
- **Test data:** none.
- **Steps:**
  1. Tab forward to the options and the primary button; Shift+Tab back to the close button.
- **Expected result:** every control receives focus in both directions.
- **Automated by:** `tests/e2e/a11y.spec.js` › `TC-59 (AC-39): the close button and the primary quiz button are keyboard reachable`
- **Status:** Pass

## Design system

### TC-60: spacing, size and radius tokens
- **Acceptance criterion:** AC-40
- **Priority:** high
- **Type:** boundary
- **Preconditions:** source CSS and built page.
- **Test data:** none.
- **Steps:**
  1. Read the static CSS: only token declarations may contain raw px for spacing/size, plus borders, the focus outline and breakpoints.
  2. Read the computed radius of a button, a card, the logo box and the phone frame.
- **Expected result:** no raw px for spacing/size outside the token block; radii 8px, 16px, 8px and 40px.
- **Automated by:** `tests/unit/tokens.test.js` › `design tokens` and `tests/e2e/page.spec.js` › `TC-60 (AC-40): radii come from the token scale`
- **Status:** Pass

### TC-61: computed spacing belongs to the scale
- **Acceptance criterion:** AC-41
- **Priority:** high
- **Type:** boundary
- **Preconditions:** page loaded and result reached.
- **Test data:** the sample of section, card, button and quiz elements.
- **Steps:**
  1. Read padding, margin and gap of every sampled element.
- **Expected result:** every value is 0 or one of 4, 8, 12, 16, 24, 32, 40, 48, 56, 64, 80, 96px.
- **Automated by:** `tests/e2e/page.spec.js` › `TC-61 (AC-41): computed padding, margin and gap values belong to the spacing scale`
- **Status:** Pass

### TC-62: type scale and color tokens
- **Acceptance criterion:** AC-42
- **Priority:** high
- **Type:** boundary
- **Preconditions:** page loaded; source CSS.
- **Test data:** none.
- **Steps:**
  1. Read the computed `font-size` of every element.
  2. Read the static CSS for raw hex/rgb colors in component rules.
- **Expected result:** every font size is one of 12, 14, 16, 18, 20, 24, 30, 36, 48, 60px; no ad hoc hex/rgb in components.
- **Automated by:** `tests/e2e/page.spec.js` › `TC-62 (AC-42): every font size comes from the type scale` and `tests/unit/tokens.test.js` › `never uses a raw hex or rgb color in component rules`
- **Status:** Pass

## Exploration

### TC-63: a very long e-mail does not break the result layout
- **Acceptance criterion:** none in the spec; exploration of AC-37 and the result header
- **Priority:** low
- **Type:** boundary
- **Preconditions:** mobile 390×844, result screen reachable.
- **Test data:** `'a'.repeat(120) + '@' + 'b'.repeat(60) + '.com'` (185 characters).
- **Steps:**
  1. Submit the long e-mail on the e-mail screen.
  2. Read the horizontal overflow of the phone screen and of the document.
- **Expected result:** the e-mail wraps inside the header, no horizontal overflow and no clipped text.
- **Automated by:** `tests/e2e/email.spec.js` › `TC-63 (AC-24): a very long e-mail does not overflow the result header`
- **Status:** Pass

### TC-64: keyboard focus stays inside the open dialog
- **Acceptance criterion:** none in the spec; exploration of AC-11 and AC-39 (current defect, issue #1)
- **Priority:** low
- **Type:** accessibility
- **Preconditions:** quiz open on desktop, focus on the close button.
- **Test data:** none.
- **Steps:**
  1. Press Tab until the primary quiz button has been passed.
  2. Press Tab again and read the focused element.
  3. Keep pressing Tab until the first course accordion trigger has focus, then press Enter.
  4. Reopen the quiz, select an option with Space, move focus to `Continuar` and press Enter; read the focused element on question 2.
- **Expected result:** focus cycles inside the dialog (close, options, primary button) and the page behind stays inert.
- **Actual result:** focus leaves the dialog and reaches the page behind (`body`, logo, header CTA, hero CTAs, accordions); pressing Enter on the first course accordion trigger collapses the panel behind the backdrop (height 134px → 0px) while the dialog is still open. Advancing with `Continuar` also drops focus to `body` with no announcement of the new question. See issue #1.
- **Automated by:** not automated (manual evidence in issue #1); the regression test will be added with the fix.
- **Status:** Fail (#1)

## Not covered

- **Visual fidelity beyond measurable rules:** the design system checks (TC-55, TC-56, TC-60 to TC-62) assert tokens, computed values and breakpoints, not pixel-level resemblance to the approved PDF. Colours, spacing and hierarchy were spot-checked in the browser at 320, 360, 390, 620, 800, 1280 and 1400px.
- **Real devices and Safari/Firefox:** the suite runs Chromium in the Playwright desktop and mobile projects. `100dvh`, `env(safe-area-inset-bottom)` and Google Fonts behaviour on iOS Safari were not exercised. The mobile frame has no safe-area padding at the top, so on a notched device the notch strip may sit under the status bar; not covered by an acceptance criterion.
- **E-mail autofill and native browser validation UI:** `autocomplete="email"` and the `novalidate` behaviour are asserted through the DOM; the browser autofill dropdown itself is not automated.
- **Screen-reader announcements:** roles, names and states are asserted; the actual announcement order in NVDA/VoiceOver was not verified. TC-64 already shows the dialog does not make the background inert, which affects screen readers too.
- **Visual scrollbar behaviour on Windows:** opening the modal removes the page scrollbar; no layout shift was measured at 1280px (`header-inner` x stayed 80px with the modal open and closed), so nothing was filed.
- **Hosting, CI execution on GitHub runners:** the workflow exists and the same commands pass locally; the pipeline run itself was not observed.
