# Spec: Landing page "Teste Antes de Lançar" with phone-frame diagnostic quiz

- Status: ready for development
- Branch: `feature/landing-page-teste-antes-de-lancar`
- Source of truth for every page text, color, size and behavior:
  [`docs/reference/landing-page-source-pt-br.md`](../reference/landing-page-source-pt-br.md) (referred to below as **§N**).
  This spec does not repeat the copy. Copy every page text **letter by letter** from the source document.

## Context

Unflaky (Quality Lab) is launching a short Portuguese mini course, "Teste Antes de Lançar", for founders who build SaaS
products with AI agents (Cursor, Claude, Copilot, ChatGPT) and have no QA background. The instructor is Herbert Parasio.

The landing page does not sell the course up front. It leads the visitor into a 7-question diagnostic that opens in a
phone-shaped modal, asks for an e-mail, shows a score (0 to 14) with the status of each area, and points to the lessons
that cover the visitor's weak areas. The page goes live only when the course is ready, so there is **no waitlist**.

This is the first feature of a brand-new repository: the developer also sets up the stack, test tooling and CI.

## Scope

### In scope
- A single static landing page in pt-BR, sections in the exact order of §6 (header, hero, proof strip, diagnostic
  section, problem, lesson format, course content accordion, audience, instructor, FAQ, final CTA, footer, quiz modal,
  mobile sticky bar).
- The quiz modal (phone frame on desktop, full screen on mobile) and the full quiz flow: 7 questions, e-mail screen,
  result screen (§12 to §18).
- Course accordion and FAQ accordion behavior (§23, §27).
- Responsive layout with breakpoints at 900px and 620px, reduced motion and accessibility rules (§30).
- Build that outputs **one self-contained HTML file** (§31), unit tests, end-to-end tests, CI on GitHub Actions.

### Out of scope
- Storing or sending the e-mail anywhere (§16: validated and displayed only; e-mail capture is a later feature).
- Waitlist of any kind (§29), price, launch date, checkout, login.
- Analytics, cookies banner, hosting/deploy setup.
- Any text, number, testimonial or promise not present in the source document (§3).

## Functional requirements

- **FR-1 Exact copy.** Every visible text, `title`, `aria-label` and placeholder matches the source document exactly
  (§2 to §29). `<html lang="pt-BR">`. Tab title per §2.
- **FR-2 Content rules.** No em dash (`—`) and no en dash (`–`) anywhere in the rendered page text or attributes (§3).
  The `→` arrow in the proof strip "3 dias → 24h" is allowed. No waitlist wording, form or button (§29). The only e-mail
  input on the page is the one in the quiz e-mail screen.
- **FR-3 Visual identity.** CSS custom properties with the exact names and values of §5; Archivo and IBM Plex Mono
  from Google Fonts with preconnect; layout base of §5 (1120px `.wrap`, scroll padding, 48px minimum tap targets
  with the header 44px and modal close 34px exceptions).
- **FR-4 Header.** Sticky header per §7 with the full inline SVG Unflaky shield (shield + check mark) inside the 44px
  gold-bordered box, never cropped, never replaced by a letter. Logo links to `#topo` with label `Unflaky, Quality Lab`.
  Header button `Fazer o diagnóstico` hidden at 620px and below.
- **FR-5 Static sections.** Hero with CTA box (§8), "CONFERÊNCIA PRÉ-LANÇAMENTO" card (§9), proof strip (§10),
  diagnostic section with CTA box and anchor `#diagnostico` (§11), problem (§19), lesson format (§20), course content
  with anchor `#aulas` (§21, §22), audience (§24), instructor (§25, §26), FAQ (§27), final CTA, footer and mobile
  sticky bar (§28).
- **FR-6 Open quiz.** Every `Fazer o diagnóstico` button (header, hero box, diagnostic section box, final CTA, mobile
  sticky bar) opens the modal directly on question 1 with all answers cleared. No welcome/start/intermediate screen
  exists. Reopening always restarts from question 1 (§13).
