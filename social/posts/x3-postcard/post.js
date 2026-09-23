// Carousel: a postcard from the yard. Front, back, the back after 4 h 20 min, the way in.
const CARD = {
  photo: "/social/img/lane-bench.jpg", photoPos: "40% 55%",
  fill: "/social/img/cat-bench.jpg", fillY: "30%",
  hi: { ru: "Привет из", en: "Greetings from" },
  place: { ru: "Какопетрии", en: "Kakopetria" },
  foot: { ru: "Кипр · двор у реки", en: "Cyprus · the yard by the river" },
  msg: {
    ru: "Соседи!\nЛавка у дома свободна\nпосле пяти. Кот против\nне будет.\n— с третьего этажа",
    en: "Neighbours!\nThe bench by the house\nis free after five.\nThe cat won't mind.\n— third floor",
  },
  to: { ru: "Всем, кто рядом\nпереулок у реки\nКакопетрия", en: "Everyone nearby\nthe lane by the river\nKakopetria" },
  stampImg: "/social/img/cat-bench.jpg",
  stamp: false,
  town: { ru: "Какопетрия", en: "Kakopetria" },
};

window.POST = {
  rubric: { ru: "Открытки", en: "Postcards" },
  slides: [
    { ...CARD, type: "pcfront",
      caption: { ru: "Пришла открытка. От соседа.", en: "A postcard came. From a neighbour." } },
    { ...CARD, type: "pcback",
      caption: { ru: "Её увидят все, кто рядом…", en: "Everyone nearby will see it…" } },
    { ...CARD, type: "pcback", faded: true, tilt: -1.5, gone: { ru: "4:20 · всё", en: "4:20 · gone" },
      caption: { ru: "…и только 4 ч 20 мин.", en: "…for 4 h 20 min only." } },
    { ...CARD, type: "pcback", tilt: 1,
      msg: { ru: "Одна фраза —\nлюдям рядом.\nЧерез 4 ч 20 мин\nеё нет.\n— sosed.place", en: "One line\nto the people nearby.\nGone after\n4 h 20 min.\n— sosed.place" },
      to: { ru: "Тебе\nлист ожидания —\nссылка в шапке", en: "You\nwaitlist —\nlink in bio" },
      caption: { ru: "Садись рядом.", en: "Take a seat." } },
  ],
};
