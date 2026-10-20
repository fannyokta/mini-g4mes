// Chattingan: satu game, beberapa episode.
// Tiap episode didaftarkan dari eps/*.js ke window.CHAT_EPISODES (urutan = urutan di menu).

ChatGame.create({
  id: 'chattingan',
  title: 'Chattingan',
  subtitle: '"Dia ngetik... lalu berhenti... lalu ngetik lagi."',
  episodes: window.CHAT_EPISODES
});
