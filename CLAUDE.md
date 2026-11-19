# curso-qa

Landing page "Teste Antes de Lançar" for the Unflaky mini course, with the 7-question diagnostic quiz in a
phone-shaped modal. Built with a multi-agent pipeline: requirements analyst → developer → tester → pull request.
A human reviews and merges every PR.

## Stack

- **Vite 8 + vanilla JavaScript (ES modules)**, no framework.
- **`vite-plugin-singlefile`**: `npm run build` emits one self-contained `dist/index.html` with CSS and JS inlined.
  Fonts stay on Google Fonts (Archivo and IBM Plex Mono).
- **Vitest** for unit tests of the pure logic (`tests/unit`).
- **Playwright** (Chromium) for end-to-end tests, with two projects: `desktop` (1280×800) and `mobile` (390×844).
  Tests run against `vite preview` of the built file on `127.0.0.1:4173`, never on the Lamp port 4545.
- **GitHub Actions** (`.github/workflows/ci.yml`): install, build, unit tests and end-to-end tests on every pull
  request and on pushes to `main`.

## Commands

| Command | What it does |
| --- | --- |
| `npm install` | install dependencies |
| `npm run dev` | Vite dev server |
| `npm run build` | build the single-file `dist/index.html` |
| `npm run preview` | preview the built file (Vite default port 4173) |
| `npm run serve:e2e` | preview the built file on `127.0.0.1:4173` for Playwright |
| `npm test` | run Vitest unit tests |
| `npm run test:e2e` | build, then run the Playwright suite (desktop + mobile) |
| `npx playwright test --project=desktop` | run only the desktop project (server must be built) |

First local end-to-end run needs the browser: `npx playwright install chromium`.

## Structure

- `index.html`: all static markup and copy, including the quiz block inside `#diagnostico` and the modal shell.
- `src/styles.css`: design tokens and all styles.
- `src/quiz-data.js`: the 7 areas, the 3 options, the 3 bands and every quiz/result string (single source of copy).
- `src/scoring.js`: pure functions (`totalScore`, `bandFor`, `statusFor`, `priorityAreas`, `formatPriorityList`,
  `isValidEmail`, `pointsFor`), no DOM.
- `src/quiz.js`: quiz state machine and screen rendering (all text via `textContent`).
- `src/modal.js`: modal open/close, focus, scroll lock and the three close methods.
- `src/accordion.js`: course and FAQ accordions (one open at a time, `aria-expanded` in sync).
- `src/main.js`: moves the quiz into the phone screen and wires every `[data-open-quiz]` button.
- `tests/unit/`: Vitest tests (scoring, quiz copy, design tokens).
- `tests/e2e/`: Playwright acceptance tests, named after their AC-n.
- `docs/specs/`: feature specs written by the requirements analyst.
- `docs/test-cases/`: test cases (TC-n, with steps and expected results) written by the tester.
- `docs/test-reports/`: test reports written by the tester.
- Bugs found in testing are filed as GitHub issues labeled `bug` and `severity: *`. Fix commits reference the issue
  (`fix: ... (#12)`), and PRs close them with `Fixes #12`.

## Design system (FR-16): 8px grid and Refactoring UI

All spacing, sizes, radii, shadows and font sizes come from tokens in `:root` of `src/styles.css`. Component rules
must not use raw `px` values for spacing or sizing; the only exceptions are 1px to 3px borders, the 2px focus
outline and the 900px/620px breakpoints. `tests/unit/tokens.test.js` enforces this and that no component rule uses
a raw hex or `rgb()` color.

**Spacing and size scale (8px base, 4px half step):** `--space-1` 4px, `--space-2` 8px, `--space-3` 12px,
`--space-4` 16px, `--space-5` 24px, `--space-6` 32px, `--space-7` 40px, `--space-8` 48px, `--space-9` 56px,
`--space-10` 64px, `--space-11` 80px, `--space-12` 96px.

**Type scale:** `--font-xs` 12px, `--font-sm` 14px, `--font-base` 16px, `--font-md` 18px, `--font-lg` 20px,
`--font-xl` 24px, `--font-2xl` 30px, `--font-3xl` 36px, `--font-4xl` 48px, `--font-5xl` 60px. Line heights:
`--leading-tight` 1.02, `--leading-snug` 1.3, `--leading-body` 1.55.

**Radii:** `--radius-sm` 8px, `--radius-md` 16px, `--radius-lg` 24px, `--radius-xl` 32px,
`--radius-phone` 40px, `--radius-full` 999px.

**Shadows:** `--shadow-sm`, `--shadow-md`, `--shadow-lg` (light from above).

**Component sizes:** `--size-wrap` 1120px, `--size-content` 720px, `--size-content-wide` 760px,
`--size-content-sm` 640px, `--size-phone` 400px, `--size-phone-h` 800px, `--size-logo` 48px,
`--size-shield` 32px, `--size-icon` 24px, `--size-close` 32px, `--size-close-hit` 40px, `--size-notch-w` 96px,
`--size-notch-h` 24px, `--size-avatar` 64px, `--size-instructor-card` 320px, `--size-tap` 48px.

**Colors:** the 15 variables of spec §5 are kept with their exact names and values, including `--radius: 14px`
(required by AC-5). Components never use `--radius`; they use the radius scale. The extra fixed colors of §5
(`--on-gold`, `--phone-bg`, `--notch-bg`, `--backdrop`, `--header-bg`, `--bar-bg`) and the translucent variants
(`--gold-line`, `--green-dim`, `--red-dim`, `--gold-glow`, ...) are also tokens.

**Mapping decisions (source px to token), for QA and the Front-End Dev:**

- Logo box 44px → 48px and header button 44px → 48px (`--size-tap`). The shield 28px → 32px
  (`--size-shield`), with 4px inner padding, so it always fits whole inside the box. AC-6 still quotes 44px and
  28px; FR-16 supersedes those raw values.
- Close button 34px → 32px circle (`--size-close`) with a 40px hit area (`--size-close-hit`).
- Notch strip 38px → 40px; notch pill 96×20px → 96×24px.
- Phone frame 10px inner padding → 8px; inner screen radius 30px → 32px (`--radius-xl`).
- Big button 54px → 56px (`--space-9`); final CTA 70px → 80px (`--space-11`); footer bottom 90px → 96px.
- Section copy: 14/18/20px → 16px or 24px by context; 22/26/28px → 24px or 32px; 13/13.5px → 14px;
  15/15.5px → 16px; 16.5px → 16px; 19px → 20px; 22px → 24px; 56px → 60px.

## Conventions

- Everything in the repository is written in English: code, comments, docs, commit messages, PR descriptions.
  The page copy is pt-BR and must be copied letter by letter from the source document.
- Keep business logic in pure, testable functions, separate from UI code.
- Never render user input as HTML.
- Prefer accessible markup (labels, roles, `aria-*`). End-to-end tests locate elements with `getByRole`,
  `getByLabel` and `getByText` where possible.
- Name tests after behavior. Acceptance tests start with their criterion ID, for example `AC-2: rejects a blank title`.
- Commits follow Conventional Commits: `feat:`, `fix:`, `test:`, `docs:`, `refactor:`, `chore:`.
- Feature branches are named `feature/<slug>`, or keep the branch Claude Code created for a worktree session. Never
  commit to `main`.

## Definition of done

- Every acceptance criterion in the spec is covered by at least one test.
- Build, unit tests and end-to-end tests all pass.
- No unrelated changes in the diff.
