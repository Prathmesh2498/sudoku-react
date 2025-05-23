import React, { useState } from 'react';
import '../styles/Sudoku.css';

// Got some valid values from https://sudokuprimer.com/4x4puzzles.php
const puzzles: number[][][] = [
  [
    [0, 2, 0, 0],
    [3, 0, 0, 0],
    [0, 0, 0, 3],
    [0, 3, 0, 0]
  ],
  [
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [1, 0, 0, 0],
    [0, 0, 3, 1]
  ],
  [
    [1, 0, 0, 0],
    [0, 0, 0, 2],
    [0, 3, 0, 0],
    [0, 0, 2, 0]
  ],
  [
    [3, 0, 2, 0],
    [0, 0, 0, 3],
    [0, 0, 3, 0],
    [1, 0, 0, 0]
  ],
  [
    [0, 2, 0, 0],
    [3, 0, 0, 0],
    [0, 0, 0, 3],
    [0, 0, 4, 0]
  ],
  [
    [0, 1, 2, 0],
    [0, 4, 0, 0],
    [1, 0, 0, 0],
    [0, 3, 0, 2]
  ],
  [
    [1, 0, 0, 0],
    [3, 0, 0, 0],
    [0, 0, 4, 0],
    [0, 0, 1, 0]
  ],
  [
    [3, 0, 0, 0],
    [0, 0, 3, 0],
    [0, 0, 0, 2],
    [4, 0, 1, 0]
  ],
  [
    [1, 0, 3, 0],
    [0, 0, 0, 1],
    [0, 1, 0, 0],
    [0, 0, 1, 2]
  ],
  [
    [0, 2, 0, 0],
    [0, 0, 0, 1],
    [0, 4, 1, 0],
    [3, 0, 0, 2]
  ],
  [
    [0, 0, 2, 0],
    [0, 4, 0, 1],
    [0, 0, 0, 2],
    [1, 0, 4, 0]
  ],
  [
    [0, 1, 0, 4],
    [0, 0, 0, 1],
    [0, 0, 3, 0],
    [0, 0, 0, 3]
  ]
];

const getInitialPuzzle = () => {
  return puzzles[Math.floor(Math.random() * puzzles.length)];
}

const SIZE = 4;

const Sudoku: React.FC = () => {
  const [initialPuzzle, setInitialPuzzle] = useState(getInitialPuzzle());
  const [board, setBoard] = useState(initialPuzzle.map(row => [...row]));
  const [filled, setFilled] = useState(false);
  
  const handleClear = () => {
    setBoard(initialPuzzle.map(row => [...row]));
    setFilled(false);
  }

  const handleNewPuzzle = () => {
    const newPuzzle = getInitialPuzzle();
    setInitialPuzzle(newPuzzle);
    setBoard(newPuzzle.map(row => [...row]));
    setFilled(false);
  }

  const handleChange = (row: number, col: number, value: string) => {
    // Only allow 1-4 or empty
    const num = parseInt(value, 10);
    if ((value !== '' && (isNaN(num) || num < 1 || num > 4))) return;

    // Copy the board and update the value
    const newBoard = board.map(r => [...r]);
    newBoard[row][col] = num;

    //Checks for all filled cells
    let all = true;
    newBoard.forEach(r => {
      r.forEach(c => {
        console.log(c);
        if (!c) {
          all = false;
        }
      })
    })
    if (all) {
      setFilled(true);
    } else {
      setFilled(false);
    }
    setBoard(newBoard);
  };

  const isSolved = (): boolean => {
    for (let i = 0; i < SIZE; i++) {
      const row = new Set(board[i]);
      const col = new Set(board.map(row => row[i]));
  
      if (row.size !== SIZE || col.size !== SIZE) return false;
    }
    return true;
  };

  return (
    <div className='sudoku-container'>
      <h2 className="sudoku-title">Simple 4x4 Sudoku</h2>
      <div className="sudoku-board">
        {board.map((row, rIdx) =>
          row.map((cell, cIdx) => (
            <input
              key={rIdx + '-' + cIdx}
              className="sudoku-cell"
              type="number"
              maxLength={1}
              value={cell === 0 ? '' : cell}
              readOnly={initialPuzzle[rIdx][cIdx] !== 0}
              onChange={e => handleChange(rIdx, cIdx, e.target.value)}
            />
          ))
        )}
      </div>
      <div className='clear-board'>
        <button onClick={handleClear}>Clear Board</button>
        <button onClick={handleNewPuzzle}>New Puzzle</button>
      </div>
      {isSolved() && filled ? <p style={{ color: 'green', textAlign: 'center' }}>Congratulations! You solved it!</p> : 
      filled && !isSolved() && <p style={{ color: 'red', textAlign: 'center' }}>Sorry wrong answer! Please check your solution.</p>}
    </div>
  );
};

export default Sudoku; 