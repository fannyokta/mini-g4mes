// Daftar semua game. Mau nambah game baru? Tambah satu entri di sini
// (dan taruh filenya di games/<id>/), landing page otomatis update.
//
//  id      nama folder di games/
//  tags    dipakai untuk filter di landing page
//  color   warna latar thumbnail kartu (css color, opsional)
//  status  'ready' (bisa dimainkan) atau 'soon' (placeholder)

window.GAMES = [
  {
    id: 'choco-cheese',
    title: 'Keju & Coklat: Petualangan Cinta',
    emoji: '🧀🍫',
    tags: ['Puzzle', 'Maze'],
    desc: 'Tembus labirin, kumpulkan kunci, buka pintu, dan hindari hati patah. Kumpulkan 3 bintang di tiap level!',
    levels: 5,
    color: 'var(--pink)',
    status: 'ready'
  },
  {
    id: 'soon-1',
    title: 'Game berikutnya',
    emoji: '🎲',
    tags: ['Segera'],
    desc: 'Lagi dimasak di dapur. Tunggu ya!',
    status: 'soon'
  },
  {
    id: 'soon-2',
    title: 'Game berikutnya',
    emoji: '🧩',
    tags: ['Segera'],
    desc: 'Masih rahasia. Pantau terus repo-nya.',
    status: 'soon'
  }
];
