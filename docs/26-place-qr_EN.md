# Screen 26 — Place QR

## Purpose

Any neighbour makes a QR that sets the point for others: "this courtyard", "the market in Plaka", "our block". Whoever scans it is offered to move their feed point there, and until they move it, their phrases are anchored to that point. Introduced 2026-09-19 by the owner's decision. It generalises the poster point (`00-mechanics_EN.md` §4, decided 2026-09-18): a poster is printed by us at the 1 km step, a place QR is made by a person who picks the step.

**The QR is the pass itself, and it holds a cell, not a number** (owner's decisions of 2026-09-19). The link carries a grid cell and a step in the fragment after `#`, which the browser never sends to a server: the node and the storefront know nothing about the QR — neither that it was made nor who opened it, and it is in none of their logs (closed after the review panel of 2026-09-19). There is no "you really are nearby" check — the product does not ask for geolocation in any form (`00-mechanics_EN.md` §4), and the QR does not bring it in.

## The link

```
https://<storefront>/#p=<cell>&s=<step>
```

| Parameter | What it encodes | Example |
|---|---|---|
| `p` | the grid node of the chosen step — two signed integer cell indices from (0°, 0°), joined by a dot | `p=17472.4457` |
| `s` | the zone step: `1` — 100 m, `2` — 300 m, `3` — 1 km, `4` — 3 km, `5` — 10 km | `s=2` |

- **A cell of the same grid the node gives out in the feed** (`xor.ad/docs/protocol_EN.md` §4.2: a phrase's `lat`/`lon` are rounded to the grid node with the step of `area_radius`, the formula is in `xor.ad/docs/chat_EN.md` §8.3). The link carries nothing that any phrase of this cell at this step does not already show.
- **Parsing is strict:** `p` — `^-?\d{1,6}\.-?\d{1,7}$`, after multiplying by the step the latitude stays within ±90°, the longitude ±180°; `s` — exactly one digit from 1 to 5. The cell's node is rebuilt by the node's own formula — the longitude step from the cosine of the rounded latitude (`xor.ad/docs/chat_EN.md` §8.3, `grid_round_lat/lon`): otherwise the phrase would land in the neighbouring cell.
- **A poster link is a separate path.** A poster carries `?p=&w=&l=` in the query and lives by its own rules (`00-mechanics_EN.md` §4): a line over the feed, a 1 km zone default. A place QR is parsed only from the fragment, and the two are not mixed.
- **No name, no identity, no time, no text.** There is no pre-written phrase in the link for the same reason as on a poster: a phrase the person did not say would go into the feed under their name.
- Two people who make a QR for one cell and one step get **the same** link — that is a property: a QR cannot be told from its neighbour, and it does not say who made it.

## Making a QR

The entry is the line "QR of this place" in the feed filter panel (screen 3), under the radius diagram: the point and the place are already there.

- **The diagram with the point is the one in the composer** (screen 4): the point moves by finger, by keys in four directions and by the "district or city" field; the place search runs on the device.
- **The step is the same five buttons as the composer's zone** (screen 4): "house", "street", "district", "city", "wider" — 100 m, 300 m, 1 km, 3 km, 10 km; the metres stand in the place line under the diagram. "District", 1 km, by default. All five are the owner's decision of 2026-09-19.
- **At 100 m and 300 m a line under the step:** "anyone who scans such a QR will see this place down to the courtyard". The line does not forbid; it names the price: a 100 m cell by a house is the house, and everyone holding the picture will see it.
- **The place in words** under the diagram: "Plaka, Athens · 300 m" — as in the composer.
- **The "make QR" button** draws the code on the device. No request goes to the node.
- **The finished QR** is a square across the block, the place and the step under it, two buttons: "share" (the device's system menu) and "save as picture". The link is not written under the code as text: it shows when shared.
- **Nothing is kept.** A made QR goes into no history and not to the node; close the screen and it is gone. Needed again — it is made again and comes out the same.

## Opening a QR

### Already registered

A sheet over the feed, not a line: moving the point by a QR is done on purpose.

- **Text:** "Place QR: Plaka, Athens · 300 m. Put your point here?" Two buttons: "put it here" and "not now".
- **Farther than 25 km from the approximate point** — the sheet says "this QR is N km from you" and carries no "put it here" button, as with a poster (`xor.ad/docs/reviews/NIGHT_2026-09-18_marketing-posters.md` §3.3): a batch of QRs across a city pointing at one cell will not move other people's feeds there.
- **"put it here"** — the feed point moves to the centre of the cell and becomes manual (`00-mechanics_EN.md` §4, "How the point lives between visits"): it stays on the device until changed. **The view radius does not change** — it is the reader's handle, and the QR does not touch it.
- **"not now"** — nothing changes, the sheet goes.
- **The fragment is removed from the address whatever the outcome**, as soon as the sheet has shown: the link does not stay in the tab's history and does not travel on if the address is copied.
- **The point never moves by itself**, as with a poster: a QR on a lamp post must not rearrange the feed of someone who merely opened it.

### A new person

Screen 2, step 1 — the same line as for a poster, with the step from the link: "point from a QR: Plaka, Athens · 300 m" with "accept" and "adjust on the diagram" (`02-name-screen_EN.md`, "Entering from a poster (QR)"). The view circle of such a point is 5 km, as for a poster: the person did not place it. "Adjust on the diagram" makes the point their own — from then on the usual defaults of screen 4 and the usual step handle, as for a poster (`00-mechanics_EN.md` §4).

## A phrase is anchored to the QR point

- **While the person has not moved a point accepted from a QR, the phrase lands at that point, and the default zone is the larger of two: the QR's step or the usual 300 m** (screen 4; amended by the review panel of 2026-09-19). A 1 km QR gives a kilometre, a 100 m QR gives 300 m: otherwise everyone who scanned a sticker on a door would publish into that door's cell, and their phrases with one point and step would be linked to one another ("One point, one link", screen 4). The step can be lowered by hand, as always.
- **A line in the composer above the diagram:** "the phrase lands in: Plaka, Athens · 1 km · by QR". Tapping the line opens the diagram as usual. Moved the point — the usual rules of screen 4.
- **The node does not know a phrase came by a QR.** `POST /feed` carries the same `lat`, `lon`, `area_radius` as any phrase (`xor.ad/docs/protocol_EN.md` §4.2); there is no "by QR" mark in the contract — and there will not be, or all phrases of one QR would be linked to one another. The caveat is named: at the 100 and 300 m steps a cell already holds single phrases (`xor.ad/docs/chat_EN.md` §8.3), which is why the zone default above never goes below 300 m.

## Logic

- **A forged QR** (someone stuck their own over it) moves the point to the wrong place. The harm is bounded: the point does not move by itself, the person sees the place name before agreeing, no point is offered beyond 25 km, and the phrase's default zone is no narrower than 300 m. No stronger defence exists without geolocation, which the product does not ask for.
- **A cell outside the node's area** — the sheet says "this QR leads to a place where we do not work yet" and offers no point.
- **A broken link** (`p` fails parsing, `s` not 1 to 5, coordinates out of bounds) — the ordinary feed opens silently: there is no need to discuss someone else's mistake aloud.
- **Stepped away, frozen, paused** (screens 11 and 20) — no sheet while the feed is closed; the sheet shows on the return to the same tab; the fragment is kept in the tab's memory, not in the address.
- **A person at a table** (screen 19): the QR sheet stands over the feed, the "you are at a table" bar stays above it; moving the point does not touch the table: screen 19 checks the radius only on "sit down" (`19-table_EN.md`), not for someone already seated.
- **On a wide screen** the QR is drawn in the feed column, as screen 25.

## Open questions

- ~~Where the code is kept~~ — **nowhere: the cell is in the link itself** (owner's decision of 2026-09-19). The price is named: a QR cannot be revoked, and its openings cannot be counted.
- ~~A "you are nearby" check~~ — **none, the QR is the pass itself** (2026-09-19).
- ~~Which steps may be chosen~~ — **all five, from 100 m**, with a price line at 100 m and 300 m (2026-09-19).
- ~~Not below the QR's step~~ — **dropped by the review panel of 2026-09-19**: the rule held only on the device and protected the wrong person; instead the zone default is no narrower than 300 m.
- The look of the sheet over the feed and of the finished QR — decided by drawing (sheet `panel/design/sheets/screen-26-place-qr.svg`).
