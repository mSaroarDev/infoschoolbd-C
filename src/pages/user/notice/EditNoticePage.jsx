import { ArrowLeft } from "lucide-react";
import PageHeader from "../../../components/PageHeader";
import { Link } from "react-router-dom";
import EditNoticeForm from "../../../components/NoticeEditForm";

export default function NoticeEditPage() {
  return (
    <>
      <Link
        to="/user/notices?page=1"
        className="bg-[#292929] text-white px-6 py-2 rounded flex items-center gap-2 w-fit mb-3"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>ফিরুন</span>
      </Link>
      <div className="border border-borderColor rounded-md overflow-hidden">
        <div className="bg-lightBg px-4 py-2">
          <PageHeader text="নোটিশ এডিট করুন" />
        </div>

        <div className="p-5">
          <EditNoticeForm />
        </div>
      </div>
    </>
  );
}
