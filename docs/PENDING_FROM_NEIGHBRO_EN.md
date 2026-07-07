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
- RLS audit of `waitlist`/`push_subscriptions` and `unique(waitlist.email)` — at the DB (shared by both faces), no sosed-specific work. See `db/migrations/` in xor.ad.

## How to port
Look at the diff of the corresponding file in `neighbro.place/landing/` and apply it similarly to `sosed.place/landing/`, matching local class names / i18n keys. After porting, run `scripts/run-landing-tests.sh` (in xor.ad): several tests loop over both faces.
