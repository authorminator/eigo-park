import { useNavigate } from "react-router-dom";

export default function BackButton({ to = "/" }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(to)}
      className="w-32 bg-blue-200 hover:bg-blue-300 px-4 py-3 rounded font-semibold cursor-pointer active:translate-y-1 transition-transform duration-150"
    >
      ← Go Back
    </button>
  );
}
