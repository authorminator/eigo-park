export default function GameCard({ title, isBold = false }) {
  return (
    <div
      className={`bg-blue-100 hover:bg-blue-200 transition p-5 rounded-md text-center cursor-pointer active:translate-y-1 transition-transform duration-150 ${
        isBold ? "font-bold" : "font-semibold"
      }`}
    >
      {title}
    </div>
  );
}
