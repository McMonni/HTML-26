const STORAGE_KEY = "blackjack-stats";

export function loadStats() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : { wins: 0, losses: 0, ties: 0 };
  } catch {
    return { wins: 0, losses: 0, ties: 0 };
  }
}

export function saveStats(stats) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
}