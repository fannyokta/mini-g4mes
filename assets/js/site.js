// Landing page: render kartu dari window.GAMES, pencarian, filter, dan tombol acak.

(function () {
  const grid = document.getElementById('grid');
  const chipsEl = document.getElementById('chips');
  const searchEl = document.getElementById('search');
  const emptyEl = document.getElementById('empty');
  const randomBtn = document.getElementById('random');

  const state = { tag: 'Semua', query: '' };
  const playable = () => GAMES.filter(g => g.status === 'ready');

  function el(tag, props = {}, children = []) {
    const node = Object.assign(document.createElement(tag), props);
    children.forEach(c => node.append(c));
    return node;
  }

  function progressBlock(game) {
    const { done, stars, best } = Progress.summary(game.id);
    if (best) return el('div', { className: 'progress', textContent: `🏆 ${game.bestLabel || 'Skor terbaik'}: ${best}${game.bestSuffix || ''}` });
    if (!done) return null;
    const total = game.levels || done;
    const bar = el('div', { className: 'bar' }, [el('i')]);
    bar.firstChild.style.width = Math.round((done / total) * 100) + '%';
    return el('div', { className: 'progress' }, [`${done}/${total} ${game.unit || 'level'} · ⭐ ${stars}`, bar]);
  }

  function buildCard(game) {
    const ready = game.status === 'ready';
    const body = el('div', { className: 'body' }, [
      el('span', { className: 'tag', textContent: ready ? game.tags.join(' · ').toUpperCase() : 'SEGERA' }),
      el('h3', { textContent: game.title }),
      el('p', { textContent: game.desc })
    ]);
    if (ready) {
      const prog = progressBlock(game);
      if (prog) body.append(prog);
      const label = prog ? '▶ Lanjut Main' : '▶ Main Sekarang';
      body.append(el('a', { className: 'play', href: `games/${game.id}/`, textContent: label }));
    }
    const card = el('article', { className: 'card ' + (ready ? 'playable' : 'soon'), id: 'game-' + game.id }, [
      el('div', { className: 'thumb', textContent: game.emoji }),
      body
    ]);
    card.querySelector('.thumb').setAttribute('aria-hidden', 'true');
    card.dataset.id = game.id;
    if (game.color) card.style.setProperty('--accent', game.color);
    return card;
  }

  function matches(game) {
    const q = state.query.trim().toLowerCase();
    const filtering = q || state.tag !== 'Semua';
    // placeholder "segera" cuma tampil saat tidak ada filter/pencarian
    if (game.status !== 'ready') return !filtering;
    if (state.tag !== 'Semua' && !game.tags.includes(state.tag)) return false;
    return !q || (game.title + ' ' + game.desc + ' ' + game.tags.join(' ')).toLowerCase().includes(q);
  }

  function applyFilter() {
    let shown = 0;
    grid.querySelectorAll('.card').forEach(card => {
      const game = GAMES.find(g => g.id === card.dataset.id);
      const ok = matches(game);
      card.hidden = !ok;
      if (ok) shown++;
    });
    emptyEl.hidden = shown > 0;
  }

  function buildChips() {
    const tags = ['Semua', ...new Set(playable().flatMap(g => g.tags))];
    tags.forEach(tag => {
      const chip = el('button', { className: 'chip', type: 'button', textContent: tag });
      chip.dataset.tag = tag;
      chip.setAttribute('aria-pressed', String(tag === state.tag));
      chipsEl.append(chip);
    });
  }

  chipsEl.addEventListener('click', e => {
    const chip = e.target.closest('.chip');
    if (!chip) return;
    state.tag = chip.dataset.tag;
    chipsEl.querySelectorAll('.chip').forEach(c => c.setAttribute('aria-pressed', String(c === chip)));
    applyFilter();
  });

  searchEl.addEventListener('input', () => {
    state.query = searchEl.value;
    applyFilter();
  });

  // Acak: sorot satu game lalu langsung buka
  randomBtn.addEventListener('click', () => {
    const pool = playable();
    const pick = pool[Math.floor(Math.random() * pool.length)];
    if (!pick) return;
    const card = document.getElementById('game-' + pick.id);
    card.hidden = false;
    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    card.classList.remove('pop');
    void card.offsetWidth; // restart animasi
    card.classList.add('pop');
    setTimeout(() => { location.href = `games/${pick.id}/`; }, 900);
  });

  GAMES.forEach(g => grid.append(buildCard(g)));
  buildChips();
  applyFilter();
})();
