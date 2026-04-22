import IncompleteContent from "./IncompleteContent";
import AuthGuard from "../components/AuthGuard";

export default function IncompletePage() {
  return (
    <AuthGuard>
      <IncompleteContent />
    </AuthGuard>
  );
}