- **FR-7 Modal.** `role="dialog"`, `aria-modal="true"`, label `Diagnóstico rápido, 7 perguntas`; body scroll locked
  while open and restored on close; focus moves to the close button on open. Closes by the X button
  (`Fechar o diagnóstico`), by clicking the dimmed backdrop outside the frame, and by `Esc` (§12). Desktop (>620px):
  400px phone frame, `min(800px, 94vh)` tall, 40px corners, notch, inner screen scrolls. Mobile (≤620px): full screen
  `100dvh`, no border, no radius, notch and close button still present.
- **FR-8 Single quiz instance.** The quiz markup lives in the `#diagnostico` section in the HTML and is moved into the
  modal screen on page load. The quiz is never visible in the page body and never duplicated (§11).
- **FR-9 Question screens.** Each of the 7 questions shows `ÁREA N DE 7, <AREA NAME>` (uppercase), `Pergunta N de 7`,
  progress bar at `(N-1)/7` (0% on question 1), question, hint, and the 3 options of §15 in order. One option selected
  at a time. `Continuar` disabled (opacity .4) until an option is selected. `Voltar` invisible on question 1 but still
  taking space; going back keeps the previous answer selected. On question 7 the button reads `Ver o que falta` and
  leads to the e-mail screen. The phone screen scrolls to top on every screen change (§13 to §15).
- **FR-10 E-mail screen.** Texts of §16, progress 100%, `type="email"`, `autocomplete="email"`, label
  `Seu e-mail para ver o diagnóstico`. Validation regex `/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/`. Invalid: show the exact
  error message under the field, focus returns to the field, no result. Valid: error hidden, result shown immediately.
  The e-mail is not stored or sent anywhere.
- **FR-11 Scoring.** Option points 2 / 1 / 0; total = sum of the 7 answers (0 to 14). Bands: 0 to 4, 5 to 9, 10 to 14
  with exact titles and texts of §18. Status per area: 2 = `conferido`, 1 = `parcial`, 0 = `descoberto`.
- **FR-12 Result screen.** `SEU DIAGNÓSTICO`, the typed e-mail, score `N/14`, band title and text, the 7 areas in
  question order each with status icon, name, status label and `AULA NN`. Priority paragraph: areas with fewer than
  2 points listed as `Aula NN (Área)` in lesson order, comma-separated, followed by the supporting sentence; or the
  "Nenhuma área descoberta" paragraph when none (§18). Buttons `Ver as aulas do curso` (closes modal, scrolls to
  `#aulas`) and `Refazer o diagnóstico` (clears answers, back to question 1, modal stays open). Final note per §18.
- **FR-13 Accordions.** Course: 8 lessons, lesson 00 open on load, only one open at a time, clicking the open one
  closes it, `aria-expanded` kept in sync, plus sign rotates 45° when open (§23). FAQ: 5 items, all closed on load,
  only one open at a time, clicking the open one closes it, `aria-expanded` kept in sync (§27).
- **FR-14 Responsive and accessibility.** Breakpoint behavior of §30 at 900px and 620px; no horizontal overflow at any
  width from 320px up; `prefers-reduced-motion` disables smooth scroll and the plus-sign rotation; visible 2px gold
  focus outline on fields.
- **FR-16 Design system: 8px grid and Refactoring UI** (product owner request, 2026-11-19, overrides the raw pixel
  values of the source where they conflict, see "Design system" below). Every spacing, size and layout dimension comes
  from a fixed token scale built on 8px; the whole UI follows the principles of the book *Refactoring UI*
  (Wathan & Schoger).
- **FR-15 Technical.** Static page, no backend, no external images; empty data-URI favicon; viewport meta with
  `viewport-fit=cover`; anchors `#topo`, `#diagnostico`, `#aulas`; zero console errors (§31).

## Acceptance criteria

Each criterion maps to the source checklist in §32. "Desktop" = 1280×800 viewport, "mobile" = 390×844 viewport.

### Page, copy and rules
- **AC-1** Given the page is loaded, when I read the document, then `<html lang="pt-BR">`, the tab title is
  `Teste Antes de Lançar, o mini curso para SaaS feito com IA`, the favicon is an empty data URI and the viewport meta
  contains `viewport-fit=cover`.
