import { ArrowLeft } from "lucide-react";
import PageHeader from "../../../components/PageHeader";
import { useNavigate } from "react-router-dom";
import EditStaffForm from "../../../components/StaffEditForm";

export default function EditStaffPage() {
  const navigate = useNavigate();

  return (
    <>
      <button onClick={()=> navigate(-1)}
        className="bg-[#292929] text-white px-6 py-2 rounded flex items-center gap-2 w-fit mb-3"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>ফিরুন</span>
      </button>
      <div className="border border-borderColor rounded-md overflow-hidden">
        <div className="bg-lightBg px-4 py-2">
          <PageHeader text="স্টাফ তথ্য এডিট করুন" />
        </div>

        <div>
          <EditStaffForm />
        </div>
      </div>
    </>
  );
}
