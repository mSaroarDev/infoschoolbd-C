import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import PageHeader from "../../../components/PageHeader";
import CreateSchoolForm from "../../../components/CreateSchoolForm";

export default function DevCreateSchool() {
  return (
    <>
      <Link
        to="/developer/schools?page=1"
        className="button-dark flex items-center gap-2 w-fit mb-3"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to List</span>
      </Link>
      <div className="border border-borderColor rounded-md overflow-hidden">
        <div className="bg-lightBg px-4 py-2">
          <PageHeader text="Create New School" />
        </div>

        <div className="p-5">
          <CreateSchoolForm />
        </div>
      </div>
    </>
  );
}
