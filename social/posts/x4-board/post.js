// Carousel: the yard board outside the kafenio, at four moments of one timeline.
const NOTES = [
  { kind: "label", x: 84, y: 9, w: 440, rot: -2, in: 0.2, tape: true, text: { ru: "Доска двора", en: "The yard board" }, sub: false },
  { kind: "polaroid", x: 600, y: 11, w: 380, rot: 5, in: 0.6, tape: true, photo: "/social/img/cat-bench.jpg", pos: "20% 30%",
    text: { ru: "Кот с третьего. Главный.", en: "The cat from the third floor." } },
  { kind: "sticky", x: 96, y: 19, w: 450, rot: -4, in: 1.2, out: 5.4, left: "ещё 4:12",
    text: { ru: "Кто со мной на лавку в пять? Кот не против.", en: "Bench at five, anyone? The cat doesn't mind." } },
  { kind: "card", x: 560, y: 46, w: 430, rot: 3, in: 1.8, out: 6.0, left: "ещё 2:40",
    text: { ru: "Кто сегодня на рынок? Возьмите хлеба — верну.", en: "Anyone going to the market? Grab me bread, I'll pay back." } },
  { kind: "paper", x: 104, y: 50, w: 410, rot: -2, in: 2.4, out: 4.8, left: "ещё 0:35",
    text: { ru: "Музыка у реки в восемь. Приходите.", en: "Music by the river at eight. Come along." } },
  { kind: "sticky pink", x: 330, y: 71, w: 400, rot: 4, in: 3.0, out: 6.6, left: "ещё 1:50",
    text: { ru: "Кто видел синюю кружку? Стояла на окне.", en: "Seen a blue mug? It was on the sill." } },
  { kind: "paper late", x: 150, y: 27, w: 780, rot: -1.5, in: 7.3, tape: true,
    text: { ru: "Через 4 ч 20 мин записку уносит ветер. Старое тут не копится.", en: "After 4 h 20 min the wind takes the note. Nothing old piles up here." } },
  { kind: "cta", x: 130, y: 58, w: 820, rot: 2.5, in: 8.4, tape: true,
    text: { ru: "Повесь свою.\n*sosed.place*", en: "Pin yours. Waitlist — link in bio" } },
];

window.POST = {
  rubric: { ru: "Доска двора", en: "The yard board" },
  slides: [4.2, 5.9, 7.8, 9.9].map((t) => ({ type: "board", stamp: false, notes: NOTES, t })),
};
