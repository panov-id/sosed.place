# Landing SEO, indexing and analytics

Working checklist. Branch `day14`, repository `sosed.place`. Once accepted, the same
approach is repeated on `neighbro.place` (same landing engine, different domain and
dictionary).

Repositories:

- sosed landing — <https://github.com/panov-id/sosed.place>
- neighbro landing — <https://github.com/panov-id/neighbro.place>
- monorepo (panel, functions, scripts) — <https://github.com/panov-id/xor.ad>

## Starting point

- `landing/index.html` — a single static page served from Bunny CDN storage.
- 17 languages live in the JS dictionary `T` and are switched client-side (`applyLang`).
  For a crawler this means **only the Russian version is indexed** — every translation is
  invisible, because there is one URL and one HTML response.
- No `robots.txt`, no `sitemap.xml`.
- Strict CSP: `default-src 'self'`, external scripts are blocked.
- No analytics at all.

## Target state

- `sosed.place/` — Russian; `sosed.place/en/`, `/de/`, `/fr/` … — one page per language,
  each serving fully translated HTML in the server response.
- Reciprocal `hreflang` across all languages + `x-default` pointing at the root.
- `robots.txt` + `sitemap.xml` covering every language URL.
- GA4 wired through an environment flag; disabled on dev/uat.
- Cookie banner: GA4 does not load before consent.

## Checklist

### A. Indexing

- [x] **A1. `landing/robots.txt`** — crawling allowed, sitemap declared. Non-production
      swaps the file for a `Disallow: /` one.
- [x] **A2. `landing/sitemap.xml`** — static for now: the root, `rules.html` and the two
      legal pages. Section B replaces it with a generated one covering 17 languages and
      reciprocal `hreflang`.
- [x] **A3. Google Search Console verification** — done 2026-07-27 **via DNS**
      rather than the meta tag: the apex TXT record was placed by
      `xor.ad/deploy/add-search-console-txt.sh` (which keeps every existing
      record), and the owner confirmed both domains in the console. The
      `SEARCH_CONSOLE_TOKEN` path stays in the code as a fallback, but the secret
      is unset — verifying twice buys nothing. DNS covers the whole domain,
      subdomains included, and does not wait for a deploy.
- [x] **A4. Sitemap submitted** to Search Console — 2026-07-27, after the
      production deploy, as the full URL `https://sosed.place/sitemap.xml`
      (a Domain property).

### B. Per-language pages

**Default decision:** the root `sosed.place/` is **English**, and `x-default` points at it.
Russian lives at `/ru/`, like every other language in its own folder.

- [x] **B1. `landing/build-pages.mjs`** — the generator. Dictionary extraction moved into a
      shared `landing/i18n-dictionary.mjs` that both the generator and `check-i18n.mjs` now
      read. It substitutes text into `[data-i18n]` and `[data-i18n-ph]` nodes directly in
      the markup, writing an English root plus 16 language folders. The dictionary stays
      the single source of truth — no hand-copied pages.
- [x] **B2. Translated `<head>`** per page: explicit `<html lang="…">`, `title`,
      `description`, `og:title`, `og:description`, `og:url`, `og:locale`, `canonical`.
      Text is assembled from existing keys (`brand`, `h1a`, `h1b`, `sub`) — no new strings
      needed translating.
- [x] **B3. `hreflang` block** — 17 languages + `x-default` on every page, reciprocal.
      Verified: 18 alternates per page and every target exists as a file.
- [x] **B4. Language switcher navigates to a URL** (`/de/`). Generated pages navigate; the
      raw source file, which carries no language marker, keeps swapping text in place so
      local development works without running the generator.
- [x] **B5. Soft language redirect** — root only, first visit only, and only when the
      browser's language is one we publish. The choice is stored before navigating, which
      makes a redirect loop impossible.
- [x] **B6. `<base href="/">` on language pages.** From `/de/` every relative reference
      would resolve inside that folder. One line fixes `href`/`src`, `url()` in the inline
      stylesheet and the service worker registration alike. It holds as long as the page
      has no in-page anchors — the generator fails with a clear error if one appears.

### C. Analytics

- [x] **C1. `analyticsId` flag in `config.js`** — empty by default; `deploy-landing.sh`
      injects `ANALYTICS_ID`, and the production workflow takes it from a secret. dev and
      uat stay empty, meaning no counter and no banner.
