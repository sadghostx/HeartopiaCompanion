import CropsContent from "./CropsContent";
import AuthGuard from "../components/AuthGuard";

export default function CropsPage() {
  return (
    <AuthGuard>
      <main className="p-4">
        <h1 className="text-2xl font-semibold mb-4">Crops</h1>
        <CropsContent />
      </main>
    </AuthGuard>
  );
}