// Coklat Boy Lagi Salting
//
// Coklat Boy udah nggak cool lagi: gugup, kebanyakan ngetik, ketahuan bohong.
// Dia ngebaperin Keju terus-terusan, tapi SEMUA pilihan Keju tetap jutek.
// Bedanya ada di jenis juteknya:
//   dingin   -> bikin dia mundur (naikin "gengsi"; kalau penuh, dia menyerah)
//   sarkas   -> jutek yang masih ngobrol
//   tsundere -> jutek tapi perhatiannya bocor (baper paling tinggi)

(window.CHAT_EPISODES = window.CHAT_EPISODES || []).push({
  name: 'Coklat Boy Lagi Salting',
  tagline: 'Dia udah nggak cool, kamu tetap jutek',
  emoji: '😳',
  theme: 'purple',
  title: '😳 Coklat Boy Lagi Salting 😳',
  subtitle: '"Dulu cool banget. Sekarang ngetik \'halo\' aja butuh lima menit."',
  meterLabel: '💘 BAPER',
  bgEmojis: ['😳', '💜', '🍫', '🧀', '💭', '✨'],
  contact: { name: 'Coklat Boy 🍫', avatar: '🍫', status: 'mengetik... berhenti... mengetik...' },
  player: 'Keju 🧀',
  opening: ['Hai Keju.', 'Eh. Maksudku... halo.', 'Aku nggak ngetik ini lima menit kok. Cuma dua.'],

  risk: {
    flash: false,
    warnAt: 70,
    warnText: '😶 Coklat Boy mengetik... lalu menghapusnya lagi.',
    pills: [
      { min: 0, cls: 'safe', text: '🌤️ GENGSI: MASIH HANGAT' },
      { min: 40, cls: 'warn', text: '🧊 GENGSI: MULAI DINGIN' },
      { min: 70, cls: 'danger', text: '🥶 GENGSI: HAMPIR BEKU' }
    ],
    gameOver: s => ({
      title: '🥶 DIA MENYERAH 🥶', emoji: '🧀🥀🍫',
      message: 'Coklat Boy mengetik... lalu berhenti. Terlalu dingin, bahkan buat es batu sekalipun.',
      quote: 'Oke. Maaf udah ganggu ya, Keju.'
    })
  },

  start: {
    title: '😳 Coklat Boy Lagi Salting 😳',
    emoji: '🧀💜🍫',
    html: `
      <p>Coklat Boy yang dulu kalem dan cool... sekarang gugup tiap kali ngechat kamu. Dia terus bikin kamu baper.</p>
      <p style="font-size:.78rem; opacity:.85;">Tapi kamu Keju: <b>semua balasanmu tetap jutek</b>. Bedanya cuma <i>jutek yang seperti apa</i>.</p>
      <p style="font-size:.75rem; opacity:.75;">Hati-hati, kalau terlalu dingin, gengsimu bikin dia menyerah.</p>`,
    button: 'Buka Chat 💜'
  },

  chats: [
    {
      text: ['Udah makan belum?', 'Aku bikin tadi, kebanyakan.', 'Bukan sengaja kebanyakan. Kebetulan.', 'Kebetulan banget.'],
      choices: [
        { tag: 'dingin', text: 'Udah. Nggak usah.', baper: -5, risk: 25, reaksi: ['Oke.', 'Aku makan sendiri aja. Semuanya. 🥲'] },
        { tag: 'sarkas', text: 'Kebetulan yang konsisten ya. Tiap hari.', baper: 10, reaksi: ['Konsisten itu kualitas bagus kan?', 'Maksudku di kerjaan. Bukan di... masak.'] },
        { tag: 'tsundere', text: 'Aku nggak minta. ...Bawa aja, jangan sampai dingin.', baper: 20, risk: -10, reaksi: ['SIAP.', 'Eh maksudku, oke. Santai.', 'Aku udah di depan pintu. Eh bukan. Aku di jalan. Bohong, aku di depan pintu.'] }
      ]
    },
    {
      text: ['Keju.', 'Tadi aku lihat kamu ketawa di pantry.', 'Bukan merhatiin. Cuma lewat.', 'Lewat tiga kali.'],
      choices: [
        { tag: 'dingin', text: 'Terus?', baper: -5, risk: 25, reaksi: ['Terus... nggak ada. Bagus ketawanya.', 'Maksudku ya udah.'] },
        { tag: 'sarkas', text: 'Stalker level pemula ya.', baper: 10, reaksi: ['Level pemula tuh yang ketahuan.', 'Berarti aku... ketahuan. Oke.'] },
        { tag: 'tsundere', text: 'Ngapain diliatin. ...Lagian itu karena ceritanya lucu, bukan karena kamu.', baper: 20, risk: -10, reaksi: ['Oh. Oke. Ceritanya lucu. Siapa yang cerita?', 'Eh jangan jawab. Aku nggak cemburu. Nanya doang.'] }
      ]
    },
    {
      text: ['Besok hujan katanya.', 'Kamu bawa payung kan?', 'Kalau nggak, aku ada dua payung.', 'Kebetulan. Lagi.'],
      choices: [
        { tag: 'dingin', text: 'Bawa sendiri.', baper: -5, risk: 25, reaksi: ['Oke. Bagus. Mandiri.', 'Payung keduaku buat jaga-jaga aja. Nggak apa-apa.'] },
        { tag: 'sarkas', text: 'Dua payung? Kamu buka lapak?', baper: 10, reaksi: ['Lapak payung. Boleh juga. Diskon buat kamu.', 'Gratis, maksudku. Eh jangan diterima gratis juga. Eh, boleh.'] },
        { tag: 'tsundere', text: 'Bawa kok. ...Tapi simpen aja, siapa tahu butuh.', baper: 20, risk: -10, reaksi: ['Oke. Nanti aku taruh di mejamu.', 'Kalau nggak kepake, ya... kepake aku.'] }
      ]
    },
    {
      text: ['Aku mau jujur sedikit.', 'Dulu aku bisa ngobrol sama siapa aja tanpa mikir.', 'Sama kamu kok jadi susah ya?', 'Bukan salah kamu. Kayaknya salah aku.'],
      choices: [
        { tag: 'dingin', text: 'Mungkin kamu butuh istirahat.', baper: -5, risk: 25, reaksi: ['...Iya. Mungkin.', 'Oke. Aku diem dulu.'] },
        { tag: 'sarkas', text: 'Wah, kamu bisa jujur juga ternyata.', baper: 10, reaksi: ['Aku juga kaget.', 'Ini efek kamu, tahu.'] },
        { tag: 'tsundere', text: 'Nggak usah dibikin ribet. ...Ngobrol aja kayak biasa. Aku nggak gigit.', baper: 25, risk: -10, reaksi: ['Oke. Kayak biasa.', "Tapi 'biasa'-nya aku sekarang agak... deg-degan. Ya udah, lupakan."] }
      ]
    },
    {
      text: ['Keju, jangan marah ya.', 'Tadi di meeting aku salah sebut nama kamu.', "Maksudnya mau bilang 'Keju', keluarnya 'sayang'.", 'Satu ruangan hening.'],
      choices: [
        { tag: 'dingin', text: 'Memalukan.', baper: -10, risk: 25, reaksi: ['Iya. Aku tahu. Aku nggak tidur mikirin itu.', 'Maaf.'] },
        { tag: 'sarkas', text: 'Bagus. Besok presentasi pakai bahasa alien aja sekalian.', baper: 10, reaksi: ['Kalau bahasa alien, nggak bakal salah sebut.', 'Tapi aku bakal salah sebut dalam bahasa alien juga.'] },
        { tag: 'tsundere', text: 'Nggak marah. ...Cuma, lain kali jangan di depan orang.', baper: 25, risk: -10, reaksi: ['LAIN KALI?', 'Maksudku... oke. Noted. Di tempat sepi. Eh!'] }
      ]
    },
    {
      text: ['Aku tadi beli sesuatu.', 'Bukan buat kamu. Kebetulan kamu doang yang suka.', 'Coklat. Yang ada kejunya.', 'Aneh sih, tapi katanya enak.'],
      choices: [
        { tag: 'dingin', text: 'Aku nggak suka yang aneh-aneh.', baper: -5, risk: 25, reaksi: ['Oh. Oke. Aku makan sendiri.', 'Aku suka aneh-aneh kok. Jadi cocok.'] },
        { tag: 'sarkas', text: 'Coklat keju? Kombinasi apa itu, desperate banget.', baper: 10, reaksi: ['Namanya inovasi!', 'Dan... iya, agak desperate. Maksudku, agak.'] },
        { tag: 'tsundere', text: 'Taruh aja di meja. ...Eh, yang keju lebih banyak ya.', baper: 20, risk: -10, reaksi: ['Lebih banyak keju. Dicatat.', 'Aku bakal inget semua yang kamu suka. Itu bukan serem kan?'] }
      ]
    },
    {
      text: ['Kamu lagi sibuk?', 'Kalau sibuk, nggak usah dibales.', 'Tapi kalau bisa dibales, dibales.', 'Eh, jangan dipaksa juga.'],
      choices: [
        { tag: 'dingin', text: 'Sibuk.', baper: -5, risk: 25, reaksi: ['Oke. Siap.', 'Aku tunggu. Eh, nggak usah ditunggu juga. Tapi aku nunggu.'] },
        { tag: 'sarkas', text: 'Pilih salah satu dong. Dibales atau nggak?', baper: 10, reaksi: ['Dibales!', 'Eh. Terserah kamu. Dibales aja.'] },
        { tag: 'tsundere', text: 'Sibuk sih. ...Tapi chat kamu masih kebaca kok.', baper: 25, risk: -10, reaksi: ['Kebaca.', 'KEBACA.', 'Oke. Aku tenang. Aku tenang.'] }
      ]
    },
    {
      text: ['Keju.', 'Aku udah nggak bisa pura-pura cool lagi.', 'Aku suka kamu. Kayaknya udah dari lama.', "Kamu nggak harus jawab sekarang. Tapi tolong... jangan jawab 'hm' ya. 😭"],
      choices: [
        { tag: 'dingin', text: 'Hm.', baper: -10, risk: 40, reaksi: ['...Oke.', 'Itu jawabannya ya. Makasih udah baca.'] },
        { tag: 'sarkas', text: 'Baru sadar sekarang? Lambat banget kamu.', baper: 15, reaksi: ['JADI SELAMA INI KAMU—', 'Tunggu. Aku tahan napas dulu.', 'Aku tahan napas. Lanjut.'] },
        { tag: 'tsundere', text: 'Bawel. ...Aku juga. Tapi jangan geer, ngomong ini sekali doang.', baper: 30, risk: -10, reaksi: ['...', 'SEKALI DOANG PUN AKU SIMPAN SEUMUR HIDUP.', 'Aku nangis dikit. Jangan dilihat.'] }
      ]
    }
  ],

  scoreLine: s => `Baper: ${s.baper}% &nbsp;|&nbsp; Gengsi: ${s.risk}%`,

  finish(s) {
    const c = s.counts;
    let end;
    if (s.baper >= 90 && s.risk < 40) end = {
      title: '🫠 GENGSI RUNTUH 🫠', emoji: '🧀💜🍫',
      message: "Kamu jutek sampai akhir. Tapi dia tahu: jutekmu itu cara kamu bilang 'iya'. Dia mengetik 'oke', menghapusnya, lalu mengetik lagi.",
      quote: 'Aku jemput jam 7. Pakai payung yang kedua.'
    };
    else if (s.baper >= 90) end = {
      title: '🥹 HAMPIR MENYERAH, TAPI...', emoji: '🧀🥹🍫',
      message: 'Sempat dingin banget, tapi kalimat terakhirmu menyelamatkan semuanya. Dia hampir pergi, dan sekarang nggak mau lepas.'
    };
    else if (s.baper >= 55) end = {
      title: '😤 TSUNDERE LEVEL DEWA 😤', emoji: '🧀😤🍫',
      message: 'Kamu nggak pernah bilang suka, dia nggak pernah bilang yakin. Tapi dia masih bawa dua payung setiap hari hujan.'
    };
    else if (s.baper >= 25) end = {
      title: '🧊 ES BATU MULAI MELELEH 🧊', emoji: '🧀🧊🍫',
      message: 'Dia masih berusaha, kamu masih jutek. Belum jelas siapa yang duluan luluh. Tapi dia belum menyerah.'
    };
    else end = {
      title: '🥶 ES BATU ABADI 🥶', emoji: '🧀🥶🍫',
      message: "Dia masih membalas, tapi sekarang cuma 'oke' dan 'siap'. Nggak ada lagi pesan tiga bubble yang mengetik lima menit."
    };

    if ((c.tsundere || 0) >= 6) end.gelar = '🏆 Gelar: RATU TSUNDERE';
    else if ((c.dingin || 0) >= 4) end.gelar = '🧊 Gelar: PUTRI ES';
    else if ((c.sarkas || 0) >= 5) end.gelar = '😏 Gelar: SARKAS BERKELAS';
    else end.gelar = '😤 Gelar: JUTEK SERBA BISA';
    return end;
  }
});