- [x] **C2. GA4 loader** — loads `gtag.js` lazily, only when an ID and consent are present.
- [x] **C3. CSP** — widened `script-src`, `img-src`, `connect-src` for the Google domains.
- [x] **C4. Waitlist submit event** — `waitlist_signup` carrying the page language.
- [x] **C5. Our own page counter** (2026-07-27) — `POST /pageview` on the relay, beside
      `/client-error`: the key decides the brand, the record lands in that tenant's
      space, and the panel reads it on a "Page views" page built on `LogExplorer`.
      **It runs without consent and therefore counts everyone** — the record holds no
      address, no user agent and no identifier, and nothing survives on the device
      beyond a `sessionStorage` flag that dies with the tab. The referrer is reduced to
      its host (a full referrer can carry search terms) and the width to a
      mobile/tablet/desktop bucket. GA4 stays behind consent and supplies the detail;
      this supplies an honest baseline with no gaps. CSP was untouched: the request
      goes to our own backend.

### D. Cookie consent

- [x] **D1. Consent banner** — in the landing's visual language, "accept" / "essentials
      only" buttons, choice stored in `localStorage` (`ss-consent`).
- [x] **D2. GA4 stays unloaded before consent.** Decline means no counter at all.
- [x] **D3. Banner copy in the `T` dictionary** — 4 keys across all 17 languages,
      completeness confirmed by `check-i18n.mjs`.
- [x] **D4. Analytics and cookies section in `legal/privacy_EN.md`** + link from the banner.
- [x] **D5. A "cookies" button in the footer.** It appears once a choice has been made,
      clears `ss-consent` and brings the banner back — withdrawing is now as easy as
      consenting. Deliberately a button rather than a link: an `href="#"` would break the
      language pages, which rely on `<base href="/">`. The label is translated into all 17
      languages (`cookieSettings`).

### E. Build and deploy

- [x] **E1. `deploy/deploy-landing.sh`** — runs the generator over the staging copy before
      uploading to Bunny and strips the `.mjs` scripts from it. `SITE_ORIGIN` carries the
      environment's domain so dev and uat never emit canonicals pointing at production.
- [x] **E0. `deploy/run-node.sh`** — single entry point for the landing's Node tooling:
      `node:22-alpine` with the repository mounted. Nothing Node-related runs on the host.
      `RUN_NODE_NATIVE=1` is the CI mode, where the runner already ships Node.
- [x] **E2. `actions/setup-node@v4` pinned to Node 22 in all three workflows** — the call
      goes through `run-node.sh` with `RUN_NODE_NATIVE=1`, so the generator runs in a
      container locally and directly on the runner in CI.
- [x] **E3. `sw.js`** — the offline navigation fallback now serves the shell of the page's
      own language (`/de/`), with the English root left as the last resort.
- [x] **E4. `check-i18n.mjs`** — picks up the new keys on its own: it compares the union of
      all languages against what the HTML marks up, so the banner, the withdrawal button and
      the FAQ came under validation without touching the checker.
- [x] **E5. `SPEC_RU.md` / `SPEC_EN.md`** — sections on addresses and languages, and on
      analytics and consent, were added; the "no build step" claim, which is no longer true,
      was corrected. The ban on in-page anchors is recorded there so it does not resurface
      in six months.

### F. Verification

F1–F3 are closed by `landing/verify-seo.mjs`, which reads an already generated site —
so all three are answerable **before** a deploy. To run it: build a copy with the
generator into a temp directory and run the check through `deploy/run-node.sh`.
Verified 2026-07-27 on both landings — sosed (17 languages, 19 sitemap URLs) and
neighbro (10 languages, 12 URLs), both green.

- [x] **F1.** A language page serves translated HTML without running JS — checked via
      `<html lang>` plus a dictionary string present in the markup itself.
- [x] **F2.** `hreflang` is reciprocal: every page carries 17 languages plus
      `x-default`, and every target exists as a file.
- [x] **F3.** `sitemap.xml` parses (one `urlset`, balanced `<url>`) and every URL
      exists as a file. "Answers 200" belongs to production, but the build no longer
      contains a dead link.
- [ ] **F4.** Without consent — zero requests to Google domains (checked in devtools).
- [ ] **F5.** No CSP violations in the console in any mode.

## Needed from the user

- **GA4 Measurement ID** (`G-…`) — create the property in Google Analytics.
- **Google Search Console verification token.**

The code is flag-driven, so both values can be filled in later without touching markup.

## Findings from an independent review

Ordered by impact. Items G1–G3 are, in my view, worth doing in the same pass.

- [x] **G1. Non-production environments are no longer indexable.** `LANDING_ENV` across
      the three workflows; anything other than `prod` gets a `Disallow: /` robots.txt, a
      `noindex` meta tag in every HTML file and no sitemap. An unset variable counts as
      non-production — the safe default.
