import { useState } from 'react'
import './App.css'
import LevelSelectionScreen from './LevelSelectionScreen'
import GamePlayScreen from './GamePlayScreen'
import EndScreen from './EndScreen'

function App() {
  const [screen, setScreen] = useState('level') // 'level', 'game', 'end'
  const [gameConfig, setGameConfig] = useState(null)
  const [gameResult, setGameResult] = useState(null)

  const startGame = (config) => {
    setGameConfig(config)
    setScreen('game')
  }

  const endGame = (result) => {
    setGameResult(result)
    setScreen('end')
  }

  const retryLevel = () => {
    setScreen('game')
  }

  const nextLevel = () => {
    // For now, just go back to level selection
    setScreen('level')
  }

  const returnToMenu = () => {
    setScreen('level')
    setGameConfig(null)
    setGameResult(null)
  }

  return (
    <div className={`App${(screen === 'level' && gameConfig?.highContrast) || (screen !== 'level' && gameConfig?.highContrast) ? ' high-contrast' : ''}`}>
      {screen === 'level' && <LevelSelectionScreen onStart={startGame} />}
      {screen === 'game' && gameConfig && (
        <GamePlayScreen config={gameConfig} onEnd={endGame} onMenu={returnToMenu} />
      )}
      {screen === 'end' && gameResult && (
        <EndScreen result={gameResult} onRetry={retryLevel} onNext={nextLevel} />
      )}
    </div>
  )
}

export default App
