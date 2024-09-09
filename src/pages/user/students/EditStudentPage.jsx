import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../../components/PageHeader";
import EditStudentForm from "../../../components/EditStudentProfile";

export default function EditStudentPage() {
  const navigate = useNavigate();

  return (
    <>
      <button
        onClick={() => navigate(-1)}
        className="bg-[#292929] text-white px-6 py-2 rounded flex items-center gap-2 w-fit mb-3 font-semibold"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>ফিরুন</span>
      </button>
      <div className="border border-borderColor rounded-md overflow-hidden">
        <div className="bg-lightBg px-4 py-2">
          <PageHeader text="শিক্ষার্থীর তথ্য পরিবর্তন" />
        </div>

        <EditStudentForm />
      </div>
    </>
  );
}
