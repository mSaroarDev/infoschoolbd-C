import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <>
      <button
        onClick={() => navigate(-1)}
        className="button-dark flex items-center gap-2 mb-5"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back</span>
      </button>
    </>
  );
}
