# Screen 3 — Feed

## Purpose

The application's main screen. Short messages from people nearby, **the newest on top** (decided 2026-08-28; it used to be "at the bottom, like a chat"). The price of the change is named: the feed stops reading like a conversation, but skimming wins — someone dropping in for a minute sees what is new at once rather than after scrolling.

**Three different things live in the feed, and each is labelled:** neighbours' phrases, **offers** (screen 17) and **tables** (screen 19). They run as one stream ordered by time, not on separate shelves. An offer is labelled with the word "offer" and the size of the discount, a table with the game, its name if whoever set it gave one (after the queue's verdict, screen 4, 2026-09-17), two numbers, how many play and how many watch (screen 19, 2026-09-10), and a like count as on a phrase (2026-09-17); both of the feed's other inhabitants carry a share of their own, and the two differ: **offers — no more than one commercial card per ten ordinary ones**, **tables — no more than a quarter of the delivered cards** (`xor.ad/docs/chat_EN.md` §8.3; the tables' share was decided 2026-09-02). The screen did not name the tables' share until 2026-09-10, although the feed is the one place where the two meet and compete for the same cards.
**Tables reach their quarter at random, and the quarter is counted after blocks (2026-09-09).** Not "the liveliest first": a table with one person sitting at it makes no moves — it is waiting for a guest — and an order by activity would bury exactly the tables the table screen exists for. The price: the selection is not stable between refreshes and a table you saw can be lost; there is a way back to your own — the line in the header (below). This screen used to describe phrases only, although both of its neighbours in the feed were described on their own screens.

**Your own phrase awaiting review is visible here to you alone** — dimmed, labelled as under review (screen 4). It is in nobody else's feed.

## Screen elements

