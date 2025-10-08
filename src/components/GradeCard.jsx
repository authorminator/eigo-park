export default function GradeCard({ title }) {
  return (
    <div className="bg-white hover:bg-blue-100 transition shadow-md rounded-lg p-6 w-40 text-center cursor-pointer active:translate-y-1 transition-transform duration-150">
      <h3 className="text-lg font-medium">{title}</h3>
    </div>
  );
}
