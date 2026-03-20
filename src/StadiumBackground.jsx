// ============================================================
// PIXEL ART EMIRATES STADIUM BACKGROUND
// ============================================================

import { motion } from 'framer-motion'

export default function StadiumBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>

      {/* Sky gradient */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(180deg, #050510 0%, #0d0520 30%, #200a35 55%, #0a1a08 75%, #050f05 100%)',
      }}/>

      {/* Stars */}
      {Array.from({ length: 40 }).map((_, i) => (
        <motion.div key={i}
          style={{
            position: 'absolute',
            left: `${(i * 37 + 13) % 100}%`,
            top: `${(i * 23 + 7) % 40}%`,
            width: i % 5 === 0 ? 3 : 2,
            height: i % 5 === 0 ? 3 : 2,
            background: 'white',
          }}
          animate={{ opacity: [0.9, 0.2, 0.9] }}
          transition={{ duration: 1.5 + (i % 4) * 0.5, repeat: Infinity, delay: i * 0.08 }}
        />
      ))}

      {/* Distant floodlights */}
      {[8, 92].map((x, i) => (
        <motion.div key={i} style={{ position: 'absolute', left: `${x}%`, top: '25%' }}>
          <div style={{ width: 4, height: 80, background: '#888', marginLeft: 4 }}/>
          <motion.div style={{ width: 12, height: 8, background: '#FFFAAA', marginTop: -4 }}
            animate={{ opacity: [1, 0.7, 1], boxShadow: ['0 0 10px #FFFAAA', '0 0 30px #FFEE88', '0 0 10px #FFFAAA'] }}
            transition={{ duration: 2, repeat: Infinity }}/>
        </motion.div>
      ))}

      {/* === STADIUM STRUCTURE === */}
      <div className="absolute bottom-0 left-0 right-0">

        {/* Upper tier stands */}
        <div style={{ display: 'flex', height: 70, alignItems: 'flex-end' }}>
          {Array.from({ length: 48 }).map((_, i) => {
            const isSupport = i % 6 === 0
            const seatColor = i % 3 === 0 ? '#CC0000' : i % 3 === 1 ? '#EF0107' : '#AA0000'
            return (
              <div key={i} style={{ flex: 1, position: 'relative' }}>
                {isSupport && (
                  <div style={{ position: 'absolute', bottom: 0, left: '50%', width: 3, height: 70,
                    background: '#1a1a2e', transform: 'translateX(-50%)' }}/>
                )}
                <div style={{ height: 70, background: '#0f0f22',
                  borderTop: `3px solid ${i === 0 || i === 47 ? '#EF0107' : 'transparent'}` }}>
                  {/* Crowd pixel seats */}
                  {Array.from({ length: 4 }).map((_, row) => (
                    <div key={row} style={{ display: 'flex', height: 14, marginTop: row === 0 ? 6 : 2 }}>
                      <div style={{ flex: 1, background: seatColor, opacity: 0.5 + Math.random() * 0.4, margin: '1px' }}/>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Red roof band */}
        <div style={{ height: 10, background: 'linear-gradient(180deg, #EF0107, #AA0000)' }}/>

        {/* Lower tier */}
        <div style={{ display: 'flex', height: 50 }}>
          {Array.from({ length: 48 }).map((_, i) => {
            const alt = i % 4
            const bg = alt === 0 ? '#EF0107' : alt === 1 ? '#CC0000' : alt === 2 ? '#AA0000' : '#EE1111'
            return (
              <div key={i} style={{ flex: 1, background: '#111128', borderTop: '2px solid #1a1a3e' }}>
                {Array.from({ length: 3 }).map((_, row) => (
                  <div key={row} style={{ height: 10, background: bg, margin: '2px 1px',
                    opacity: 0.4 + (Math.sin(i * 0.5 + row) * 0.3) }}/>
                ))}
              </div>
            )
          })}
        </div>

        {/* Pitch perimeter wall */}
        <div style={{ height: 12, background: '#EF0107',
          boxShadow: '0 -2px 0 #AA0000, 0 2px 0 #CC0000' }}/>

        {/* PITCH */}
        <div style={{
          minHeight: 160,
          background: 'repeating-linear-gradient(90deg, #1a5c1a 0px, #1a5c1a 24px, #1e6b1e 24px, #1e6b1e 48px)',
          position: 'relative',
        }}>
          {/* Pitch markings */}
          <div style={{
            position: 'absolute', inset: '10px 15px', border: '2px solid rgba(255,255,255,0.35)',
          }}>
            {/* Center line */}
            <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 2,
              background: 'rgba(255,255,255,0.35)' }}/>
            {/* Center circle */}
            <div style={{ position: 'absolute', left: '50%', top: '50%',
              transform: 'translate(-50%,-50%)', width: 60, height: 60,
              border: '2px solid rgba(255,255,255,0.35)', borderRadius: '50%' }}/>
            {/* Center spot */}
            <div style={{ position: 'absolute', left: '50%', top: '50%',
              transform: 'translate(-50%,-50%)', width: 4, height: 4, background: 'rgba(255,255,255,0.5)' }}/>
            {/* Penalty areas */}
            <div style={{ position: 'absolute', left: 0, top: '25%', width: '12%', height: '50%',
              border: '2px solid rgba(255,255,255,0.25)', borderLeft: 'none' }}/>
            <div style={{ position: 'absolute', right: 0, top: '25%', width: '12%', height: '50%',
              border: '2px solid rgba(255,255,255,0.25)', borderRight: 'none' }}/>
          </div>
        </div>
      </div>

      {/* Pixel grid overlay */}
      <div className="absolute inset-0" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
        backgroundSize: '8px 8px',
      }}/>

      {/* Vignette */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)',
      }}/>
    </div>
  )
}
