// Keju & Coklat: Petualangan Cinta
// Butuh: levels.js (window.CHOCO_LEVELS) dan assets/js/progress.js (window.Progress)

(function () {
  const GAME_ID = 'choco-cheese';
  const LEVELS = window.CHOCO_LEVELS;
  const CELL_PX = 38;
  const DIRS = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };
  const KEY_DIRS = {
    arrowup: 'up', w: 'up',
    arrowdown: 'down', s: 'down',
    arrowleft: 'left', a: 'left',
    arrowright: 'right', d: 'right'
  };

  const $ = id => document.getElementById(id);
  const boardEl = $('board');
  const dialogEl = $('dialog');
  const overlayEl = $('overlay');
  const modalEl = $('modal');
  const stepsEl = $('steps');
  const keysEl = $('keys');
  const keysNeedEl = $('keysNeed');
  const starsEl = $('stars');
  const lvlNumEl = $('lvlNum');
  const lvlTotalEl = $('lvlTotal');
  const errorBanner = $('errorBanner');

  // ----------------------------------------------------------
  // Validator: BFS dari P. Pintu 'D' dianggap dinding sampai
  // semua kunci terkumpul. Dua skenario:
  //   1. Sebelum ambil kunci: P harus bisa mencapai semua K
  //   2. Setelah ambil semua kunci: P harus bisa mencapai C
  // ----------------------------------------------------------
  function validateLevel(level, idx) {
    const map = level.map;
    const rows = map.length, cols = map[0].length;
    const label = `Level ${idx + 1} (${level.name})`;
    let start = null, goalPos = null;
    const keyPositions = [];

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const ch = map[y][x];
        if (ch === 'P') start = { x, y };
        if (ch === 'C') goalPos = { x, y };
        if (ch === 'K') keyPositions.push({ x, y });
      }
    }

    if (!start) return `${label}: tidak ada P!`;
    if (!goalPos) return `${label}: tidak ada C!`;
    if (keyPositions.length < level.keysNeeded) {
      return `${label}: butuh ${level.keysNeeded} kunci tapi cuma ada ${keyPositions.length} K!`;
    }

    function reachableFrom(from, isWall) {
      const seen = new Set([`${from.x},${from.y}`]);
      const queue = [from];
      while (queue.length) {
        const { x, y } = queue.shift();
        for (const [dx, dy] of Object.values(DIRS)) {
          const nx = x + dx, ny = y + dy;
          if (ny < 0 || ny >= rows || nx < 0 || nx >= cols) continue;
          if (seen.has(`${nx},${ny}`) || isWall(map[ny][nx])) continue;
          seen.add(`${nx},${ny}`);
          queue.push({ x: nx, y: ny });
        }
      }
      return seen;
    }

    const before = reachableFrom(start, ch => ch === '#' || ch === 'D');
    for (const k of keyPositions) {
      if (!before.has(`${k.x},${k.y}`)) return `${label}: kunci di (${k.x},${k.y}) TIDAK BISA dijangkau!`;
    }

    const after = reachableFrom(start, ch => ch === '#');
    if (!after.has(`${goalPos.x},${goalPos.y}`)) {
      return `${label}: coklat di (${goalPos.x},${goalPos.y}) TIDAK BISA dijangkau!`;
    }
    return null;
  }

  function auditLevels() {
    const errors = LEVELS.map(validateLevel).filter(Boolean);
    if (errors.length) {
      console.warn('⚠️ LEVEL BERMASALAH:\n' + errors.join('\n'));
      errorBanner.textContent = '⚠️ ' + errors.join(' | ');
      errorBanner.classList.add('show');
    } else {
      console.log('✅ Semua level valid — kunci & coklat bisa dijangkau!');
    }
  }

  // ----------------------------------------------------------
  // State
  // ----------------------------------------------------------
  let board, player, goal, doors, keys;
  let currentLevel = 0;
  let steps = 0;
  let keysCollected = 0;
  let keysNeeded = 0;
  let animating = false;
  let gameComplete = false;

  // Progres tersimpan: { stars: { "0": 3, "1": 2 }, ... } -> dibaca landing page
  function saveStars(levelIdx, stars) {
    const saved = Progress.get(GAME_ID);
    const best = Math.max(stars, saved.stars[levelIdx] || 0);
    saved.stars[levelIdx] = best;
    saved.total = LEVELS.length;
    Progress.set(GAME_ID, saved);
  }

  function loadLevel(idx) {
    const level = LEVELS[idx];
    board = [];
    player = null; goal = null;
    doors = []; keys = [];
    keysCollected = 0;
    keysNeeded = level.keysNeeded;
    steps = 0;
    animating = false;

    level.map.forEach((row, y) => {
      board[y] = [];
      row.split('').forEach((ch, x) => {
        if (ch === 'P') { player = { x, y }; board[y][x] = '.'; }
        else if (ch === 'C') { goal = { x, y }; board[y][x] = 'C'; }
        else if (ch === 'K') { keys.push({ x, y }); board[y][x] = 'K'; }
        else if (ch === 'D') { doors.push({ x, y, open: false }); board[y][x] = 'D'; }
        else board[y][x] = ch;
      });
    });

    lvlNumEl.textContent = idx + 1;
    lvlTotalEl.textContent = LEVELS.length;
    updateHUD();
    render();
    showDialog(level.intro);
  }

  // ----------------------------------------------------------
  // Render & HUD
  // ----------------------------------------------------------
  function render() {
    const rows = board.length, cols = board[0].length;
    boardEl.style.gridTemplateColumns = `repeat(${cols}, ${CELL_PX}px)`;
    boardEl.innerHTML = '';

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        const tile = board[y][x];

        if (tile === '#') {
          cell.classList.add('wall');
        } else if (tile === 'D') {
          const door = doors.find(d => d.x === x && d.y === y);
          cell.classList.add(door.open ? 'floor' : 'door');
          if (!door.open) cell.textContent = '🚪';
        } else if (tile === 'K') {
          const hasKey = keys.some(k => k.x === x && k.y === y);
          cell.classList.add(hasKey ? 'key-item' : 'floor');
          if (hasKey) cell.textContent = '🔑';
        } else if (tile === 'X') {
          cell.classList.add('heartbreak');
          cell.textContent = '💔';
        } else if (tile === 'C') {
          cell.classList.add('goal');
          if (keysCollected < keysNeeded) cell.classList.add('locked');
          cell.textContent = '🍫';
        } else {
          cell.classList.add('floor');
        }

        if (player.x === x && player.y === y) {
          cell.textContent = '🧀';
          cell.classList.add('player');
        }
        boardEl.appendChild(cell);
      }
    }
  }

  function calculateStars() {
    if (steps === 0) return 0;
    const par = LEVELS[currentLevel].par;
    if (steps <= par) return 3;
    if (steps <= par * 1.5) return 2;
    return 1;
  }

  function updateHUD() {
    stepsEl.textContent = steps;
    keysEl.textContent = keysCollected;
    keysNeedEl.textContent = keysNeeded;
    const stars = calculateStars();
    starsEl.textContent = '★'.repeat(stars) + '☆'.repeat(3 - stars);
  }

  function openAllDoors() {
    if (keysCollected >= keysNeeded) {
      doors.forEach(d => { d.open = true; });
      render();
    }
  }

  function showDialog(d) {
    if (!d) return;
    const emoji = { Keju: '🧀', Coklat: '🍫' }[d.who] || '';
    dialogEl.innerHTML = `<b>${emoji} ${d.who}:</b> <span style="opacity:.85">"${d.text}"</span>`;
    dialogEl.style.opacity = 0;
    setTimeout(() => { dialogEl.style.opacity = 1; }, 30);
  }

  // ----------------------------------------------------------
  // Gerak
  // ----------------------------------------------------------
  function move(dx, dy) {
    if (animating || gameComplete) return;
    const nx = player.x + dx;
    const ny = player.y + dy;
    if (!board[ny] || board[ny][nx] === '#') return;

    const target = board[ny][nx];

    if (target === 'D') {
      const door = doors.find(d => d.x === nx && d.y === ny);
      if (!door.open) {
        if (keysCollected < keysNeeded) {
          showDialog({ who: 'Keju', text: 'Pintunya terkunci... aku masih butuh kunci 🔑' });
          return;
        }
        door.open = true;
      }
    }

    if (target === 'X') {
      animating = true;
      steps++;
      player.x = nx; player.y = ny;
      render();
      showDialog({ who: 'Keju', text: 'Aduh! 💔 Hatiku patah... aku harus coba lagi dari awal level.' });
      spawnEmoji(nx, ny, '💔');
      setTimeout(() => {
        loadLevel(currentLevel);
        showDialog({ who: 'Keju', text: 'Oke, tarik napas... coba lagi!' });
      }, 900);
      return;
    }

    if (target === 'K') {
      const keyIdx = keys.findIndex(k => k.x === nx && k.y === ny);
      if (keyIdx >= 0) {
        keys.splice(keyIdx, 1);
        board[ny][nx] = '.';
        keysCollected++;
        spawnEmoji(nx, ny, '🔑');
        showDialog({ who: 'Keju', text: 'Dapat kunci! Ternyata membuka hati itu perlu usaha~ 🔑' });
        openAllDoors();
      }
    }

    player.x = nx;
    player.y = ny;
    steps++;
    updateHUD();
    render();

    if (player.x === goal.x && player.y === goal.y) {
      if (keysCollected < keysNeeded) {
        showDialog({ who: 'Keju', text: 'Coklatnya masih terkunci... aku harus cari kunci dulu!' });
        player.x = nx - dx;
        player.y = ny - dy;
        render();
        return;
      }
      winLevel();
    }
  }

  // ----------------------------------------------------------
  // Menang
  // ----------------------------------------------------------
  function winLevel() {
    animating = true;
    const level = LEVELS[currentLevel];
    const stars = calculateStars();
    saveStars(currentLevel, stars);
    ['💖', '💛', '🧡'].forEach(e => spawnEmoji(player.x, player.y, e));
    showDialog(level.win);

    setTimeout(() => {
      if (currentLevel < LEVELS.length - 1) {
        showOverlay(`
          <h2>🎉 Level Selesai!</h2>
          <div class="big-stars">${'★'.repeat(stars)}${'☆'.repeat(3 - stars)}</div>
          <p>Langkah: <b>${steps}</b> (par: ${level.par})</p>
          <p style="font-style:italic; font-size:.82rem;">"${level.win.text}"</p>
          <button id="nextBtn">Lanjut ke Level ${currentLevel + 2} ▶</button>
        `);
        $('nextBtn').onclick = () => {
          hideOverlay();
          currentLevel++;
          loadLevel(currentLevel);
        };
      } else {
        gameComplete = true;
        showOverlay(`
          <h2>💖 Tamat 💖</h2>
          <div class="big-stars">🧀💛🍫</div>
          <p>Keju dan Coklat Boy akhirnya bersatu setelah melewati semua rintangan.</p>
          <p style="font-style:italic; font-size:.85rem;">"Pelukan kita hangat seperti coklat cair..."</p>
          <button id="restartBtn">Main Lagi 🔄</button>
          <a class="home-link" href="../../">← Pilih game lain</a>
        `);
        $('restartBtn').onclick = () => {
          hideOverlay();
          gameComplete = false;
          currentLevel = 0;
          loadLevel(0);
        };
      }
    }, 1400);
  }

  function showOverlay(html) { modalEl.innerHTML = html; overlayEl.classList.add('show'); }
  function hideOverlay() { overlayEl.classList.remove('show'); }

  // ----------------------------------------------------------
  // Efek
  // ----------------------------------------------------------
  function spawnEmoji(gridX, gridY, emoji) {
    const cell = boardEl.children[gridY * board[0].length + gridX];
    if (!cell) return;
    const rect = cell.getBoundingClientRect();
    for (let i = 0; i < 4; i++) {
      const e = document.createElement('div');
      e.className = 'float-emoji';
      e.textContent = emoji;
      e.style.left = (rect.left + rect.width / 2 - 10 + (Math.random() - 0.5) * 30) + 'px';
      e.style.top = (rect.top + rect.height / 2 - 10) + 'px';
      document.body.appendChild(e);
      setTimeout(() => e.remove(), 2100);
    }
  }

  // ----------------------------------------------------------
  // Input
  // ----------------------------------------------------------
  function moveDir(dir) { if (dir) move(...DIRS[dir]); }

  document.querySelectorAll('.controls button').forEach(btn => {
    btn.addEventListener('click', () => moveDir(btn.dataset.dir));
  });

  document.addEventListener('keydown', e => {
    const dir = KEY_DIRS[e.key.toLowerCase()];
    if (!dir) return;
    e.preventDefault();
    moveDir(dir);
  });

  let touchStart = null;
  boardEl.addEventListener('touchstart', e => {
    touchStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, { passive: true });

  boardEl.addEventListener('touchend', e => {
    if (!touchStart) return;
    const dx = e.changedTouches[0].clientX - touchStart.x;
    const dy = e.changedTouches[0].clientY - touchStart.y;
    touchStart = null;
    if (Math.abs(dx) < 20 && Math.abs(dy) < 20) return;
    if (Math.abs(dx) > Math.abs(dy)) moveDir(dx > 0 ? 'right' : 'left');
    else moveDir(dy > 0 ? 'down' : 'up');
  }, { passive: true });

  // ----------------------------------------------------------
  // Mulai
  // ----------------------------------------------------------
  auditLevels();
  loadLevel(0);
})();
