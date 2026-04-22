import FashionwaveContent from "./FashionwaveContent";
import AuthGuard from "../components/AuthGuard";

export default function FashionwavePage() {
  return (
    <AuthGuard>
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-4 text-purple-700">Fashionwave</h1>
        <FashionwaveContent />
      </div>
    </AuthGuard>
  );
}