- **AC-2** Given the page is loaded on desktop, when I scan it top to bottom, then the sections appear in the order of §6
  and each section's texts match the source document exactly (hero, conference card, proof strip, diagnostic section,
  problem, format, course, audience, instructor, FAQ, final CTA, footer).
- **AC-3** Given the page is loaded, when I search the full rendered text, all attribute values and every quiz screen,
  then no `—` or `–` character is found.
- **AC-4** Given the page is loaded, when I search for waitlist wording (`lista de espera`, `avise-me`,
  `garanta sua vaga`, `entrar na lista`), then nothing is found, and the page body (outside the modal) contains no
  `input` of type email nor any form.
- **AC-5** Given the page is loaded, when I read `:root` computed styles, then all 15 CSS variables of §5 exist with
  the exact values, and the Archivo and IBM Plex Mono font families are requested from Google Fonts with preconnect.
- **AC-6** Given desktop and mobile viewports, when the page loads, then the header shows the complete shield SVG
  (28×28) fully inside the 44×44 logo box (bounding box of the SVG inside the box), next to `UNFLAKY` and `QUALITY LAB`,
  and the logo is a link to `#topo` named `Unflaky, Quality Lab`.
- **AC-7** Given the page is loaded, then there are no console errors and no failed requests other than optional
  Google Fonts when offline.

### Opening and closing the quiz
- **AC-8** Given desktop, when I click `Fazer o diagnóstico` in the header, the hero box, the diagnostic section box or
  the final CTA, then each time the modal opens directly on question 1 (`Pergunta 1 de 7`) with no option selected.
- **AC-9** Given mobile, when I click `Fazer o diagnóstico` in the sticky bottom bar, then the modal opens on question 1;
  and the header `Fazer o diagnóstico` button is not visible on mobile while the sticky bar is not visible on desktop.
- **AC-10** Given the page is loaded and the modal is closed, then no quiz question, option or e-mail field is visible
  anywhere in the page body, and exactly one quiz instance exists in the DOM, inside the modal.
- **AC-11** Given the modal is open, then it has `role="dialog"`, `aria-modal="true"` and the accessible name
  `Diagnóstico rápido, 7 perguntas`, focus is on the `Fechar o diagnóstico` button, and the page body cannot scroll.
- **AC-12** Given the modal is open, when I press `Esc`, or click `Fechar o diagnóstico`, or click the dimmed area
  outside the phone frame, then the modal closes and page scroll works again (one test per method).
- **AC-13** Given the modal is open, when I click inside the phone frame (not on a control), then the modal stays open.
- **AC-14** Given desktop, when the modal is open, then the phone frame is 400px wide, has 40px border radius, shows the
  notch, and is centered over the dimmed page. Given mobile, then the frame fills the viewport width and height with
  no border radius.
- **AC-15** Given I answered several questions (or reached the result), when I close and reopen the modal, then it
  restarts on question 1 with no option selected.

### Question flow
- **AC-16** Given question N (1 to 7), then the screen shows `ÁREA N DE 7, <AREA NAME IN UPPERCASE>`,
  `Pergunta N de 7`, the exact question and hint of §14/§15, and the 3 options in order: `Sim, já testei isso de verdade`,
  `Testei só o caminho normal, sem erro`, `Nunca testei isso`.
- **AC-17** Given a question with no option selected, then `Continuar` is disabled and clicking it does not advance.
- **AC-18** Given I select an option and then another option, then only the last one is selected (`aria-pressed` or
  `aria-checked` reflects it) and `Continuar` is enabled.
- **AC-19** Given question 1, then `Voltar` is invisible but keeps its space (`Continuar` keeps the same x position as
  on question 2).
- **AC-20** Given I answered question 1 and moved to question 2, when I click `Voltar`, then question 1 shows my
  previous answer selected and `Continuar` is enabled.
- **AC-21** Given question N, then the progress bar fill width is `(N-1)/7` of the track (0% on question 1, ~14.3% on
  question 2, ~85.7% on question 7), and 100% on the e-mail screen.
- **AC-22** Given question 7 with an option selected, then the primary button reads `Ver o que falta` and clicking it
  shows the e-mail screen, not the result.
