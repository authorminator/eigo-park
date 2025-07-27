import BackButton from "../components/BackButton";

export default function ComingSoon() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-6 text-center">
        <h1 className="text-3xl font-bold mb-4">Coming Soon !</h1>
        <BackButton />
      </div>
    </div>
  );
}
