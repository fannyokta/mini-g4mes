// Penyimpanan progres per game di localStorage (dipakai game & landing page).
// Bentuk data: { stars: { [levelIdx]: 1..3 }, total: jumlahLevel, best?: skorTerbaik }

window.Progress = (function () {
  const PREFIX = 'mini-g4mes:';

  function get(gameId) {
    try {
      const raw = JSON.parse(localStorage.getItem(PREFIX + gameId));
      if (raw && raw.stars) return raw;
    } catch (e) { /* storage diblok / data rusak */ }
    return { stars: {}, total: 0 };
  }

  function set(gameId, data) {
    try { localStorage.setItem(PREFIX + gameId, JSON.stringify(data)); } catch (e) { /* abaikan */ }
  }

  function summary(gameId) {
    const p = get(gameId);
    const done = Object.keys(p.stars).length;
    const stars = Object.values(p.stars).reduce((a, b) => a + b, 0);
    return { done, total: p.total, stars, best: p.best || 0 };
  }

  return { get, set, summary };
})();
