import { ArrowLeft } from "lucide-react";
import PageHeader from "../../../../components/PageHeader";
import { useNavigate } from "react-router-dom";
import TestimonialForm from "../../../../components/TestimonialForm";

export default function NewTestimonials() {
  const navigate = useNavigate();

  return (
    <>
      <button
        onClick={() => navigate(-1)}
        className="bg-[#292929] text-white px-6 py-2 rounded flex items-center gap-2 w-fit mb-3"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>ফিরুন</span>
      </button>
      <div className="border border-borderColor rounded-md overflow-hidden">
        <div className="bg-lightBg px-4 py-2">
          <PageHeader text="শুভাকাঙ্গীদের বাণী" />
        </div>

        <div className="p-5">
          <TestimonialForm />
        </div>
      </div>
    </>
  );
}
