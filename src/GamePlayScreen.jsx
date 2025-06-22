import { useEffect, useState } from 'react'

function getGridConfig(level) {
  if (level === 'beginner') return { pairs: 6, columns: 4 }
  if (level === 'intermediate') return { pairs: 10, columns: 5 }
  if (level === 'advanced') return { pairs: 15, columns: 6 }
  return { pairs: 6, columns: 4 }
}

function generateCards(theme, pairs) {
  let values
  if (theme === 'numbers') values = Array.from({ length: pairs }, (_, i) => (i + 1).toString())
  else if (theme === 'letters') values = Array.from({ length: pairs }, (_, i) => String.fromCharCode(65 + i))
  else {
    const symbolList = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '?', '+', '=', '~', '€', '£', '§', '¢', '¥', '¤', 'µ', '¶', '•', 'ª', 'º', '¿', '¡', '©', '®', '™']
    values = symbolList.slice(0, pairs)
  }
  const cards = [...values, ...values].map((value, i) => ({
    id: i,
    value,
    flipped: false,
    matched: false,
  }))
  // Shuffle
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[cards[i], cards[j]] = [cards[j], cards[i]]
  }
  return cards
}

export default function GamePlayScreen({ config, onEnd, onMenu }) {
  const { pairs, columns } = getGridConfig(config.level)
  const [cards, setCards] = useState(() => generateCards(config.theme, pairs))
  const [flipped, setFlipped] = useState([])
  const [matchedCount, setMatchedCount] = useState(0)
  const [attempts, setAttempts] = useState(0)
  const [feedback, setFeedback] = useState('')
  const [startTime] = useState(Date.now())

  useEffect(() => {
    if (flipped.length === 2) {
      setTimeout(() => {
        const [i1, i2] = flipped
        if (cards[i1].value === cards[i2].value) {
          const newCards = cards.map((c, idx) =>
            idx === i1 || idx === i2 ? { ...c, matched: true } : c
          )
          setCards(newCards)
          setMatchedCount(matchedCount + 1)
          setFeedback('Good job!')
        } else {
          setFeedback('Try again.')
        }
        setTimeout(() => setFeedback(''), 800)
        setCards(cards =>
          cards.map((c, idx) =>
            flipped.includes(idx) && !c.matched ? { ...c, flipped: false } : c
          )
        )
        setFlipped([])
        setAttempts(a => a + 1)
      }, 900)
    }
  }, [flipped])

  useEffect(() => {
    if (matchedCount === pairs) {
      const totalTime = Math.round((Date.now() - startTime) / 1000)
      onEnd({
        totalTime,
        attempts,
        accuracy: attempts ? (pairs / attempts) : 1,
      })
    }
  }, [matchedCount])

  const handleCardClick = idx => {
    if (cards[idx].flipped || cards[idx].matched || flipped.length === 2) return
    setCards(cards => cards.map((c, i) => (i === idx ? { ...c, flipped: true } : c)))
    setFlipped(f => [...f, idx])
  }

  return (
    <div style={{ maxWidth: columns * 90, margin: '0 auto', padding: 24 }}>
      <h2>Match the Pairs</h2>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '24px 0',
        overflow: 'visible',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, 70px)`,
          gridGap: 18,
          margin: '0 auto',
        }}>
          {cards.map((card, idx) => (
            <button
              key={card.id}
              className={`memory-card${card.flipped ? ' flipped' : ''}${card.matched ? ' matched' : ''}`}
              onClick={() => handleCardClick(idx)}
              aria-label={card.flipped || card.matched ? card.value : 'Hidden card'}
              aria-disabled={card.flipped || card.matched}
              style={{ cursor: card.flipped || card.matched ? 'default' : 'pointer' }}
            >
              {card.flipped || card.matched ? card.value : '?'}
            </button>
          ))}
        </div>
      </div>
      <div style={{ fontSize: 18, minHeight: 28 }}>{feedback}</div>
      <div style={{ marginTop: 12, fontSize: 16 }}>
        Pairs: {matchedCount}/{pairs} &nbsp; | &nbsp; Attempts: {attempts}
      </div>
      <div style={{ marginTop: 32, textAlign: 'center' }}>
        <button style={{ fontSize: 16, padding: '10px 28px' }} onClick={onMenu}>
          Return to Menu
        </button>
      </div>
    </div>
  )
} 