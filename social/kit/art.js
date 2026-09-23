// Illustrations, drawn in SVG by code.
//
// The facade is one building the size of the whole profile grid: 3 × 3 cells,
// each 1012 × 1350 (the 3:4 crop Instagram shows of a 4:5 post). Every cover
// draws the same building through its own window onto it, so nine covers put
// side by side in the grid make one house at night. Post k (published k-th)
// lands, once all nine are out, at row ⌊(9−k)/3⌋, column (9−k) mod 3.
//
// Everything is seeded, so a building drawn twice is the same building.

(function () {
  "use strict";
  const ART = (window.ART = {});
  const CELL_W = 1012, CELL_H = 1350, W = CELL_W * 3, H = CELL_H * 3;
  ART.W = W; ART.H = H;

  function rng(seed) {
    return function () {
      seed = (seed + 0x6d2b79f5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  const f1 = (n) => Math.round(n * 10) / 10;

  ART.cell = (k) => ({ row: Math.floor((9 - k) / 3), col: (9 - k) % 3 });
  // viewBox of cover k: its grid cell plus the 34 px Instagram trims each side
  ART.view = (k) => {
    const { row, col } = ART.cell(k);
    return { x: col * CELL_W - 34, y: row * CELL_H, w: 1080, h: 1350 };
  };

  // ---------- little figures ----------

  const cat = (x, y, s = 1, fill = "#0b0808", flip = false) => `
    <g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})" fill="${fill}">
      <ellipse cx="0" cy="-38" rx="30" ry="40"/>
      <circle cx="4" cy="-86" r="21"/>
      <path d="M-12 -98 L-8 -124 L4 -104 Z M10 -104 L24 -122 L24 -96 Z"/>
      <path d="M22 -8 C60 -4 62 -40 44 -52" stroke="${fill}" stroke-width="9" fill="none" stroke-linecap="round"/>
    </g>`;

  const person = (x, y, s, fill) => `
    <g transform="translate(${x} ${y}) scale(${s})" fill="${fill}">
      <circle cx="0" cy="-150" r="34"/>
      <path d="M-70 0 C-70 -70 -50 -104 0 -108 C50 -104 70 -70 70 0 Z"/>
    </g>`;

  const plant = (x, y, s, fill) => `
    <g transform="translate(${x} ${y}) scale(${s})" fill="${fill}">
      <path d="M-24 0 L24 0 L18 -34 L-18 -34 Z"/>
      <path d="M0 -34 C-40 -60 -50 -110 -20 -130 C-10 -100 0 -80 0 -34 Z M0 -34 C30 -70 60 -90 58 -130 C30 -118 10 -90 0 -34 Z M0 -34 C-6 -80 0 -120 12 -150 C24 -110 14 -70 0 -34 Z"/>
    </g>`;

  function bougainvillea(R, x, y, w, drop) {
    const cols = ["#b0245f", "#d6417f", "#8e1d52", "#e0609a", "#6d1a3f"];
    let s = "";
    for (let i = 0; i < 70; i++) {
      const px = x + R() * w, py = y + Math.pow(R(), 1.6) * drop * (0.4 + 0.6 * Math.sin(((px - x) / w) * Math.PI));
      s += `<circle cx="${f1(px)}" cy="${f1(py)}" r="${f1(9 + R() * 16)}" fill="${cols[Math.floor(R() * cols.length)]}" opacity="${f1(0.55 + R() * 0.4)}"/>`;
    }
    for (let i = 0; i < 18; i++) s += `<circle cx="${f1(x + R() * w)}" cy="${f1(y + R() * drop * 0.6)}" r="${f1(6 + R() * 8)}" fill="#1f3a24" opacity=".8"/>`;
    return s;
  }

  // one window: lit (warm, with something inside) or dark (a faint sky reflection)
  function windowBody(R, x, y, w, h, lit, arch, pal) {
    const shape = arch
      ? `M${x} ${y + h} V${y + w / 2} A${w / 2} ${w / 2} 0 0 1 ${x + w} ${y + w / 2} V${y + h} Z`
      : `M${x} ${y} H${x + w} V${y + h} H${x} Z`;
    let s = `<path d="${shape}" fill="${lit ? "url(#litG)" : "url(#darkG)"}"/>`;
    if (lit) {
      const r = R();
      if (r < 0.35) s += person(x + w * (0.3 + R() * 0.4), y + h, 0.9 + R() * 0.3, pal.inside);
      else if (r < 0.6) s += plant(x + w * (0.25 + R() * 0.5), y + h - 4, 0.9, pal.inside);
      else if (r < 0.75) s += cat(x + w * 0.35, y + h - 2, 0.8, pal.inside);
      // curtain
      s += `<path d="M${x} ${y + (arch ? w / 2 : 0)} Q${x + w * 0.28} ${y + h * 0.5} ${x + w * 0.12} ${y + h} H${x} Z" fill="${pal.curtain}" opacity=".55"/>`;
    } else if (R() < 0.18) {
      s += `<path d="${shape}" fill="#3b56a8" opacity=".22"/>`; // someone watching TV in the dark
    }
    // frame
    s += `<path d="${shape}" fill="none" stroke="${pal.frame}" stroke-width="10"/>
      <line x1="${x + w / 2}" y1="${y + (arch ? 0 : 0)}" x2="${x + w / 2}" y2="${y + h}" stroke="${pal.frame}" stroke-width="7"/>
      <line x1="${x}" y1="${y + h * 0.42}" x2="${x + w}" y2="${y + h * 0.42}" stroke="${pal.frame}" stroke-width="7"/>`;
    return s;
  }

  function shutter(x, y, w, h, col, closed) {
    let s = `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${col}" stroke="#0c0a0a" stroke-width="3"/>`;
    for (let yy = y + 14; yy < y + h - 6; yy += 17) s += `<line x1="${x + 6}" y1="${yy}" x2="${x + w - 6}" y2="${yy}" stroke="#000" stroke-opacity=".35" stroke-width="4"/>`;
    if (closed) s += `<line x1="${x + w / 2}" y1="${y}" x2="${x + w / 2}" y2="${y + h}" stroke="#000" stroke-opacity=".5" stroke-width="4"/>`;
    return s;
  }

  const DEFS = (p) => `
    <defs>
      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${p.sky[0]}"/><stop offset=".6" stop-color="${p.sky[1]}"/><stop offset="1" stop-color="${p.sky[2]}"/>
      </linearGradient>
      <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${p.wall[0]}"/><stop offset="1" stop-color="${p.wall[1]}"/>
      </linearGradient>
      <linearGradient id="litG" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#ffd98c"/><stop offset="1" stop-color="#f59a3b"/>
      </linearGradient>
      <linearGradient id="darkG" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${p.glass[0]}"/><stop offset=".55" stop-color="${p.glass[1]}"/><stop offset="1" stop-color="${p.glass[0]}"/>
      </linearGradient>
      <radialGradient id="moonGlow"><stop offset="0" stop-color="#f6e7c4" stop-opacity=".35"/><stop offset="1" stop-color="#f6e7c4" stop-opacity="0"/></radialGradient>
      <radialGradient id="lampGlow"><stop offset="0" stop-color="#ffcf7a" stop-opacity=".75"/><stop offset=".4" stop-color="#ffb04a" stop-opacity=".22"/><stop offset="1" stop-color="#ffb04a" stop-opacity="0"/></radialGradient>
      <linearGradient id="cone" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffcf7a" stop-opacity=".32"/><stop offset="1" stop-color="#ffcf7a" stop-opacity="0"/></linearGradient>
    </defs>`;

  function sky(R, p) {
    let s = `<rect x="-300" y="-300" width="${W + 600}" height="${H + 600}" fill="url(#sky)"/>`;
    for (let i = 0; i < 90; i++) s += `<circle cx="${f1(R() * W)}" cy="${f1(R() * 760)}" r="${f1(1.5 + R() * 2.8)}" fill="#fff" opacity="${f1(0.25 + R() * 0.6)}"/>`;
    s += `<circle cx="${p.moon[0]}" cy="${p.moon[1]}" r="300" fill="url(#moonGlow)"/>`;
    s += p.crescent
      ? `<path d="M${p.moon[0] - 20} ${p.moon[1] - 84} A86 86 0 1 0 ${p.moon[0] + 60} ${p.moon[1] + 62} A70 70 0 1 1 ${p.moon[0] - 20} ${p.moon[1] - 84} Z" fill="#f4e4bd"/>`
      : `<circle cx="${p.moon[0]}" cy="${p.moon[1]}" r="86" fill="#f2e3c2"/><circle cx="${p.moon[0] - 24}" cy="${p.moon[1] - 16}" r="16" fill="#e2cfa6"/><circle cx="${p.moon[0] + 26}" cy="${p.moon[1] + 22}" r="11" fill="#e2cfa6"/>`;
    // distant hills (Troodos behind the town)
    s += `<path d="M-300 ${p.hills} C300 ${p.hills - 150} 700 ${p.hills - 40} 1150 ${p.hills - 120} S2100 ${p.hills - 30} 2500 ${p.hills - 140} S3200 ${p.hills - 60} ${W + 300} ${p.hills - 90} V${p.hills + 400} H-300 Z" fill="${p.hillCol}"/>`;
    return s;
  }

  // ---------- sosed: a 1980s Limassol apartment block, October night ----------

  function sosedFacade() {
    const R = rng(14);
    const p = {
      sky: ["#0c1122", "#231a2c", "#3a2430"], wall: ["#3a2b24", "#5a3e2e"], glass: ["#0e0c14", "#1c2233"],
      moon: [470, 330], hills: 860, hillCol: "#161522", inside: "#7a3f1f", curtain: "#fff1d6", frame: "#1a1310",
    };
    const x0 = 70, x1 = W - 70, top = 960, fh = 590, bw = (x1 - x0) / 6;
    LAYOUT.sosed = { x0, bw, top, fh, ww: 190, wh: 330, dy: 120 };
    let s = DEFS(p) + sky(R, p);

    // neighbours at the edges, lower and darker
    s += `<rect x="-300" y="1500" width="${x0 + 280}" height="${H}" fill="#191318"/><rect x="${x1 - 10}" y="1300" width="400" height="${H}" fill="#191318"/>`;

    // roof: solar water heaters, antennas, a line of laundry
    s += `<rect x="${x0 - 24}" y="${top - 46}" width="${x1 - x0 + 48}" height="60" fill="#2b1f1a"/>`;
    for (let b = 0; b < 6; b++) {
      const cx = x0 + bw * b + bw / 2 + (R() - 0.5) * 60;
      s += `<g fill="#0d0f18" stroke="#2a2f45" stroke-width="3">
        <path d="M${cx - 170} ${top - 46} L${cx + 120} ${top - 46} L${cx + 70} ${top - 210} L${cx - 220} ${top - 210} Z"/>
        <rect x="${cx - 215}" y="${top - 300}" width="270" height="78" rx="39"/>
        <line x1="${cx - 190}" y1="${top - 222}" x2="${cx - 190}" y2="${top - 46}"/><line x1="${cx + 30}" y1="${top - 222}" x2="${cx + 60}" y2="${top - 46}"/></g>`;
      for (let g = 1; g < 4; g++) s += `<line x1="${cx - 170 + g * 72}" y1="${top - 46}" x2="${cx - 220 + g * 72}" y2="${top - 210}" stroke="#262c44" stroke-width="3"/>`;
      if (R() < 0.6) {
        const ax = cx + 150;
        s += `<g stroke="#0d0f18" stroke-width="7" stroke-linecap="round"><line x1="${ax}" y1="${top - 46}" x2="${ax}" y2="${top - 330}"/><line x1="${ax - 60}" y1="${top - 300}" x2="${ax + 60}" y2="${top - 300}"/><line x1="${ax - 40}" y1="${top - 265}" x2="${ax + 40}" y2="${top - 265}"/></g>`;
      }
    }
    {
      const lx = x0 + bw * 2.2, rx = x0 + bw * 3.3, ly = top - 150;
      s += `<path d="M${lx} ${ly} Q${(lx + rx) / 2} ${ly + 50} ${rx} ${ly}" stroke="#0d0f18" stroke-width="4" fill="none"/>`;
      ["#c24a26", "#e8dcc4", "#3d6a8a", "#d6b14a"].forEach((c, i) => {
        const x = lx + 80 + i * 110, y = ly + 30;
        s += `<path d="M${x} ${y} h60 l14 18 -12 8 v54 h-64 v-54 l-12 -8 z" fill="${c}" opacity=".7"/>`;
      });
    }

    s += `<rect x="${x0}" y="${top}" width="${x1 - x0}" height="${H - top}" fill="url(#wall)"/>`;
    // plaster texture: faint horizontal render lines
    for (let y = top + 40; y < 3900; y += 58) s += `<line x1="${x0}" y1="${y}" x2="${x1}" y2="${y}" stroke="#000" stroke-opacity=".07" stroke-width="3"/>`;

    const pal = { inside: p.inside, curtain: p.curtain, frame: p.frame };
    for (let f = 0; f < 5; f++) {
      const y0 = top + f * fh;
      if (f < 4) {
        for (let b = 0; b < 6; b++) {
          const bx = x0 + b * bw, ww = 190, wh = 330, wx = bx + (bw - ww) / 2, wy = y0 + 120;
          const lit = R() < 0.5;
          const closed = !lit && R() < 0.3;
          s += shutter(wx - 96, wy, 88, wh, "#27433d", false) + shutter(wx + ww + 8, wy, 88, wh, "#27433d", false);
          s += closed ? shutter(wx, wy, ww, wh, "#2d4b44", true) : windowBody(R, wx, wy, ww, wh, lit, false, pal);
          if (lit) s += `<rect x="${wx - 40}" y="${wy + wh - 10}" width="${ww + 80}" height="120" fill="#ffb04a" opacity=".08"/>`;
          // AC unit
          if (R() < 0.35) s += `<g><rect x="${bx + 18}" y="${y0 + fh - 210}" width="120" height="86" fill="#6f675d"/><circle cx="${bx + 62}" cy="${y0 + fh - 167}" r="30" fill="none" stroke="#3b3631" stroke-width="6"/><rect x="${bx + 108}" y="${y0 + fh - 196}" width="18" height="60" fill="#4d473f"/></g>`;
          if (R() < 0.3) s += plant(bx + bw - 70, y0 + fh - 74, 0.9, "#1f3a24");
        }
        // balcony slab + railing
        const sy = y0 + fh - 74;
        s += `<rect x="${x0 - 14}" y="${sy}" width="${x1 - x0 + 28}" height="30" fill="#6a4a38"/><rect x="${x0 - 14}" y="${sy + 30}" width="${x1 - x0 + 28}" height="12" fill="#1f1714" opacity=".6"/>`;
        s += `<rect x="${x0 - 14}" y="${sy - 150}" width="${x1 - x0 + 28}" height="12" fill="#1a1411"/>`;
        let bars = "";
        for (let x = x0; x < x1; x += 26) bars += `M${x} ${sy - 140}V${sy}`;
        s += `<path d="${bars}" stroke="#1a1411" stroke-width="5"/>`;
        for (let b = 0; b < 6; b++) if (R() < 0.33) s += bougainvillea(R, x0 + b * bw + 40, sy - 60, bw - 80, 260);
      } else {
        // ground floor: shop shutters, a kiosk, the entrance of number 14
        const gy = y0 + 40, gh = 3900 - gy;
        for (const b of [0, 1]) {
          const bx = x0 + b * bw + 40;
          s += `<rect x="${bx}" y="${gy + 60}" width="${bw - 80}" height="${gh - 60}" fill="#2d2622"/>`;
          for (let y = gy + 80; y < 3900; y += 22) s += `<line x1="${bx}" y1="${y}" x2="${bx + bw - 80}" y2="${y}" stroke="#000" stroke-opacity=".3" stroke-width="4"/>`;
        }
        {
          const bx = x0 + 2 * bw + 30;
          s += `<rect x="${bx}" y="${gy + 40}" width="${bw - 60}" height="${gh - 40}" fill="#241c18"/>
            <rect x="${bx + 30}" y="${gy + 150}" width="${bw - 120}" height="${gh - 330}" fill="url(#litG)" opacity=".9"/>
            <rect x="${bx}" y="${gy + 40}" width="${bw - 60}" height="96" fill="#2f5d8a"/>
            <text x="${bx + (bw - 60) / 2}" y="${gy + 108}" text-anchor="middle" font-family="Oswald" font-weight="600" font-size="58" letter-spacing="6" fill="#f3ead8">ΠΕΡΙΠΤΕΡΟ</text>`;
          for (let i = 0; i < 5; i++) s += `<rect x="${bx + 60 + i * 64}" y="${gy + 200 + (i % 2) * 30}" width="40" height="${70 + (i % 3) * 20}" rx="6" fill="${["#c24a26", "#3d6a8a", "#d6b14a", "#6a8f4e", "#e8dcc4"][i]}" opacity=".85"/>`;
        }
        // bench between kiosk and door
        {
          const bx = x0 + 3 * bw + 60, by = 3780;
          s += `<rect x="${bx}" y="${by - 90}" width="360" height="24" fill="#5b3b27"/><rect x="${bx}" y="${by - 50}" width="360" height="26" fill="#6b4630"/>
            <rect x="${bx + 20}" y="${by - 24}" width="16" height="120" fill="#1a1411"/><rect x="${bx + 324}" y="${by - 24}" width="16" height="120" fill="#1a1411"/>`;
          s += cat(bx + 250, by - 50, 0.9, "#0b0808", true);
        }
        // entrance door, number 14
        {
          const dx = x0 + 5 * bw + (bw - 360) / 2, dy = gy + 60, dw = 360, dh = 3900 - dy - 40;
          s += `<rect x="${dx - 30}" y="${dy - 30}" width="${dw + 60}" height="${dh + 30}" fill="#241a15"/>
            <rect x="${dx}" y="${dy}" width="${dw}" height="${dh}" fill="#ffc46e" opacity=".85"/>
            <rect x="${dx}" y="${dy}" width="${dw}" height="${dh}" fill="none" stroke="#9aa0a6" stroke-width="16"/>
            <line x1="${dx + dw / 2}" y1="${dy}" x2="${dx + dw / 2}" y2="${dy + dh}" stroke="#9aa0a6" stroke-width="12"/>
            <line x1="${dx}" y1="${dy + dh * 0.55}" x2="${dx + dw}" y2="${dy + dh * 0.55}" stroke="#9aa0a6" stroke-width="10"/>
            <rect x="${dx - 60}" y="${3900 - 40}" width="${dw + 120}" height="40" fill="#6a5448"/>
            <circle cx="${dx + dw / 2}" cy="${dy - 120}" r="54" fill="#2f5d8a" stroke="#e8dcc4" stroke-width="6"/>
            <text x="${dx + dw / 2}" y="${dy - 100}" text-anchor="middle" font-family="Oswald" font-weight="700" font-size="58" fill="#f3ead8">14</text>`;
          s += `<rect x="${dx - 60}" y="${dy - 40}" width="${dw + 120}" height="600" fill="#ffb04a" opacity=".06"/>`;
        }
        // street lamp
        {
          const lx = x0 + 4.5 * bw;
          s += `<path d="M${lx - 260} 3900 L${lx - 40} ${gy - 20} L${lx + 40} ${gy - 20} L${lx + 260} 3900 Z" fill="url(#cone)"/>
            <circle cx="${lx}" cy="${gy - 40}" r="320" fill="url(#lampGlow)"/>
            <rect x="${lx - 9}" y="${gy - 30}" width="18" height="${3900 - gy + 30}" fill="#0e0b0a"/>
            <path d="M${lx - 50} ${gy - 30} h100 l-20 -46 h-60 z" fill="#1a1411"/><ellipse cx="${lx}" cy="${gy - 26}" rx="44" ry="10" fill="#ffe2a4"/>`;
        }
      }
    }
    s += `<rect x="-300" y="3900" width="${W + 600}" height="400" fill="#140e0d"/><rect x="-300" y="3900" width="${W + 600}" height="16" fill="#3a2a24"/>`;
    s += cat(x0 + 5 * bw - 60, 3900, 1.1, "#0b0808");
    return s;
  }

  // ---------- neighbro: an old-town stone house, blue hour ----------

  function neighbroFacade() {
    const R = rng(7);
    const p = {
      sky: ["#081424", "#1a3150", "#44506e"], wall: ["#3b3a42", "#5b5046"], glass: ["#0b1220", "#1d2b44"],
      moon: [2620, 300], crescent: true, hills: 900, hillCol: "#141d30", inside: "#5a3418", curtain: "#fff4dc", frame: "#231c16",
    };
    const x0 = 70, x1 = W - 70, top = 980, fh = 730, bw = (x1 - x0) / 5;
    LAYOUT.neighbro = { x0, bw, top, fh, ww: 230, wh: 430, dy: 130 };
    let s = DEFS(p) + sky(R, p);
    s += `<rect x="-300" y="1600" width="${x0 + 280}" height="${H}" fill="#161a24"/><rect x="${x1 - 10}" y="1450" width="400" height="${H}" fill="#161a24"/>`;

    // tiled eave, chimneys, cornice
    for (const cx of [x0 + bw * 0.8, x0 + bw * 3.6]) s += `<rect x="${cx}" y="${top - 250}" width="120" height="220" fill="#2b2320"/><rect x="${cx - 14}" y="${top - 262}" width="148" height="24" fill="#3a2e28"/>`;
    s += `<path d="M${x0 - 60} ${top - 40} L${x0 + 40} ${top - 130} H${x1 - 40} L${x1 + 60} ${top - 40} Z" fill="#6e3524"/>`;
    for (let x = x0 - 50; x < x1 + 60; x += 46) s += `<path d="M${x} ${top - 40} a23 23 0 0 1 46 0" fill="#8a4430" stroke="#4a2419" stroke-width="3"/>`;
    s += `<rect x="${x0}" y="${top - 40}" width="${x1 - x0}" height="${H}" fill="url(#wall)"/>`;
    s += `<rect x="${x0 - 20}" y="${top - 30}" width="${x1 - x0 + 40}" height="34" fill="#6a6258"/><rect x="${x0 - 10}" y="${top + 4}" width="${x1 - x0 + 20}" height="14" fill="#4a453f"/>`;
    // limestone blocks
    for (let y = top + 60; y < 3900; y += 90) {
      const off = ((y / 90) % 2) * 120;
      s += `<line x1="${x0}" y1="${y}" x2="${x1}" y2="${y}" stroke="#000" stroke-opacity=".12" stroke-width="3"/>`;
      for (let x = x0 + off; x < x1; x += 240) s += `<line x1="${x}" y1="${y - 90}" x2="${x}" y2="${y}" stroke="#000" stroke-opacity=".08" stroke-width="3"/>`;
    }

    const pal = { inside: p.inside, curtain: p.curtain, frame: p.frame };
    for (let f = 0; f < 4; f++) {
      const y0 = top + f * fh;
      if (f < 3) {
        for (let b = 0; b < 5; b++) {
          const bx = x0 + b * bw, ww = 230, wh = 430, wx = bx + (bw - ww) / 2, wy = y0 + 130;
          const lit = R() < 0.5, closed = !lit && R() < 0.35;
          s += `<path d="M${wx - 24} ${wy + wh + 10} V${wy + ww / 2} A${ww / 2 + 24} ${ww / 2 + 24} 0 0 1 ${wx + ww + 24} ${wy + ww / 2} V${wy + wh + 10}" fill="none" stroke="#6a6258" stroke-width="18"/>`;
          s += shutter(wx - 124, wy + 40, 110, wh - 40, "#2d5a58", false) + shutter(wx + ww + 14, wy + 40, 110, wh - 40, "#2d5a58", false);
          s += closed ? shutter(wx, wy + 20, ww, wh - 20, "#33625f", true) : windowBody(R, wx, wy, ww, wh, lit, true, pal);
          if (lit) s += `<rect x="${wx - 60}" y="${wy + wh}" width="${ww + 120}" height="160" fill="#ffb04a" opacity=".07"/>`;
          // wrought-iron bellied balcony on the first two floors
          if (f < 2 && R() < 0.7) {
            const by = wy + wh + 10, bl = wx - 60, br = wx + ww + 60;
            s += `<rect x="${bl - 20}" y="${by}" width="${br - bl + 40}" height="22" fill="#6a6258"/>`;
            s += `<path d="M${bl} ${by} C${bl - 10} ${by - 80} ${bl + 10} ${by - 150} ${bl} ${by - 170} H${br} C${br - 10} ${by - 150} ${br + 10} ${by - 80} ${br} ${by}" fill="none" stroke="#121012" stroke-width="7"/>`;
            let bars = "";
            for (let x = bl + 18; x < br; x += 22) bars += `M${x} ${by}V${by - 166}`;
            s += `<path d="${bars}" stroke="#121012" stroke-width="4"/>`;
            for (let x = bl + 30; x < br - 20; x += 64) s += `<circle cx="${x + 11}" cy="${by - 120}" r="14" fill="none" stroke="#121012" stroke-width="4"/>`;
            // geraniums
            for (let i = 0; i < 3; i++) {
              const gx = bl + 30 + i * ((br - bl - 60) / 2);
              s += `<rect x="${gx - 26}" y="${by - 204}" width="52" height="36" fill="#8a4430"/>`;
              for (let j = 0; j < 7; j++) s += `<circle cx="${f1(gx - 30 + R() * 60)}" cy="${f1(by - 214 - R() * 40)}" r="${f1(9 + R() * 8)}" fill="${R() < 0.55 ? "#c4323a" : "#2c4a2a"}"/>`;
            }
          }
        }
        if (f === 0) s += bougainvillea(R, x0 + bw * 3.2, y0 + fh - 120, bw * 1.5, 420);
      } else {
        // ground: bakery, the arched door, a kafeneio with a striped awning
        const gy = y0 + 60;
        {
          const bx = x0 + 60, bwid = bw * 2 - 120;
          s += `<rect x="${bx}" y="${gy + 140}" width="${bwid}" height="${3900 - gy - 200}" fill="url(#litG)" opacity=".85"/>
            <rect x="${bx}" y="${gy + 140}" width="${bwid}" height="${3900 - gy - 200}" fill="none" stroke="#231c16" stroke-width="16"/>
            <text x="${bx + bwid / 2}" y="${gy + 100}" text-anchor="middle" font-family="Oswald" font-weight="600" font-size="64" letter-spacing="10" fill="#d4b262">ΦΟΥΡΝΟΣ</text>`;
          for (let i = 0; i < 6; i++) s += `<ellipse cx="${bx + 90 + i * 150}" cy="${3900 - gy + gy - 200}" rx="56" ry="26" fill="#9a5a26"/>`;
        }
        {
          const cx = x0 + bw * 2.5, dw = 300, dy = gy + 20;
          s += `<path d="M${cx - dw / 2 - 30} 3900 V${dy + dw / 2} A${dw / 2 + 30} ${dw / 2 + 30} 0 0 1 ${cx + dw / 2 + 30} ${dy + dw / 2} V3900" fill="#6a6258"/>
            <path d="M${cx - dw / 2} 3900 V${dy + dw / 2} A${dw / 2} ${dw / 2} 0 0 1 ${cx + dw / 2} ${dy + dw / 2} V3900 Z" fill="#3a2418"/>
            <path d="M${cx - dw / 2 + 20} ${dy + dw / 2} A${dw / 2 - 20} ${dw / 2 - 20} 0 0 1 ${cx + dw / 2 - 20} ${dy + dw / 2} Z" fill="url(#litG)" opacity=".85"/>
            <line x1="${cx}" y1="${dy + dw / 2}" x2="${cx}" y2="3900" stroke="#1d120c" stroke-width="8"/>
            <circle cx="${cx - 30}" cy="${dy + 520}" r="10" fill="#d4b262"/><circle cx="${cx + 30}" cy="${dy + 520}" r="10" fill="#d4b262"/>`;
          s += cat(cx + 200, 3900, 1.05, "#0b0808", true);
        }
        {
          const bx = x0 + bw * 3 + 50, bwid = bw * 2 - 100;
          s += `<rect x="${bx}" y="${gy + 180}" width="${bwid}" height="${3900 - gy - 180}" fill="url(#litG)" opacity=".7"/>`;
          let stripes = "";
          for (let i = 0; i < 12; i++) stripes += `<path d="M${bx - 30 + i * (bwid + 60) / 12} ${gy + 40} h${(bwid + 60) / 12} l${20} 150 h-${(bwid + 60) / 12} z" fill="${i % 2 ? "#e8dcc4" : "#c6a24e"}"/>`;
          s += stripes + `<rect x="${bx - 30}" y="${gy + 190}" width="${bwid + 80}" height="16" fill="#1d1712"/>`;
          s += `<text x="${bx + bwid / 2}" y="${gy + 20}" text-anchor="middle" font-family="Oswald" font-weight="600" font-size="60" letter-spacing="10" fill="#d4b262">ΚΑΦΕΝΕΙΟ</text>`;
          for (let i = 0; i < 3; i++) {
            const tx = bx + 150 + i * 330, ty = 3800;
            s += `<rect x="${tx - 70}" y="${ty - 110}" width="140" height="14" fill="#141012"/><rect x="${tx - 6}" y="${ty - 100}" width="12" height="100" fill="#141012"/>
              <path d="M${tx - 140} ${ty} v-120 h14 v60 h50 v60 z M${tx + 140} ${ty} v-120 h-14 v60 h-50 v60 z" fill="#141012"/>
              <rect x="${tx - 20}" y="${ty - 138}" width="26" height="28" fill="#e8dcc4"/>`;
          }
        }
        {
          const lx = x0 + bw * 2 - 10;
          s += `<circle cx="${lx}" cy="${gy - 80}" r="360" fill="url(#lampGlow)"/>
            <path d="M${lx - 12} 3900 V${gy - 60} M${lx} ${gy - 60} q60 -80 140 -60" stroke="#0e0b0a" stroke-width="18" fill="none"/>
            <path d="M${lx + 110} ${gy - 120} h70 l-12 60 h-46 z" fill="#1a1411"/><rect x="${lx + 122}" y="${gy - 64}" width="46" height="18" fill="#ffe2a4"/>`;
        }
      }
    }
    s += `<rect x="-300" y="3900" width="${W + 600}" height="400" fill="#10121a"/><rect x="-300" y="3900" width="${W + 600}" height="16" fill="#2d2c33"/>`;
    for (let x = -300; x < W + 300; x += 120) s += `<rect x="${x}" y="3940" width="112" height="40" fill="#1a1c26"/>`;
    return s;
  }

  const LAYOUT = {};
  const FACADES = { sosed: sosedFacade, neighbro: neighbroFacade };
  const cache = {};
  ART.facade = function (style) {
    if (!cache[style]) cache[style] = FACADES[style]();
    return cache[style];
  };
  // the cover's slice of the building, as a full-bleed background
  ART.facadeSlice = function (style, k, extra = "") {
    const v = ART.view(k);
    return `<svg class="facade" viewBox="${v.x} ${v.y} ${v.w} ${v.h}" width="1080" height="1350" preserveAspectRatio="none">${ART.facade(style)}${extra}</svg>`;
  };

  // the whole building at once, with chosen windows lit and numbered
  ART.facadeWhole = function (style, pins, ring) {
    const body = ART.facade(style), L = LAYOUT[style];
    let marks = "";
    pins.forEach(([f, b], i) => {
      const x = L.x0 + b * L.bw + (L.bw - L.ww) / 2, y = L.top + f * L.fh + L.dy;
      marks += `<rect x="${x}" y="${y}" width="${L.ww}" height="${L.wh}" fill="url(#litG)"/>
        <rect x="${x - 16}" y="${y - 16}" width="${L.ww + 32}" height="${L.wh + 32}" fill="none" stroke="#fff" stroke-width="14"/>
        <circle cx="${x + L.ww / 2}" cy="${y - 110}" r="90" fill="var(--accent)"/>
        <text x="${x + L.ww / 2}" y="${y - 72}" text-anchor="middle" font-family="Golos Text" font-weight="900" font-size="110" fill="var(--accent-ink)">${i + 1}</text>`;
    });
    const rg = ring ? `<circle cx="${ring[0]}" cy="${ring[1]}" r="${ring[2]}" fill="none" stroke="var(--accent)" stroke-width="18" stroke-dasharray="60 30"/>` : "";
    return `<svg class="whole" viewBox="-60 200 ${W + 120} ${H - 140}" preserveAspectRatio="xMidYMid meet">${body}${rg}${marks}</svg>`;
  };

  // ---------- close-up window (sosed «Окна») ----------

  ART.windowScene = function (kind, label) {
    const R = rng(kind.length * 31);
    const wx = 190, wy = 250, ww = 700, wh = 860;
    let inside = "";
    if (kind === "frappe") {
      inside = `<rect x="${wx}" y="${wy}" width="${ww}" height="${wh}" fill="url(#roomW)"/>
        <rect x="${wx + 60}" y="${wy + 180}" width="360" height="230" rx="10" fill="#1b2a52"/><rect x="${wx + 72}" y="${wy + 192}" width="336" height="206" fill="#4a6fc0" opacity=".85"/>
        <rect x="${wx + 72}" y="${wy + 192}" width="336" height="206" fill="#9fc0ff" opacity=".25"/>
        ${person(wx + 520, wy + wh - 120, 2.1, "#5a2c14")}
        <g transform="translate(${wx + 610} ${wy + 520})"><path d="M-40 0 L40 0 L30 150 L-30 150 Z" fill="#fff6e8" opacity=".9"/><rect x="-40" y="0" width="80" height="40" fill="#e9c9a0"/><line x1="10" y1="-80" x2="0" y2="120" stroke="#c24a26" stroke-width="10"/></g>`;
    } else if (kind === "pomegranates") {
      inside = `<rect x="${wx}" y="${wy}" width="${ww}" height="${wh}" fill="url(#roomW)"/>
        <rect x="${wx - 30}" y="${wy + wh - 150}" width="${ww + 60}" height="40" fill="#8a5a3a"/>
        <ellipse cx="${wx + ww / 2}" cy="${wy + wh - 160}" rx="240" ry="50" fill="#e8dcc4"/>`;
      for (let i = 0; i < 11; i++) {
        const px = wx + 180 + (i % 6) * 70 + (i > 5 ? 35 : 0), py = wy + wh - 200 - (i > 5 ? 60 : 0);
        inside += `<circle cx="${px}" cy="${py}" r="46" fill="${["#a3182c", "#c1273a", "#8a1426"][i % 3]}"/><path d="M${px - 12} ${py - 44} l6 -18 6 14 6 -14 6 18 z" fill="#6a1020"/><circle cx="${px - 14}" cy="${py - 14}" r="10" fill="#fff" opacity=".25"/>`;
      }
      inside += `<path d="M${wx + 40} ${wy + 40} C${wx + 200} ${wy + 140} ${wx + 120} ${wy + 360} ${wx + 260} ${wy + 420}" stroke="#2c4a2a" stroke-width="14" fill="none"/>`;
      for (let i = 0; i < 8; i++) inside += `<ellipse cx="${wx + 60 + i * 30}" cy="${wy + 80 + i * 44}" rx="34" ry="14" transform="rotate(${-30 + i * 8} ${wx + 60 + i * 30} ${wy + 80 + i * 44})" fill="#3d6a3a"/>`;
    } else if (kind === "rain") {
      inside = `<rect x="${wx}" y="${wy}" width="${ww}" height="${wh}" fill="url(#roomW)"/>
        <rect x="${wx + 80}" y="${wy + 120}" width="200" height="260" fill="#8a5a3a" opacity=".5"/>
        ${person(wx + 440, wy + wh - 90, 2.2, "#5a2c14")}
        <g transform="translate(${wx + 560} ${wy + 560})"><rect x="-40" y="0" width="80" height="96" rx="10" fill="#e8dcc4"/><path d="M40 20 q40 10 0 50" stroke="#e8dcc4" stroke-width="12" fill="none"/>
          <path d="M-10 -20 q10 -30 0 -60 M14 -20 q10 -30 0 -60" stroke="#fff" stroke-width="5" fill="none" opacity=".6"/></g>
        <rect x="${wx}" y="${wy}" width="${ww}" height="${wh}" fill="#9fb4d8" opacity=".22"/>`;
      for (let i = 0; i < 70; i++) {
        const x = wx + R() * ww, y = wy + R() * wh, l = 30 + R() * 70;
        inside += `<line x1="${x}" y1="${y}" x2="${x - 8}" y2="${y + l}" stroke="#e6f0ff" stroke-width="3" opacity=".55"/>`;
      }
      for (let i = 0; i < 40; i++) inside += `<circle cx="${wx + R() * ww}" cy="${wy + R() * wh}" r="${4 + R() * 7}" fill="#eef4ff" opacity=".5"/>`;
    } else if (kind === "boiler") {
      inside = `<rect x="${wx}" y="${wy}" width="${ww}" height="${wh}" fill="url(#nightW)"/>`;
      for (let i = 0; i < 40; i++) inside += `<circle cx="${f1(wx + R() * ww)}" cy="${f1(wy + R() * 360)}" r="${f1(2 + R() * 3)}" fill="#fff" opacity="${f1(0.3 + R() * 0.6)}"/>`;
      inside += `<g fill="#0d0f18" stroke="#39405c" stroke-width="5">
          <path d="M${wx + 90} ${wy + 720} L${wx + 560} ${wy + 720} L${wx + 480} ${wy + 470} L${wx + 20} ${wy + 470} Z"/>
          <rect x="${wx + 30}" y="${wy + 330}" width="420" height="120" rx="60"/></g>
        <path d="M${wx + 560} ${wy + 580} L${wx + 180} ${wy + 360} L${wx + 230} ${wy + 300} Z" fill="#fff2c4" opacity=".35"/>
        ${person(wx + 600, wy + wh, 1.9, "#07080e")}
        <rect x="${wx + 556}" y="${wy + 570}" width="40" height="22" fill="#ffe8a8" transform="rotate(-30 ${wx + 576} ${wy + 580})"/>`;
    }
    const frame = `
      <rect x="${wx - 150}" y="${wy - 40}" width="140" height="${wh + 40}" fill="#27433d"/><rect x="${wx + ww + 10}" y="${wy - 40}" width="140" height="${wh + 40}" fill="#27433d"/>
      ${Array.from({ length: 28 }, (_, i) => `<line x1="${wx - 140}" y1="${wy - 20 + i * 31}" x2="${wx - 20}" y2="${wy - 20 + i * 31}" stroke="#000" stroke-opacity=".35" stroke-width="7"/><line x1="${wx + ww + 20}" y1="${wy - 20 + i * 31}" x2="${wx + ww + 140}" y2="${wy - 20 + i * 31}" stroke="#000" stroke-opacity=".35" stroke-width="7"/>`).join("")}
      <rect x="${wx}" y="${wy}" width="${ww}" height="${wh}" fill="none" stroke="#1a1310" stroke-width="26"/>
      <line x1="${wx + ww / 2}" y1="${wy}" x2="${wx + ww / 2}" y2="${wy + wh}" stroke="#1a1310" stroke-width="16"/>
      <rect x="${wx - 60}" y="${wy + wh}" width="${ww + 120}" height="40" fill="#6a4a38"/>`;
    return `<svg class="scene" viewBox="0 0 1080 1350" width="1080" height="1350">
      <defs>
        <linearGradient id="roomW" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffd98c"/><stop offset="1" stop-color="#e8873a"/></linearGradient>
        <linearGradient id="nightW" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0c1122"/><stop offset="1" stop-color="#2a1d2e"/></linearGradient>
      </defs>
      <rect width="1080" height="1350" fill="#3a2b24"/>
      ${Array.from({ length: 24 }, (_, i) => `<line x1="0" y1="${i * 58}" x2="1080" y2="${i * 58}" stroke="#000" stroke-opacity=".08" stroke-width="3"/>`).join("")}
      ${inside}${frame}
      ${label ? `<g transform="translate(${wx + ww - 10} ${wy - 90})"><rect x="-150" y="-10" width="160" height="70" rx="8" fill="#2f5d8a" stroke="#e8dcc4" stroke-width="4"/><text x="-70" y="42" text-anchor="middle" font-family="Oswald" font-weight="700" font-size="44" fill="#f3ead8">${label}</text></g>` : ""}
    </svg>`;
  };

  // ---------- two grandmothers on a bench (sosed «Бабушки») ----------
  // mood: "talk" | "shock" | "sly" per granny, left then right

  function granny(x, y, o) {
    const mouth = {
      talk: `<ellipse cx="0" cy="34" rx="16" ry="12" fill="#5a1d14"/>`,
      shock: `<ellipse cx="0" cy="36" rx="14" ry="20" fill="#5a1d14"/>`,
      sly: `<path d="M-18 32 Q0 44 20 28" stroke="#5a1d14" stroke-width="6" fill="none" stroke-linecap="round"/>`,
      flat: `<path d="M-16 34 H16" stroke="#5a1d14" stroke-width="6" stroke-linecap="round"/>`,
    }[o.mood || "flat"];
    const brows = o.mood === "shock"
      ? `<path d="M-44 -30 q14 -14 28 0 M16 -30 q14 -14 28 0" stroke="#3b2a22" stroke-width="6" fill="none"/>`
      : o.mood === "sly"
        ? `<path d="M-44 -20 l28 6 M16 -14 l28 -6" stroke="#3b2a22" stroke-width="6"/>`
        : `<path d="M-44 -22 h26 M18 -22 h26" stroke="#3b2a22" stroke-width="6" stroke-linecap="round"/>`;
    const head = o.scarf
      ? `<path d="M-92 -10 C-100 -120 100 -120 92 -10 L70 60 C40 30 -40 30 -70 60 Z" fill="${o.scarf}"/>
         <path d="M-20 70 l20 30 l20 -30 z" fill="${o.scarf}"/>
         ${Array.from({ length: 6 }, (_, i) => `<circle cx="${-60 + i * 24}" cy="${-60 + (i % 2) * 14}" r="7" fill="#fff" opacity=".6"/>`).join("")}`
      : `<circle cx="0" cy="-96" r="40" fill="#d8d2c8"/><path d="M-80 -20 C-84 -110 84 -110 80 -20" fill="#d8d2c8"/>`;
    return `<g transform="translate(${x} ${y}) scale(${o.flip ? -1 : 1} 1)">
      <path d="M-150 360 C-160 190 -120 110 0 100 C120 110 160 190 150 360 Z" fill="${o.coat}"/>
      <path d="M-40 110 L0 300 L40 110" fill="none" stroke="#000" stroke-opacity=".2" stroke-width="6"/>
      ${[160, 210, 260].map((yy) => `<circle cx="18" cy="${yy}" r="7" fill="#e8dcc4"/>`).join("")}
      <path d="M-150 360 h300 v40 h-300 z" fill="#2b2320"/>
      <circle cx="0" cy="0" r="78" fill="#e9b894"/>
      ${head}
      <circle cx="-30" cy="0" r="22" fill="none" stroke="#2a211d" stroke-width="6"/><circle cx="30" cy="0" r="22" fill="none" stroke="#2a211d" stroke-width="6"/><line x1="-8" y1="0" x2="8" y2="0" stroke="#2a211d" stroke-width="6"/>
      <circle cx="-30" cy="2" r="6" fill="#2a211d"/><circle cx="30" cy="2" r="6" fill="#2a211d"/>
      ${brows}${mouth}
      <circle cx="-54" cy="26" r="12" fill="#e08a78" opacity=".6"/><circle cx="54" cy="26" r="12" fill="#e08a78" opacity=".6"/>
      ${o.prop === "seeds" ? `<g transform="translate(90 250)"><path d="M-40 0 h80 l-10 60 h-60 z" fill="#e8dcc4"/>${Array.from({ length: 5 }, (_, i) => `<ellipse cx="${-24 + i * 12}" cy="-4" rx="5" ry="9" fill="#1a1411"/>`).join("")}</g>` : ""}
      ${o.prop === "phone" ? `<g transform="translate(96 230) rotate(-14)"><rect x="-34" y="-60" width="68" height="120" rx="12" fill="#1a1411"/><rect x="-26" y="-50" width="52" height="96" rx="6" fill="#ffcf7a"/></g>` : ""}
      ${o.prop === "cane" ? `<path d="M-130 400 V180 q0 -40 36 -40" stroke="#5b3b27" stroke-width="14" fill="none" stroke-linecap="round"/>` : ""}
    </g>`;
  }

  ART.bench = function (left, right, bg = "#2a1f24") {
    return `<svg class="scene" viewBox="0 0 1080 1350" width="1080" height="1350">
      <rect width="1080" height="1350" fill="${bg}"/>
      <rect x="0" y="1010" width="1080" height="340" fill="#1a1316"/>
      <rect x="120" y="640" width="840" height="30" fill="#6b4630"/><rect x="120" y="686" width="840" height="30" fill="#6b4630"/>
      ${granny(330, 690, left)}${granny(750, 690, right)}
      <rect x="90" y="960" width="900" height="38" fill="#7a5238"/><rect x="90" y="998" width="900" height="16" fill="#3a2418"/>
      <rect x="140" y="1014" width="26" height="170" fill="#1a1411"/><rect x="914" y="1014" width="26" height="170" fill="#1a1411"/>
      ${cat(960, 1340, 1.2, "#0b0808", true)}
    </svg>`;
  };

  // ---------- neighbro: engraving of a freddo espresso (field-guide plate) ----------

  ART.freddo = function () {
    let hatch = "";
    for (let i = 0; i < 40; i++) hatch += `<line x1="${250 + i * 12}" y1="300" x2="${190 + i * 12}" y2="1000" stroke="#2b2418" stroke-width="2" opacity=".5"/>`;
    return `<svg viewBox="0 0 800 1100" class="engr">
      <defs><clipPath id="cup"><path d="M200 260 H600 L545 1020 H255 Z"/></clipPath></defs>
      <g clip-path="url(#cup)">
        <rect x="150" y="250" width="500" height="800" fill="#d7c6a4"/>
        <path d="M150 460 H650 V1050 H150 Z" fill="#6b4222"/>
        <path d="M150 400 C300 380 500 430 650 400 V470 H150 Z" fill="#e9dcc0"/>
        ${[[260, 560, 130], [420, 610, 120], [300, 760, 140], [460, 800, 110], [330, 910, 100]].map(([x, y, s]) => `<rect x="${x}" y="${y}" width="${s}" height="${s}" rx="14" fill="#cfe0e6" opacity=".55" stroke="#2b2418" stroke-width="3" transform="rotate(${(x % 30) - 15} ${x + s / 2} ${y + s / 2})"/>`).join("")}
        ${hatch}
      </g>
      <path d="M200 260 H600 L545 1020 H255 Z" fill="none" stroke="#2b2418" stroke-width="6"/>
      <ellipse cx="400" cy="260" rx="215" ry="34" fill="#efe6d2" stroke="#2b2418" stroke-width="6"/>
      <path d="M470 40 L420 900" stroke="#2b2418" stroke-width="26" stroke-linecap="round"/><path d="M470 40 L420 900" stroke="#c6a24e" stroke-width="16" stroke-linecap="round"/>
      <g font-family="PT Serif" font-style="italic" font-size="34" fill="#2b2418">
        <line x1="630" y1="420" x2="720" y2="360" stroke="#2b2418" stroke-width="2"/><text x="690" y="345">a.</text>
        <line x1="590" y1="700" x2="720" y2="700" stroke="#2b2418" stroke-width="2"/><text x="690" y="690">b.</text>
        <line x1="470" y1="140" x2="600" y2="120" stroke="#2b2418" stroke-width="2"/><text x="580" y="105">c.</text>
      </g>
    </svg>`;
  };

  // ---------- neighbro: more plates ----------

  function hatchLines(x, y, w, h, step, ang, op = 0.45) {
    let s = "";
    for (let i = -h; i < w + h; i += step) s += `<line x1="${x + i}" y1="${y}" x2="${x + i + Math.tan(ang) * h}" y2="${y + h}" stroke="#2b2418" stroke-width="2" opacity="${op}"/>`;
    return s;
  }

  ART.granatus = function () {
    const fruit = (cx, cy, r, id) => `
      <clipPath id="${id}"><circle cx="${cx}" cy="${cy}" r="${r}"/></clipPath>
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="#b8453a"/>
      <g clip-path="url(#${id})">${hatchLines(cx - r, cy - r, 2 * r, 2 * r, 11, 0.5, 0.35)}<circle cx="${cx - r * 0.35}" cy="${cy - r * 0.35}" r="${r * 0.3}" fill="#fff" opacity=".18"/></g>
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#2b2418" stroke-width="5"/>
      <path d="M${cx - 22} ${cy - r + 4} l8 -34 10 22 8 -28 10 28 10 -22 8 34" fill="#8a2f28" stroke="#2b2418" stroke-width="4" stroke-linejoin="round"/>`;
    let seeds = "";
    for (let i = 0; i < 46; i++) {
      const a = i * 2.4, rr = 12 + (i % 9) * 11;
      seeds += `<ellipse cx="${560 + Math.cos(a) * rr}" cy="${760 + Math.sin(a) * rr * 0.9}" rx="11" ry="15" transform="rotate(${(i * 37) % 180} ${560 + Math.cos(a) * rr} ${760 + Math.sin(a) * rr * 0.9})" fill="#a3182c" stroke="#2b2418" stroke-width="2"/>`;
    }
    const leaf = (x, y, r) => `<g transform="translate(${x} ${y}) rotate(${r})"><path d="M0 0 C40 -26 110 -20 150 0 C110 20 40 26 0 0 Z" fill="#6a7a4a" stroke="#2b2418" stroke-width="4"/><line x1="0" y1="0" x2="150" y2="0" stroke="#2b2418" stroke-width="2"/></g>`;
    return `<svg viewBox="0 0 800 1100" class="engr">
      <path d="M60 120 C220 180 330 260 400 420 C430 500 440 560 430 640" stroke="#2b2418" stroke-width="16" fill="none" stroke-linecap="round"/>
      <path d="M300 250 C360 250 420 230 470 190" stroke="#2b2418" stroke-width="10" fill="none" stroke-linecap="round"/>
      ${leaf(130, 150, 20)}${leaf(230, 200, -30)}${leaf(320, 290, 40)}${leaf(420, 200, -60)}${leaf(380, 330, 70)}${leaf(250, 260, 150)}
      ${fruit(420, 560, 130, "g1")}${fruit(250, 820, 110, "g2")}
      <g><path d="M560 760 m-170 0 a170 150 0 1 0 340 0 a170 150 0 1 0 -340 0" fill="#f0d8c0" stroke="#2b2418" stroke-width="6"/>
        <path d="M560 610 V910 M390 760 H730" stroke="#e4c4a4" stroke-width="10"/>${seeds}</g>
      <g font-family="PT Serif" font-style="italic" font-size="34" fill="#2b2418">
        <line x1="540" y1="500" x2="690" y2="420" stroke="#2b2418" stroke-width="2"/><text x="680" y="405">a.</text>
        <line x1="700" y1="760" x2="760" y2="700" stroke="#2b2418" stroke-width="2"/><text x="740" y="690">b.</text>
        <line x1="150" y1="170" x2="60" y2="60" stroke="#2b2418" stroke-width="2"/><text x="40" y="50">c.</text>
      </g></svg>`;
  };

  ART.felis = function () {
    return `<svg viewBox="0 0 800 1100" class="engr">
      <defs><clipPath id="fb"><path d="M230 1000 C170 820 200 620 300 520 C260 470 250 360 290 300 L270 190 L350 260 C390 245 430 245 470 260 L550 190 L530 300 C570 360 560 470 520 520 C620 620 650 820 590 1000 Z"/></clipPath></defs>
      <path d="M590 980 C720 960 760 860 700 800" stroke="#2b2418" stroke-width="30" fill="none" stroke-linecap="round"/>
      <path d="M590 980 C720 960 760 860 700 800" stroke="#d6a86a" stroke-width="20" fill="none" stroke-linecap="round"/>
      <path d="M230 1000 C170 820 200 620 300 520 C260 470 250 360 290 300 L270 190 L350 260 C390 245 430 245 470 260 L550 190 L530 300 C570 360 560 470 520 520 C620 620 650 820 590 1000 Z" fill="#d6a86a"/>
      <g clip-path="url(#fb)">
        ${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => `<path d="M150 ${560 + i * 60} q260 -60 520 0" stroke="#8a5a2a" stroke-width="16" fill="none" opacity=".75"/>`).join("")}
        ${hatchLines(200, 480, 460, 540, 12, -0.4, 0.3)}
        <path d="M330 320 l40 30 M490 320 l-40 30 M410 250 v70" stroke="#8a5a2a" stroke-width="12"/>
        <ellipse cx="410" cy="700" rx="80" ry="160" fill="#f3e6cc" opacity=".85"/>
      </g>
      <path d="M230 1000 C170 820 200 620 300 520 C260 470 250 360 290 300 L270 190 L350 260 C390 245 430 245 470 260 L550 190 L530 300 C570 360 560 470 520 520 C620 620 650 820 590 1000 Z" fill="none" stroke="#2b2418" stroke-width="6"/>
      <ellipse cx="355" cy="380" rx="22" ry="16" fill="#3c6a3a" stroke="#2b2418" stroke-width="4"/><ellipse cx="465" cy="380" rx="22" ry="16" fill="#3c6a3a" stroke="#2b2418" stroke-width="4"/>
      <rect x="351" y="366" width="8" height="28" rx="4" fill="#1a1411"/><rect x="461" y="366" width="8" height="28" rx="4" fill="#1a1411"/>
      <path d="M398 430 l12 12 12 -12 z" fill="#c06a6a" stroke="#2b2418" stroke-width="3"/>
      <path d="M410 442 v14 M410 456 q-16 14 -30 4 M410 456 q16 14 30 4" stroke="#2b2418" stroke-width="4" fill="none"/>
      <path d="M380 440 l-140 -20 M380 450 l-140 10 M440 440 l140 -20 M440 450 l140 10" stroke="#2b2418" stroke-width="3"/>
      <g font-family="PT Serif" font-style="italic" font-size="34" fill="#2b2418">
        <line x1="540" y1="210" x2="680" y2="140" stroke="#2b2418" stroke-width="2"/><text x="670" y="125">a.</text>
        <line x1="600" y1="700" x2="740" y2="640" stroke="#2b2418" stroke-width="2"/><text x="730" y="625">b.</text>
        <line x1="720" y1="840" x2="770" y2="900" stroke="#2b2418" stroke-width="2"/><text x="750" y="940">c.</text>
      </g></svg>`;
  };

  // ---------- neighbro: a clock at 4:20, dissolving (film poster) ----------

  ART.clock = function () {
    const cx = 540, cy = 520, r = 300;
    let ticks = "", dust = "";
    for (let i = 0; i < 60; i++) {
      const a = (i / 60) * 2 * Math.PI, big = i % 5 === 0;
      ticks += `<line x1="${cx + Math.sin(a) * (r - (big ? 44 : 22))}" y1="${cy - Math.cos(a) * (r - (big ? 44 : 22))}" x2="${cx + Math.sin(a) * (r - 8)}" y2="${cy - Math.cos(a) * (r - 8)}" stroke="#ede8dd" stroke-width="${big ? 10 : 4}"/>`;
    }
    const R = rng(420);
    for (let i = 0; i < 160; i++) {
      const x = cx + 60 + R() * 420, y = cy + 40 + R() * 520;
      dust += `<rect x="${x}" y="${y}" width="${6 + R() * 14}" height="${6 + R() * 14}" fill="#d4b262" opacity="${(0.9 - (x - cx) / 600).toFixed(2)}"/>`;
    }
    const hand = (deg, len, w, col) => `<line x1="${cx}" y1="${cy}" x2="${cx + Math.sin((deg * Math.PI) / 180) * len}" y2="${cy - Math.cos((deg * Math.PI) / 180) * len}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/>`;
    return `<svg viewBox="0 0 1080 1350" class="scene">
      <defs><radialGradient id="spot2" cx=".5" cy=".38" r=".6"><stop offset="0" stop-color="#3a3222"/><stop offset="1" stop-color="#0c0b09"/></radialGradient>
        <linearGradient id="melt" x1="0" y1="0" x2="1" y2="1"><stop offset=".45" stop-color="#fff" stop-opacity="1"/><stop offset=".8" stop-color="#fff" stop-opacity="0"/></linearGradient>
        <mask id="mm"><rect width="1080" height="1350" fill="url(#melt)"/></mask></defs>
      <rect width="1080" height="1350" fill="url(#spot2)"/>
      <g mask="url(#mm)"><circle cx="${cx}" cy="${cy}" r="${r}" fill="#14120e" stroke="#d4b262" stroke-width="14"/>${ticks}
        ${hand(130, 170, 22, "#ede8dd")}${hand(120, 250, 12, "#ede8dd")}<circle cx="${cx}" cy="${cy}" r="18" fill="#d4b262"/></g>
      ${dust}
    </svg>`;
  };

  // ---------- neighbro: the ladder with a cake (film poster) ----------

  ART.ladder = function () {
    let rungs = "";
    for (let i = 0; i < 7; i++) rungs += `<line x1="${400 - 150 + i * 14}" y1="${1150 - i * 130}" x2="${560 + 150 - i * 14 - 40}" y2="${1150 - i * 130}" stroke="#0a0907" stroke-width="22"/>`;
    return `<svg viewBox="0 0 1080 1350" class="scene">
      <defs><radialGradient id="spot" cx=".5" cy=".3" r=".7"><stop offset="0" stop-color="#e8c878" stop-opacity=".55"/><stop offset="1" stop-color="#0c0b09" stop-opacity="0"/></radialGradient></defs>
      <rect width="1080" height="1350" fill="#0c0b09"/>
      <path d="M540 -40 L150 1350 H930 Z" fill="url(#spot)"/>
      <path d="M250 1250 L470 230 M830 1250 L610 230" stroke="#0a0907" stroke-width="34" stroke-linecap="round"/>
      ${rungs}
      <g transform="translate(540 200)">
        <rect x="-140" y="-10" width="280" height="30" rx="4" fill="#e8dcc4"/>
        <path d="M-120 -10 V-120 H120 V-10 Z" fill="#f3e6d2"/><path d="M-120 -120 H120 V-80 C80 -60 60 -100 30 -80 C0 -60 -30 -100 -60 -80 C-90 -60 -110 -90 -120 -80 Z" fill="#8a2a3a"/>
        <rect x="-4" y="-190" width="8" height="70" fill="#d4b262"/><path d="M0 -224 C14 -206 10 -192 0 -190 C-10 -192 -14 -206 0 -224 Z" fill="#ffcf7a"/>
      </g>
    </svg>`;
  };

  // ---------- neighbro: postcard front, Limassol seafront at dusk ----------

  ART.postcardFront = function () {
    const palm = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})" fill="#1a1020">
      <path d="M-10 0 C-4 -200 10 -360 30 -480 L44 -478 C28 -360 16 -200 14 0 Z"/>
      ${[[-150, -40], [-120, 30], [-40, 70], [60, 60], [140, 20], [160, -50], [40, -110], [-60, -100]].map(([dx, dy]) => `<path d="M36 -480 Q${36 + dx * 0.5} ${-520 + dy * 0.2} ${36 + dx} ${-480 + dy} Q${36 + dx * 0.45} ${-500 + dy * 0.6} 36 -470 Z"/>`).join("")}</g>`;
    return `<svg viewBox="0 0 1000 640" class="pc-front">
      <defs>
        <linearGradient id="dusk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a3a66"/><stop offset=".45" stop-color="#c0607a"/><stop offset=".72" stop-color="#f0a860"/><stop offset="1" stop-color="#f6c77a"/></linearGradient>
        <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a4a7a"/><stop offset="1" stop-color="#1a2244"/></linearGradient>
      </defs>
      <rect width="1000" height="640" fill="url(#dusk)"/>
      <circle cx="640" cy="400" r="120" fill="#ffe1a0"/>
      <rect x="0" y="400" width="1000" height="240" fill="url(#sea)"/>
      ${Array.from({ length: 9 }, (_, i) => `<rect x="${560 + (i % 3) * 20 - i * 6}" y="${414 + i * 20}" width="${160 - i * 12}" height="6" fill="#ffe1a0" opacity="${0.8 - i * 0.07}"/>`).join("")}
      <path d="M0 540 H1000 V640 H0 Z" fill="#231626"/>
      ${palm(120, 560, 0.95)}${palm(260, 560, 0.75)}${palm(880, 560, 0.9)}
      ${cat(470, 548, 0.7, "#120a14")}
      <path d="M0 540 H1000" stroke="#d4b262" stroke-width="4"/>
    </svg>`;
  };

  ART.stamp = function (city, sub) {
    let perf = "";
    for (let i = 0; i < 12; i++) perf += `<circle cx="${i * 20 + 10}" cy="0" r="7"/><circle cx="${i * 20 + 10}" cy="300" r="7"/>`;
    for (let i = 0; i < 15; i++) perf += `<circle cx="0" cy="${i * 20 + 10}" r="7"/><circle cx="240" cy="${i * 20 + 10}" r="7"/>`;
    return `<svg viewBox="-10 -10 260 320" class="stamp-svg">
      <rect x="0" y="0" width="240" height="300" fill="#f3ead8"/>
      <g fill="#e9e2d2">${perf}</g>
      <rect x="18" y="18" width="204" height="264" fill="#2f5d8a"/>
      <circle cx="120" cy="130" r="54" fill="#f0a860"/><rect x="18" y="150" width="204" height="60" fill="#1a2c4a"/>
      <text x="120" y="244" text-anchor="middle" font-family="Oswald" font-weight="700" font-size="30" fill="#f3ead8" letter-spacing="3">${city}</text>
      <text x="120" y="270" text-anchor="middle" font-family="Oswald" font-size="18" fill="#f3ead8" letter-spacing="3">${sub}</text>
    </svg>`;
  };

  ART.postmark = function (top, bottom) {
    return `<svg viewBox="0 0 420 240" class="postmark">
      <g fill="none" stroke="#2b2418" stroke-width="4" opacity=".75">
        <circle cx="120" cy="120" r="96"/><circle cx="120" cy="120" r="70"/>
        ${[0, 1, 2, 3].map((i) => `<path d="M230 ${80 + i * 26} q30 -14 60 0 t60 0 t60 0"/>`).join("")}
      </g>
      <defs><path id="pm" d="M120 120 m-83 0 a83 83 0 1 1 166 0"/></defs>
      <text font-family="Oswald" font-size="22" letter-spacing="4" fill="#2b2418" opacity=".8"><textPath href="#pm" startOffset="50%" text-anchor="middle">${top}</textPath></text>
      <text x="120" y="130" text-anchor="middle" font-family="Oswald" font-weight="600" font-size="26" fill="#2b2418" opacity=".8">${bottom}</text>
    </svg>`;
  };
})();
