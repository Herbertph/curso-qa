# Test report: landing page "Teste Antes de Lançar"

- Spec: [`docs/specs/landing-page-teste-antes-de-lancar.md`](../specs/landing-page-teste-antes-de-lancar.md)
- Test cases: [`docs/test-cases/landing-page-teste-antes-de-lancar.md`](../test-cases/landing-page-teste-antes-de-lancar.md)
- Branch: `feature/landing-page-teste-antes-de-lancar`
- Tested commit: `20365d4` (`style: keep the quiz question counter on one line`)
- Mode: full test run (first time the feature is tested)
- Date: 2026-11-19

## Verdict

**PASS.**

Every acceptance criterion (AC-1 to AC-42) has at least one test case and all of them pass. The full unit and e2e suites pass and the build succeeds. One minor accessibility defect is open as issue #1; it is outside the explicit wording of the acceptance criteria and is kept as backlog, so it does not block the feature.

## Environment and commands

- Windows, Node 22.12.0, npm 10.
- Vitest 5.1.1 (`tests/unit`, jsdom-free pure logic and static CSS checks).
- Playwright 1.65.1 / Chromium, two projects: `desktop` 1280×800 and `mobile` 390×844.
- Preview server: `npm run build && npm run serve:e2e` on `http://127.0.0.1:4173` (dedicated test port, not the Lamp port).

| Command | Result |
| --- | --- |
| `npm test` | 3 files, 39 tests passed |
| `npm run build` | success (single `dist/index.html`, 0 external assets) |
| `npm run test:e2e` | 63 tests passed (60 desktop, 3 mobile) in ~20 s |
| re-runs | none needed: no test failed, so no flaky test was observed |

## Test cases and automation

- 64 test cases written before automation (TC-1 to TC-64), covering equivalence partitions, boundary values (320/390/620/621/900/901/1280px, progress 0/14.3/85.7/100%, scores 4/5/9/10, band edges), negative paths (invalid e-mails, no selection, backdrop click), security (e-mail never sent, markup rendered as text) and accessibility.
- 63 of the 64 cases are automated: 56 earlier Playwright tests were kept and renamed to the `TC-n (AC-m): ...` convention, 7 new e2e tests were added for gaps (TC-5, TC-10, TC-36, TC-42, TC-51, TC-54, TC-63), and TC-45, TC-60 and TC-62 also rely on `tests/unit/scoring.test.js` and `tests/unit/tokens.test.js`.
- TC-64 (focus stays inside the open dialog) is documented as a manual failing case. The regression test will be added together with the fix, so the suite is not red for a known minor issue.

## Traceability

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
| exploration | TC-63, TC-64 | TC-63 Pass, TC-64 Fail (#1) |

## Issues opened

| Issue | Severity | Summary |
| --- | --- | --- |
| [#1](https://github.com/Herbertph/curso-qa/issues/1) | minor | Keyboard focus leaves the open quiz dialog and the page behind stays operable |

Details: the dialog declares `aria-modal="true"` and moves focus to the close button on open, but there is no focus trap and the page behind is not `inert`. After the three tab stops of the quiz options, Tab reaches `body`, the logo, the header CTA, the hero CTAs and the course accordion triggers; pressing Enter on the first course accordion trigger collapses the panel behind the open dialog (height 134px → 0px). Advancing with `Continuar` also drops focus to `body` with no announcement of the new question. A second comment on the issue records this evidence.

No other defect was found. No duplicate issue was created.

## Flaky tests

None. Every test passed on the first run; no retry was used.

## Spec issues

None blocking.

- AC-6 states the raw 44×44/28×28 values from the source, while FR-16 (added later by the product owner) says the 8px token scale overrides raw pixel values where they conflict. The implementation uses 48×48/32×32, which respects the 8px grid; TC-9 and TC-10 assert the implementation values and cite FR-16. Treated as resolved by FR-16, not as a defect.

## Code review of the branch

Reviewed `git diff main...HEAD` (implementation, tests, CI, docs) with the code-review and security skills.

- **Defects filed:** issue #1 (modal focus management), as above.
- **Security:** no injection surface. The e-mail is validated by a conservative regex, displayed with `textContent` (TC-42 proves markup stays text), never sent over the network and never persisted (TC-41). No `innerHTML` with user data, no external scripts, no backend. `npm audit` reports 0 vulnerabilities.
- **Quality:** clear separation between pure logic (`scoring.js`, `quiz-data.js`), DOM modules (`quiz.js`, `modal.js`, `accordion.js`) and bootstrap (`main.js`); no dead code; static single-file build; tests use accessible selectors and stable text assertions.
- **Style suggestions (not filed as issues):**
  - Question changes are not announced: `quiz.js` re-renders the phone screen without a live region or a focus move to the new heading, so screen-reader users get no feedback that the question changed. Covered as extra evidence in issue #1.
  - `main.js` creates the modal with an `onOpen` closure that calls `quiz.reset()` before `quiz` is assigned; it is safe because the callback runs only after assignment, but a later refactor could turn it into a temporal-dead-zone error.
  - The quiz buttons use `aria-pressed` toggle semantics rather than radio semantics; this matches the spec, but a future accessibility pass could reconsider it.

## Exploration (outside the acceptance criteria)

- Exact copy compared against `docs/reference/landing-page-source-pt-br.md`: 0 mismatches, no em/en dash, no waitlist wording, no e-mail field outside the quiz.
- E-mail input with markup (`<b>x</b>@a.bc`) and with 185 characters: rendered as text, wraps, no horizontal overflow.
- Layout at 320, 360, 390, 620, 621, 800, 900, 901, 1280 and 1400px through every quiz screen: no horizontal overflow, breakpoints behave as specified.
- Keyboard-only use: focus rings visible on every control; found the focus-management gap reported in issue #1 (the only defect found here).
- Repeated and fast clicks on quiz options, `Continuar`, accordions and the mobile bar: no double advance, no lost answer, no error.
- Scroll resets on every screen change, including e-mail and result; observed page jumps during automated exploration were Playwright's own scroll-into-view, not the app.
- `prefers-reduced-motion: reduce`: smooth scrolling and the plus rotation are off.
- `dist/` contains a single self-contained `index.html`; no console errors and no failed requests except optional Google Fonts.

## Not covered / residual risk

- Pixel-level visual fidelity to the approved PDF is not asserted; tokens, computed values, breakpoints and copy are.
- Real iOS Safari/Firefox and real devices: `100dvh`, `env(safe-area-inset-bottom)` and Google Fonts fallback behaviour were not exercised. On a notched device the notch strip may sit under the status bar; the spec does not require a safe-area rule.
- Native browser autofill UI and screen-reader announcements (NVDA/VoiceOver) were not verified on real assistive technology.
- The GitHub Actions workflow exists and the same commands pass locally, but the pipeline run itself was not observed.

## Recommendation

The feature meets its acceptance criteria and can move on. Keep issue #1 in the backlog and fix it in a follow-up (focus trap plus `inert` on the background, focus restored after each render); when it is fixed, add the automated TC-64 regression test and retest.
