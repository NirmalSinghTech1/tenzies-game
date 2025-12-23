import { useState, useRef, useEffect } from 'react'
import './App.css'
import Die from './components/Die'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

// Generate all new Dice
function generateAllDice() {
  return new Array(10)
    .fill(0)
    .map(() => ({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
      }))
}

function App() {
  const [dice, setDice] = useState(() => generateAllDice())
  const focusBtn = useRef(null)

  const newGame = dice.every( die => die.isHeld) && dice.every( die => dice[0].value === die.value)
  
  // All die buttons
  const dieButtons = dice.map( die => {
    return <Die 
        key={die.id} 
        value={die.value} 
        id={die.id}
        hold={() => hold(die.id)}
        isHeld={die.isHeld}
      />
  })

  // function to roll all dice
  function rollDice() {
    if(!newGame) {
      setDice(prevDice => prevDice.map( die => {
        return die.isHeld ? die : {...die, value: Math.ceil(Math.random() * 6)}
      }))
    } else {
      setDice(generateAllDice())
    }
  }

  // Hold particular die when clicked
  function hold(id) {
    setDice( prevDice => prevDice.map( die => {
      return die.id === id ? {...die, isHeld: !die.isHeld} : die
    }))
  }

  useEffect(() => {
    focusBtn.current.focus()
  }, [newGame])

  return (
    <>
      {newGame && <p aria-live='polite' role='status' className='visually-hidden'>Game finished, to start a new game, press new game button by pressing space or enter key</p>}
      {newGame && <Confetti />}
      <main>
        <h1>Tenzies</h1>
        <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="dice-container">
          {dieButtons}
        </div>
        <button 
            aria-label={`${newGame ? "Start a new Game" : "Roll dice"}`}
            className='roll-dice' 
            onClick={rollDice}
            ref={focusBtn}
          >{newGame ? "New Game" :"Roll"}
          </button>
      </main>
    </>
  )
}

export default App
