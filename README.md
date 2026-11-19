# curso-qa

Landing page for the Unflaky mini course "Teste Antes de Lançar", with a 7-question diagnostic quiz inside a
phone-shaped modal. At the end of the quiz the lead (e-mail, score, band, open areas) is sent to MailerLite and the
visitor sees the course offer (R$ 9,90 on Kiwify). Static pages, pt-BR copy, no backend and no waitlist.

- `npm install` installs dependencies.
- `npm run dev` starts the Vite dev server.
- `npm run build` writes two self-contained pages: `dist/index.html` and `dist/privacidade.html`.
- `npm test` runs the Vitest unit tests.
- `npm run test:e2e` builds and runs the Playwright tests (desktop 1280×800 and mobile 390×844).

The full spec is in [`docs/specs/landing-page-teste-antes-de-lancar.md`](docs/specs/landing-page-teste-antes-de-lancar.md);
the exact copy source is [`docs/reference/landing-page-source-pt-br.md`](docs/reference/landing-page-source-pt-br.md).
The lead capture and offer spec is [`docs/specs/lead-capture-and-offer.md`](docs/specs/lead-capture-and-offer.md).
MailerLite IDs, the Kiwify checkout link and the privacy contact e-mail are set in `src/config.js` (empty until
provided). Stack, commands, structure, configuration and design tokens are documented in [`CLAUDE.md`](CLAUDE.md).

Status: in development.
