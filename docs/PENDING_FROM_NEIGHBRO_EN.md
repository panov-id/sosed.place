# Port candidates: neighbro → sosed

The sosed landing is **intentionally left untouched** (owner's decision). This file collects changes/features made on neighbro (and the panel) that likely apply to sosed too. Port them into sosed's code only on an explicit request.

Before porting, check each item against sosed's actual code (its structure may differ from neighbro).

Source of changes: the `neighbro.place/landing/*` repo (branch day4).

## Status

| # | Change | neighbro | sosed |
|---|--------|----------|-------|
| 1 | Waitlist form: treat 409 (duplicate email) as success, not an error | ✅ | ✅ already applied (before the freeze) |
| 2 | Self-host fonts (woff2 in `fonts/` + `fonts.css`, preload), drop Google CDN | ✅ | ☐ |
| 3 | CSP `<meta http-equiv>` (same-origin + `font-src 'self'`) in `index.html`/`legal.html` | ✅ | ☐ |
| 4 | `:focus-visible` outline for all interactives + `:focus-within` on the form | ✅ | ☐ |
| 5 | `aria-label` on the email input (from i18n) + `role="status" aria-live="polite"` on the status | ✅ | ☐ |
| 6 | `prefers-reduced-motion`: full animation reset + stop the infinite pulse | ✅ | ☐ |
| 7 | SW: gate `controllerchange`→reload (not on first install); navigation offline fallback to `/`; `config.js` network-first; drop `/`+`/index.html` dup | ✅ | ☐ (if sosed has a SW) |
| 8 | legal renderer: `safeUrl` sanitizer (block `javascript:`/`data:`), EN fallback, fetch timeout | ✅ | ☐ (if sosed has a `legal.html` with the same renderer) |
| 9 | `--muted-2` contrast to 4.5:1 (dark/light) | ✅ | ☐ |
| 10 | h1 `.outline` fallback color + `@supports (-webkit-text-stroke)` | ✅ | ☐ |
| 11 | Splash: hold only on the first view of a session; reduced-motion/repeat is instant | ✅ | ☐ |
| 12 | `subscribePush`: feedback on denial/unsupported + `res.ok` check | ✅ | ☐ (if sosed has push) |
| 13 | Remove dead i18n keys (e.g. `sayPh` on neighbro) | ✅ | ☐ (check its own) |

## Server-side (not in sosed's code)
- RLS audit of `waitlist` and `unique(waitlist.email)` — at the DB (shared by both faces), no sosed-specific work. The `push_subscriptions` part is dropped: push was cancelled on 07.08.2026. See `db/migrations/` in xor.ad.

## How to port
Look at the diff of the corresponding file in `neighbro.place/landing/` and apply it similarly to `sosed.place/landing/`, matching local class names / i18n keys. After porting, run `scripts/run-landing-tests.sh` (in xor.ad): several tests loop over both faces.

## Outcome of the port (2026-07-28)

The items were checked against the code rather than against this document, and
half turned out to have been closed along the way: the fonts are self-hosted
(`fonts.css` plus 15 woff2, no Google CDN), the CSP meta is in `index.html` and
`legal.html`, the service worker has both the `controllerchange` gate and
network-first `config.js`, and the legal renderer has `safeUrl` and a fetch
timeout. Muted-colour contrast clears 4.5:1 comfortably (4.95–7.40), so that one
closed itself too.

Not applicable: sosed has no `subscribePush` and no outlined heading
(`text-stroke`) — nothing to port.

Done:

- **The form's status lines are announced.** Both (`#st`, `#st2`) gained
  `role="status"` and `aria-live="polite"` — they are the only answer a visitor
  gets to a submission.
- **The splash holds only on a tab's first view.** Two seconds is a fair price
  for the brand once; paying it again on the way back from the rules page is a
  wall between someone and what they came for.
- **No dead keys on sosed** (120 keys, 118 marked up, the rest called from JS).
  neighbro had one — `m10`, translated into ten languages and rendered nowhere;
  removed.

Found along the way, and not on the list:

- **Accent button contrast.** The accent is picked at random per load, and four
  of the six themes put 3.41–3.91:1 on the button against a 4.5 bar (16px bold).
  The colours are about 12% deeper, hue and light text kept. **neighbro had the
  same problem** — three of five, also in production, fixed the same way.
- `landing/check-contrast.mjs` and `landing/find-dead-keys.mjs` now exist in both
  landings: the first computes contrast from the values in `index.html` and fails
  below the bar, the second finds keys nothing renders.
