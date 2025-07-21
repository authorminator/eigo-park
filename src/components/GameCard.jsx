export default function GameCard({ title }) {
  return (
    <div className="bg-blue-200 hover:bg-blue-300 transition p-4 rounded-md text-center font-semibold cursor-pointer">
      {title}
    </div>
  );
}
