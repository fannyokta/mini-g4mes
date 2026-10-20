// Engine game chat berepisode. Satu halaman, banyak episode.
// Butuh: assets/js/progress.js (window.Progress)
//
// ChatGame.create({ id, title, subtitle, episodes: [episode, ...] })
//
// episode:
//   num?, name, tagline, emoji, theme ('pink'|'blue'|'purple')
//   title, subtitle, bgEmojis[]
//   contact: { name, avatar, status }       nama pengirim dipakai di semua bubble
//   player                                  nama pengirim pemain
//   meterLabel?                             label bar utama (default '💖 BAPER')
//   systemIntro?                            teks system di awal chat
//   opening: string | string[]              chat pembuka
//   chats: [{ text: string|string[], choices: [3 x {text, baper, risk?, tag?, reaksi: string|string[]}] }]
//   risk?: { pills:[{min, cls, text}], warnAt, warnText, flash, gameOver(state) }
//   start: { title, emoji, html, button }   layar awal episode
//   scoreLine(state) -> string
//   finish(state) -> { title, emoji, message, quote?, gelar? }
//
// state: { baper, risk, counts: { [tag]: n } }
//   tag otomatis: 'mandiri' (baper >= 15), 'manja' (baper < 0), 'biasa'; atau isi lewat choice.tag
//
// Progres tersimpan: stars[idxEpisode] = 1..3 (dari baper akhir), eps[idxEpisode] = baper tertinggi

