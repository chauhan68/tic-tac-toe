import React, { useState } from 'react';

import Square from '../Square/Square';
import './Board.css';

import calculateWinner from '../utils/gameUtils';

const Board = () => {
    const [squares, setSquares] = useState(Array.from({ length: 9 }, () => ''));
    const [history, setHistory] = useState([]);
    const [currentValue, updateCurrentValue] = useState('X');
    const [gameWinner, updateGameWinner] = useState('');

    const handleOnClick = (squareToUpdate) => {
        if (squares[squareToUpdate] !== '' || gameWinner) {
            return
        }
        const updatedArray = [...squares];
        updatedArray[squareToUpdate] = currentValue;
        setSquares(updatedArray);
        const updatedCurrentValue = currentValue === 'X' ? 'O' : 'X';
        updateCurrentValue(updatedCurrentValue);
        const gameWonBy = calculateWinner(updatedArray);
        updateGameWinner(gameWonBy);
        const updatedMoves = [...history, updatedArray]
        setHistory(updatedMoves)
    }

    const resetGame = () => {
        setSquares(Array.from({ length: 9 }, () => ''));
        updateCurrentValue('X');
        updateGameWinner('');
        setHistory([])
    }

    const onHistoryClick = (index) => {
        const updatedHistory = history.slice(0, index + 1)
        setHistory(updatedHistory)
        const squaresToRender = updatedHistory[index] || Array.from({ length: 9 }, () => '')
        setSquares(squaresToRender)
        const updatedCurrentValue = index % 2 === 0 ? 'O' : 'X';
        updateCurrentValue(updatedCurrentValue);
        const gameWonBy = calculateWinner(history[index]);
        updateGameWinner(gameWonBy);
        
    }

    return (
        <React.Fragment>
            <div className='board'>
                <h1>{!gameWinner ? squares.some(square => !square) ? `Next Move: ${currentValue}` : 'It\'s a draw!' : `Winner is ${gameWinner}`} </h1>
                {squares.map((squareValue, index) => <Square key={index} id={index} value={squareValue} onClick={handleOnClick} />)}
                <button className='resetButton' onClick={resetGame}>Reset Game</button>
            </div>
            <div className='history-list'>
                {history.map((squares, index) => <button key={index} onClick={() => { onHistoryClick(index) }}>Go to Move {index + 1}</button>)}
            </div>
        </React.Fragment>
    )
};

export default Board;  