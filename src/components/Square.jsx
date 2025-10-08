// import { motion } from "motion/react";

// export default function Square({ value, onClick, disabled }) {
//   const style = `w-30 h-30 border border-gray-400 rounded-2xl flex items-center justify-center text-8xl font-bold bg-white  ${
//     value === "X" ? "text-purple-500" : "text-blue-500"
//   } ${
//     disabled
//       ? "cursor-default opacity-50"
//       : "cursor-pointer hover:bg-gray-100 transition"
//   }`;

//   return (
//     <motion.button
//       type="button"
//       onClick={onClick}
//       className={style}
//       disabled={disabled}
//       whileHover={!disabled && !value ? { skewX: -4 } : { skewX: 0 }}
//       whileTap={{ scale: 0.9, skewX: 0 }}
//     >
//       {value}
//     </motion.button>
//   );
// }
// ---------------

// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { memo } from "react";

function Square({ value, onClick, disabled }) {
  const isX = value === "X";
  const isFilled = value === "X" || value === "O";

  const classes = [
    "w-24 aspect-square", // ensures square shape
    "border border-gray-400 rounded-2xl",
    "flex items-center justify-center",
    "text-6xl font-bold bg-white leading-none select-none",
    disabled
      ? "cursor-default pointer-events-none opacity-70"
      : "cursor-pointer hover:bg-gray-100 transition",
    isFilled ? (isX ? "text-purple-500" : "text-blue-500") : "text-transparent",
  ].join(" ");

  const hoverAnim =
    !disabled && !isFilled
      ? {
          skewX: -8,
          transition: { duration: 0.12, easing: "linear" },
        }
      : { skewX: 0 };

  const tapAnim =
    !disabled && !isFilled
      ? {
          scale: 0.96,
          skewX: 0,
          transition: { duration: 0.06, easing: "linear" },
        }
      : undefined;

  return (
    <motion.button
      type="button"
      onClick={disabled ? undefined : onClick}
      // onTouch
      className={classes}
      disabled={disabled}
      aria-label={isFilled ? `Cell ${value}` : "Empty cell"}
      initial={false}
      animate={{ skewX: 0, scale: 1 }}
      whileHover={hoverAnim}
      whileTap={tapAnim}
    >
      {value || ""}
    </motion.button>
  );
}

export default memo(Square);
