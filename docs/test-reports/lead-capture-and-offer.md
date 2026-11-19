# Test report: lead-capture-and-offer

- Mode: full test run
- Branch: `feature/lead-capture-and-offer`, tested on `b5aa028` plus the QA test commit
- Spec: `docs/specs/lead-capture-and-offer.md`
- Test cases: `docs/test-cases/lead-capture-and-offer.md`

## Verdict: PASS

Every acceptance criterion has at least one passing test case, the build and the full suite pass, and no critical or
major issue is open. One minor issue (documentation) stays open as backlog.

## Counts

| Suite | Result |
| --- | --- |
| Build (`npm run build`, two passes) | Pass, `dist/index.html` and `dist/privacidade.html` |
| Unit (Vitest) | 53 passed, 1 todo (FR-10 reminder) |
| End-to-end (Playwright, desktop + mobile) | 96 passed (90 existing + 6 added by QA) |
| Flaky tests | none |
| Test cases | 36: 35 Pass, 1 Fail (#3, minor) |

## Traceability

| AC | Test cases | Result |
| --- | --- | --- |
| AC-1 | TC-1, TC-30, TC-31, TC-32 | Pass |
| AC-2 | TC-2, TC-3 | Pass |
| AC-3 | TC-4 | Pass |
| AC-4 | TC-5, TC-6, TC-7, TC-33 | Pass (see spec issue 1) |
| AC-5 | TC-8, TC-9 | Pass |
| AC-6 | TC-10 | Pass |
| AC-7 | TC-11, TC-12 | Pass |
| AC-8 | TC-13, TC-35 | Pass |
| AC-9 | TC-14 | Pass |
| AC-10 | TC-15, TC-16 | Pass |
| AC-11 | TC-17 | Pass |
| AC-12 | TC-18 | Pass |
| AC-13 | TC-19 | Pass |
| AC-14 | TC-20 | Pass |
| AC-15 | TC-21, TC-34 | Pass |
| AC-16 | TC-22 | Pass |
| AC-17 | TC-23 | Pass |
| AC-18 | TC-24 | Pass |
| AC-19 | TC-25 | Pass |
| AC-20 | TC-26 | Pass |
| AC-21 | TC-27 | Pass |
| AC-22 | TC-28 | Pass |
| FR-1, FR-10 | TC-29 | Pass |
| FR-3 (technical notes, task 7) | TC-36 | Fail (#3) |

## Issues opened

- #3 (minor): MailerLite endpoint, test config override and privacy page are not documented in CLAUDE.md or README

## Spec issues

1. **AC-4 "no console error" vs. browser network logs.** When the MailerLite request gets HTTP 500 or is aborted
   (for example by an ad blocker), Chrome itself prints `Failed to load resource: ...` to the console. Page code cannot
   suppress it. The tests (TC-5, TC-6) ignore only that browser line and still fail on any error raised by page code
   (`console.error` or uncaught exceptions). TC-33 shows the page's own 8 s timeout produces no console message at all.
   QA reads FR-4 as "the page raises no error", and the implementation meets that reading. If the analyst means
   literally zero console lines, the AC cannot be met by any fetch-based solution and needs rewording.

## Code review (`git diff main...HEAD`)

No correctness or security defects beyond #3. Notes:

- Security: no API key or token; all dynamic text uses `textContent`; the privacy link uses `rel="noopener"`; the lead
  request is `no-cors` with a CORS-safelisted content type, fire and forget, every error caught.
- Suggestion: `window.__TEST_CONFIG__` is honored in the production bundle. It is harmless (a script that can set it
  already controls the page), but a comment or a build-time guard would make the intent explicit.
- Suggestion: with `no-cors` the response is opaque, so the page cannot tell a rejected subscribe from a successful
  one. Accepted by FR-4; Herbert should do one real submit after filling in the IDs and confirm the lead and the 3
  custom fields in MailerLite.
- Suggestion: `.offer-price-value` uses `line-height: 1` instead of a leading token; allowed by the token test, minor
  consistency nit.
- The developer's acceptance tests are named by AC only (`AC-n: ...`); they are traced to TC IDs in the test cases file.
