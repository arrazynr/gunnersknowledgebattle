// ============================================================
// ARSENAL FC QUIZ CHAMPIONSHIP — MAIN APP
// ============================================================

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from 'recharts'

import { useAudio } from './audio'
import { QUESTIONS, TRAITOR_NAMES, DIFFICULTY_COLORS } from './questions'
import {
  CannonSprite, JerseySprite, VARSprite, RedCardSprite,
  StarSprite, SpeakerIcon, TrophySprite, FootballSprite,
} from './sprites'
import {
  PixelText, PixelButton, PixelPanel, PixelProgressBar,
  TimerBar, PopupNotification, ScreenWrapper, PixelDivider, Marquee,
} from './components'
import StadiumBackground from './StadiumBackground'

const FONT = "'Press Start 2P', monospace"

// ============================================================
// WELCOME SCREEN
// ============================================================
function WelcomeScreen({ onStart, play }) {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen gap-5 px-4 py-10"
      style={{ paddingTop: 56 }}
    >
      {/* Title block */}
      <motion.div className="text-center"
        initial={{ y: -60, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}>
        <div className="flex justify-center mb-3">
          <CannonSprite size={110} glow pulse/>
        </div>
        <PixelText size="xl" color="#EF0107" glow>ARSENAL FC</PixelText>
        <div style={{ marginTop: 6 }}>
          <PixelText size="md" color="#C8A000">QUIZ CHAMPIONSHIP</PixelText>
        </div>
        <div style={{ marginTop: 4 }}>
          <PixelText size="xs" color="#555">8-BIT EDITION • SEASON 2024/25</PixelText>
        </div>
      </motion.div>

      <PixelDivider/>

      {/* Stats row */}
      <motion.div className="grid grid-cols-3 gap-3 w-full" style={{ maxWidth: 380 }}
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        {[
          { icon: <TrophySprite size={28}/>, label: '20 QS', sub: '5 Categories' },
          { icon: <FootballSprite size={24}/>, label: '30 SECS', sub: 'Per Question' },
          { icon: <VARSprite size={28}/>, label: '1 VAR', sub: 'Lifeline Each' },
        ].map((c, i) => (
          <motion.div key={i}
            style={{ background: 'rgba(0,0,0,0.7)', border: '2px solid #222', padding: '12px 8px', textAlign: 'center' }}
            whileHover={{ borderColor: '#EF0107', y: -2 }}>
            <div className="flex justify-center mb-1">{c.icon}</div>
            <div><PixelText size="xs" color="white">{c.label}</PixelText></div>
            <div style={{ marginTop: 3 }}><PixelText size="xs" color="#555">{c.sub}</PixelText></div>
          </motion.div>
        ))}
      </motion.div>

      {/* Press start blink */}
      <motion.div animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1.2, repeat: Infinity }}>
        <PixelText size="xs" color="#888">▼ CLICK TO ACTIVATE AUDIO ▼</PixelText>
      </motion.div>

      <motion.div className="flex flex-col items-center gap-3 w-full" style={{ maxWidth: 300 }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
        <PixelButton variant="primary" fullWidth onClick={() => { play('bloop'); onStart() }}
          onHover={() => play('blip')}>
          ▶ KICK OFF!
        </PixelButton>
        <PixelButton variant="secondary" fullWidth onHover={() => play('blip')}
          onClick={() => play('blip')}>
          ★ HOW TO PLAY
        </PixelButton>
      </motion.div>

      {/* Marquee */}
      <div className="absolute bottom-0 left-0 right-0">
        <Marquee text="⚽ ARSENAL FC ⚽ THE INVINCIBLES ⚽ 49 UNBEATEN ⚽ WENGER OUT ⚽ ARTETA IN ⚽ THIERRY HENRY ⚽ BERGKAMP ⚽ EMIRATES ⚽ COYG! ⚽ #WEAREARSENAL ⚽"/>
      </div>
    </div>
  )
}

