import { useState } from "react";

const COLOR_MAP = {
  "blue-500": "bg-blue-500",
  "purple-500": "bg-purple-500",
  "red-500": "bg-red-500",
  "green-500": "bg-green-500",
  "yellow-500": "bg-yellow-500",
  // add more allowed colors as needed
};

function Switch({
  initial = false,
  onToggle,
  disabled = false,
  colorLeft = "blue-500",
  colorRight = "purple-500",
}) {
  const [isOn, setIsOn] = useState(initial);

  const handleToggle = () => {
    if (disabled) return; // prevent toggle if disabled
    setIsOn(!isOn);
    if (onToggle) onToggle(!isOn); // optional callback
  };

  return (
    <div
      onClick={handleToggle}
      className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors scale-100
        ${isOn ? COLOR_MAP[colorRight] : COLOR_MAP[colorLeft]}
        ${
          disabled
            ? "cursor-default pointer-events-none opacity-50"
            : "hover:scale-110 transition-transform duration-300"
        }`}
    >
      <div
        className={`bg-white opacity-80 w-6 h-6 rounded-full shadow-md transform transition-transform
          ${isOn ? "translate-x-6" : "translate-x-0"}
          ${disabled ? "opacity-50" : ""}`}
      ></div>
    </div>
  );
}

export default Switch;