window.ChatGame = (function () {
  const pick = list => list[Math.floor(Math.random() * list.length)];
  const lines = x => (Array.isArray(x) ? x : [x]);
  const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));
  const ratingFor = baper => (baper >= 80 ? 3 : baper >= 50 ? 2 : 1);

  function create(cfg) {
    const app = document.getElementById('app');

    app.innerHTML = `
      <a class="back" href="../../">← Semua game</a>
      <h1 id="title"></h1>
      <div class="sub" id="subtitle"></div>
      <div class="riskBar" id="riskBar"><div class="riskPill" id="riskPill"></div></div>
      <div id="phone">
        <div class="chatHeader">
          <div class="avatar" id="avatar"></div>
          <div class="info">
            <div class="name" id="contactName"></div>
            <div class="status"><span class="dot"></span> <span id="contactStatus"></span></div>
          </div>
          <button class="epMenu" id="epMenu" type="button" aria-label="Pilih episode">☰ Eps</button>
        </div>
        <div class="baperBar">
          <span class="label" id="meterLabel"></span>
          <div class="track"><div id="baperFill"></div></div>
          <span id="baperValue">0%</span>
        </div>
        <div class="chatArea" id="chatArea"></div>
        <div class="choices" id="choices"></div>
      </div>
      <div class="dangerFlash" id="dangerFlash"></div>
      <div class="overlay" id="overlay"><div class="modal" id="modal"></div></div>`;

    const $ = id => document.getElementById(id);
    const chatArea = $('chatArea');
    const choicesEl = $('choices');
    const baperFill = $('baperFill');
    const baperValue = $('baperValue');
    const overlayEl = $('overlay');
    const modalEl = $('modal');
    const riskPill = $('riskPill');
    const riskBar = $('riskBar');
    const dangerFlash = $('dangerFlash');

    let ep = null, epIdx = -1;
    let state, currentChat, waitingForChoice = false;
    let session = 0; // naik tiap ganti episode/menu, supaya timer lama tidak ikut jalan

    // ---------- background ----------
    setInterval(() => {
      const h = document.createElement('div');
      h.className = 'bgItem';
      h.textContent = pick(ep ? ep.bgEmojis : ['💛', '🍫', '🧀', '💬']);
      h.style.left = Math.random() * window.innerWidth + 'px';
      h.style.animationDuration = (4 + Math.random() * 3) + 's';
      h.style.fontSize = (0.9 + Math.random()) + 'rem';
      document.body.appendChild(h);
      setTimeout(() => h.remove(), 5500);
    }, 750);

    // ---------- chat ----------
    function scroll() { chatArea.scrollTop = chatArea.scrollHeight; }

    function addBubble(text, side, sender) {
      const b = document.createElement('div');
      b.className = 'bubble ' + side;
      if (sender) {
        const s = document.createElement('div');
        s.className = 'sender';
        s.textContent = sender;
        b.appendChild(s);
      }
      b.appendChild(document.createTextNode(text));
      chatArea.appendChild(b);
      scroll();
    }

    function addSystem(text) {
      const b = document.createElement('div');
      b.className = 'bubble system';
      b.textContent = text;
      chatArea.appendChild(b);
      scroll();
    }

    function showTyping() {
      const t = document.createElement('div');
      t.className = 'typing';
      t.id = 'typingIndicator';
      t.innerHTML = '<span></span><span></span><span></span>';
      chatArea.appendChild(t);
      scroll();
    }

    function hideTyping() {
      const t = $('typingIndicator');
      if (t) t.remove();
    }

    // Kirim beberapa bubble berurutan dari kontak, lalu panggil done()
    function say(textOrLines, done) {
      const sid = session;
      const queue = lines(textOrLines).slice();
      (function next(first) {
        if (sid !== session) return;
        if (!queue.length) return done && done();
        showTyping();
        setTimeout(() => {
          if (sid !== session) return;
          hideTyping();
          addBubble(queue.shift(), 'left', ep.contact.name);
          setTimeout(() => next(false), queue.length ? 250 : 0);
        }, first ? 900 + Math.random() * 500 : 600 + Math.random() * 300);
      })(true);
    }

    // ---------- meter ----------
    function updateBaper() {
      baperFill.style.width = state.baper + '%';
      baperValue.textContent = state.baper + '%';
    }

    function updateRiskPill() {
      if (!ep.risk) return;
      const pill = ep.risk.pills.filter(p => state.risk >= p.min).pop();
      riskPill.className = 'riskPill ' + pill.cls;
      riskPill.textContent = pill.text;
    }

    function floatEmoji(emoji, negative) {
      const rect = $('phone').getBoundingClientRect();
      for (let i = 0; i < 3; i++) {
        const e = document.createElement('div');
        e.className = 'floatEmoji';
        e.textContent = emoji;
        e.style.left = (rect.left + rect.width / 2 + (Math.random() - 0.5) * 120) + 'px';
        e.style.top = (rect.top + rect.height / 2) + 'px';
        if (negative) e.style.animationDuration = '1.2s';
        document.body.appendChild(e);
        setTimeout(() => e.remove(), 1600);
      }
    }

    // ---------- progres ----------
    function saveProgress() {
      const saved = Progress.get(cfg.id);
      saved.eps = saved.eps || {};
      saved.stars[epIdx] = Math.max(saved.stars[epIdx] || 0, ratingFor(state.baper));
      saved.eps[epIdx] = Math.max(saved.eps[epIdx] || 0, state.baper);
      saved.total = cfg.episodes.length;
      Progress.set(cfg.id, saved);
    }

    function epStats(i) {
      const saved = Progress.get(cfg.id);
      const stars = saved.stars[i];
      if (!stars) return '';
      return '★'.repeat(stars) + '☆'.repeat(3 - stars) + ' · ' + ((saved.eps || {})[i] || 0) + '%';
    }

    // ---------- layar ----------
    function showOverlay(html) { modalEl.innerHTML = html; overlayEl.classList.add('show'); }
    function hideOverlay() { overlayEl.classList.remove('show'); }

    // Menu pilih episode
    function showSelect() {
      session++;
      ep = null; epIdx = -1;
      document.body.className = 'theme-pink';
      document.title = cfg.title;
      $('title').textContent = '💬 ' + cfg.title;
      $('subtitle').textContent = cfg.subtitle;
      $('avatar').textContent = '💬';
      $('contactName').textContent = cfg.title;
      $('contactStatus').textContent = 'pilih episode dulu';
      $('meterLabel').textContent = '💖 BAPER';
      riskBar.style.display = 'none';
      chatArea.innerHTML = '';
      choicesEl.innerHTML = '';
      baperFill.style.width = '0%';
      baperValue.textContent = '0%';

      const items = cfg.episodes.map((e, i) => `
        <button class="epBtn" data-i="${i}" type="button">
          <span class="epEmoji">${e.emoji}</span>
          <span class="epText">
            <small>EPS ${i + 1}</small>
            <b>${e.name}</b>
            <em>${e.tagline}</em>
            <span class="epStat">${epStats(i)}</span>
          </span>
        </button>`).join('');

      showOverlay(`
        <h2>💬 ${cfg.title}</h2>
        <p>Pilih episode kamu.</p>
        <div class="epList">${items}</div>
        <a class="home-link" href="../../">← Pilih game lain</a>
      `);
      modalEl.querySelectorAll('.epBtn').forEach(btn => {
        btn.onclick = () => loadEpisode(Number(btn.dataset.i));
      });
    }

    // Masuk ke satu episode (layar awal episode)
    function loadEpisode(i) {
      session++;
      epIdx = i;
      ep = cfg.episodes[i];
      state = { baper: 0, risk: 0, counts: {} };
      waitingForChoice = false;

      document.body.className = 'theme-' + ep.theme;
      document.title = `${cfg.title} · Eps ${i + 1}`;
      $('title').innerHTML = ep.title;
      $('subtitle').innerHTML = ep.subtitle;
      $('avatar').textContent = ep.contact.avatar;
      $('contactName').textContent = ep.contact.name;
      $('contactStatus').textContent = ep.contact.status;
      $('meterLabel').textContent = ep.meterLabel || '💖 BAPER';
      riskBar.style.display = ep.risk ? '' : 'none';
      chatArea.innerHTML = '';
      choicesEl.innerHTML = '';
      updateBaper();
      if (ep.risk) {
        riskPill.className = 'riskPill ' + ep.risk.pills[0].cls;
        riskPill.textContent = ep.risk.pills[0].text;
      }

      const best = ((Progress.get(cfg.id).eps) || {})[i];
      showOverlay(`
        <h2>${ep.start.title}</h2>
        <div class="big-emoji">${ep.start.emoji}</div>
        ${ep.start.html}
        ${best ? `<p style="font-size:.75rem;">Baper tertinggimu: <b>${best}%</b></p>` : ''}
        <button id="startBtn">${ep.start.button}</button>
        <button class="ghost" id="menuBtn">☰ Pilih episode</button>
      `);
      $('startBtn').onclick = () => { hideOverlay(); startChat(); };
      $('menuBtn').onclick = showSelect;
    }

    // ---------- alur ----------
    function startChat() {
      session++;
      state = { baper: 0, risk: 0, counts: {} };
      currentChat = 0;
      waitingForChoice = false;
      chatArea.innerHTML = '';
      choicesEl.innerHTML = '';
      updateBaper();
      updateRiskPill();
      if (ep.systemIntro) addSystem(ep.systemIntro);
      const sid = session;
      say(ep.opening, () => setTimeout(() => { if (sid === session) nextChat(); }, 400));
    }

    function nextChat() {
      if (currentChat >= ep.chats.length) return finishGame();
      const chat = ep.chats[currentChat];
      choicesEl.innerHTML = '';
      say(chat.text, () => showChoices(chat));
    }

    function showChoices(chat) {
      choicesEl.innerHTML = '';
      waitingForChoice = true;
      [0, 1, 2].sort(() => Math.random() - 0.5).forEach((idx, displayIdx) => {
        const c = chat.choices[idx];
        const btn = document.createElement('button');
        btn.className = 'choiceBtn';
        const num = document.createElement('span');
        num.className = 'num';
        num.textContent = displayIdx + 1;
        btn.append(num, c.text);
        btn.onclick = () => chooseAnswer(c);
        choicesEl.appendChild(btn);
      });
    }

    function chooseAnswer(choice) {
      if (!waitingForChoice) return;
      waitingForChoice = false;
      const sid = session;
      addBubble(choice.text, 'right', ep.player);
      choicesEl.innerHTML = '';

      const tag = choice.tag || (choice.baper >= 15 ? 'mandiri' : choice.baper < 0 ? 'manja' : 'biasa');
      state.counts[tag] = (state.counts[tag] || 0) + 1;

      const oldBaper = state.baper;
      const oldRisk = state.risk;
      state.baper = clamp(state.baper + choice.baper, 0, 100);
      state.risk = clamp(state.risk + (choice.risk || 0), 0, 100);
      updateBaper();
      updateRiskPill();

      if (ep.risk && ep.risk.flash && state.risk > oldRisk && state.risk >= 40) {
        dangerFlash.classList.add('show');
        setTimeout(() => dangerFlash.classList.remove('show'), 250);
      }

      if (choice.baper > 0) floatEmoji('💖', false);
      else if (choice.baper < 0) floatEmoji('💔', true);
      else floatEmoji('😐', true);

      if (state.baper > oldBaper) {
        baperFill.style.boxShadow = '0 0 12px var(--a2)';
        setTimeout(() => { baperFill.style.boxShadow = 'none'; }, 400);
      }

      say(choice.reaksi, () => {
        const warn = ep.risk && state.risk >= ep.risk.warnAt && oldRisk < ep.risk.warnAt;
        if (warn) addSystem(ep.risk.warnText);

        setTimeout(() => {
          if (sid !== session) return;
          if (ep.risk && state.risk >= 100) return endCard(ep.risk.gameOver(state), false);
          currentChat++;
          setTimeout(() => { if (sid === session) nextChat(); }, 900);
        }, 700);
      });
    }

    // ---------- ending ----------
    function finishGame() {
      choicesEl.innerHTML = '';
      saveProgress();
      endCard(ep.finish(state), true);
    }

    function endCard(end, completed) {
      choicesEl.innerHTML = '';
      const hasNext = completed && epIdx < cfg.episodes.length - 1;
      showOverlay(`
        <h2>${end.title}</h2>
        <div class="big-emoji">${end.emoji}</div>
        <p>${end.message}</p>
        ${end.quote ? `<p class="quote">"${end.quote}"</p>` : ''}
        <div class="scoreBig">${ep.scoreLine(state)}</div>
        ${end.gelar ? `<p class="gelar">${end.gelar}</p>` : ''}
        ${hasNext ? '<button id="nextBtn">Episode berikutnya ▶</button>' : ''}
        <button class="${hasNext ? 'ghost' : ''}" id="restartBtn">${completed ? 'Chat Lagi 🔄' : 'Coba Lagi 🔄'}</button>
        <button class="ghost" id="menuBtn">☰ Pilih episode</button>
        <a class="home-link" href="../../">← Pilih game lain</a>
      `);
      $('restartBtn').onclick = () => { hideOverlay(); startChat(); };
      $('menuBtn').onclick = showSelect;
      if (hasNext) $('nextBtn').onclick = () => loadEpisode(epIdx + 1);
    }

    $('epMenu').onclick = showSelect;
    showSelect();
  }

  return { create };
})();
