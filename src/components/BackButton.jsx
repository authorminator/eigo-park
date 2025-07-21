import { useNavigate } from "react-router-dom";

export default function BackButton({ to = "/" }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(to)}
      className="bg-blue-200 hover:bg-blue-300 px-4 py-2 rounded mt-4 font-semibold"
    >
      ← Go Back
    </button>
  );
}
