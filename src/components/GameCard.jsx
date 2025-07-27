export default function GameCard({ title, isBold = false }) {
  return (
    <div
      className={`bg-blue-200 hover:bg-blue-300 transition p-5 rounded-md text-center cursor-pointer ${
        isBold ? "font-bold" : "font-semibold"
      }`}
    >
      {title}
    </div>
  );
}
