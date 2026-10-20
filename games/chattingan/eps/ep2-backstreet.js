// Backstreet Kantor
//
// Keju & Coklat Boy adalah rekan kerja yang pacaran backstreet. Coklat Boy suka
// cewek mandiri dan nggak manja. Tambahan: tiap jawaban punya "risk" tersembunyi;
// kalau terlalu mencurigakan, HRD tahu dan game over. Nama kontak sengaja cuma 🍫.

(window.CHAT_EPISODES = window.CHAT_EPISODES || []).push({
  name: 'Backstreet Kantor',
  tagline: 'Pacaran diam-diam, awas HRD',
  emoji: '💼',
  theme: 'blue',
  title: '💼 Backstreet Kantor 💌',
  subtitle: '"Jangan sampai ketahuan HRD..."',
  bgEmojis: ['💼', '📎', '💌', '🕶️', '📱', '💛'],
  contact: { name: '🍫', avatar: '🍫', status: 'sedang online' },
  player: 'Keju 🧀',
  systemIntro: '💼 Grup: Internal Kantor — chat terpantau HRD',
  opening: 'Pagi.',

  risk: {
    flash: true,
    warnAt: 70,
    warnText: '⚠️ HRD: Ada aktivitas chat mencurigakan dari akun ini.',
    pills: [
      { min: 0, cls: 'safe', text: '🕶️ AMAN' },
      { min: 40, cls: 'warn', text: '⚠️ MENCURIGAKAN' },
      { min: 70, cls: 'danger', text: '🚨 BAHAYA!' }
    ],
    gameOver: s => ({
      title: '🚨 KETAHUAN HRD! 🚨', emoji: '📋😱💼',
      message: 'Chat kalian terlalu mencurigakan. HRD memanggil kalian berdua ke ruang meeting.',
      quote: 'Kalian berdua... ada hubungan khusus ya? Karena di sini kami tidak mentolerir pacaran backstreet.'
    })
  },

  start: {
    title: '💼 Backstreet Kantor 💌',
    emoji: '🧀🕶️🍫',
    html: `
      <p>Kamu dan Coklat Boy adalah rekan kerja. Kalian pacaran backstreet. Setiap chat harus hati-hati — <b>HRD memantau</b>.</p>
      <p style="font-size:.78rem; opacity:.85;">
        ⚠️ Ada <b>2 hal</b> yang harus kamu jaga:<br>
        💖 <b>Baper</b> — bikin Coklat Boy makin deket<br>
        🕶️ <b>Risiko</b> — jangan sampai HRD tahu!
      </p>
      <p style="font-size:.75rem; opacity:.75;">Nggak ada jawaban benar/salah. Tapi Coklat Boy punya selera sendiri... dan HRD punya mata-mata.</p>`,
    button: 'Buka Chat 💌'
  },

  chats: [
    {
      text: 'Pagi. Udah di kantor?',
      choices: [
        { text: 'Udah dong, nungguin kamu~', baper: -10, risk: 30, reaksi: 'Jangan gitu di chat kantor. Nanti ada yang lihat.' },
        { text: 'Udah. Kamu?', baper: 15, reaksi: 'Udah. Nanti siang aku lewat lobi, aku bawa kopi. Kamu di meja aja.' },
        { text: 'Belum, macet.', baper: 5, reaksi: 'Oke. Hati-hati di jalan.' }
      ]
    },
    {
      text: 'Tadi aku lihat kamu masuk lift sama tim finance.',
      choices: [
        { text: 'Iyaa, ada meeting. Kangen aku ya? 😏', baper: -10, risk: 40, reaksi: 'Keju. Ini chat kantor. Hapus.' },
        { text: 'Iya. Ada urusan proyek.', baper: 15, reaksi: 'Oke. Nanti kalau ada masalah, bilang.' },
        { text: 'Iya. Kenapa?', baper: 10, reaksi: 'Nggak. Cuma nanya.' }
      ]
    },
    {
      text: 'Laporan kamu udah aku cek. Ada typo di halaman 4.',
      choices: [
        { text: 'Aduh, maafin aku ya~ nanti aku ganti deh~', baper: -15, risk: 20, reaksi: 'Ini chat kerja. Jangan manja.' },
        { text: 'Oke, nanti aku revisi. Makasih udah cek.', baper: 20, reaksi: 'Aku revisi-in sekalian. Kamu fokus yang lain aja.' },
        { text: 'Dimana?', baper: 10, reaksi: 'Halaman 4, paragraf 2. Aku kirim screenshot.' }
      ]
    },
    {
      text: 'Jam 5 nanti ada rapat. Kamu ikut?',
      choices: [
        { text: 'Ikut dong, biar bisa deket kamu~', baper: -15, risk: 50, reaksi: 'Keju. Serius. Hapus chat ini.' },
        { text: 'Ikut. Ada yang harus aku presentasiin.', baper: 20, reaksi: 'Oke. Nanti aku duduk di belakang. Kalau kamu gugup, liat aku aja.' },
        { text: 'Nggak tahu, nanti aku cek jadwal.', baper: 5, reaksi: 'Oke. Kabarin.' }
      ]
    },
    {
      text: 'Tadi kamu kelihatan capek. Nggak apa-apa?',
      choices: [
        { text: 'Capek banget, pengen dipeluk~', baper: -15, risk: 30, reaksi: 'Kita di kantor. Jangan gitu.' },
        { text: 'Capek. Tapi masih bisa.', baper: 20, reaksi: 'Aku taruh vitamin di laci meja kamu ya. Jangan lupa diminum.' },
        { text: 'Nggak apa-apa.', baper: 5, reaksi: 'Oke. Istirahat kalau sempat.' }
      ]
    },
    {
      text: 'Kamu udah pulang?',
      choices: [
        { text: 'Belum, nungguin kamu pulang bareng~', baper: -10, risk: 40, reaksi: 'Jangan nunggu di lobi. Nanti ada yang lihat. Aku tunggu di parkiran lantai 3.' },
        { text: 'Belum. Ada kerjaan sisa.', baper: 20, reaksi: 'Aku tunggu di parkiran lantai 3. Nggak usah buru-buru.' },
        { text: 'Udah kok.', baper: 5, reaksi: 'Oke. Hati-hati di jalan.' }
      ]
    },
    {
      text: 'HRD tadi ngumumin bakal ada razia gadget besok.',
      choices: [
        { text: 'Yaudah, aku chat kamu dari hp pribadi aja~', baper: -5, risk: 50, reaksi: 'Jangan. Kalau ketahuan, kita berdua kena.' },
        { text: 'Oke. Besok aku nggak bawa hp ke meja.', baper: 20, reaksi: 'Good. Nanti kalau ada yang penting, aku tinggalin note di laci kamu.' },
        { text: 'Razia apa?', baper: 10, reaksi: 'Razia gadget. Katanya ada yang main hp pas jam kerja.' }
      ]
    },
    {
      text: 'Ada yang mau kamu bilang ke aku?',
      choices: [
        { text: 'Aku cinta kamu~ 💕', baper: -10, risk: 60, reaksi: 'KEJU. HAPUS. SEKARANG.' },
        { text: 'Ada. Tapi nanti aku bilang pas di parkiran.', baper: 25, reaksi: 'Oke. Aku tunggu.' },
        { text: 'Nggak ada.', baper: 5, reaksi: 'Oke.' }
      ]
    }
  ],

  scoreLine: s => `Baper: ${s.baper}% &nbsp;|&nbsp; Risiko: ${s.risk}%`,

  finish(s) {
    const c = s.counts;
    let end;
    if (s.baper < 30 && s.risk >= 50) end = {
      title: '😐 HUBUNGAN DINGIN, RISIKO TINGGI', emoji: '🧀😶🍫',
      message: 'Kalian nggak deket, tapi chat-nya mencurigakan. HRD masih memantau. Hubungan backstreet kalian... nggak jelas.'
    };
    else if (s.baper >= 80 && s.risk < 40) end = {
      title: '💖 SUKSES TANPA KETAHUAN 💖', emoji: '🧀💕🍫',
      message: 'Coklat Boy akhirnya bicara di parkiran lantai 3. Katanya, dia suka caramu — mandiri, nggak manja, dan bisa jaga rahasia. Kalian resmi pacaran backstreet yang aman.'
    };
    else if (s.baper >= 80) end = {
      title: '💛 DEKET TAPI MENCURIGAKAN 💛', emoji: '🧀💭🍫',
      message: 'Coklat Boy suka kamu. Tapi HRD sudah mulai curiga. Kalian harus lebih hati-hati.'
    };
    else if (s.baper >= 50) end = {
      title: '💛 DIA MASIH MIKIR 💛', emoji: '🧀💭🍫',
      message: 'Dia belum bicara. Tapi dia masih ninggalin note di laci meja kamu setiap pagi. Mungkin dia butuh waktu.'
    };
    else if (s.baper >= 20) end = {
      title: '😐 DIA JAGA JARAK 😕', emoji: '🧀😶🍫',
      message: 'Dia masih balas chatmu. Tapi jawabannya singkat. Dia nggak pergi, tapi juga nggak mendekat.'
    };
    else end = {
      title: '💔 DIA MENJAUH 💔', emoji: '🧀🥶🍫',
      message: "Chat terakhirnya cuma 'oke'. Kamu nggak tahu apa yang salah. Tapi dia sudah nggak pernah ninggalin note di laci meja kamu lagi."
    };

    if ((c.mandiri || 0) >= 5 && s.risk < 40) end.gelar = '🏆 Gelar: BACKSTREET PROFESIONAL';
    else if ((c.manja || 0) >= 5) end.gelar = '🌸 Gelar: TERLALU MANJA';
    else if (s.risk >= 60) end.gelar = '🚨 Gelar: HAMPIR KETAHUAN';
    else end.gelar = '😐 Gelar: BIASA AJA';
    return end;
  }
});
