// Slides drawn on a timeline: plain CSS animation, parked at slide.t seconds
// for each carousel still, so one slide tells a story over several frames.
//
//   burn   a phrase is typed on a photo, lives 4 h 20 min while the day turns
//          to dusk, then burns from the bottom up; the outro says it is gone
//          (stills at 2.9, 5.6, 7.3, 9.9 make the carousel)
//
// Timeline of burn, seconds:
//   0.0  photo comes up        0.5  typing starts (45 ms a letter)
//   2.4  lifetime pill         3.0–6.4  countdown, the day goes by
//   6.4–7.8  the card burns    7.9 / 8.5 / 9.1  outro lines

(function () {
  "use strict";
  const { esc, inline, P, S, chip } = KIT.h;
  const T = KIT.T;
  const B = window.BRAND;

  // stable pseudo-random in [0, 1) from an integer, so every render is the same
  const rnd = (i) => { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };

  const TYPE_AT = 0.5, TYPE_STEP = 0.045;

  // one span per letter, words kept whole so the line breaks between words
  function typed(text) {
    let n = 0;
    return esc(text).split(/(\s+)/).map((w) => {
      if (/^\s+$/.test(w)) { n += w.length; return " "; }
      const letters = [...w].map((ch) => `<i class="m-ch" style="--in:${(TYPE_AT + n++ * TYPE_STEP).toFixed(3)}s">${ch}</i>`).join("");
      return `<span class="m-w">${letters}</span>`;
    }).join("");
  }

  function embers(count) {
    return Array.from({ length: count }, (_, i) => {
      const x = 8 + rnd(i) * 84, d = 6.5 + rnd(i + 50) * 1.3, s = 6 + rnd(i + 90) * 10;
      const dx = (rnd(i + 130) - 0.5) * 160, h = 260 + rnd(i + 170) * 420;
      return `<i class="m-em" style="left:${x.toFixed(1)}%;--d:${d.toFixed(2)}s;--s:${s.toFixed(0)}px;--dx:${dx.toFixed(0)}px;--h:${h.toFixed(0)}px"></i>`;
    }).join("");
  }

  T.burn = (s) => {
    const text = P(s.phrase);
    const typedEnd = TYPE_AT + [...text].length * TYPE_STEP;
    return `
      <div class="m-dusk"></div>
      <div class="m-card">
        <div class="m-card-in">
          <div class="m-tag"><span>${inline(P(s.zone))}</span><span class="m-clock" data-clock="${s.clock || "17:00"},260,3,6.4">${esc(s.clock || "17:00")}</span></div>
          <div class="m-phrase">${typed(text)}<b class="m-caret" style="--end:${typedEnd.toFixed(2)}s"></b></div>
          ${S(s.phrase) ? `<div class="m-sub">${chip()}<span>${inline(S(s.phrase))}</span></div>` : ""}
          <div class="m-life">${KIT.icon("fade", "ico m-ico")}<span data-count="15600,0,3,6.4">4:20:00</span><span class="m-left">${inline(P(s.left))}</span></div>
          <div class="m-bar"><i></i></div>
        </div>
      </div>
      <div class="m-embers">${embers(26)}</div>
      <div class="m-out">
        <div class="m-o1">${inline(P(s.gone))}</div>
        ${S(s.gone) ? `<div class="m-sub m-o1s">${chip()}<span>${inline(S(s.gone))}</span></div>` : ""}
        <div class="m-o2">${inline(P(s.why))}</div>
        ${S(s.why) ? `<div class="m-sub m-o2s">${chip()}<span>${inline(S(s.why))}</span></div>` : ""}
        <div class="m-o3"><div class="m-site">${esc(B.site)}</div><div class="m-act">${inline(P(s.action))}</div>
          ${S(s.action) ? `<div class="m-sub">${chip()}<span>${inline(S(s.action))}</span></div>` : ""}</div>
      </div>`;
  };
})();
