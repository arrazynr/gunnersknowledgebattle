// ============================================================
// ARSENAL QUIZ - 8-BIT AUDIO ENGINE
// All sounds procedurally generated via Web Audio API
// No external audio files needed
// ============================================================

import { useRef, useState, useCallback } from 'react'

// --- Low-level tone generator ---
function playTone(ctx, freq, type = 'square', duration = 0.1, vol = 0.3, delay = 0) {
  if (!ctx) return
  try {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.type = type
    osc.frequency.setValueAtTime(freq, ctx.currentTime + delay)
    gain.gain.setValueAtTime(vol, ctx.currentTime + delay)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration)
    osc.start(ctx.currentTime + delay)
    osc.stop(ctx.currentTime + delay + duration + 0.01)
  } catch (e) { /* audio context might be suspended */ }
}

// --- SFX Definitions ---
export const SFX = {
  blip: (ctx) => playTone(ctx, 440, 'square', 0.05, 0.12),
  
  bloop: (ctx) => {
    playTone(ctx, 660, 'square', 0.07, 0.18)
    playTone(ctx, 880, 'square', 0.07, 0.18, 0.07)
  },

  correct: (ctx) => {
    const melody = [523, 659, 784, 1047]
    melody.forEach((f, i) => playTone(ctx, f, 'square', 0.13, 0.28, i * 0.1))
    // Crowd cheer simulation
    setTimeout(() => {
      for (let i = 0; i < 6; i++) {
        playTone(ctx, 200 + Math.random() * 400, 'sawtooth', 0.15, 0.08, i * 0.05)
      }
    }, 400)
  },

  wrong: (ctx) => {
    playTone(ctx, 220, 'sawtooth', 0.25, 0.4)
    playTone(ctx, 180, 'sawtooth', 0.3, 0.35, 0.12)
    playTone(ctx, 150, 'square', 0.25, 0.3, 0.25)
  },

  whistle: (ctx) => {
    // Three blows for kick-off
    ;[0, 0.4, 0.8].forEach(d => {
      playTone(ctx, 1200, 'sine', 0.18, 0.35, d)
      playTone(ctx, 1400, 'sine', 0.12, 0.18, d + 0.05)
    })
  },

  fullTime: (ctx) => {
    // Three longer blows for full time
    ;[0, 0.55, 1.1].forEach(d => {
      playTone(ctx, 1200, 'sine', 0.35, 0.45, d)
      playTone(ctx, 1600, 'sine', 0.35, 0.3, d + 0.06)
      playTone(ctx, 900, 'sine', 0.35, 0.25, d + 0.15)
    })
  },

  var: (ctx) => {
    // Dial-up / computing beeps
    for (let i = 0; i < 10; i++) {
      playTone(ctx, 300 + i * 120, 'sawtooth', 0.07, 0.18, i * 0.08)
    }
    playTone(ctx, 440, 'square', 0.2, 0.3, 0.85)
    playTone(ctx, 880, 'square', 0.2, 0.25, 1.05)
  },

  alarm: (ctx) => {
    // Traitor Easter Egg — loud siren
    for (let i = 0; i < 16; i++) {
      playTone(ctx, i % 2 === 0 ? 880 : 550, 'sawtooth', 0.12, 0.55, i * 0.13)
    }
    // Dramatic bass hit
    playTone(ctx, 80, 'square', 0.4, 0.5, 0)
    playTone(ctx, 60, 'square', 0.4, 0.5, 0.2)
  },

  navigate: (ctx) => {
    playTone(ctx, 330, 'square', 0.06, 0.2)
    playTone(ctx, 440, 'square', 0.06, 0.2, 0.07)
  },

  streak: (ctx) => {
    // Streak bonus fanfare
    ;[523, 659, 784, 1047, 1319].forEach((f, i) => playTone(ctx, f, 'square', 0.1, 0.25, i * 0.08))
  },
}

