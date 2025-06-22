import { useState } from 'react'

const levels = [
  { label: 'Beginner', value: 'beginner' },
  { label: 'Intermediate', value: 'intermediate' },
  { label: 'Advanced', value: 'advanced' },
]
const themes = [
  { label: 'Numbers', value: 'numbers' },
  { label: 'Letters', value: 'letters' },
  { label: 'Symbols', value: 'symbols' },
]

const buttonRowStyle = {
  display: 'flex',
  gap: 18,
  marginTop: 8,
  justifyContent: 'center',
}
const buttonStyle = {
  fontSize: 18,
  padding: '16px 36px',
  minWidth: 150,
  fontWeight: 600,
  borderRadius: 12,
  boxShadow: '0 2px 8px 0 rgba(44,0,77,0.10)',
}

const selectedButtonStyle = {
  background: 'linear-gradient(90deg, #ffe600 80%, #fff700 100%)',
  color: '#2d004d',
  border: '3px solid #fff700',
  boxShadow: '0 0 0 4px rgba(255,230,0,0.18), 0 4px 24px 0 rgba(255,230,0,0.25)',
  transform: 'scale(1.12)',
  zIndex: 1,
  transition: 'all 0.22s cubic-bezier(.4,2,.6,1)',
  animation: 'glowPulse 1.2s infinite alternate',
}

// Add keyframes for glowPulse
const styleSheet = document.createElement('style');
styleSheet.innerHTML = `@keyframes glowPulse { 0% { box-shadow: 0 0 0 4px rgba(255,230,0,0.18), 0 4px 24px 0 rgba(255,230,0,0.25); } 100% { box-shadow: 0 0 0 8px rgba(255,230,0,0.28), 0 8px 32px 0 rgba(255,230,0,0.32); } }`;
document.head.appendChild(styleSheet);

export default function LevelSelectionScreen({ onStart }) {
  const [level, setLevel] = useState('beginner')
  const [theme, setTheme] = useState('numbers')
  const [highContrast, setHighContrast] = useState(false)

  return (
    <div style={{ maxWidth: 400, margin: '0 auto', padding: 24 }}>
      <h2>MemoryMatrix</h2>
      <div style={{ marginBottom: 16 }}>
        <strong>Level:</strong>
        <div style={buttonRowStyle}>
          {levels.map(l => (
            <button
              key={l.value}
              style={{
                ...buttonStyle,
                fontWeight: level === l.value ? 'bold' : 600,
                ...(level === l.value ? selectedButtonStyle : {}),
                ...(l.value === 'intermediate' || l.value === 'advanced' ? {
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                } : {}),
              }}
              onClick={() => setLevel(l.value)}
              aria-pressed={level === l.value}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>
      <div style={{ marginBottom: 16 }}>
        <strong>Theme:</strong>
        <div style={buttonRowStyle}>
          {themes.map(t => (
            <button
              key={t.value}
              style={{
                ...buttonStyle,
                fontWeight: theme === t.value ? 'bold' : 600,
                ...(theme === t.value ? selectedButtonStyle : {}),
              }}
              onClick={() => setTheme(t.value)}
              aria-pressed={theme === t.value}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 16 }}>
          <input
            type="checkbox"
            checked={highContrast}
            onChange={e => setHighContrast(e.target.checked)}
          />{' '}
          High Contrast
        </label>
      </div>
      <button
        style={{ fontSize: 20, padding: '14px 32px', marginTop: 16 }}
        onClick={() => onStart({ level, theme, highContrast })}
      >
        Start Game
      </button>
    </div>
  )
} 