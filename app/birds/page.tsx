import BirdsContent from "./BirdsContent";
import AuthGuard from "../components/AuthGuard";

export default function BirdsPage() {
  return (
    <AuthGuard>
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-4 text-purple-700">Birds</h1>
        <BirdsContent />
      </div>
    </AuthGuard>
  );
}
  }