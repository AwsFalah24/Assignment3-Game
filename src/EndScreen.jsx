export default function EndScreen({ result, onRetry, onNext }) {
  return (
    <div style={{ maxWidth: 400, margin: '0 auto', padding: 24 }}>
      <h2>Game Over!</h2>
      <div style={{ fontSize: 20, margin: '18px 0', color: '#ffe600' }}>
        <div><strong>Total Time:</strong> {result.totalTime} seconds</div>
        <div><strong>Attempts:</strong> {result.attempts}</div>
        <div><strong>Accuracy:</strong> {(result.accuracy * 100).toFixed(1)}%</div>
      </div>
      <div style={{ margin: '18px 0', fontSize: 18, color: '#ffe600' }}>
        Nice work! Keep practicing.
      </div>
      <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
        <button style={{ fontSize: 18, padding: '12px 24px' }} onClick={onRetry}>
          Retry Same Level
        </button>
        <button style={{ fontSize: 18, padding: '12px 24px' }} onClick={onNext}>
          Move to Next Level
        </button>
      </div>
    </div>
  )
} 