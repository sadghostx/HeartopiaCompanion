import FishContent from "./FishContent";
import AuthGuard from "../components/AuthGuard";

export default function FishPage() {
  return (
    <AuthGuard>
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-4 text-purple-700">Fish</h1>
        <FishContent />
      </div>
    </AuthGuard>
  );
}