- **AC-23** Given I scrolled down inside the phone screen, when the screen changes, then the phone screen is scrolled
  back to the top.

### E-mail screen
- **AC-24** Given the e-mail screen, then it shows `SEU RESULTADO ESTÁ PRONTO`, `Falta só o e-mail`,
  `Onde eu te mostro o diagnóstico?`, the explanatory text, a field labelled `Seu e-mail para ver o diagnóstico`
  (`type="email"`, `autocomplete="email"`, placeholder `seu melhor e-mail`), the button `Ver meu diagnóstico` and the
  note `Seu resultado aparece na tela assim que você confirmar.`
- **AC-25** Given the e-mail screen, when I submit each invalid value: empty, `   `, `ana`, `ana@`, `@site.com`,
  `ana@site`, `ana@site.c`, `ana silva@site.com`, `ana@@site.com`, then the exact error
  `Confira o e-mail digitado, parece que falta alguma coisa nele.` appears below the field, focus is on the field and
  the result is not shown. (Browser native validation must not block this message: use `novalidate` or equivalent.)
- **AC-26** Given an error is shown, when I submit a valid e-mail such as `ana@site.com` or `a.b+c@sub.dominio.com.br`,
  then the error disappears and the result screen shows immediately with that e-mail in the header.
- **AC-27** Given any e-mail is submitted, then no network request is made with the e-mail (nothing is stored or sent).

### Scoring and result
- **AC-28** Given all 7 answers are the first option, when the result shows, then the score is `14/14`, the band is
  `Quase pronto, feche as lacunas` with its exact text, all 7 areas show `conferido`, and the priority paragraph is the
  "Nenhuma área descoberta..." text.
- **AC-29** Given all 7 answers are the last option, then the score is `0/14`, the band is `Lançamento em risco`, all 7
  areas show `descoberto`, and the priority paragraph lists all 7 lessons from `Aula 01 (Login e sessão)` to
  `Aula 07 (Mobile e navegadores)` followed by the supporting sentence.
- **AC-30** Given band boundaries, when the total is 4, 5, 9 and 10, then the bands are respectively
  `Lançamento em risco`, `Base parcial, buracos abertos`, `Base parcial, buracos abertos`,
  `Quase pronto, feche as lacunas` (covered by unit tests on the pure scoring function; at least one boundary also e2e).
- **AC-31** Given mixed answers (for example 2,1,0,2,1,0,2), then each area shows the status for its points
  (conferido / parcial / descoberto), each row shows its `AULA NN`, and the priority list contains only the areas with
  fewer than 2 points, in lesson order, formatted `Aula NN (Área)` and comma-separated.
- **AC-32** Given the result screen, when I click `Ver as aulas do curso`, then the modal closes and the page is scrolled
  so the `#aulas` section is in view.
- **AC-33** Given the result screen, when I click `Refazer o diagnóstico`, then the modal stays open and shows question 1
  with no option selected.

### Accordions
- **AC-34** Given the page loads, then the course accordion has the 8 lessons of §21/§22 with exact title, subtitle,
  body and tags; lesson 00 is open (`aria-expanded="true"`) and the other 7 are closed.
- **AC-35** Given lesson 00 is open, when I open lesson 03, then lesson 03 is open and lesson 00 is closed; when I click
  lesson 03 again, then all lessons are closed.
- **AC-36** Given the page loads, then the FAQ has the 5 exact questions, all closed; opening one closes any other;
  clicking the open one closes it; `aria-expanded` matches the state in every case.

### Responsive and accessibility
- **AC-37** Given viewport widths 320, 390, 620, 621, 900, 901 and 1280px, then the page has no horizontal scroll
  (`scrollWidth <= clientWidth`) and the layout matches §30 (hero 1 column at ≤900px; proof strip 2 columns at ≤900px;
  format 2 columns at ≤900px and 1 column at ≤620px; problem and audience 1 column at ≤620px; instructor 1 column at
  ≤900px).
- **AC-38** Given `prefers-reduced-motion: reduce`, then `scroll-behavior` is `auto` and the lesson plus sign has no
  transition.
