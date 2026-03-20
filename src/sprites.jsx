// ============================================================
// ARSENAL QUIZ - PIXEL ART SPRITE COMPONENTS
// All hand-crafted SVG pixel art
// ============================================================

import { motion } from 'framer-motion'

const PIX = { imageRendering: 'pixelated' }

// --- Arsenal Cannon (detailed) ---
export const CannonSprite = ({ size = 80, glow = false, pulse = false }) => (
  <motion.svg
    width={size} height={size} viewBox="0 0 48 32" style={PIX}
    animate={pulse ? { filter: ['drop-shadow(0 0 6px #EF0107)', 'drop-shadow(0 0 18px #FF6600)', 'drop-shadow(0 0 6px #EF0107)'] } : {}}
    transition={{ duration: 2, repeat: Infinity }}
  >
    {glow && (
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
    )}
    <g filter={glow ? 'url(#glow)' : undefined}>
      {/* Left Wheel */}
      <rect x="2" y="20" width="10" height="10" rx="2" fill="#555"/>
      <rect x="3" y="21" width="8" height="8" rx="1" fill="#333"/>
      <rect x="6" y="21" width="2" height="8" fill="#666"/>
      <rect x="3" y="24" width="8" height="2" fill="#666"/>
      {/* Right Wheel */}
      <rect x="36" y="20" width="10" height="10" rx="2" fill="#555"/>
      <rect x="37" y="21" width="8" height="8" rx="1" fill="#333"/>
      <rect x="40" y="21" width="2" height="8" fill="#666"/>
      <rect x="37" y="24" width="8" height="2" fill="#666"/>
      {/* Axle */}
      <rect x="11" y="23" width="26" height="3" fill="#444"/>
      {/* Body */}
      <rect x="8" y="14" width="30" height="10" rx="1" fill="#B8900A"/>
      <rect x="9" y="15" width="28" height="8" rx="1" fill="#D4A010"/>
      {/* Arsenal crest stripe on body */}
      <rect x="10" y="16" width="6" height="3" fill="#EF0107"/>
      <rect x="18" y="16" width="6" height="3" fill="white"/>
      <rect x="26" y="16" width="6" height="3" fill="#EF0107"/>
      {/* Barrel */}
      <rect x="26" y="9" width="18" height="6" rx="1" fill="#B8900A"/>
      <rect x="27" y="10" width="16" height="4" fill="#D4A010"/>
      <rect x="43" y="8" width="4" height="8" rx="1" fill="#B8900A"/>
      <rect x="44" y="9" width="2" height="6" fill="#9A7A00"/>
      {/* Muzzle flash hint */}
      <rect x="46" y="10" width="2" height="4" fill="#FF8C00" opacity="0.6"/>
      {/* Cannon ball */}
      <rect x="1" y="10" width="7" height="7" rx="1" fill="#222"/>
      <rect x="2" y="11" width="5" height="5" fill="#444"/>
      <rect x="3" y="12" width="2" height="2" fill="#666"/>
    </g>
  </motion.svg>
)

// --- Arsenal Jersey ---
export const JerseySprite = ({ number = '7', size = 48, selected = false }) => (
  <motion.svg
    width={size} height={size} viewBox="0 0 24 28" style={PIX}
    animate={selected ? { filter: 'drop-shadow(0 0 6px #EF0107)' } : {}}
  >
    {/* Sleeves */}
    <rect x="0" y="6" width="5" height="9" fill="#EF0107"/>
    <rect x="19" y="6" width="5" height="9" fill="#EF0107"/>
    <rect x="0" y="7" width="5" height="1" fill="#CC0000"/>
    <rect x="19" y="7" width="5" height="1" fill="#CC0000"/>
    {/* Body */}
    <rect x="4" y="4" width="16" height="20" fill="#EF0107"/>
    {/* Collar */}
    <rect x="8" y="2" width="8" height="4" fill="white"/>
    <rect x="10" y="0" width="4" height="4" fill="#EF0107"/>
    {/* White chest band */}
    <rect x="6" y="10" width="12" height="1" fill="rgba(255,255,255,0.2)"/>
    {/* Number */}
    <text x="12" y="18" textAnchor="middle" fill="white"
      fontSize="7" fontFamily="monospace" fontWeight="bold" style={{ imageRendering: 'pixelated' }}>
      {number}
    </text>
    {/* Bottom hem */}
    <rect x="4" y="23" width="16" height="1" fill="#CC0000"/>
    {/* Shadow detail */}
    <rect x="4" y="4" width="2" height="20" fill="rgba(0,0,0,0.15)"/>
  </motion.svg>
)