// --- BGM: looping 8-bit chiptune ---
function startBGM(ctx, gainNode) {
  // A catchy 8-bit Arsenal-style melody in C major
  const track = [
    // Bar 1 - Main theme
    { f: 523, d: 0.15 }, { f: 587, d: 0.15 }, { f: 659, d: 0.15 }, { f: 784, d: 0.3 },
    { f: 659, d: 0.15 }, { f: 587, d: 0.15 }, { f: 523, d: 0.3 },
    // Bar 2 - Variation
    { f: 392, d: 0.15 }, { f: 440, d: 0.15 }, { f: 523, d: 0.15 }, { f: 659, d: 0.3 },
    { f: 784, d: 0.15 }, { f: 880, d: 0.15 }, { f: 784, d: 0.3 },
    // Bar 3 - Build
    { f: 659, d: 0.1 }, { f: 784, d: 0.1 }, { f: 880, d: 0.1 }, { f: 1047, d: 0.25 },
    { f: 880, d: 0.1 }, { f: 784, d: 0.1 }, { f: 659, d: 0.25 },
    // Bar 4 - Resolve
    { f: 523, d: 0.15 }, { f: 587, d: 0.15 }, { f: 659, d: 0.15 }, { f: 523, d: 0.45 },
  ]

  const bassTrack = [
    { f: 130, d: 0.6 }, { f: 98, d: 0.6 }, { f: 110, d: 0.6 }, { f: 130, d: 0.6 },
    { f: 130, d: 0.6 }, { f: 98, d: 0.6 }, { f: 110, d: 0.6 }, { f: 130, d: 0.6 },
  ]

  let scheduledUntil = ctx.currentTime
  let loopInterval = null

  const scheduleLoop = () => {
    if (ctx.state === 'closed') return

    // Melody
    let t = scheduledUntil
    track.forEach(note => {
      const osc = ctx.createOscillator()
      const g = ctx.createGain()
      osc.connect(g)
      g.connect(gainNode)
      osc.type = 'square'
      osc.frequency.value = note.f
      g.gain.setValueAtTime(0.4, t)
      g.gain.exponentialRampToValueAtTime(0.001, t + note.d - 0.01)
      osc.start(t)
      osc.stop(t + note.d)
      t += note.d
    })

    // Bass
    let bt = scheduledUntil
    bassTrack.forEach(note => {
      const osc = ctx.createOscillator()
      const g = ctx.createGain()
      osc.connect(g)
      g.connect(gainNode)
      osc.type = 'triangle'
      osc.frequency.value = note.f
      g.gain.setValueAtTime(0.25, bt)
      g.gain.exponentialRampToValueAtTime(0.001, bt + note.d - 0.02)
      osc.start(bt)
      osc.stop(bt + note.d)
      bt += note.d
    })

    const loopDuration = track.reduce((s, n) => s + n.d, 0)
    scheduledUntil += loopDuration
  }

  scheduleLoop()
  loopInterval = setInterval(() => {
    if (scheduledUntil - ctx.currentTime < 1.5) scheduleLoop()
  }, 500)

  return loopInterval
}

// ============================================================
// useAudio hook
// ============================================================
export function useAudio() {
  const ctxRef = useRef(null)
  const gainRef = useRef(null)
  const bgmRef = useRef(null)
  const [muted, setMuted] = useState(false)
  const [ready, setReady] = useState(false)

  const init = useCallback(() => {
    if (ready) return
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)()
      const gain = ctx.createGain()
      gain.gain.value = 0.08
      gain.connect(ctx.destination)
      ctxRef.current = ctx
      gainRef.current = gain
      setReady(true)
      bgmRef.current = startBGM(ctx, gain)
    } catch (e) {
      console.warn('Web Audio API not supported:', e)
    }
  }, [ready])

  const play = useCallback((sfxName) => {
    if (muted || !ctxRef.current || !SFX[sfxName]) return
    try {
      if (ctxRef.current.state === 'suspended') ctxRef.current.resume()
      SFX[sfxName](ctxRef.current)
    } catch (e) {}
  }, [muted])

  const toggleMute = useCallback(() => {
    setMuted(m => {
      const next = !m
      if (gainRef.current) gainRef.current.gain.value = next ? 0 : 0.08
      return next
    })
  }, [])

  return { init, play, toggleMute, muted, ready }
}
