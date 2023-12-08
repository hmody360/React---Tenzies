import React from "react";

import Die from "./components/Die"
import Confetti from 'react-confetti'
const App = () => {
    const allNewDice = () => {
        const diceArr = []
        for (let i = 1; i <= 10; i++) {
            diceArr.push({
                id: i,
                number: Math.floor(Math.random() * 6 + 1),
                isHeld: false
            })
        }
        return diceArr
    }


    const [dieObjects, setDieObjects] = React.useState(allNewDice)
    const [Tenzies, setTenzies] = React.useState(false)
    const [numOfRolls, setNumOfRolls] = React.useState(0)

    React.useEffect(() => {
        if (dieObjects.every(obj => obj.isHeld == true) && dieObjects.every(obj => 
            obj.number == dieObjects[0].number
        )) {
            setTenzies(true)
            console.log("You Win!")
        }
        
    }, [dieObjects])

    const holdDice = (id) => {
        setDieObjects(prevObjects => prevObjects.map(obj => {
            return obj.id == id ? 
            {...obj, isHeld: !obj.isHeld}
            : obj
        })
        )
    }
    const rollDice = () => {
        setDieObjects(prevObjects => prevObjects.map(obj => {
            return obj.isHeld == true
            ? obj 
            : {...obj, number: Math.floor(Math.random() * 6 + 1)}
        }
        ))
        setNumOfRolls(prev => prev + 1)
    }
    const resetGame = () => {
        setDieObjects(allNewDice)
        setTenzies(false)
        setNumOfRolls(0)
    }

    const dieArray = dieObjects.map(num => {
        return <Die value={num.number} key={num.id} isHeld={num.isHeld} holdFunc={() => holdDice(num.id)}/>
    })
    





    return (
        <main className="app-container">
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze at its current value between rolls</p>
            <p className="num-of-rolls">{`Number of Rolls: ${numOfRolls}`}</p>
            <div className="dice-container">
                {dieArray}
            </div>
            <button className="roll-btn" onClick={Tenzies ? resetGame : rollDice}>{Tenzies ? "New Game" : "Roll"}</button>
            {Tenzies && <Confetti />}
        </main>
    )
}

export default App