// --- VAR Monitor ---
export const VARSprite = ({ size = 48, active = false }) => (
  <motion.svg width={size} height={size} viewBox="0 0 32 32" style={PIX}
    animate={active ? { filter: ['drop-shadow(0 0 4px #00FF41)', 'drop-shadow(0 0 12px #00FF41)', 'drop-shadow(0 0 4px #00FF41)'] } : {}}
    transition={{ duration: 0.5, repeat: Infinity }}>
    {/* Monitor body */}
    <rect x="2" y="2" width="28" height="20" fill="#1a1a1a" rx="1"/>
    <rect x="3" y="3" width="26" height="18" fill="#0d1117"/>
    {/* Screen */}
    <rect x="4" y="4" width="24" height="16" fill="#001a0d"/>
    {/* Scanlines */}
    {[5,7,9,11,13,15,17].map(y => <rect key={y} x="4" y={y} width="24" height="1" fill="rgba(0,255,65,0.05)"/>)}
    {/* VAR text on screen */}
    <text x="16" y="10" textAnchor="middle" fill="#00FF41" fontSize="4" fontFamily="monospace" fontWeight="bold">VAR</text>
    <text x="16" y="15" textAnchor="middle" fill="#00AA30" fontSize="3" fontFamily="monospace">REVIEW</text>
    {/* Green scan line */}
    <rect x="4" y="17" width="24" height="1" fill="#00FF41" opacity="0.4"/>
    {/* Stand */}
    <rect x="13" y="22" width="6" height="4" fill="#333"/>
    <rect x="10" y="26" width="12" height="3" fill="#444"/>
    <rect x="8" y="29" width="16" height="2" fill="#555"/>
    {/* Power light */}
    <rect x="27" y="19" width="2" height="2" fill={active ? '#00FF41' : '#334'}/>
  </motion.svg>
)

// --- Red Card ---
export const RedCardSprite = ({ size = 40, shake = false }) => (
  <motion.svg width={size} height={size * 1.5} viewBox="0 0 16 24" style={PIX}
    animate={shake ? {
      rotate: [-20, 20, -20, 20, -10, 10, 0],
      scale: [1, 1.25, 1.25, 1.25, 1.1, 1.1, 1],
    } : {}}
    transition={{ duration: 0.6 }}>
    <rect x="1" y="0" width="14" height="22" rx="1" fill="#EF0107"/>
    <rect x="2" y="1" width="12" height="20" fill="#FF2222"/>
    <rect x="1" y="0" width="14" height="2" fill="#CC0000"/>
    <rect x="1" y="20" width="14" height="2" fill="#CC0000"/>
    <rect x="1" y="0" width="2" height="22" fill="rgba(255,255,255,0.1)"/>
    <rect x="6" y="7" width="4" height="8" fill="rgba(255,255,255,0.1)"/>
  </motion.svg>
)

// --- Star ---
export const StarSprite = ({ size = 16, lit = true }) => (
  <svg width={size} height={size} viewBox="0 0 8 8" style={PIX}>
    <rect x="3" y="0" width="2" height="2" fill={lit ? '#FFD700' : '#333'}/>
    <rect x="1" y="1" width="2" height="2" fill={lit ? '#FFD700' : '#333'}/>
    <rect x="5" y="1" width="2" height="2" fill={lit ? '#FFD700' : '#333'}/>
    <rect x="0" y="3" width="2" height="2" fill={lit ? '#FFD700' : '#333'}/>
    <rect x="6" y="3" width="2" height="2" fill={lit ? '#FFD700' : '#333'}/>
    <rect x="2" y="2" width="4" height="5" fill={lit ? '#FFD700' : '#333'}/>
    <rect x="1" y="5" width="2" height="2" fill={lit ? '#E8B800' : '#333'}/>
    <rect x="5" y="5" width="2" height="2" fill={lit ? '#E8B800' : '#333'}/>
  </svg>
)

