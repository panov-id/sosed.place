# Кандидаты на перенос из neighbro → sosed

Лендинг sosed **намеренно не трогаем** (по решению владельца). Здесь копятся правки/фишки, сделанные на neighbro (и в панели), которые, вероятно, применимы и к sosed. Переносить в код sosed — только по прямой команде.

Перед переносом каждый пункт сверять с реальным кодом sosed (структура может отличаться от neighbro).

Источник правок: репозиторий `neighbro.place/landing/*` (ветка day4).

## Статус

| # | Изменение | На neighbro | На sosed |
|---|-----------|-------------|----------|
| 1 | Форма waitlist: 409 (дубль email) трактовать как успех, не ошибку | ✅ | ✅ уже применено (до заморозки) |
| 2 | Self-host шрифтов (woff2 в `fonts/` + `fonts.css`, preload), убрать Google CDN | ✅ | ☐ |
| 3 | CSP `<meta http-equiv>` (same-origin + `font-src 'self'`) в `index.html`/`legal.html` | ✅ | ☐ |
| 4 | `:focus-visible` контур для всех интерактивных + `:focus-within` на форме | ✅ | ☐ |
| 5 | `aria-label` на email-инпуте (из i18n) + `role="status" aria-live="polite"` на статусе | ✅ | ☐ |
| 6 | `prefers-reduced-motion`: полный reset анимаций + остановка бесконечного pulse | ✅ | ☐ |
| 7 | SW: гейт `controllerchange`→reload (не на первой установке); offline-fallback навигаций на `/`; `config.js` network-first; убрать дубль `/`+`/index.html` | ✅ | ☐ (если у sosed есть SW) |
| 8 | legal-рендер: санитайзер `safeUrl` (блок `javascript:`/`data:`), fallback на EN, таймаут fetch | ✅ | ☐ (если у sosed есть `legal.html` с тем же рендером) |
| 9 | Контраст `--muted-2` под 4.5:1 (dark/light) | ✅ | ☐ |
| 10 | h1 `.outline` fallback-цвет + `@supports (-webkit-text-stroke)` | ✅ | ☐ |
| 11 | Splash: hold только на первом показе сессии; reduced-motion/повтор — мгновенно | ✅ | ☐ |
| 12 | `subscribePush`: фидбэк при отказе/отсутствии поддержки + проверка `res.ok` | ✅ | ☐ (если у sosed есть push) |
| 13 | Удалить мёртвые i18n-ключи (напр. `sayPh` на neighbro) | ✅ | ☐ (проверить свои) |

## Общесерверное (не в коде sosed)
- RLS-аудит `waitlist`/`push_subscriptions` и `unique(waitlist.email)` — на уровне БД (общей для обеих витрин), sosed-специфики нет. См. миграции `db/migrations/` в xor.ad.

## Как переносить
Смотреть diff соответствующего файла в `neighbro.place/landing/` и применять аналогично к `sosed.place/landing/`, сверяясь с локальными именами классов/ключей i18n. После переноса — прогнать `scripts/run-landing-tests.sh` (в xor.ad): часть тестов зациклена на обе витрины.
