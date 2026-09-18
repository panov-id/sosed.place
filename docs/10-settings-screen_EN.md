# Screen 10 — Settings

## Purpose

The screen behind the **"Me"** item in the bottom navigation. It is also screen 9: what is alive on top (your own phrases, offers and tables with their timers), settings and everything a person can change about themselves below (settled 2026-08-27).

They were not split for a simple reason: the bottom navigation has exactly four items, and a fifth does not fit 375px (since 2026-09-18 there are three — "Say" moved into the feed's floating composer, the "spark" decision; the argument stands) (`xor.ad/docs/chat_EN.md` §9). The cost is accepted and named: the screen is heterogeneous — urgent above, rare and partly irreversible below — so the dangerous part is separated and labelled.

## Screen elements

**About you:**

- **Name.** Changes only on a clean slate — while there is no live phrase and no open conversation; an accepted name is frozen, a rejected one is always editable (§8.2). A new one goes through the same moderation queue as a phrase.
- **Age.** Editable freely **within your own band** — clarified 2026-09-10, where
  this read "upward only", which took the typo away from people: 38 instead of 37
  could not be fixed, though the typo is exactly why age was made editable (screen
  2). Upward only applies to **crossing the 20/21 border**, and that is
  **irreversible** (`xor.ad/docs/chat_EN.md` §8.2): an adult does not walk back
  into the teenage sandbox, or the bands lose their meaning. The warning comes
  before saving, not after. A bottom sheet headed with the question "Move into the 21+ band?" and the buttons "save" / "Cancel" (the sheet's text — 2026-09-18, when frame S was drawn). Once a year the app asks again, "still 38?" — silence
  changes nothing.
- **A change of age is visible to the people you talk to — said here since
  2026-09-10.** A system line goes into every open conversation, "your
  correspondent changed their age: 39" (`xor.ad/docs/chat_EN.md` §8.2), and the
  feed filters are re-clamped to the new band. The screen was silent about it, and
  a person edited the number without knowing everyone they talk to would read it.
  There is no such line for the name and there cannot be: with a conversation open
  the name is frozen.
- **Feed languages** — up to three, taken from the browser by default, edited here (`00-mechanics_EN.md` §8). The feed header only clears the filter with a tap; the list itself lives here.

**The app:**

- **Interface language — added 2026-09-10.** Until that day it existed nowhere but
  registration: the switcher sat on screen 2 and on the splash, and after
  registration there was nowhere to change the language of the labels. It sits
  **here rather than beside "Feed languages"**, because it is a setting of the
  app, not a fact about the person: the first decides what language the labels are
  in, the second whose messages to show (`00-mechanics_EN.md` §8). Taken from the
  browser by default, and from the choice afterwards.
- **Appearance** — theme, contrast and accent: screen 22 (added 2026-09-15). Theme and contrast sat here — light, dark or as in the system; three steps, settled 2026-08-26 — and moved there together with their rules.
- **The default silence span applies to new conversations only** (decided 2026-08-28): it does not touch those already open. The price is named — a person changes the default and does not see why the current conversation still runs on the old one — but the opposite would mean one tap in the settings killing a conversation with an hour left in it.
- **The list's groups (the lens quorum's decision of 2026-09-18):** the first group has no heading; the group of likes, hidden, blocks, zone and silence duration is "Feed and conversations"; under "Blocked" the note "This person's tables will appear in the feed on the next visit".
- **My notices** — notices of illegal content sent from this device, and the decisions on them by receipt (`xor.ad/docs/dsa/SPEC_EN.md` §6), added 2026-09-15. A dot on this item and on "Me" when a decision arrives; the decision's text only after a tap. The list lives on the device, not with the identity.
- **Support** — your own requests and answers (screen 14), added 2026-09-14. A dot on this item and on "Me" in the bottom navigation (on a wide screen, in the feed header) when an answer is waiting: there is no permanent support icon, and the mark needed a place.
- **What happened** — the console (screen 21), added 2026-09-14: what the product did and what did not work. Here rather than behind a gesture or an address, because this is where people go when something is off.
- **Step away** — 20 minutes, an hour, or 4 hours (screen 20). From here, because there is nowhere else.
- **Show hints again** (screen 24, added 2026-09-15): wipes the device's memory of closed hints. The confirmation is the line "hints will show again one at a time" (2026-09-18, frame T; grounded in screen 24, "no more than one at a time").
- **A default zone and mode for new phrases** (added 2026-08-28): the composer opens with them, and changing them per phrase is no longer required. The price is named: privacy stops being a decision made for **each** phrase, while different phrases often want different things — so the default is visible in the composer and editable right there. **A second price — added 2026-09-14 after the review panel:** the same point with the same step on different phrases links them to each other, and a default makes such a repeat the norm. The composer says so in a line next to the default (screen 4).
- **My likes** — screen 25 (the owner's decision of 2026-09-17): liked phrases, private authors' offers and tables as feed cards while they live; a like is taken back there.
- **Hidden phrases** — a list with a way back (added 2026-08-28, screen 5). Short-lived by construction: a hidden phrase disappears with its own span, like any other.
- **Blocked: N** — the list of blocks without names and without phrases: a line "blocked since <date> · lift", one per block (added 2026-09-16 from the API contract, `GET /blocks`, `DELETE /blocks/:id`). Lifting does not recompute the feed at once: the set of visible tables is computed on the next entry into the feed (chat spec §6.1).

**Identity and security — a screen of its own (decided 2026-08-28):**

- An **"Identity and security"** item leads to screen 12: moving the device,
  changing the PIN, reissuing the paper code, what is stored on the device,
  starting over. All of them are irreversible, and they used to sit one scroll
  away from the theme switch — a separate screen works here as distance rather
  than decoration.

## Logic

- **This screen's edge states and their wordings — screen 11** (`11-empty-and-edge-states_EN.md`, pointer added 2026-09-15 after the review panel): empty, refusals, connection, frozen, pause, stepping away, changed documents.
- **A name change waits for the checkbox, as a publication does** (added 2026-09-15 from the screen-state matrix): others see the name, so with changed documents a new name does not go to checking until acceptance — screen 11, "A document changed".

- Appearance applies immediately, no confirmation needed (screen 22).
- **The accent lives in two places and is one state** (decided 2026-09-15): the house mark in the header cycles it with a tap, screen 22 gives an explicit choice from the storefront's set (`xor.ad/docs/chat_EN.md` §11). Two controls, one value; they must not drift apart. [retired] This said "The theme lives in two places": in the app the house mark flipped the theme while on the landing it cycled the accent, so the "shared behaviour" of §11 did not hold.
- **The social link field is gone — edit of 2026-08-26.** There are no links in the product, neither in the feed nor in a conversation: they are stripped, and the one place a link lives is a neighbourhood offer (`00-mechanics_EN.md` §5). The field was a leftover of screen 12, dropped along with it.
- There is no sexual-content setting here, because there is nothing to switch on: such content is rejected before publication for everyone alike.
- **Links to the three legal documents** — terms, privacy, community rules (screen 15). Here, because this is the only place a person comes back to them after registration.
- **The irreversible is kept apart from the reversible.** Appearance (screen 22) applies at once and undoes with a tap; an age crossing the 20/21 line, a code re-issued and "start over" undo with nothing (edited 2026-09-14: this said "an age raised" [retired] — since 2026-09-10 the age is editable both ways within one's own band, above). So they sit in a separate block rather than in one list with appearance.

## Open questions

- ~~The contrast slider's range and step~~ — there is no slider: three steps, each checked by arithmetic against 4.5:1, as in the panel. A continuous control inevitably has positions below the threshold, and accessibility stops being a guarantee.
- ~~The silence timer's default~~ — **an hour, and the setting changes only future conversations** (decided 2026-08-28, above).
- ~~How exactly the "Identity" block is set apart~~ — **on screen 12 of its own** (decided 2026-08-28).
