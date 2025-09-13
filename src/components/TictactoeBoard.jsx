import Square from "./Square";

export default function TictactoeBoard({ board, onSquareClick, gameOver }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {board.map((value, index) => (
        <Square
          key={index}
          value={value}
          onClick={() => onSquareClick(index)}
          disabled={gameOver}
        />
      ))}
    </div>
  );
}
