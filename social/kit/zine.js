// The café board: a cork board outside the kafenio is the feed. Notes get
// pinned (in), live, and the wind takes them (out); the pins stay. One board
// parked at several t gives the carousel: all up, one in the wind, only pins.
//
//   board   s.notes = [{ kind, x, y, w, rot, text, photo, left, in, out, tape }]
//           kind: sticky | paper | card | polaroid | label
//           x, w in px of 1080; y in % of the slide height; in/out in seconds

(function () {
  "use strict";
  const { esc, inline, P, S, chip } = KIT.h;
  const T = KIT.T;

  function note(n, i) {
    const style = `left:${n.x}px;top:${n.y}%;width:${n.w || 360}px;--rot:${n.rot || 0}deg;--in:${n.in ?? 0}s;--out:${n.out ?? 999}s`;
    const pin = n.tape ? "" : `<i class="zb-pin" style="left:${n.x + (n.w || 360) / 2 - 16}px;top:calc(${n.y}% - 14px);--in:${n.in ?? 0}s;--hue:${(i * 67) % 360}deg"></i>`;
    const tape = n.tape ? `<i class="zb-tape"></i>` : "";
    const body = n.kind === "polaroid"
      ? `<div class="zb-pic" style="background-image:url('${n.photo}');background-position:${n.pos || "center"}"></div><div class="zb-t">${inline(P(n.text))}</div>`
      : `<div class="zb-t">${inline(P(n.text))}</div>${S(n.text) && n.sub !== false ? `<div class="zb-s">${chip()}<span>${inline(S(n.text))}</span></div>` : ""}`;
    return `<div class="zb-note zb-${n.kind || "paper"} ${n.out != null ? "leaves" : ""}" style="${style}">${tape}${body}
      ${n.left ? `<div class="zb-left">${esc(n.left)}</div>` : ""}</div>${pin}`;
  }

  T.board = (s) => `
    <div class="zb-cork"></div>
    <div class="zb-notes">${s.notes.map(note).join("")}</div>`;
})();
