import React, { useState } from 'react';
import './App.css';

const initialBoard = Array(9).fill('');

function App() {
  const [board, setBoard] = useState(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);

  const handleCellClick = (index) => {
    if (board[index] === '' && !winner) {
      const updatedBoard = [...board];
      updatedBoard[index] = currentPlayer;
      setBoard(updatedBoard);
      checkWinner(updatedBoard, currentPlayer);
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const checkWinner = (board, player) => {
    const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let condition of winningConditions) {
      const [a, b, c] = condition;
      if (board[a] === player && board[b] === player && board[c] === player) {
        setWinner(player);
        break;
      }
    }
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setCurrentPlayer('X');
    setWinner(null);
  };

  const renderCells = () => {
    return board.map((cell, index) => (
      <div
        key={index}
        className={`cell ${cell}`}
        onClick={() => handleCellClick(index)}
      >
        {cell}
      </div>
    ));
  };

  return (
    <div className="the-game">
      <h1>Tic-Tac-Toe</h1>
      <div className='board-border'>
        <div className='board-area'>
          <div className="board">
            {renderCells()}
          </div>
        </div>
      </div>
      {winner && (
        <div className="winner">
          <p>{`Congratulations!!! ${winner} wins!!!`}</p>
          <button onClick={resetGame}>Restart</button>
        </div>
      )}
    </div>
  );
}

export default App;
