import BackButton from "../components/BackButton";
import { useEffect, useState } from "react";
// import { motion } from "motion/react";
import TictactoeBoard from "../components/TictactoeBoard";
import Switch from "../components/Switch";

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [isXSwitch, setIsXSwitch] = useState(true);
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);
  const [gameText, setGameText] = useState("Let's Play!");
  const [blankBoard, setBlankBoard] = useState(true);

  function handleSquareClick(index) {
    if (board[index] || winner) return;

    const newBoard = board.slice();
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
    setBlankBoard(false);
    // console.log("isXNext is: " + isXNext);
    // console.log("isXSwitch is: " + isXSwitch);
  }

  function resetGame() {
    setBoard(Array(9).fill(null));
    // console.log("isXNext is: " + isXNext);
    // console.log("isXSwitch is: " + isXSwitch);
    setIsXNext(isXSwitch);
    setWinner(null);
    setIsDraw(false);
    setGameText("Let's Play!");
    setBlankBoard(true);
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
      <h1 className="text-6xl font-bold my-6">Tic Tac Toe</h1>
      <p className="mb-4 text-2xl">{gameText}</p>
      <TictactoeBoard
        board={board}
        onSquareClick={handleSquareClick}
        gameOver={winner || isDraw}
      />
      <p className="text-lg italic mt-6">Starting Player:</p>
      <div className="mt-2 flex items-center space-x-4">
        <span className="text-lg">Player O</span>
        <Switch
          initial={isXNext}
          disabled={!blankBoard}
          colorLeft="bg-blue-400"
          colorRight="bg-purple-500" //Color is broken. Need to fix.
          onToggle={(val) => {
            if (!winner && !isDraw) {
              setIsXNext(val);
              setIsXSwitch(val);
            }
          }}
        />
        <span className="text-lg">Player X</span>
      </div>
      <div className="flex mt-6 space-x-4 h-14">
        <button
          className="w-32 ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer active:translate-y-1 transition-transform duration-150"
          onClick={resetGame}
        >
          Reset
        </button>
        <BackButton />
      </div>
    </div>
  );
}
