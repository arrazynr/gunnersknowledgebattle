// ============================================================
// ARSENAL QUIZ - SHARED UI COMPONENTS
// ============================================================

import { motion, AnimatePresence } from 'framer-motion'
import { RedCardSprite } from './sprites'

const FONT = "'Press Start 2P', monospace"

// --- Pixel Text ---
export const PixelText = ({ children, size = 'sm', color = 'white', glow = false, className = '', style = {} }) => {
  const sizes = { xs: '8px', sm: '10px', md: '12px', lg: '16px', xl: '20px', '2xl': '26px' }
  return (
    <span style={{
      fontFamily: FONT, fontSize: sizes[size] || size, color,
      textShadow: glow
        ? `0 0 8px ${color}, 0 0 16px ${color}, 2px 2px 0 rgba(0,0,0,0.9)`
        : '2px 2px 0px rgba(0,0,0,0.8)',
      letterSpacing: '0.5px', lineHeight: 1.6,
      ...style,
    }} className={className}>
      {children}
    </span>
  )
}

// --- Pixel Button ---
export const PixelButton = ({
  children, onClick, variant = 'primary',
  disabled = false, className = '', onHover, fullWidth = false,
}) => {
  const variants = {
    primary:   { bg: '#EF0107', shadow: '#8B0000', hover: '#FF2020', text: 'white' },
    secondary: { bg: '#1a1a2e', shadow: '#000',    hover: '#252540', text: 'white' },
    gold:      { bg: '#C8A000', shadow: '#7A6000', hover: '#E8C000', text: '#000'  },
    correct:   { bg: '#006600', shadow: '#003300', hover: '#008800', text: 'white' },
    wrong:     { bg: '#880000', shadow: '#440000', hover: '#AA0000', text: 'white' },
    ghost:     { bg: 'transparent', shadow: '#333', hover: 'rgba(255,255,255,0.05)', text: 'white' },
  }
  const v = variants[variant] || variants.primary
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      onHoverStart={onHover}
      style={{
        fontFamily: FONT, fontSize: '10px', padding: '12px 20px',
        background: v.bg, color: v.text, border: `2px solid rgba(255,255,255,0.1)`,
        cursor: disabled ? 'not-allowed' : 'pointer',
        boxShadow: `4px 4px 0px ${v.shadow}`,
        outline: '2px solid rgba(0,0,0,0.4)', opacity: disabled ? 0.5 : 1,
        width: fullWidth ? '100%' : undefined,
      }}
      whileHover={!disabled ? {
        scale: 1.04, background: v.hover,
        boxShadow: `2px 2px 0px ${v.shadow}`, y: 2,
      } : {}}
      whileTap={!disabled ? {
        scale: 0.96, boxShadow: `1px 1px 0px ${v.shadow}`, y: 4,
      } : {}}
      className={className}
    >
      {children}
    </motion.button>
  )
}

// --- Pixel Panel (card container) ---
export const PixelPanel = ({ children, color = '#EF0107', style = {}, className = '' }) => (
  <div style={{
    background: 'rgba(5, 5, 15, 0.92)',
    border: `3px solid ${color}`,
    boxShadow: `6px 6px 0 ${color}44, inset 0 0 30px rgba(0,0,0,0.5)`,
    padding: '20px',
    ...style,
  }} className={className}>
    {children}
  </div>
)

// --- Progress Bar ---
export const PixelProgressBar = ({ value, max, color = '#EF0107', height = 14 }) => (
  <div style={{ background: '#0a0a0a', border: '2px solid #222', height, position: 'relative', overflow: 'hidden' }}>
    <motion.div
      style={{ height: '100%', background: color, position: 'absolute', left: 0, top: 0 }}
      animate={{ width: `${(value / max) * 100}%` }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    />
    {/* Tick marks */}
    {Array.from({ length: max - 1 }).map((_, i) => (
      <div key={i} style={{
        position: 'absolute', left: `${((i + 1) / max) * 100}%`,
        top: 0, bottom: 0, width: 1, background: 'rgba(0,0,0,0.4)',
      }}/>
    ))}
    {/* Shimmer */}
    <motion.div
      style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '40%',
        background: 'rgba(255,255,255,0.15)' }}
    />
  </div>
)

// --- Timer Bar ---
export const TimerBar = ({ timeLeft, maxTime = 30 }) => {
  const pct = timeLeft / maxTime
  const color = pct > 0.6 ? '#44DD44' : pct > 0.3 ? '#FFAA00' : '#EF0107'
  const urgent = pct <= 0.3

  return (
    <div className="flex items-center gap-3">
      <motion.div
        animate={urgent ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 0.5, repeat: Infinity }}>
        <PixelText size="xs" color={color} style={{ minWidth: 32 }}>
          {String(timeLeft).padStart(2, '0')}s
        </PixelText>
      </motion.div>
      <div style={{ flex: 1 }}>
        <PixelProgressBar value={timeLeft} max={maxTime} color={color} height={12}/>
      </div>
      <PixelText size="xs" color="#444">⏱</PixelText>
    </div>
  )
}