- **AC-39** Given keyboard only, when I Tab through the page and the quiz, then every interactive element is reachable,
  shows a visible focus indicator, and quiz options can be selected with Enter or Space.

### Design system (8px grid, Refactoring UI)
- **AC-40** Given `src/styles.css`, then all spacing (padding, margin, gap), component sizes (button heights, icon
  boxes, avatar, logo box, phone frame) and border radii use CSS custom properties from the token scale below; no raw
  `px` value for spacing or sizing appears outside the token definitions (borders of 1px/1.5px/2px/3px, the 2px focus
  outline and breakpoints are the only exceptions).
- **AC-41** Given the page on desktop and mobile, when I measure the computed padding, margin and gap of every section,
  card, button and quiz element, then each value is a value of the spacing scale (multiples of 8px, plus the 4px and
  12px half steps).
- **AC-42** Given the type and color tokens, then every font size comes from the type scale below and every color comes
  from the §5 variables (no ad hoc hex values in component rules).

## Design system: 8px grid and Refactoring UI

Herbert asked (2026-11-19) that the front end strictly follows the **8px proportion rule** and builds everything with
**Refactoring UI** references. This changes how the source measurements are applied: the source's colors, copy,
behavior, breakpoints (900px, 620px) and structure stay exact; its raw pixel values for spacing and sizes are mapped to
the nearest token below. The Front-End Dev owns this design system and documents the final token list in `CLAUDE.md`.

**Spacing and size scale (8px base, 4px only as a half step for tight UI):**
`--space-1: 4px`, `--space-2: 8px`, `--space-3: 12px`, `--space-4: 16px`, `--space-5: 24px`, `--space-6: 32px`,
`--space-7: 40px`, `--space-8: 48px`, `--space-9: 56px`, `--space-10: 64px`, `--space-11: 80px`, `--space-12: 96px`.
Mapping guide: 14/18/20px → 16px or 24px by context; 22/26/28px → 24px or 32px; 34px close button → 32px (with a 40px
hit area if needed); 38px notch strip → 40px; 44px logo box and header button → 40px or 48px; 54px big button → 56px;
70px final CTA → 64px or 80px; 90px footer bottom → 96px; 1120px max width and 400px phone frame already fit.
Minimum tap target stays 48px. Radii: `--radius-sm: 8px`, `--radius: 16px` (source 14px), `--radius-lg: 24px`,
`--radius-xl: 32px` / `40px` for the phone frame, `--radius-full`.

**Type scale (Refactoring UI: a small, fixed scale, no in-between sizes):**
12, 14, 16, 18, 20, 24, 30, 36, 48, 60px. Source sizes map to the nearest step (13/13.5 → 14, 14.5/15/15.5 → 16,
16.5/17 → 16 or 18, 19 → 20, 22 → 24, 56 → 60). Line heights from 4px multiples where practical; body stays 1.5 to 1.6.

**Refactoring UI principles the front end must apply:**
- Hierarchy through weight and color (`--text`, `--muted`, `--muted2`) before size; de-emphasize secondary content
  instead of emphasizing everything.
- Start with too much white space and remove; group related items with less space than unrelated ones.
- Limit choices: only the spacing, type, radius, shadow and color tokens defined here.
- Labels are a last resort; prefer data with clear hierarchy (score, status rows, lesson numbers).
- Emphasize by de-emphasizing; one primary action per area (gold button), secondary actions as ghost buttons.
- Depth with a small, consistent shadow scale (for example `--shadow-sm`, `--shadow-md`, `--shadow-lg` for the phone
  frame) and light from above; use borders sparingly, prefer spacing, background tone or shadow to separate.
- Don't let the text column run wide: keep body text around 45 to 75 characters per line.
- Accessible contrast for text on dark backgrounds (at least WCAG AA for body text).

## Assumptions to confirm (Herbert)

0. **8px rule vs. source pixels.** Where the source gives a pixel value that is not on the 8px scale (14px, 18px, 22px,
   26px, 44px, 54px...), the token scale wins and the value is rounded to the nearest token. Colors, copy, behavior and
   breakpoints from the source stay exact.

