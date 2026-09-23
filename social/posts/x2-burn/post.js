// Carousel: one burn slide parked at four moments (t, s) of its timeline.
(function () {
  const base = {
    type: "burn",
    stamp: false,
    photo: "/social/img/lane-bench.jpg",
    photoPos: "40% center",
    zone: { ru: "Двор", en: "Yard" },
    clock: "17:00",
    phrase: { ru: "Кто со мной на лавку в пять? Кот не против.", en: "Bench at five, anyone? The cat doesn't mind." },
    left: { ru: "осталось", en: "left" },
    gone: { ru: "Её больше нет.", en: "It's gone." },
    why: { ru: "Она была для тех, кто рядом.", en: "It was for the people nearby." },
    action: { ru: "Лист ожидания — ссылка в шапке профиля", en: "Waitlist — link in bio" },
  };
  window.POST = {
    rubric: { ru: "Двор", en: "The yard" },
    slides: [2.9, 5.6, 7.3, 9.9].map((t) => ({ ...base, t })),
  };
})();