// --- Popup Notification (GOAL / NO GOAL / TRAITOR) ---
export const PopupNotification = ({ type, visible }) => (
  <AnimatePresence>
    {visible && (
      <motion.div
        className="fixed inset-0 flex items-center justify-center pointer-events-none"
        style={{ zIndex: 200 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 20 }}
      >
        {type === 'correct' && (
          <div style={{
            background: '#001a00', border: '4px solid #00FF00',
            padding: '20px 36px', boxShadow: '8px 8px 0 #006600', textAlign: 'center',
          }}>
            <PixelText size="xl" color="#00FF00" glow>⚽ GOAL! ⚽</PixelText>
            <div style={{ marginTop: 8 }}>
              <PixelText size="sm" color="#88FF88">CORRECT! +100 PTS</PixelText>
            </div>
            {/* Confetti dots */}
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div key={i} style={{
                position: 'absolute',
                width: 8, height: 8,
                background: i % 2 ? '#EF0107' : '#C8A000',
              }}
              animate={{
                x: Math.cos(i * 45 * Math.PI / 180) * 80,
                y: Math.sin(i * 45 * Math.PI / 180) * 80,
                opacity: 0,
              }}
              transition={{ duration: 0.8 }}/>
            ))}
          </div>
        )}
        {type === 'wrong' && (
          <motion.div
            style={{
              background: '#1a0000', border: '4px solid #FF0000',
              padding: '20px 36px', boxShadow: '8px 8px 0 #660000', textAlign: 'center',
            }}
            animate={{ x: [-8, 8, -8, 8, -4, 4, 0] }}
            transition={{ duration: 0.4 }}
          >
            <PixelText size="xl" color="#FF4444">❌ NO GOAL!</PixelText>
            <div style={{ marginTop: 8 }}><PixelText size="sm" color="#FF8888">WRONG ANSWER</PixelText></div>
          </motion.div>
        )}
        {type === 'traitor' && (
          <motion.div
            style={{
              background: '#0a0000', border: '4px solid #EF0107',
              padding: '20px 28px', boxShadow: '0 0 40px #EF0107', textAlign: 'center',
            }}
            animate={{
              borderColor: ['#EF0107', '#FF8800', '#EF0107'],
              boxShadow: ['0 0 20px #EF0107', '0 0 60px #FF4400', '0 0 20px #EF0107'],
            }}
            transition={{ duration: 0.4, repeat: 8 }}
          >
            <PixelText size="lg" color="#EF0107" glow>⚠ TRAITOR! ⚠</PixelText>
            <div style={{ marginTop: 10, display: 'flex', justifyContent: 'center' }}>
              <RedCardSprite shake size={44}/>
            </div>
            <div style={{ marginTop: 8 }}>
              <PixelText size="xs" color="#FF6600">ENEMY DETECTED!</PixelText>
            </div>
          </motion.div>
        )}
        {type === 'streak' && (
          <motion.div
            style={{
              background: '#1a1000', border: '4px solid #FFD700',
              padding: '16px 28px', boxShadow: '8px 8px 0 #7A6000', textAlign: 'center',
            }}
            initial={{ rotate: -5 }} animate={{ rotate: [-5, 5, -3, 3, 0] }}
          >
            <PixelText size="lg" color="#FFD700" glow>🔥 STREAK!</PixelText>
          </motion.div>
        )}
      </motion.div>
    )}
  </AnimatePresence>
)

// --- Screen transition wrapper ---
export const ScreenWrapper = ({ children, screenKey }) => (
  <AnimatePresence mode="wait">
    <motion.div key={screenKey}
      initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
      animate={{ opacity: 1, clipPath: 'inset(0 0% 0 0)' }}
      exit={{ opacity: 0, clipPath: 'inset(0 0 0 100%)' }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
      style={{ position: 'relative', zIndex: 1 }}
    >
      {children}
    </motion.div>
  </AnimatePresence>
)

// --- Pixel Divider ---
export const PixelDivider = ({ animated = true }) => (
  <motion.div
    style={{
      height: 4, width: '100%',
      background: 'repeating-linear-gradient(90deg, #EF0107 0px, #EF0107 8px, #C8A000 8px, #C8A000 16px)',
    }}
    animate={animated ? { x: [-16, 0] } : {}}
    transition={{ duration: 0.6, repeat: Infinity, ease: 'linear' }}
  />
)

// --- Scrolling Marquee ---
export const Marquee = ({ text, speed = 18 }) => (
  <div style={{ overflow: 'hidden', background: '#EF0107', padding: '5px 0', width: '100%' }}>
    <motion.div
      style={{ whiteSpace: 'nowrap', display: 'inline-block' }}
      animate={{ x: ['100vw', '-100%'] }}
      transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
    >
      <PixelText size="xs" color="white">{text}</PixelText>
    </motion.div>
  </div>
)
