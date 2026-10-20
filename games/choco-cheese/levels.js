// Data level Keju & Coklat.
//
// LEGENDA TILE:
//  #  dinding          .  lantai
//  P  start keju       C  coklat (goal, terkunci jika ada kunci)
//  K  kunci            D  pintu (terbuka jika semua kunci diambil)
//  X  hati patah (hindari! reset langkah di level ini)

window.CHOCO_LEVELS = [
  // Level 1 — perkenalan
  {
    name: "Langkah Pertama",
    map: [
      "#########",
      "#P......#",
      "#.#####.#",
      "#.#...#.#",
      "#.#...#C#",
      "#.#...#.#",
      "#.#####.#",
      "#.......#",
      "#########"
    ],
    keysNeeded: 0,
    par: 20,
    intro: { who: "Keju", text: "Hari ini aku harus menemui Coklat Boy... tapi labirinnya bikin pusing!" },
    win:   { who: "Coklat", text: "Kamu datang! Aku sudah menunggu sejak tadi~ 💛" }
  },

  // Level 2 — kunci & pintu (DIDESAIN ULANG)
  // Layout: lorong luar mengelilingi ruangan tengah.
  // Kunci di kiri-atas, pintu di tengah-bawah, coklat di pojok kanan-bawah.
  {
    name: "Kunci Hati",
    map: [
      "###########",
      "#P........#",
      "#.#######.#",
      "#.#K....#.#",
      "#.#.###.#.#",
      "#.#.#D#.#.#",
      "#.#.#.#.#.#",
      "#...#...#C#",
      "###########"
    ],
    keysNeeded: 1,
    par: 45,
    intro: { who: "Keju", text: "Ada pintu terkunci! Kayaknya aku harus cari kunci dulu..." },
    win:   { who: "Coklat", text: "Kamu buka pintunya cuma buat aku? Manis banget 🍫" }
  },

  // Level 3 — hati patah muncul
  {
    name: "Hati yang Rapuh",
    map: [
      "#############",
      "#P..#.......#",
      "#.#.#.#####.#",
      "#.#...#X..#.#",
      "#.#####.#.#.#",
      "#..X....#.#.#",
      "#######.#.#.#",
      "#.......#.#C#",
      "#.#####.#.#.#",
      "#....X..#...#",
      "#############"
    ],
    keysNeeded: 0,
    par: 45,
    intro: { who: "Keju", text: "Hati patah 💔 di mana-mana... kalau kena, aku harus mulai dari awal level!" },
    win:   { who: "Coklat", text: "Kamu berhasil melewati semua hati patah itu. Hatiku utuh lagi~ 💕" }
  },

  // Level 4 — kunci + pintu + hati patah
  {
    name: "Rintangan Cinta",
    map: [
      "#############",
      "#P..#K......#",
      "#.#.#.#####.#",
      "#.#...#X..#.#",
      "#.#####.#.#.#",
      "#..X....#.#.#",
      "#######.#.#.#",
      "#.......#.DC#",
      "#.#####.#.#.#",
      "#....X..#...#",
      "#############"
    ],
    keysNeeded: 1,
    par: 60,
    intro: { who: "Keju", text: "Kunci, pintu, DAN hati patah?! Oke, aku bisa lewatin ini." },
    win:   { who: "Coklat", text: "Kamu luar biasa! Aku nggak sabar memelukmu 🧀💛" }
  },

  // Level 5 — final
  {
    name: "Menuju Pelukan",
    map: [
      "###############",
      "#P..#....#....#",
      "#.#.#.##.#.##.#",
      "#.#...#X...#..#",
      "#.#####.##.#.##",
      "#..K....#..#..#",
      "####.##.#.##.##",
      "#....#..#X...D#",
      "#.##.#.####.#.#",
      "#....#....#.#C#",
      "#.######.##.#.#",
      "#....X......#.#",
      "###############"
    ],
    keysNeeded: 1,
    par: 90,
    intro: { who: "Keju", text: "Ini yang terakhir... Coklat Boy, aku datang!" },
    win:   { who: "Coklat", text: "Akhirnya... pelukan kita hangat seperti coklat cair 💖🧀🍫" }
  }
];
