import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import PageHeader from "../../../components/PageHeader";
import AdmissionForm from "../../../components/AdmissionForm";

export default function CreateAdmissionForm() {
  return (
    <>
     <Link
        to="/user/admission"
        className="bg-[#292929] text-white px-6 py-2 rounded flex items-center gap-2 w-fit mb-3 font-semibold"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>ফিরুন</span>
      </Link>
      <div className="border border-borderColor rounded-md overflow-hidden">
        <div className="bg-lightBg px-4 py-2">
          <PageHeader text="অ্যাডমিশন ফরম" />
        </div>

        <AdmissionForm />
      </div>
    </>
  )
}