- The feed: phrases, offers and tables in one stream.
- **What is liked is not in the feed — the owner's decision of 2026-09-17.** A like takes the card out of the feed with a "liked · undo" line for a few seconds; from then on it lives on screen 25 "My likes", and that is where a like is taken back. The node filters the delivery by its own `likes` and `table_likes` (`xor.ad/docs/chat_EN.md` §8.4), not the client. The price is named: for an active person the page of 30 cards runs out sooner, and "show more" comes more often.
- **The language filter — on the filter sheet** (moved out of the header on 2026-09-18 at the owner's word) — up to three languages, cleared with one tap (`00-mechanics_EN.md` §8).
- **A line "you are at a table — return"** in the header while you are sitting at one (settled 2026-08-27). **There is exactly one such line, and since 2026-09-09 that is a guarantee rather than a coincidence:** you can sit at only one table at a time, so the question of what to show for three tables is gone by construction. A table does not appear in the conversations list — it lives by the rules of the feed — and without this line somebody who looked away for a minute would lose a game with live people without any notice (screen 7, screen 19).
- A line under the feed: "**N more messages in other languages — show**"; N as a step, not a number: a few · dozens · hundreds (`00-mechanics_EN.md` §8, 2026-09-15).
- A filter icon — opens a panel with the age, radius and mode filters.
- **A tap on a phrase's text opens it full screen** (screen 23, decided 2026-09-15): like and "hide" as buttons, a swipe on a touch screen.

## Filter panel (opened via the icon)

- **Age filter** — a range slider **inside your own age band**; the handles are doubled by "−" / "+" steps of a year and by the arrow keys (WCAG 2.5.7, added 2026-09-18 after the UX panel). The band is computed by the node from the number given on screen 2: up to 20 it is ±2 years, from 21 it starts two years below and runs upward with no ceiling, and the rule is symmetric — a pair sees each other only if each falls inside the other's band (`xor.ad/docs/chat_EN.md` §8.2). Widening past the band is not allowed. **Narrowing is free, by the year — the owner's decision of 2026-09-17.** Age is a number the other person sees anyway, next to the name on the match card (screen 6) and in the chat header (screen 8), and there is no point fencing with steps what a match hands over. The node accepts any bounds inside the band. The price is named and accepted: narrowing the filter a year at a time and watching which phrases drop out, one can learn a phrase author's age before any match. [retired] This had steps of 5 years and a width of at least 5 (2026-09-15, SEC-3), and before that "narrowing is free".
  **The bounds are not labelled with numbers — settled 2026-08-26.** The handle simply stops: a stated bound would point out where the wall is and what number to claim in order to get past it. The stop is drawn to read as the end of the scale, not as a frozen interface.
  **For an adult the right end is "no limit", not a number.** The band has no ceiling, and an invented one such as 65+ would cut off older neighbours for no reason.
  **When the band has shifted** — the person got older and the saved filter was clamped into the new one — a single line says so on their next visit — "You have got older — the age filter narrowed to your band." (the lens quorum's decision of 2026-09-18). Changing someone's feed in silence is not allowed.
- **Radius filter** — **a diagram, not a map (decided 2026-08-28)**: a circle, the radius handle with "−" and "+" steps beside it (dragging is doubled by a tap, WCAG 2.5.7; added 2026-09-15 after the review panel), the distance in words and the place named. **3 km by default, from 500 m to 25 km** (settled 2026-08-26). Three kilometres is a whole district: the feed is full from the first day, and a person does not hit emptiness before understanding why they came.
  **No face draws a map — and that is a decision about privacy, not about cost.** A tile is a request, and it tells whoever serves it which square a person is looking at; from a third party it comes with their IP as well. Proxying tiles through our own node does not help: the node then knows the same thing, and the whole of §4 of the mechanics is built on the opposite. So there are no streets in the browser or in the terminal: a circle, a number of metres, a density band and **the district's name in words** — labelled as approximate.
  **Naming the place requires a gazetteer** (a consequence named right away): turning coordinates into "Kolonaki, Athens" without an external service is only possible with a set of places of our own. The list is **delivered to the device** together with the area, and it works both ways — the caption under the circle and **search by name: type a district or a city and the circle moves there** (decided 2026-08-28). The search is local, so no record of "what place a person searched for" exists with us or with a third party. The price: the list is coarse — districts and cities, no streets.
  **Under the circle it says how many are talking in there right now** (settled 2026-08-26). Not an exact number but a step: `nobody here yet` · `a few` · `about a dozen` · `dozens` · `hundreds`. Otherwise the handle is dragged blind — a person does not know whether to pull further, and ends up in emptiness or in somebody else's district.
  **The number arrives when the handle is released**, not under the finger. The reason is not saving requests: a counter tied to a radius is a measuring instrument. Stepping the handle and reading exact numbers, one can build a density map of the surroundings and work out the ring in which a single phrase appeared — going around the very blur its author chose (§4 of the mechanics). Steps, and one request per gesture, make that measurement pointless.
- **Mode filter** — three toggles: **alone / company / party** (settled 2026-08-26). Every phrase carries a mode (`mode` in `xor.ad/docs/chat_EN.md` §8.3) and until now it was only displayed. Without the filter, someone looking for company reads a feed of solitary phrases, and a party drowns among short lines.

## Wide screen (decided 2026-09-15)

From a window width of 900 px the app lays out in columns after the July prototype
(`xor.ad/docs/app-prototype-spec_EN.md` §6.1), and each scrolls on its own. **The third column
appears only when a conversation is open** (clarified 2026-09-15 after the review panel):
three columns at once left the feed two hundred pixels at 900 px.

- **The feed** — flexible, on the left; the phrase viewer (screen 23), the composer
  (screen 4) and "Me" (screen 10) open in this same column.
- **Conversations** (screen 7) — 300 px, in the middle.
- **The open conversation** (screen 8) — 400 px, on the right, only while it is open. From
  1030 px (330 + 300 + 400) it stands next to the list; between 900 and 1030 px the open
  conversation takes the list's place, and "back" returns to it.
- **The other screens** — the match (6), "Me" and settings (9, 10), identity, moving,
  support and documents (12–15), stickers, the offer, the board and the table (16–19),
  stepping away, the console and appearance (20–22) — open in the feed column, with a
  "to the feed" button.

There is no bottom navigation on a wide screen: "Say" and "Me" sit in the feed header,
and the feed and conversations are in view anyway. Below 900 px there is one column and the
bottom navigation, as on every screen. The prototype's collapsing of columns into rails and
its `Refresh` / `Auto` buttons are **not** taken: the feed tops up with "show more" (below),
and auto-refresh would shift a phrase from under a reader's eyes. The price is named: screens
3, 7 and 8 each have two layouts in the mock-ups, and between 900 and 1030 px a conversation
covers the list.

## Logic

- **This screen's edge states and their wordings — screen 11** (`11-empty-and-edge-states_EN.md`, pointer added 2026-09-15 after the review panel): empty, refusals, connection, frozen, pause, stepping away, changed documents; "The app is out of date" is one state on every screen for any refusal on version grounds, not only in a conversation (added 2026-09-15 from the screen-state matrix).

- **The feed has a size: 30 cards, then "show more" — decided 2026-09-10.** The size
  used to be named nowhere, and that silence promised more than the product can give:
  the quota limits **a person** (four live phrases, four an hour) while **an area** is
  limited by nothing. Somewhere dense a phrase leaves the visible part within minutes,
  and the 4:20 span stops meaning "this is how long I am heard". Paging goes by time
  and the order stays chronological — there is no ranking and none is being added.
  The thirty are **chosen, not measured** (`xor.ad/docs/facts/limits.tsv`,
  `feed.page.size`): that is what people scroll in one go without losing the thread.
  The cost is named plainly: **somewhere dense not everybody will hear you, and paging
  does not fix that** — it lets you read on, not be read.
- The filters are part of the feed's interface, not a separate onboarding step.
- **Language is a filter, not a set of shares (amended 2026-08-26).** What stood here was "about 95% in the user's language, 5% in other languages of the region, both shares configurable via environment variable". That was a [retired] different mechanic from `00-mechanics_EN.md` §8, and it loses for one reason: shares decide for the person silently. A filter is up to three languages, taken from `navigator.languages` by default, edited by hand, cleared with a tap, with the line "N more in other languages" always under the feed. A person always knows the district is livelier than their feed, and never mistakes the filter's silence for the district's.
- **The node detects the language** with a local library, on its own machine: no text leaves in order to be identified. "AI" in the old wording was imprecise — there is no external service here and there will not be.
- **An offer is not hidden by the language filter**: the Greek bakery across the road is just as useful to a Russian-speaking neighbour (§8 of the mechanics).
- **Geolocation is not requested at all — edit of 2026-08-28, which retires the "where am I" button.** The point is worked out from indirect signals — time zone, address, language — labelled as approximate, with a wider default circle — 5 km against 3 km for a point placed by hand (`00-mechanics_EN.md` §4, 2026-09-15); it is refined **by hand**, by dragging on the diagram. There is no button asking for a precise position: a permission nobody can grant is a permission that cannot leak. This used to say "the exact position is requested by the person themselves, with the 'where am I' button". **A poster point (QR)** is the same approximate case: a 1 km cell from the link, offered to accept or to adjust on the diagram, a 5 km circle, a 1 km default zone for the phrase (the owner's decision of 2026-09-18, `00-mechanics_EN.md` §4).

## Open questions

- **Settled by drawing (2026-09-15).** The exact filter icon is not defined yet.
- **Settled by drawing (2026-09-15).** The word is settled (above: "offer" and the name of the game); a frame or an icon **in addition** to the word is not drawn. Also settled: both are labelled and both run in the common stream (2026-08-26; clarified 2026-09-15 by the screen cross-check: this said "by a word, a frame or an icon", as if the word were not settled).
- ~~Default radius values~~ — **3 km, from 500 m to 25 km** (settled 2026-08-26, stated above in this same file).
- ~~The posting screen~~ — described separately, screen 4.
- **Spark — the owner's decision of 2026-09-18** (`xor.ad/docs/design-system-app_EN.md`, "Spark"). The feed header is "Kolonaki · 12 people nearby": the place from the area and a live count from the node, the count shows from 5 people, below that — "few people nearby". Categories have their own colour as a chip: company amber, offer terra, table teal, party violet, "alone" without a chip. The phrase in a card is 20/600 with the lifespan bar under it. A card's secondary buttons are light pills. "Say" leaves the tab bar for a floating composer over the feed; the tab bar has three items: Feed · Conversations · Me.