// --- Speaker Icon ---
export const SpeakerIcon = ({ muted = false, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" style={PIX}>
    {/* Speaker cone */}
    <rect x="1" y="5" width="4" height="6" fill="white"/>
    <rect x="5" y="3" width="2" height="10" fill="white"/>
    <rect x="7" y="1" width="2" height="14" fill="white"/>
    {!muted && (
      <>
        <rect x="10" y="4" width="1" height="1" fill="white"/>
        <rect x="11" y="3" width="1" height="1" fill="white"/>
        <rect x="12" y="2" width="2" height="1" fill="white"/>
        <rect x="10" y="11" width="1" height="1" fill="white"/>
        <rect x="11" y="12" width="1" height="1" fill="white"/>
        <rect x="12" y="13" width="2" height="1" fill="white"/>
        <rect x="10" y="7" width="3" height="2" fill="white"/>
      </>
    )}
    {muted && (
      <>
        <rect x="10" y="5" width="2" height="2" fill="#EF0107"/>
        <rect x="12" y="7" width="2" height="2" fill="#EF0107"/>
        <rect x="10" y="9" width="2" height="2" fill="#EF0107"/>
        <rect x="11" y="6" width="2" height="2" fill="rgba(255,0,0,0.5)"/>
      </>
    )}
  </svg>
)

// --- Trophy ---
export const TrophySprite = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" style={PIX}>
    <rect x="4" y="0" width="8" height="2" fill="#C8A000"/>
    <rect x="3" y="2" width="10" height="6" fill="#D4A010"/>
    <rect x="4" y="3" width="8" height="4" fill="#E8B820"/>
    <rect x="1" y="2" width="2" height="4" fill="#C8A000"/>
    <rect x="13" y="2" width="2" height="4" fill="#C8A000"/>
    <rect x="5" y="8" width="6" height="2" fill="#C8A000"/>
    <rect x="6" y="10" width="4" height="2" fill="#B89000"/>
    <rect x="4" y="12" width="8" height="2" fill="#C8A000"/>
    <rect x="5" y="5" width="1" height="2" fill="#FFD700"/>
    <rect x="7" y="4" width="1" height="3" fill="#FFD700"/>
  </svg>
)

// --- Pixel Football ---
export const FootballSprite = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" style={PIX}>
    <rect x="4" y="0" width="8" height="2" fill="#ddd"/>
    <rect x="2" y="2" width="12" height="12" fill="#eee"/>
    <rect x="0" y="4" width="2" height="8" fill="#ddd"/>
    <rect x="14" y="4" width="2" height="8" fill="#ddd"/>
    <rect x="4" y="14" width="8" height="2" fill="#ddd"/>
    <rect x="6" y="2" width="4" height="2" fill="#222"/>
    <rect x="4" y="4" width="4" height="4" fill="#222"/>
    <rect x="8" y="6" width="4" height="4" fill="#222"/>
    <rect x="4" y="10" width="2" height="2" fill="#222"/>
    <rect x="10" y="4" width="2" height="2" fill="#222"/>
  </svg>
)

// --- Pixel Emirates Stadium (mini) ---
export const StadiumMini = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 32 20" style={PIX}>
    <rect x="0" y="16" width="32" height="4" fill="#1a5c1a"/>
    <rect x="0" y="10" width="32" height="6" fill="#1a1a2e"/>
    <rect x="0" y="8" width="32" height="2" fill="#EF0107"/>
    <rect x="0" y="4" width="4" height="6" fill="#16213e"/>
    <rect x="28" y="4" width="4" height="6" fill="#16213e"/>
    <rect x="4" y="2" width="24" height="6" fill="#16213e"/>
    <rect x="6" y="0" width="20" height="4" fill="#1a1a2e"/>
    {[2,6,10,14,18,22,26].map(x => <rect key={x} x={x} y={2} width="2" height="4" fill="#EF0107" opacity="0.6"/>)}
  </svg>
)
