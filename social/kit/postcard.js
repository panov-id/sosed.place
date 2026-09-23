// Postcards from the 70s: a "large letter" front (the place name in huge
// letters, each filled with a photo) and a written back with a stamp and a
// postmark that reads 4:20.
//
//   pcfront  the front on a table
//   pcback   the back on a table; faded: true shows it after the 4 h 20 min

(function () {
  "use strict";
  const { esc, inline, P, S, chip } = KIT.h;
  const T = KIT.T;
  const B = window.BRAND;

  function front(s, t0 = 0) {
    // every letter carries its own slice of the photo, so each can move alone
    const letters = [...P(s.place)];
    const big = letters.map((ch, i) =>
      `<i style="--pop:${(t0 + 1.35 + i * 0.07).toFixed(2)}s;background-position:${((i / Math.max(1, letters.length - 1)) * 100).toFixed(0)}% ${s.fillY || "50%"}">${esc(ch)}</i>`).join("");
    return `
      <div class="pk-face pk-front">
        <div class="pk-photo" style="background-image:url('${s.photo}');background-position:${s.photoPos || "center"}"></div>
        <div class="pk-leak"></div>
        <div class="pk-hi" style="--w:${(t0 + 1.0).toFixed(2)}s">${inline(P(s.hi))}</div>
        <div class="pk-big" style="--fill:url('${s.fill}')">${big}</div>
        ${s.foot ? `<div class="pk-foot">${inline(P(s.foot))}</div>` : ""}
      </div>`;
  }

  function postmark(s) {
    const ring = `${P(s.town)} · ${s.date || "23.09"} · ${P(s.town)} · `;
    return `<svg class="pk-mark" viewBox="0 0 260 260">
      <defs><path id="pcm" d="M130 130 m-96 0 a96 96 0 1 1 192 0 a96 96 0 1 1 -192 0"/></defs>
      <circle cx="130" cy="130" r="122" class="r1"/><circle cx="130" cy="130" r="70" class="r2"/>
      <text class="ring"><textPath href="#pcm">${esc(ring.toUpperCase())}</textPath></text>
      <text x="130" y="148" class="core">${esc(s.mark || "4:20")}</text>
      <path class="wave" d="M250 96 q 30 -14 60 0 t 60 0 t 60 0 M250 130 q 30 -14 60 0 t 60 0 t 60 0 M250 164 q 30 -14 60 0 t 60 0 t 60 0"/>
    </svg>`;
  }

  function back(s, t0 = 0) {
    const lines = P(s.msg).split("\n");
    const addr = P(s.to).split("\n");
    return `
      <div class="pk-face pk-back ${s.faded ? "faded" : ""}">
        <div class="pk-head">${inline(P(s.head || { ru: "Открытка · Postcard", en: "Postcard · Открытка" }))}</div>
        <div class="pk-msg">${lines.map((l, i) =>
          `<div class="pk-ln" style="--w:${(t0 + i * 0.5).toFixed(2)}s">${inline(l) || "&nbsp;"}</div>`).join("")}</div>
        <div class="pk-div"></div>
        <div class="pk-to">${addr.map((l) => `<div class="pk-al">${inline(l)}</div>`).join("")}</div>
        <div class="pk-stamp"><div class="pk-sp" style="background-image:url('${s.stampImg}')"></div><b>${esc(s.value || "4:20")}</b></div>
        <div class="pk-pm" style="--m:${(t0 + lines.length * 0.5 + 0.3).toFixed(2)}s">${postmark(s)}</div>
        ${s.gone ? `<div class="pk-gone">${inline(P(s.gone))}</div>` : ""}
      </div>`;
  }

  const under = (s) => (s.caption ? `
    <div class="pk-cap"><div class="pk-cap-p">${inline(P(s.caption))}</div>
    ${S(s.caption) ? `<div class="pk-cap-s">${chip()}<span>${inline(S(s.caption))}</span></div>` : ""}</div>` : "");

  T.pcfront = (s) => `<div class="pk-table"></div>
    <div class="pk-card" style="--tilt:${s.tilt ?? -2.5}deg">${front(s)}</div>${under(s)}`;

  T.pcback = (s) => `<div class="pk-table"></div>
    <div class="pk-card" style="--tilt:${s.tilt ?? 2}deg">${back(s)}</div>${under(s)}`;
})();
