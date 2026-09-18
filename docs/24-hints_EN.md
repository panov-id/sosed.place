# Screen 24 — Hints at the first encounter

## Purpose

Helping a new person work out how things work here. Decided 2026-09-15: **not a separate walk-through before the feed, but a hint in place** — one, at the moment a person first meets a mechanic. The same was already decided for the filters: they are part of the feed, not an onboarding step (screen 3). A product of disappearing phrases should not begin with a lesson a person flicks through without reading.

## How a hint works

- **One line or a short card next to what it is about**, with a "got it" button. A hint does not cover what it explains and does not pause the feed.
- **No more than one at a time.** Meeting two mechanics at once, the second waits until the first is closed.
- **Shown once.** Which hints are closed is remembered by the device, not by the identity and not by the node: the node has no need to know "this person liked something for the first time". A private window is a new person (`00-mechanics_EN.md` §1), and the hints show there again. **"Start over" wipes this memory** together with the identity (added 2026-09-15 after the review panel): a new identity is a new person, and the old flags would remain a trace of what was done here.
- **One requires confirmation — the swipe** (screen 23): a gesture that hides a neighbour does not act until the person has said they understood. The others close with a tap or go by themselves once the person has done what they describe.
- **"Show hints again"** — an item under "Me" (screen 10): it wipes the device's memory of closed hints.

## The list

| When | Where | What it says |
|---|---|---|
| the first like | screen 5 | the author sees how many likes, not whose; an offer to talk comes if they like back; the phrase goes to "My likes", where the like can be taken back until then |
| the first offer to talk | screen 6 | a conversation starts only if both agree; "not now" tells the other nothing |
| the first open conversation | screen 8 | each side has its own span of silence; a conversation fades and ends for the two at different times; the product introduces you, what follows is yours: you exchange contacts yourselves (2026-09-18 after the UX panel, screen 8) |
| the first hide | screens 5 and 23 | hiding is not blocking: the author will not know, and it can be brought back under "Me" |
| the first swipe or arrow key in the viewer | screen 23 | right is like, left is hide; neither the gesture nor the key acts before "got it" |
| the first table in the feed | screen 19 | one can sit at one table; whoever sits watches and talks, and plays by applying for the next game |
| the first offer in the feed | screen 17 | this is an advertisement with a discount, marked with a word; a venue's "save" keeps the discount until its term, a private author's like offers to talk at once |
| the first like on a table | screens 19 and 23 | a like does not seat you: the table goes to "My likes", and you can sit down from there; those seated see the count, not the names |

The "first visit with no phrase of your own" line is not a hint but a screen 11 state: it stays while there is no phrase of one's own and is not closed by a tap (`11-empty-and-edge-states_EN.md`).

## Logic

- **This screen's edge states and their texts — screen 11** (`11-empty-and-edge-states_EN.md`).
- **A hint does not explain how the system is built** — the same rule of voice as for the lines of screen 11 ("we do not explain how the system is built"): what a person sees and what will happen.
- **Accessibility.** A screen reader announces a hint politely, without taking focus; only the swipe confirmation moves focus, because the gesture does not work without it. The "got it" button is at least 44 px (`xor.ad/docs/accessibility-and-i18n_EN.md`).
- **Languages.** Hint strings live in the shared translation dictionary like any app string and are translated into the storefront's languages.
- **The `depth` terminal** shows the same hints as one line in the same place; there is no swipe there, so nothing to confirm.
- **An old identity on a new device** sees the hints again: the memory belongs to the device. The price is accepted — cheaper than keeping on the node who already knows what.

## Open questions

- ~~A separate walk-through or in place~~ — **in place, at the first encounter** (decided 2026-09-15).
- What each of the seven hints looks like — a line or a card — settled by the drawing (2026-09-15).
