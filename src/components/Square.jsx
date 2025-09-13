export default function Square({ value, onClick, disabled }) {
  const style = `w-30 h-30 border border-gray-400 rounded-2xl flex items-center justify-center text-8xl font-bold bg-white  ${
    value === "X" ? "text-purple-500" : "text-blue-500"
  } ${
    disabled
      ? "cursor-default opacity-50"
      : "cursor-pointer hover:bg-gray-100 transition"
  }`;

  return (
    <button
      type="button"
      onClick={onClick}
      className={style}
      disabled={disabled}
    >
      {value}
    </button>
  );
}
