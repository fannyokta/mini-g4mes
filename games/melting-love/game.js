// Coklat & Keju: Cinta yang Meleleh
// Butuh: assets/js/progress.js (window.Progress)

(function () {
  const GAME_ID = 'melting-love';

  // ----------------------------------------------------------
  // Konfigurasi
  // ----------------------------------------------------------
  const GAME_W = 320;
  const GAME_H = 440;
  const PLAYER_W = 52;
  const PLAYER_H = 52;
  const PLAYER_Y = GAME_H - 14 - PLAYER_H; // posisi top player
  const ITEM_SIZE = 32;
  const BASE_SPEED = 1.8;
  const SPAWN_INTERVAL = 650; // ms
  const SCORE_TO_WIN = 25;
  const BAD_CHANCE = 0.35;
  const KEY_SPEED = 7;

  const GOOD_ITEMS = [
    { emoji: '💛', score: 1 },
    { emoji: '💖', score: 2 },
    { emoji: '🍫', score: 1 },
    { emoji: '🧀', score: 1 }
  ];
  const BAD_ITEMS = [
    { emoji: '💣' },
    { emoji: '💔' },
    { emoji: '🥦' } // brokoli = anti-romantis
  ];

  const ROMANTIC_LINES = [
    'Cintaku padamu seperti keju: makin dipanaskan, makin meleleh~ 🫠',
    'Kamu lebih manis dari coklat 70%! 🍫',
    'Hatiku dipenuhi keju parut cinta 💛',
    'Bersamamu, hidupku seperti fondue: hangat dan lengket~',
    'Kamu dan aku bagai coklat & keju: aneh tapi cocok!',
    'Aku rela jadi keju yang meleleh di atas coklat panasmu~',
    'Cintaku bukan kaleng-kaleng, tapi kotak coklat! 🍫',
    'Kamu bikin jantungku berdebar seperti microwave 🫀',
    'Setiap detik tanpamu, hatiku mengeras seperti keju di kulkas!',
    'Kamu adalah coklat di tengah keju hidupku 💖'
  ];
  const SAD_LINES = [
    'Aduh! Hatiku patah seperti coklat yang jatuh 💔',
    'Brokoli?! Ini bukan cinta, ini fitnah! 🥦',
    'Cintaku meledak seperti bom... 💣',
    'Tidak! Keju kesayanganku jatuh~',
    'Hatiku retak seribu, seperti keju parut 😭'
  ];

  const pick = list => list[Math.floor(Math.random() * list.length)];

  // ----------------------------------------------------------
  // Elemen & state
  // ----------------------------------------------------------
  const $ = id => document.getElementById(id);
  const gameWrap = $('gameWrap');
  const playerEl = $('player');
  const scoreEl = $('score');
  const livesEl = $('lives');
  const dialogEl = $('dialog');
  const overlayEl = $('overlay');
  const modalEl = $('modal');

  let playerX = GAME_W / 2;
  let score = 0;
  let lives = 3;
  let items = []; // { el, x, y, vy, type, data }
  let running = false;
  let lastSpawn = 0;
  let lastFrame = 0;
  let rafId = null;
  let dialogTimeout = null;
  const keysDown = {};

  // Progres tersimpan: skor terbaik, dibaca landing page
  function saveBest() {
    const saved = Progress.get(GAME_ID);
    if (score > (saved.best || 0)) {
      saved.best = score;
      Progress.set(GAME_ID, saved);
    }
  }

  // ----------------------------------------------------------
  // Player
  // ----------------------------------------------------------
  function setPlayerX(x) {
    playerX = Math.max(PLAYER_W / 2, Math.min(GAME_W - PLAYER_W / 2, x));
    playerEl.style.left = playerX + 'px';
  }

  // ----------------------------------------------------------
  // Item
  // ----------------------------------------------------------
  function spawnItem() {
    const isBad = Math.random() < BAD_CHANCE;
    const data = pick(isBad ? BAD_ITEMS : GOOD_ITEMS);
    const x = Math.random() * (GAME_W - ITEM_SIZE);

    const el = document.createElement('div');
    el.className = 'item ' + (isBad ? 'bomb' : 'heart');
    el.textContent = data.emoji;
    el.style.left = x + 'px';
    el.style.top = '-40px';
    gameWrap.appendChild(el);

    items.push({
      el, x, y: -40,
      vy: BASE_SPEED + Math.random() * 1.2 + Math.min(score * 0.02, 2),
      type: isBad ? 'bad' : 'good',
      data
    });
  }

  function clearItems() {
    items.forEach(it => it.el.remove());
    items = [];
  }

  function hitsPlayer(it) {
    const px1 = playerX - PLAYER_W / 2 + 6;
    const px2 = playerX + PLAYER_W / 2 - 6;
    const py1 = PLAYER_Y + 6;
    const py2 = PLAYER_Y + PLAYER_H - 6;
    const ix1 = it.x + 4, ix2 = it.x + ITEM_SIZE - 4;
    const iy1 = it.y + 4, iy2 = it.y + ITEM_SIZE - 4;
    return ix2 > px1 && ix1 < px2 && iy2 > py1 && iy1 < py2;
  }

  // ----------------------------------------------------------
  // Loop
  // ----------------------------------------------------------
  function loop(ts) {
    if (!running) return;
    if (!lastFrame) lastFrame = ts;
    const dt = Math.min(50, ts - lastFrame);
    lastFrame = ts;

    if (ts - lastSpawn > SPAWN_INTERVAL) {
      spawnItem();
      lastSpawn = ts;
    }

    for (let i = items.length - 1; i >= 0; i--) {
      const it = items[i];
      it.y += it.vy * (dt / 16);
      it.el.style.top = it.y + 'px';

      if (hitsPlayer(it)) {
        it.el.remove();
        items.splice(i, 1);
        handleCatch(it);
        if (!running) return; // game berakhir saat tangkapan ini
      } else if (it.y > GAME_H + 20) {
        it.el.remove();
        items.splice(i, 1);
      }
    }

    // gerak keyboard
    let dx = 0;
    if (keysDown.arrowleft || keysDown.a) dx -= 1;
    if (keysDown.arrowright || keysDown.d) dx += 1;
    if (dx) setPlayerX(playerX + dx * KEY_SPEED);

    rafId = requestAnimationFrame(loop);
  }

  function handleCatch(it) {
    if (it.type === 'good') {
      score += it.data.score;
      scoreEl.textContent = score;
      spawnFloatText('+' + it.data.score + ' ' + it.data.emoji, false);
      spawnBgHeart();
      showDialog(pick(ROMANTIC_LINES));
      if (score >= SCORE_TO_WIN) endGame(true);
    } else {
      lives--;
      updateLives();
      playerEl.classList.add('hit');
      setTimeout(() => playerEl.classList.remove('hit'), 400);
      spawnFloatText('💔 -1', true);
      showDialog(pick(SAD_LINES));
      if (lives <= 0) endGame(false);
    }
  }

  function updateLives() {
    livesEl.textContent = '❤️'.repeat(Math.max(0, lives)) + '🖤'.repeat(Math.max(0, 3 - lives));
  }

  // ----------------------------------------------------------
  // Efek
  // ----------------------------------------------------------
  function spawnFloatText(text, negative) {
    const ft = document.createElement('div');
    ft.className = 'floatText' + (negative ? ' negative' : '');
    ft.textContent = text;
    ft.style.left = playerX + 'px';
    ft.style.top = (PLAYER_Y - 10) + 'px';
    ft.style.transform = 'translateX(-50%)';
    gameWrap.appendChild(ft);
    setTimeout(() => ft.remove(), 1000);
  }

  function spawnBgHeart() {
    const h = document.createElement('div');
    h.className = 'bgHeart';
    h.textContent = pick(['💛', '💖', '🧡', '💕']);
    h.style.left = Math.random() * window.innerWidth + 'px';
    h.style.top = (window.innerHeight - 100) + 'px';
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 4000);
  }

  function showDialog(text) {
    dialogEl.textContent = '"' + text + '"';
    dialogEl.classList.add('show');
    clearTimeout(dialogTimeout);
    dialogTimeout = setTimeout(() => dialogEl.classList.remove('show'), 2200);
  }

  // ----------------------------------------------------------
  // Status game
  // ----------------------------------------------------------
  function startGame() {
    clearItems();
    score = 0;
    lives = 3;
    scoreEl.textContent = '0';
    updateLives();
    setPlayerX(GAME_W / 2);
    running = true;
    lastSpawn = 0;
    lastFrame = 0;
    dialogEl.classList.remove('show');

    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(loop);
  }

  function endGame(won) {
    running = false;
    if (rafId) cancelAnimationFrame(rafId);
    clearItems();
    saveBest();

    const home = '<a class="home-link" href="../../">← Pilih game lain</a>';
    if (won) {
      showOverlay(`
        <h2>💖 CINTA BERHASIL! 💖</h2>
        <div class="big-emoji">🧀💛🍫</div>
        <p>Keju dan Coklat akhirnya meleleh dalam pelukan cinta!</p>
        <p style="font-style:italic; font-size:.8rem;">"Kamu adalah coklat terbaik dalam hidupku... literally."</p>
        <p>Skor akhir: <b>${score}</b> hati 💛</p>
        <button id="againBtn">Main Lagi 🔄</button>${home}
      `);
    } else {
      showOverlay(`
        <h2>💔 Cinta Berakhir... 💔</h2>
        <div class="big-emoji">😭🧀</div>
        <p>Keju gagal menangkap cinta Coklat Boy...</p>
        <p style="font-style:italic; font-size:.8rem;">"Hatiku hancur seperti keju yang dijatuhkan..."</p>
        <p>Skor akhir: <b>${score}</b> hati 💛</p>
        <button id="againBtn">Coba Lagi 💪</button>${home}
      `);
    }
    $('againBtn').onclick = () => { hideOverlay(); startGame(); };
  }

  function showOverlay(html) { modalEl.innerHTML = html; overlayEl.classList.add('show'); }
  function hideOverlay() { overlayEl.classList.remove('show'); }

  // ----------------------------------------------------------
  // Input
  // ----------------------------------------------------------
  function pointerToX(clientX) {
    return clientX - gameWrap.getBoundingClientRect().left;
  }

  gameWrap.addEventListener('mousemove', e => { if (running) setPlayerX(pointerToX(e.clientX)); });
  ['touchstart', 'touchmove'].forEach(type => {
    gameWrap.addEventListener(type, e => {
      if (running) setPlayerX(pointerToX(e.touches[0].clientX));
    }, { passive: true });
  });

  document.addEventListener('keydown', e => {
    const k = e.key.toLowerCase();
    if (['arrowleft', 'arrowright', 'a', 'd'].includes(k)) {
      e.preventDefault();
      keysDown[k] = true;
    }
  });
  document.addEventListener('keyup', e => { keysDown[e.key.toLowerCase()] = false; });

  // ----------------------------------------------------------
  // Mulai
  // ----------------------------------------------------------
  setPlayerX(playerX);
  const best = Progress.get(GAME_ID).best;
  showOverlay(`
    <h2>🧀 Coklat & Keju 🍫</h2>
    <div class="big-emoji">💛💖💛</div>
    <p>Bantu Keju menangkap cinta Coklat Boy yang berjatuhan dari langit!</p>
    <p style="font-size:.78rem; opacity:.75;">Tangkap 💛 💖 🍫 🧀 &nbsp;•&nbsp; Hindari 💣 💔 🥦</p>
    <p style="font-size:.75rem; opacity:.7;">Kumpulkan <b>${SCORE_TO_WIN}</b> hati untuk menang. Kamu punya 3 nyawa ❤️${best ? `<br>Skor terbaikmu: <b>${best}</b>` : ''}</p>
    <button id="startBtn">Mulai Menangkap Cinta 💘</button>
  `);
  $('startBtn').onclick = () => { hideOverlay(); startGame(); };
})();
