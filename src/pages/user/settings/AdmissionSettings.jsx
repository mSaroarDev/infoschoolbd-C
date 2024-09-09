import { ArrowLeft } from "lucide-react";
import PageHeader from "../../../components/PageHeader";
import { Link } from "react-router-dom";
import AdmissionSettingsForm from "../../../components/AdmissionSettingsForm";

export default function AdmissionSettingsPage() {
  return (
    <>
      <Link
        to="/user/settings"
        className="bg-[#292929] text-white px-6 py-2 rounded flex items-center gap-2 w-fit mb-3"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>ফিরুন</span>
      </Link>
      <div className="border border-borderColor rounded-md overflow-hidden">
        <div className="bg-lightBg px-4 py-2">
          <PageHeader text="অ্যাডমিশন সেটিংস" />
        </div>

        <div className="p-5">
          <AdmissionSettingsForm />
        </div>
      </div>
    </>
  );
}