// ============================================================
// SETUP SCREEN
// ============================================================
function SetupScreen({ onBack, onStart, play }) {
  const [name, setName] = useState('')
  const [number, setNumber] = useState('7')
  const [difficulty, setDifficulty] = useState('Medium')
  const [traitorAlert, setTraitorAlert] = useState(false)

  const checkName = (val) => {
    setName(val)
    if (TRAITOR_NAMES.some(t => val.toLowerCase().includes(t))) {
      play('alarm')
      setTraitorAlert(true)
      setTimeout(() => setTraitorAlert(false), 3000)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-6 gap-5"
      style={{ paddingTop: 60 }}>
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
        <PixelText size="lg" color="#EF0107">SQUAD SETUP</PixelText>
      </motion.div>

      <PixelPanel color="#EF0107" style={{ width: '100%', maxWidth: 400 }}>

        {/* Traitor alert */}
        <AnimatePresence>
          {traitorAlert && (
            <motion.div
              initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              style={{ background: '#330000', border: '2px solid #EF0107', padding: '8px 12px', marginBottom: 12,
                textAlign: 'center' }}>
              <PixelText size="xs" color="#EF0107">⚠ TRAITOR NAME DETECTED! ⚠</PixelText>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Name input */}
        <div style={{ marginBottom: 20 }}>
          <PixelText size="xs" color="#C8A000">PLAYER NAME:</PixelText>
          <input
            value={name}
            onChange={e => checkName(e.target.value)}
            placeholder="ENTER YOUR NAME..."
            maxLength={16}
            style={{
              width: '100%', marginTop: 8, background: '#0a0a0a',
              border: '2px solid #333', color: 'white', padding: '10px 10px',
              fontFamily: FONT, fontSize: '9px', outline: 'none',
              boxSizing: 'border-box',
            }}
            onFocus={e => e.target.style.borderColor = '#EF0107'}
            onBlur={e => e.target.style.borderColor = '#333'}
          />
          <div style={{ marginTop: 4 }}>
            <PixelText size="xs" color="#333">⚠ TRY TYPING A TRAITOR'S NAME...</PixelText>
          </div>
        </div>

        {/* Jersey number */}
        <div style={{ marginBottom: 20 }}>
          <PixelText size="xs" color="#C8A000">JERSEY NUMBER:</PixelText>
          <div className="flex gap-3 mt-2 flex-wrap">
            {['7', '9', '10', '14', '17', '29'].map(n => (
              <motion.div key={n}
                onClick={() => { setNumber(n); play('blip') }}
                style={{ cursor: 'pointer', border: `3px solid ${number === n ? '#EF0107' : 'transparent'}`,
                  opacity: number === n ? 1 : 0.5 }}
                whileHover={{ scale: 1.1, opacity: 1 }}
                whileTap={{ scale: 0.9 }}>
                <JerseySprite number={n} size={44} selected={number === n}/>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Difficulty */}
        <div style={{ marginBottom: 24 }}>
          <PixelText size="xs" color="#C8A000">DIFFICULTY:</PixelText>
          <div className="flex gap-2 mt-2">
            {['Easy', 'Medium', 'Hard'].map(d => (
              <motion.button key={d}
                onClick={() => { setDifficulty(d); play('blip') }}
                style={{
                  flex: 1, padding: '8px 4px', fontFamily: FONT, fontSize: '8px',
                  background: difficulty === d ? DIFFICULTY_COLORS[d] + '22' : '#0a0a0a',
                  border: `2px solid ${difficulty === d ? DIFFICULTY_COLORS[d] : '#333'}`,
                  color: difficulty === d ? DIFFICULTY_COLORS[d] : '#666',
                  cursor: 'pointer',
                }}
                whileHover={{ borderColor: DIFFICULTY_COLORS[d], color: DIFFICULTY_COLORS[d] }}>
                {d}
              </motion.button>
            ))}
          </div>
        </div>

        <PixelButton variant="primary" fullWidth disabled={!name.trim()}
          onClick={() => { play('whistle'); setTimeout(() => onStart({ name, number, difficulty }), 100) }}
          onHover={() => play('blip')}>
          ⚽ KICK OFF! ⚽
        </PixelButton>
      </PixelPanel>

      <PixelButton variant="secondary" onClick={() => { play('blip'); onBack() }}
        onHover={() => play('blip')}>
        ← BACK
      </PixelButton>
    </div>
  )
}

// ============================================================
// GAME SCREEN
// ============================================================
function GameScreen({ player, onEnd, play }) {
  const [currentQ, setCurrentQ] = useState(0)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState([])
  const [selected, setSelected] = useState(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)
  const [varUsed, setVarUsed] = useState(false)
  const [varActive, setVarActive] = useState(false)
  const [eliminated, setEliminated] = useState([])
  const [popup, setPopup] = useState(null)
  const [streak, setStreak] = useState(0)
  const [maxStreak, setMaxStreak] = useState(0)
  const timerRef = useRef(null)

  const q = QUESTIONS[currentQ]
  const LABELS = ['A', 'B', 'C', 'D']

  // Timer
  useEffect(() => {
    if (showFeedback) return
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(timerRef.current); handleAnswer(-1); return 0 }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [currentQ, showFeedback])

  const handleAnswer = useCallback((idx) => {
    if (showFeedback) return
    clearInterval(timerRef.current)
    setSelected(idx)
    setShowFeedback(true)

    const isCorrect = idx === q.correct
    const bonus = Math.max(0, Math.floor(timeLeft * 3))

    if (isCorrect) {
      play('correct')
      const newScore = score + 100 + bonus
      setScore(newScore)
      const newStreak = streak + 1
      setStreak(newStreak)
      setMaxStreak(ms => Math.max(ms, newStreak))
      if (newStreak >= 3) { setPopup('streak'); setTimeout(() => setPopup(null), 1400) }
      else { setPopup('correct'); setTimeout(() => setPopup(null), 1500) }
      setAnswers(a => [...a, { correct: true, selected: idx, time: 30 - timeLeft }])
    } else {
      play('wrong')
      setStreak(0)
      setPopup('wrong')
      setTimeout(() => setPopup(null), 1400)
      setAnswers(a => [...a, { correct: false, selected: idx, time: 30 - timeLeft }])
    }

    setTimeout(() => {
      setShowFeedback(false)
      setSelected(null)
      setEliminated([])
      setVarActive(false)
      if (currentQ < QUESTIONS.length - 1) {
        setCurrentQ(c => c + 1)
        setTimeLeft(30)
      } else {
        play('fullTime')
        setTimeout(() => onEnd({ score: isCorrect ? score + 100 + bonus : score, answers: [...answers, { correct: isCorrect }], maxStreak: Math.max(maxStreak, isCorrect ? streak + 1 : streak), player }), 600)
      }
    }, 2400)
  }, [showFeedback, q, timeLeft, score, streak, maxStreak, currentQ, answers, play, onEnd, player])

  const useVAR = () => {
    if (varUsed || showFeedback) return
    play('var')
    setVarUsed(true)
    setVarActive(true)
    const wrongs = [0, 1, 2, 3].filter(i => i !== q.correct).sort(() => Math.random() - 0.5).slice(0, 2)
    setTimeout(() => setEliminated(wrongs), 900)
  }

  const getOptionStyle = (i) => {
    if (eliminated.includes(i)) return { opacity: 0.25, textDecoration: 'line-through', cursor: 'not-allowed' }
    if (!showFeedback) return {}
    if (i === q.correct) return { background: 'rgba(0,100,0,0.5)', borderColor: '#00FF00' }
    if (i === selected && i !== q.correct) return { background: 'rgba(100,0,0,0.5)', borderColor: '#FF0000' }
    return { opacity: 0.45 }
  }

  return (
    <div className="flex flex-col min-h-screen px-4 py-3 gap-3" style={{ paddingTop: 52 }}>

      {/* HUD */}
      <motion.div
        style={{ background: 'rgba(0,0,0,0.88)', border: '2px solid #EF0107', padding: '8px 12px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        initial={{ y: -30 }} animate={{ y: 0 }}>
        <div>
          <PixelText size="xs" color="#C8A000">{player.name.toUpperCase()}</PixelText>
          <div><PixelText size="xs" color="white">⚽ {score}</PixelText></div>
        </div>
        <div className="text-center">
          <PixelText size="xs" color="#888">Q{currentQ + 1}/{QUESTIONS.length}</PixelText>
          {streak >= 2 && (
            <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 0.5, repeat: Infinity }}>
              <PixelText size="xs" color="#FFD700">🔥×{streak}</PixelText>
            </motion.div>
          )}
        </div>
        <div className="text-right">
          <PixelText size="xs" color="#888">{q.category}</PixelText>
          <div><PixelText size="xs" color={DIFFICULTY_COLORS[q.difficulty]}>{q.difficulty}</PixelText></div>
        </div>
      </motion.div>

      {/* Timer */}
      <TimerBar timeLeft={timeLeft} maxTime={30}/>

      {/* Question progress dots */}
      <div style={{ display: 'flex', gap: 3 }}>
        {QUESTIONS.map((_, i) => (
          <div key={i} style={{
            flex: 1, height: 6,
            background: i < currentQ
              ? (answers[i]?.correct ? '#00AA00' : '#AA0000')
              : i === currentQ ? '#FFD700' : '#222',
            border: i === currentQ ? '1px solid #FFD700' : '1px solid #333',
          }}/>
        ))}
      </div>

      {/* Question card */}
      <AnimatePresence mode="wait">
        <motion.div key={currentQ}
          style={{ background: 'rgba(0,0,0,0.88)', border: '3px solid #C8A000', padding: '14px 16px',
            boxShadow: '4px 4px 0 #7A6000', minHeight: 90 }}
          initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -30, opacity: 0 }}>
          <PixelText size="xs" color="#C8A000">QUESTION {currentQ + 1}</PixelText>
          <p style={{ fontFamily: FONT, fontSize: '10px', color: 'white', lineHeight: 1.9, marginTop: 8 }}>
            {q.question}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Options */}
      <div className="flex flex-col gap-2">
        {q.options.map((opt, i) => (
          <motion.button key={`${currentQ}-${i}`}
            onClick={() => { if (!showFeedback && !eliminated.includes(i)) { play('bloop'); handleAnswer(i) } }}
            onMouseEnter={() => { if (!showFeedback && !eliminated.includes(i)) play('blip') }}
            disabled={showFeedback || eliminated.includes(i)}
            style={{
              ...getOptionStyle(i),
              background: 'rgba(8,12,28,0.92)', border: '2px solid #1e2a4a',
              padding: '10px 12px', fontFamily: FONT, fontSize: '9px', color: 'white',
              textAlign: 'left', cursor: 'pointer', width: '100%', transition: 'all 0.15s',
              display: 'flex', alignItems: 'center', gap: 10,
            }}
            whileHover={!showFeedback && !eliminated.includes(i) ? { borderColor: '#EF0107', x: 5 } : {}}
            initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
            transition={{ delay: i * 0.06 }}>
            <span style={{ color: '#EF0107', minWidth: 20 }}>{LABELS[i]}.</span>
            <span style={{ flex: 1 }}>{opt}</span>
            {showFeedback && i === q.correct && <span style={{ color: '#00FF00' }}>✓</span>}
            {showFeedback && i === selected && i !== q.correct && <span style={{ color: '#FF4444' }}>✗</span>}
          </motion.button>
        ))}
      </div>

      {/* Bottom: VAR + Trivia */}
      <div className="flex gap-3 mt-auto items-start">
        {/* VAR Button */}
        <motion.div
          onClick={!varUsed && !showFeedback ? useVAR : undefined}
          style={{ cursor: varUsed ? 'not-allowed' : 'pointer', opacity: varUsed ? 0.35 : 1 }}
          whileHover={!varUsed ? { scale: 1.08 } : {}}
          whileTap={!varUsed ? { scale: 0.95 } : {}}>
          <div style={{ background: 'rgba(0,0,0,0.8)', border: `2px solid ${varUsed ? '#222' : '#C8A000'}`,
            padding: '8px 10px', textAlign: 'center' }}>
            <VARSprite size={38} active={varActive}/>
            <div style={{ marginTop: 4 }}>
              <PixelText size="xs" color={varUsed ? '#333' : '#C8A000'}>{varUsed ? 'USED' : 'VAR'}</PixelText>
            </div>
          </div>
        </motion.div>

        {/* Trivia reveal */}
        <AnimatePresence>
          {showFeedback && (
            <motion.div style={{ flex: 1, background: 'rgba(0,0,30,0.92)', border: '2px solid #1a1a5e',
              padding: '10px 12px' }}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              <PixelText size="xs" color="#4488FF">📖 FUN FACT:</PixelText>
              <p style={{ fontFamily: FONT, fontSize: '7px', color: '#999', lineHeight: 1.9, marginTop: 6 }}>
                {q.trivia}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <PopupNotification type={popup} visible={!!popup}/>
    </div>
  )
}

// ============================================================
// RESULTS SCREEN
// ============================================================
function ResultsScreen({ result, onRematch, onMenu, play }) {
  const { score, answers, maxStreak, player } = result
  const correct = answers.filter(a => a.correct).length
  const maxScore = QUESTIONS.length * 130
  const pct = score / maxScore

  const getRating = () => {
    if (pct >= 0.88) return { label: 'WORLD CLASS', color: '#FFD700', stars: 5, msg: 'ABSOLUTE LEGEND! COYG!' }
    if (pct >= 0.72) return { label: 'TOP GUNNER', color: '#EF0107', stars: 4, msg: 'PROPER GOONER! RESPECT!' }
    if (pct >= 0.52) return { label: 'SQUAD PLAYER', color: '#FF8C00', stars: 3, msg: 'DECENT EFFORT, KEEP GOING!' }
    if (pct >= 0.32) return { label: 'YOUTH TEAM', color: '#888', stars: 2, msg: 'MORE TRAINING NEEDED...' }
    return { label: 'NON-LEAGUE', color: '#444', stars: 1, msg: 'STUDY THE HISTORY, MATE.' }
  }

  const rating = getRating()

  const radarData = [
    { stat: 'HISTORY',  A: Math.round((answers.filter((_,i) => QUESTIONS[i]?.category === 'History' && answers[i]?.correct).length / Math.max(1, QUESTIONS.filter(q => q.category === 'History').length)) * 100) || 40 },
    { stat: 'LEGENDS',  A: Math.round((answers.filter((_,i) => QUESTIONS[i]?.category === 'Legends' && answers[i]?.correct).length / Math.max(1, QUESTIONS.filter(q => q.category === 'Legends').length)) * 100) || 40 },
    { stat: 'TROPHIES', A: Math.round((answers.filter((_,i) => QUESTIONS[i]?.category === 'Trophies' && answers[i]?.correct).length / Math.max(1, QUESTIONS.filter(q => q.category === 'Trophies').length)) * 100) || 40 },
    { stat: 'MODERN',   A: Math.round((answers.filter((_,i) => QUESTIONS[i]?.category === 'Modern Era' && answers[i]?.correct).length / Math.max(1, QUESTIONS.filter(q => q.category === 'Modern Era').length)) * 100) || 40 },
    { stat: 'STADIUM',  A: Math.round(pct * 100) },
    { stat: 'SPEED',    A: Math.round(100 - (answers.reduce((s,a) => s + (a.time || 15), 0) / Math.max(1, answers.length)) * 2) },
  ]

  return (
    <div className="flex flex-col items-center min-h-screen px-4 py-5 gap-4" style={{ paddingTop: 58 }}>

      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.1 }}>
        <PixelText size="xl" color="#C8A000" glow>FULL TIME!</PixelText>
      </motion.div>

      {/* Player result card */}
      <motion.div
        style={{ background: 'rgba(0,0,0,0.92)', border: '4px solid #EF0107', padding: 20,
          width: '100%', maxWidth: 400, boxShadow: '8px 8px 0 #8B0000', textAlign: 'center' }}
        initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>

        <div className="flex justify-center mb-2">
          <JerseySprite number={player.number} size={60}/>
        </div>
        <PixelText size="sm" color="white">{player.name.toUpperCase()}</PixelText>

        {/* Stars */}
        <div className="flex justify-center gap-2 mt-3 mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4 + i * 0.1 }}>
              <StarSprite lit={i < rating.stars}/>
            </motion.div>
          ))}
        </div>

        <motion.div animate={{ scale: [1, 1.04, 1] }} transition={{ duration: 1.2, repeat: Infinity }}>
          <PixelText size="md" color={rating.color} glow>{rating.label}</PixelText>
        </motion.div>
        <div style={{ marginTop: 6 }}>
          <PixelText size="xs" color="#888">{rating.msg}</PixelText>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-2 mt-5">
          {[
            { label: 'SCORE', value: score, color: '#C8A000' },
            { label: 'CORRECT', value: `${correct}/${QUESTIONS.length}`, color: '#44DD44' },
            { label: 'STREAK', value: `×${maxStreak}`, color: '#EF0107' },
          ].map(s => (
            <div key={s.label} style={{ background: '#0a0a0a', border: '2px solid #1a1a1a', padding: '8px 4px' }}>
              <PixelText size="xs" color="#444">{s.label}</PixelText>
              <div style={{ marginTop: 4 }}><PixelText size="sm" color={s.color}>{s.value}</PixelText></div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Radar chart */}
      <motion.div
        style={{ background: 'rgba(0,0,0,0.88)', border: '3px solid #C8A000', padding: '14px 16px',
          width: '100%', maxWidth: 400 }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
        <PixelText size="xs" color="#C8A000">⚡ ARSENAL IQ RADAR ⚡</PixelText>
        <div style={{ height: 210, marginTop: 10 }}>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
              <PolarGrid stroke="#1a1a3e" strokeDasharray="4 4"/>
              <PolarAngleAxis dataKey="stat" tick={{ fill: '#666', fontFamily: FONT, fontSize: 6 }}/>
              <Radar name="You" dataKey="A" stroke="#EF0107" fill="#EF0107" fillOpacity={0.35} strokeWidth={2}/>
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Q-by-Q breakdown */}
      <motion.div style={{ width: '100%', maxWidth: 400 }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
        <PixelText size="xs" color="#C8A000">MATCH REPORT:</PixelText>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 8 }}>
          {QUESTIONS.map((_, i) => {
            const a = answers[i]
            return (
              <motion.div key={i}
                style={{ width: 30, height: 30, background: a?.correct ? '#002200' : '#220000',
                  border: `2px solid ${a?.correct ? '#00AA00' : '#AA0000'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.9 + i * 0.04 }}
                title={QUESTIONS[i]?.question}>
                <PixelText size="xs" color={a?.correct ? '#44FF44' : '#FF4444'}>{i + 1}</PixelText>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Actions */}
      <div className="flex gap-3 flex-wrap justify-center pb-6">
        <PixelButton variant="primary" onHover={() => play('blip')}
          onClick={() => { play('bloop'); onRematch() }}>
          🔄 REMATCH
        </PixelButton>
        <PixelButton variant="gold" onHover={() => play('blip')}
          onClick={() => { play('blip'); navigator.share?.({ title: 'Arsenal Quiz', text: `I scored ${score} pts as ${rating.label} in the Arsenal FC Quiz! COYG! ⚽🔴`, url: window.location.href }).catch(() => {}) }}>
          📤 SHARE
        </PixelButton>
        <PixelButton variant="secondary" onHover={() => play('blip')}
          onClick={() => { play('blip'); onMenu() }}>
          🏠 MENU
        </PixelButton>
      </div>
    </div>
  )
}

// ============================================================
// TOP NAV BAR
// ============================================================
function NavBar({ screen, answers, currentQ, muted, onToggleMute, play, onInit }) {
  return (
    <div style={{
      position: 'fixed', top: 0, left: '50%', transform: 'translateX(-50%)',
      width: '100%', maxWidth: 480, zIndex: 100,
      background: 'rgba(0,0,0,0.95)', borderBottom: '3px solid #EF0107',
      padding: '7px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <CannonSprite size={22}/>
        <PixelText size="xs" color="#EF0107">ARSENAL FC</PixelText>
      </div>

      {/* In-game progress dots */}
      {screen === 'game' && (
        <div style={{ display: 'flex', gap: 2 }}>
          {QUESTIONS.map((_, i) => (
            <div key={i} style={{
              width: 6, height: 6,
              background: i < currentQ
                ? (answers[i]?.correct ? '#00CC00' : '#CC0000')
                : i === currentQ ? '#FFD700' : '#222',
              border: '1px solid #333',
            }}/>
          ))}
        </div>
      )}

      {/* Speaker */}
      <motion.button
        onClick={() => { onInit(); onToggleMute(); play('blip') }}
        style={{ background: 'none', border: '2px solid #333', padding: '4px 8px', cursor: 'pointer',
          display: 'flex', alignItems: 'center' }}
        whileHover={{ borderColor: '#EF0107' }}
        whileTap={{ scale: 0.9 }}>
        <SpeakerIcon muted={muted} size={18}/>
      </motion.button>
    </div>
  )
}

// ============================================================
// APP ROOT
// ============================================================
export default function App() {
  const [screen, setScreen] = useState('welcome')
  const [player, setPlayer] = useState(null)
  const [result, setResult] = useState(null)
  const [gameKey, setGameKey] = useState(0)
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState([])

  const { init, play, toggleMute, muted, ready } = useAudio()

  const handleInit = () => { if (!ready) init() }

  const handleStart = (playerData) => {
    setPlayer(playerData)
    setCurrentQ(0)
    setAnswers([])
    setGameKey(k => k + 1)
    setScreen('game')
  }

  const handleEnd = (res) => {
    setResult(res)
    setScreen('results')
  }

  const handleRematch = () => {
    setGameKey(k => k + 1)
    setCurrentQ(0)
    setAnswers([])
    setScreen('setup')
  }

  const safePLay = (sfx) => { if (!ready) init(); play(sfx) }

  return (
    <div onClick={handleInit} style={{ minHeight: '100vh', position: 'relative',
      maxWidth: 480, margin: '0 auto', overflow: 'hidden', background: '#050505' }}>

      <StadiumBackground/>

      <NavBar
        screen={screen}
        answers={answers}
        currentQ={currentQ}
        muted={muted}
        onToggleMute={toggleMute}
        play={safePLay}
        onInit={handleInit}
      />

      <ScreenWrapper screenKey={screen}>
        {screen === 'welcome' && (
          <WelcomeScreen onStart={() => { handleInit(); setScreen('setup') }} play={safePLay}/>
        )}
        {screen === 'setup' && (
          <SetupScreen onBack={() => setScreen('welcome')} onStart={handleStart} play={safePLay}/>
        )}
        {screen === 'game' && (
          <GameScreen key={gameKey} player={player} onEnd={handleEnd} play={safePLay}/>
        )}
        {screen === 'results' && result && (
          <ResultsScreen result={result} onRematch={handleRematch} onMenu={() => setScreen('welcome')} play={safePLay}/>
        )}
      </ScreenWrapper>
    </div>
  )
}
