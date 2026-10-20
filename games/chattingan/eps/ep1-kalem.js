// Chat Cinta Coklat Boy
//
// Coklat Boy = cowok cool, kalem, act of service. Dia suka cewek yang mandiri,
// nggak manja, dan sedikit jutek. TIDAK ADA CLUE ke pemain: tebak dari reaksinya.

(window.CHAT_EPISODES = window.CHAT_EPISODES || []).push({
  name: 'Chat Cinta Coklat Boy',
  tagline: 'Si kalem yang diam-diam perhatian',
  emoji: '💌',
  theme: 'pink',
  title: '💌 Chat Cinta Coklat Boy 💌',
  subtitle: '"Dia nggak banyak bicara... tapi perhatiannya nggak main-main"',
  bgEmojis: ['💛', '💖', '🧡', '💕', '🧀', '🍫'],
  contact: { name: 'Coklat Boy 🍫', avatar: '🍫', status: 'online' },
  player: 'Keju 🧀',
  opening: 'Halo.',

  start: {
    title: '💌 Chat Cinta Coklat Boy 💌',
    emoji: '🧀💕🍫',
    html: `
      <p>Coklat Boy baru saja mengirim chat pertamanya. Dia cowok yang kalem, nggak banyak bicara, tapi selalu punya cara sendiri untuk peduli.</p>
      <p style="font-size:.78rem; opacity:.8;">Balas chat-nya. Nggak ada jawaban benar atau salah. Tapi dia punya selera sendiri...</p>`,
    button: 'Buka Chat 💌'
  },

  chats: [
    {
      text: 'Udah makan belum?',
      choices: [
        { text: 'Belum, nunggu kamu traktir dong~', baper: -10, reaksi: 'Oh. Nanti kalau aku sempat ya.' },
        { text: 'Udah. Kamu?', baper: 15, reaksi: 'Udah. Barusan masak lebih banyak, nanti aku antar ke rumah kamu.' },
        { text: 'Belum, males masak.', baper: 5, reaksi: 'Aku anterin makanan ya. Jangan lupa dimakan.' }
      ]
    },
    {
      text: 'Besok aku ada urusan di deket kantor kamu. Samperin?',
      choices: [
        { text: 'Bolehh, aku tungguin ya~', baper: -5, reaksi: 'Oke. Nanti aku kabarin.' },
        { text: 'Nggak usah, aku juga sibuk.', baper: 20, reaksi: 'Ya udah. Tapi kalau kamu kelamaan di kantor, aku tungguin di parkiran.' },
        { text: 'Terserah kamu aja.', baper: 0, reaksi: 'Oke. Aku samperin ya.' }
      ]
    },
    {
      text: 'Aku denger kamu lagi banyak kerjaan. Capek?',
      choices: [
        { text: 'Iya nih capek banget, pengen dipeluk~', baper: -15, reaksi: 'Istirahat yang cukup. Jangan lupa makan.' },
        { text: 'Capek. Tapi ya gimana lagi.', baper: 20, reaksi: 'Aku ke rumah kamu ya. Bawa kopi. Kamu kerja, aku temenin.' },
        { text: 'Nggak terlalu. Masih kuat.', baper: 10, reaksi: 'Kalau kamu butuh apa-apa, bilang aja.' }
      ]
    },
    {
      text: 'Aku lihat story kamu tadi malem jam 2. Nggak bisa tidur?',
      choices: [
        { text: 'Iya nih, kangen kamu jadi nggak bisa tidur~', baper: -15, reaksi: 'Oh. Coba minum air hangat.' },
        { text: 'Iya. Ada kerjaan numpuk.', baper: 20, reaksi: 'Besok pagi aku bawain sarapan. Kamu tidur dulu.' },
        { text: 'Haha iya, insomnia.', baper: 10, reaksi: 'Jangan dipaksain. Istirahat.' }
      ]
    },
    {
      text: 'Barusan aku lewat toko buku. Kamu suka buku kan?',
      choices: [
        { text: 'Iyaa! Beliin dong~', baper: -10, reaksi: 'Aku beliin kalau kamu mau baca. Jangan cuma dipajang.' },
        { text: 'Iya. Kenapa?', baper: 20, reaksi: 'Ada buku yang kamu cari kemarin. Aku beli. Nanti aku antar.' },
        { text: 'Kadang-kadang baca sih.', baper: 5, reaksi: 'Oh. Ya udah.' }
      ]
    },
    {
      text: 'Hari ini aku banyak meeting. Kamu gimana?',
      choices: [
        { text: 'Aku nungguin kamu, samperin ya~', baper: -10, reaksi: 'Nggak usah. Nanti kelar aku kabarin.' },
        { text: 'Biasa aja. Kamu fokus kerja aja sana.', baper: 25, reaksi: 'Oke. Nanti kalau aku udah selesai, aku ke rumah kamu ya. Nggak lama kok.' },
        { text: 'Semangat ya meetingnya!', baper: 10, reaksi: 'Makasih. Nanti aku kabarin kalau udah kelar.' }
      ]
    },
    {
      text: 'Kamu tidur jam berapa tadi?',
      choices: [
        { text: 'Kangen kamu jadi nggak tidur~', baper: -10, reaksi: 'Jangan gitu. Tidur yang cukup.' },
        { text: 'Jam 3. Kenapa?', baper: 20, reaksi: 'Besok aku ke rumah kamu, aku temenin tidur. Eh, maksudnya aku temenin sampai kamu tidur.' },
        { text: 'Jam 11 kayaknya.', baper: 5, reaksi: 'Oke. Besok tidur yang cukup ya.' }
      ]
    },
    {
      text: 'Aku baru pulang dari luar kota. Kamu masih bangun?',
      choices: [
        { text: 'Iyaa, nungguin kamu~', baper: -5, reaksi: 'Jam segini masih bangun. Tidur sana.' },
        { text: 'Iya, lagi kerja.', baper: 20, reaksi: 'Aku ke rumah kamu ya. Bawa makanan. Kamu kerja, aku temenin.' },
        { text: 'Udah mau tidur sih.', baper: 5, reaksi: 'Oke. Tidur yang nyenyak.' }
      ]
    }
  ],

  scoreLine: s => `Baper: ${s.baper}%`,

  finish(s) {
    const c = s.counts;
    let end;
    if (s.baper >= 80) end = {
      title: '💖 DIA JATUH HATI 💖', emoji: '🧀💕🍫',
      message: 'Coklat Boy akhirnya bicara. Katanya, dia suka caramu — yang nggak manja, yang bisa berdiri sendiri. Dia nggak banyak bicara, tapi dia sudah menyiapkan semuanya untukmu.'
    };
    else if (s.baper >= 50) end = {
      title: '💛 DIA MASIH MIKIR 💛', emoji: '🧀💭🍫',
      message: 'Dia belum bicara. Tapi dia masih sering lewat di depan kantormu, masih nanya kamu udah makan atau belum. Mungkin dia butuh waktu.'
    };
    else if (s.baper >= 20) end = {
      title: '😐 DIA JAGA JARAK 😕', emoji: '🧀😶🍫',
      message: 'Dia masih balas chatmu. Tapi jawabannya singkat. Dia nggak pergi, tapi juga nggak mendekat.'
    };
    else end = {
      title: '💔 DIA MENJAUH 💔', emoji: '🧀🥶🍫',
      message: "Chat terakhirnya cuma 'oke'. Kamu nggak tahu apa yang salah. Tapi dia sudah nggak pernah nanya kamu udah makan atau belum lagi."
    };

    if ((c.mandiri || 0) >= 5) end.gelar = '🏆 Gelar: KEJU YANG DIHARGAI';
    else if ((c.manja || 0) >= 5) end.gelar = '🌸 Gelar: KEJU TERLALU MANJA';
    else if ((c.biasa || 0) >= 5) end.gelar = '😐 Gelar: KEJU BIASA AJA';
    else end.gelar = '😐 Gelar: KEJU YANG BINGUNG';
    return end;
  }
});
