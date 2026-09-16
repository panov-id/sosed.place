# Screen 12 — Identity and security

> Number 12 was taken again on 2026-08-28. The former screen 12 (the social link
> field) was dropped on 2026-08-26 along with links themselves; the number came
> free and is reused — renumbering every screen for the sake of an empty number
> costs more than saying this in a line.

## Purpose

Everything irreversible a person can do to their identity. Moved off screen 10 by
a **decision of 2026-08-28**: four actions, none of which can be undone, sat one
scroll away from the theme switch. A separate screen is not decoration but
**distance**: you have to mean to get here.

## Screen elements

- **Move to another device** — a nine-character code (screen 13). **It will ask for the PIN** — so will changing the PIN and starting over (decided 2026-09-11): while the tab is unlocked those buttons are within a stranger's reach, and none of them can be undone. "Erase conversation history" does not ask: there is nothing to check, the history sits here and nowhere else.

### Unlocking the tab — added 2026-09-04

Until today this screen did not exist **at all**, though the mechanics have
required it since day one ("the PIN locks an open tab against whoever picked the
device up", `00-mechanics_EN.md` §1) and the spec puts a mandatory text on it.
Found by a review panel: someone building from this screen set would have drawn
neither the input nor the warning, and ten taps into someone else's phone would
have destroyed their correspondence silently.

- **The lock closes on leaving the tab and after 5 minutes without a touch**
  (decided 2026-09-04). Leaving is the same `visibilitychange` that counts the hour
  for the step-away prompt (`00-mechanics_EN.md` §13); **transitions on mobile are not
  measured** — the mechanics says plainly they could not be captured (edited
  2026-09-14: this said "already measured… §11" [retired], and §11 is "Like and match"). The price is named: switch to
  another tab and back, and it is six digits again — and the mistakes go into the
  same counter of ten.
- **The lock shows the PIN field and nothing else.** No name, no number of
  conversations, no preview of the last line. Whoever picked the phone up off the
  table does not even learn the name — and the name is what neighbours find a
  person by in the feed (screen 6). The price is accepted: the owner cannot see
  whether anything new arrived until they enter six digits. There is deliberately
  no "something new" marker here: it would give away the rhythm of someone's
  conversations, the very metadata for which push was dropped (G8,
  `xor.ad/docs/open-work_EN.md`).
- **At a table the lock does not stop the move window — an exception to "the PIN field and nothing else"** (added 2026-09-15 from the screen-state matrix). The five minutes for a move (screen 19) run on behind the lock, so if the move at the table was yours at the moment of locking, the lock shows one line, "your move at the table" — no board, no table lines, no table name (screen 11, "The tab is locked"). The price is named: whoever picks up the phone learns that the owner is at a table and it is their move.
- **The PIN closes more than the history — decided 2026-09-15.** The identity's
  signing key and the conversations' wrapping key sit on the device **wrapped under
  the vault key**, which cannot be assembled without the PIN and the node's share; an
  unlocked tab holds them in memory and forgets them on locking. So a locked tab
  **does not publish, does not read new messages and holds no socket** until the PIN:
  it has nothing to sign a request with and nothing to unwrap a conversation key with.
  Whoever sits down at a shared computer with a locked tab gets neither the identity
  nor new messages. [retired] Before, in the web, the signing and wrapping keys lay in
  IndexedDB outside the vault key, and the tab lock was a lock on the interface.
- **The counter stays quiet until the seventh attempt, and from the seventh it
  speaks plainly.** The wording is fixed by the spec (`xor.ad/docs/chat_EN.md`
  §8.2) and must not drift:

  > Attempts left: N. After that this device is locked until the paper code.

  N is 3, 2 or 1 (edited 2026-09-15: "3 attempts left" [retired]).

- **From the sixth attempt there is a wait, and it grows (decided 2026-09-14).** The
  sixth after 30 seconds, the seventh after 2 minutes, the eighth after 10 minutes, the
  ninth after an hour, the tenth after 4 hours; the lock says when to try again. The
  node holds it, not the tab: whoever picked the phone up off the table cannot lock access
  in a minute (`xor.ad/docs/chat_EN.md` §8.2). A correct PIN is not taken during the
  wait either; a wait you did not cause means someone else is using your session — the
  way out is the paper code.
- **The tenth mistake locks access on this device until the paper code, and does not
  erase the correspondence (decided 2026-09-14).** Live phrases are taken down, table
  seats freed, and only recovery and one support request a day work. After the code
  the old PIN opens the history again; if the PIN is forgotten, a new one is set and
  this device's correspondence is lost. [retired] This said "burns the node's share, and
  the correspondence is gone for good" — a stolen signing key erased someone's history
  that way remotely. That is why the warning is mandatory and stands before the last attempt
  rather than after it.
- **The PIN opens the lock; without it, only the paper code, and if the PIN is
  forgotten this device's correspondence is lost.** A move to another device does not open the lock
  (clarified 2026-09-14; this said "only the PIN unlocks it, the paper code does not"
  [retired]): the share belongs to the device, not to the identity
  (`xor.ad/docs/chat_EN.md` §8.2), and it cannot be reached from anywhere — not
  even from a live session of the same identity.
  **The lock has a "forgot your PIN?" link, and it leads to the paper code — decided
  2026-09-14, refined after the review panel the same day.** Without the old PIN the
  only way in is recovery: the code opens access and asks for a new PIN, and this device's
  correspondence is lost — without the old PIN there is nothing to decrypt it with. No code, no way
  out: otherwise a stranger with a locked tab would set their own PIN and get a live
  identity (`xor.ad/docs/chat_EN.md` §8.2). [retired] This said "a new PIN with a new
  share" — without the code. While the node is under attack, code entry is closed with
  no end — the price of the shared guard against guessing
  (`xor.ad/docs/protocol_EN.md` §8, item 7). [retired] "Until now the only way out was
  to get it wrong ten times on purpose" — ten mistakes are no way out any more.
- **Change the PIN.** The PIN locks the disk, not the identity, and a PIN someone
  has seen cannot be changed any other way except by moving to another device.
  Changing it re-encrypts the local database and takes a new share from the node
  (`xor.ad/docs/chat_EN.md` §8.2).
- **Reissue the paper code — only on presenting the current one.** Otherwise
  whoever took the identity would write themselves a new one first and lock the
  owner out forever: the insurance would vanish exactly when it is needed. The
  previous code is dead afterwards.
- **What is stored on this device** (added 2026-08-28): the size of the local
  database, the **list of saved offers** (added 2026-08-29 — the only thing that
  outlives 4:20, so it is named here explicitly) and an **"erase conversation
  history"** button. **Since 2026-09-15 "My notices" is here too** — receipts of notices of illegal content — with an **"erase receipts"** button: they live on the device, "start over" does not erase them, and on a shared device this is the only place to remove them; an erased receipt means the decision on it can no longer be seen. With no identity there is no PIN, and nothing closes the list except erasing it — the price is named. The product promises a
  great deal about storage — and this is the only place where the promise can be
  seen and handled. Erasing is irreversible and takes only the history: the
  identity, the phrases and the open conversations remain, but the earlier
  conversations inside them go silent, as after a move.
  **A session not seen for a year is swept together with its share**
  (`xor.ad/docs/chat_EN.md` §8.2, said here since 2026-09-14): whoever comes back after
  a year finds this device's correspondence unreadable — the share that opened it is
  gone.
- **The game is not listed here, and that has to be said out loud — added
  2026-09-10.** Since 2026-09-09 the board and the moves are not encrypted, and a
  person is entitled to ask where they live. The answer: **here as well — rewritten
  2026-09-10.** In a pair the position, whose turn and the score sit in a game cache
  on the node: a judge without the position cannot judge, and a node restart happens
  on every deploy. Not one reply is in there, and the cache leaves with the
  conversation — at once, not by its own span. This used to read "they are neither
  on the device nor in the database"; that was untrue from the day the cache was
  introduced. At a table the state sits in the node's database beside the table:
  everything there is public by construction. **Lines of play are the exception and
  do live here:** they are replies in the conversation, and the "erase conversation
  history" button takes them with the rest.
- **Start over** — a new identity in place of this one. Before the button, the
  cost is counted **on the spot**: live phrases, open conversations, waiting
  offers. **Saved offers** are counted separately (added 2026-09-14): they sit on the
  device and do not pass to the new identity, and someone who saved a discount for
  tomorrow would otherwise find out at the till. On its own line: that the paper code becomes useless, because the
  identity it brings back will no longer exist.

## Logic

- **This screen's edge states and their wordings — screen 11** (`11-empty-and-edge-states_EN.md`, pointer added 2026-09-15 after the review panel): empty, refusals, connection, frozen, pause, stepping away, changed documents.
- **Between entering the PIN and the verdict — a skeleton with no caption** (added 2026-09-15 from the screen-state matrix): the PIN field and the button stay unavailable until the answer; the skeleton rule is on screen 11, "Waiting for the first answer".
- **When we did not answer on unlocking or a PIN change — a line of its own, not "no connection"** (added 2026-09-15 from the screen-state matrix): the tab stays locked, the old PIN works, and the line says it is not a wrong PIN — screen 11, "Locked: this one is on us" and "The PIN cannot be changed: this one is on us".

- **Nothing on this screen can be undone**, and that is said out loud in the
  heading rather than implied by layout.
- **The cost is shown as numbers before the press, not as words after** — the same
  rule as on the step-away screen (screen 20).
- **A new paper code is shown with the same warning as on screen 2 — decided 2026-09-15.** "Write this code down on paper…" stands wherever a code appears on the screen: when the identity is created and on reissue here; "it will not be shown a second time" applies to every code issued.
- **Changing the PIN and reissuing the code do not touch the identity**: the
  `identity_id` is the same and the chats are in place. What changes is keys, not
  the person.
- **"Start over" is a new identity**, not a cleaned-up old one: the previous one is
  closed, and nothing brings it back, not even the paper code.
- **An identity with no live session for a year is closed and deleted 30 days later —
  decided 2026-09-15.** The node does not know the browser was cleared, and without a
  term an abandoned identity — name, age, counters, the acceptance journal — would lie
  there forever. The paper code will not raise it afterwards: it does not find a closed
  identity, just as after "start over".

## Open questions

- ~~How the screen opens from the settings~~ — **as an item in the settings list**
  (decided 2026-09-02), by the general rule for entrances: a screen is opened from the
  place that makes you want it, and identity and security is wanted in settings.
  What that item looks like is not drawn.
- ~~Whether to show the local database's size exactly or as a band~~ — **exactly, in
  megabytes** (decided 2026-09-03). The bands in the feed are not there for looks: an
  exact count by radius is an instrument for working out where an author stands. Here
  there is nothing and nobody to work out: a person is looking at **their own** device
  and their own conversations, and the only question they are answering is "is this
  worth the room on my phone". A band of "a little / noticeable" does not answer it.