- [x] **G2. One canonical host — done.** The `sosed-prod` zone (6123213) carries the
      "seo: www to apex" edge rule: a 301 from `www.sosed.place` to the apex preserving
      path and query (`https://sosed.place{{path}}`, no trailing slash — that would produce
      a doubled one). Verified: `www.sosed.place/legal.html?doc=privacy` → 301 to the same
      path without www. The syntax was probed on the dev zone first and removed there.
- [x] **G3. Thin content — cured with an FAQ block.** The page now carries six questions
      (what it is, whether a profile is needed, how matching works, why messages fade,
      whether anyone sees where you live, when it launches), translated into all 17
      languages. The generator builds `FAQPage` markup from those same keys, so the visible
      text and the structured data physically cannot diverge, and each language page ships
      markup in its own language. Verified: valid JSON, six questions, all 17 pages.
- [x] **G4. `JSON-LD Organization` / `WebSite`** — the head carries an `@graph` with the
      brand, logo, contact email, the site's language list and `sameAs` pointing at GitHub,
      plus a visible repository icon in the footer with `rel="me"`. The point is `sameAs`:
      it ties "сосед" to the official profiles as one entity.
- [x] **G5. Short HTML cache TTL — done.** It used to be `max-age=2592000` (thirty days)
      on everything including HTML: purge only cleared the CDN edge, while a returning
      visitor's browser could hold the old landing for a month. The
      "seo: short browser cache for html" edge rule now serves 300 seconds for the root,
      `*.html`, the future language folders `/*/`, `robots.txt` and `sitemap.xml`. Images,
      fonts, scripts and styles kept the month-long cache — verified by request.
- [x] **G6. `legal.html` and `rules.html`** now carry a `description` and a `canonical`.
      The legal canonical points at the address without `?doc=`, so the two documents no
      longer split the index, and the sitemap lists the parameterless URLs too. The title
      `СОСЕД — Legal` became `sosed — Legal` for one consistent brand spelling.
- [x] **G7. IndexNow.** The key file `8f4c1a7e93d6425bb0e2f5c8a1d73096.txt` sits at the
      landing root (public by protocol design), and the production deploy posts the URL
      list straight from the generated sitemap to `api.indexnow.org` after upload. Bing and
      Yandex learn about changes without waiting for a crawl. Registering in Bing Webmaster
      Tools is a separate manual step and is not required for IndexNow.
- [x] **G8. `og:locale`** is emitted per page by the generator. A per-language OG image is
      deliberately skipped: the pipeline in `og/` draws one image for the whole site, and
      17 copies mean nothing without translated typography in them.
- [x] **G9. Core Web Vitals — measured, and there is little to fix.** The page has no
      `<img>` tags at all; imagery is CSS backgrounds, so there is no layout shift and
      nowhere to add `width`/`height`/`lazy`. The one real lever is the splash, which holds
      the screen for two seconds and is only discovered after the stylesheet is parsed — it
      now has `rel="preload"`. Image weight is moderate (the hero, at 180 KB, is the
      largest).
- [ ] **G10. A 404 page — blocked by Bunny.** The page itself is written
      (`landing/404.html`, deployed and reachable at `/404.html`), but it cannot replace the
      default one: `ErrorPageCustomCode` covers origin errors, not 404s from storage —
      verified on the dev zone, and enabling it together with `ErrorPageWhitelabel` changes
      nothing either; dev was restored afterwards. The status code is correct regardless
      (a real 404, not a soft one), so this is cosmetic for indexing. The remaining option
      is a real origin instead of storage — excessive for an error page.

- [x] **G11. `config.js` was cached for 30 days, not 5 minutes** (found
      2026-07-27 from `relay_keyless_requests_total`, which kept climbing after the
      production deploy). Served as a `.js` file, it inherited the month-long asset
      cache — while its whole purpose is the opposite: switching the backend, the
      publishable key and the GA4 id without a rebuild. A returning visitor would
      have kept a keyless config for a month, and a revoked key would have stayed
      usable just as long. Fixed by `deploy/bunny-config-cache-rule.sh`, which adds
      `/config.js` to the short-TTL rule (as a second condition — the first already
      held the maximum five patterns) and purges it. Verified: `config.js` at 300s,
      fonts and styles still at 30 days. This unblocks A8: `REQUIRE_API_KEY` no
      longer has to wait a month.

## Open decisions

- Allowing Google domains through the CSP is a deliberate relaxation of a policy that
  currently forbids every external resource. The landing's privacy stance is then carried
  by the consent banner: without an explicit yes, nothing leaves the browser.