1. **Gold part of the H1.** The source says "the final part" of `Sem esses testes, seu SaaS pode quebrar em produção`
   is gold but not where it starts. Assumed: `pode quebrar em produção` is gold.
2. **Highlighted part of hero paragraph 1.** Not specified. Assumed: `ninguém conferiu se funciona de verdade` is in the
   main text color.
3. **Lesson tags.** The PDF text extraction is ambiguous. Assumed tags per lesson: lesson 00 = `AULA DE ABERTURA`
   (gold), `MAPA DOS 7 TESTES`, `AMBIENTE DE TESTE`; lessons 01 to 06 = `ÁREA, <TOPIC>`, `PROMPT INCLUSO` (gold),
   `CHECKLIST MANUAL`; lesson 07 = `ÁREA, EXPERIÊNCIA FINAL`, `PROMPT INCLUSO` (gold), `LISTA DE LIBERAÇÃO`.
4. **Highlights** in the instructor paragraphs and curriculum footer ("destaques na cor do texto principal") are not
   specified; the developer picks short key phrases and lists them in the PR.
5. **Single file.** The source asks for one HTML file with inline CSS and JS. We keep readable source files
   (separate modules, pure scoring logic for unit tests) and the build outputs one self-contained `dist/index.html`.
6. **Hosting** is not part of this feature.

## Technical notes

### Stack (new project)
- **Vite + vanilla JavaScript (ES modules)**, `vite-plugin-singlefile` so `npm run build` emits a single
  `dist/index.html` with all CSS and JS inlined (satisfies §31). Fonts stay on Google Fonts as required.
- **Vitest** for unit tests of the pure logic.
- **Playwright** (Chromium; desktop 1280×800 and mobile 390×844 projects) for end-to-end tests, run against
  `vite preview` of the built file on its own port (for example 4173 or 5180, **never 4545**).
- **GitHub Actions** workflow: install, build, unit tests, e2e tests on push and pull request.

### Suggested structure
- `index.html`: all static markup and copy (the quiz block inside `#diagnostico`, the modal shell outside).
- `src/styles.css`: variables and styles of §5 to §30.
- `src/quiz-data.js`: the 7 areas (area name, lesson number, question, hint), the 3 options with points, the 3 bands,
  all quiz/result strings. Single source for quiz copy.
- `src/scoring.js`: pure functions, no DOM: `totalScore(answers)`, `bandFor(score)`, `statusFor(points)`,
  `priorityAreas(answers)`, `formatPriorityList(areas)`, `isValidEmail(value)`.
- `src/quiz.js`: quiz state machine and rendering (render text with `textContent`, never `innerHTML` with user input;
  the typed e-mail must be rendered as text).
- `src/modal.js`, `src/accordion.js`, `src/main.js`: modal open/close/focus/scroll lock, accordions, wiring of every
  `Fazer o diagnóstico` button (use one shared attribute such as `data-open-quiz`).
- `tests/unit/*.test.js`, `tests/e2e/*.spec.js`.

### Ordered tasks for the developer
1. Scaffold Vite + vanilla JS, Vitest, Playwright, `vite-plugin-singlefile`; npm scripts `dev`, `build`, `preview`,
   `test`, `test:e2e`; GitHub Actions CI; fill in `CLAUDE.md` (stack, commands, structure). Update `README.md`.
2. `quiz-data.js` and `scoring.js` with unit tests (scores 0/14, band boundaries 4/5/9/10, status mapping, priority
   list formatting, the e-mail regex with the AC-25/AC-26 values).
3. Static markup and styles for all sections with the exact copy (§5 to §11, §19 to §28), including the shield SVG.
4. Accordions (course and FAQ).
5. Modal (phone frame, close methods, scroll lock, focus) and moving the quiz into it on load.
6. Quiz flow: questions, progress, back/continue, e-mail screen, result screen, redo, "see lessons".
7. Responsive rules and reduced motion (§30); check no overflow at 320px.
8. Self-check: no `—`/`–` in `dist/index.html` text, no waitlist wording, no console errors, build output is a single file.

### Risks the source calls out (check these first)
- Cropped shield in the header logo box.
- Any intermediate/welcome screen before question 1.
- Any waitlist form or wording coming back.
