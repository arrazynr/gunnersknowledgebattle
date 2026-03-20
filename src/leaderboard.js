// ============================================================
// ARSENAL QUIZ — LEADERBOARD ENGINE
// Uses localStorage for persistence across sessions
// ============================================================

const LS_KEY = 'arsenal_quiz_leaderboard_v2'
const MAX_ENTRIES = 20

export function getRating(score, totalQuestions = 20) {
  const maxScore = totalQuestions * 130
  const pct = score / maxScore
  if (pct >= 0.88) return { label: 'WORLD CLASS',  color: '#FFD700', stars: 5, rank: 'S' }
  if (pct >= 0.72) return { label: 'TOP GUNNER',   color: '#EF0107', stars: 4, rank: 'A' }
  if (pct >= 0.52) return { label: 'SQUAD PLAYER', color: '#FF8C00', stars: 3, rank: 'B' }
  if (pct >= 0.32) return { label: 'YOUTH TEAM',   color: '#888888', stars: 2, rank: 'C' }
  return                  { label: 'NON-LEAGUE',   color: '#444444', stars: 1, rank: 'D' }
}

export function saveScore({ name, number, score, correct, maxStreak, difficulty }) {
  try {
    const board = getLeaderboard()
    const entry = {
      id: Date.now(),
      name: name.toUpperCase().slice(0, 12),
      number,
      score,
      correct,
      maxStreak,
      difficulty,
      rating: getRating(score).rank,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }),
    }
    const updated = [entry, ...board]
      .sort((a, b) => b.score - a.score)
      .slice(0, MAX_ENTRIES)
    localStorage.setItem(LS_KEY, JSON.stringify(updated))
    return updated.findIndex(e => e.id === entry.id) + 1 // return rank position
  } catch {
    return null
  }
}

export function getLeaderboard() {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) || '[]')
  } catch {
    return []
  }
}

export function clearLeaderboard() {
  localStorage.removeItem(LS_KEY)
}

// Seed with some fun fake Gooner entries so leaderboard isn't empty
export function seedLeaderboard() {
  const existing = getLeaderboard()
  if (existing.length > 0) return
  const seeds = [
    { name: 'WENGER OUT',   number: '7',  score: 2340, correct: 18, maxStreak: 8,  difficulty: 'Hard',   rank: 'S' },
    { name: 'INVINCIBLE',   number: '14', score: 2100, correct: 17, maxStreak: 7,  difficulty: 'Hard',   rank: 'S' },
    { name: 'BERGKAMP GOD', number: '10', score: 1950, correct: 16, maxStreak: 9,  difficulty: 'Hard',   rank: 'A' },
    { name: 'COYG 1886',    number: '9',  score: 1720, correct: 14, maxStreak: 5,  difficulty: 'Medium', rank: 'A' },
    { name: 'HENRY KING',   number: '12', score: 1560, correct: 13, maxStreak: 6,  difficulty: 'Medium', rank: 'A' },
    { name: 'NLD WINNER',   number: '17', score: 1340, correct: 11, maxStreak: 4,  difficulty: 'Medium', rank: 'B' },
    { name: 'PIRES FAN',    number: '7',  score: 1100, correct: 10, maxStreak: 3,  difficulty: 'Easy',   rank: 'B' },
    { name: 'GOONER4LIFE',  number: '29', score: 880,  correct: 8,  maxStreak: 3,  difficulty: 'Easy',   rank: 'C' },
  ]
  const seeded = seeds.map((s, i) => ({
    ...s,
    id: i + 1,
    date: '01 Jan',
    rating: s.rank,
  }))
  localStorage.setItem(LS_KEY, JSON.stringify(seeded))
}
