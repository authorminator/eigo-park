import BackButton from "../components/BackButton";
import { useEffect, useState } from "react";
// import { motion } from "motion/react";
import TictactoeBoard from "../components/TictactoeBoard";

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);
  const [gameText, setGameText] = useState("Let's Play!");

  function handleSquareClick(index) {
    if (board[index] || winner) return;

    const newBoard = board.slice();
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  }

  function resetGame() {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setIsDraw(false);
    setGameText("Let's Play!");
  }

  function calculateWinner(board) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  }

  useEffect(() => {
    const win = calculateWinner(board);
    if (win) {
      setWinner(win);
      setGameText(`Player ${win} wins!`);
    } else if (!board.includes(null)) {
      setGameText("It's a draw!");
      setIsDraw(true);
    }
  }, [board]);

  return (
    <div className="flex flex-col items-center justify-center min-h-dvh bg-blue-50 p-4 tictactoe-font">
      <div className="flex">
        <BackButton />
        <button
          className="w-32 h-14 mt-4 ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
          onClick={resetGame}
        >
          Reset
        </button>
      </div>
      <h1 className="text-6xl font-bold my-6">Tic Tac Toe</h1>
      <p className="mb-4 text-2xl">{gameText}</p>
      <TictactoeBoard
        board={board}
        onSquareClick={handleSquareClick}
        gameOver={winner || isDraw}
      />
    </div>
  );
}
