import { ArrowLeft } from "lucide-react";
import PageHeader from "../../../components/PageHeader";
import { Link } from "react-router-dom";
import NewMessageForm from "../../../components/NewMessageForm";

export default function MessageCreatePage() {
  return (
    <>
      <Link
        to="/developer/messages?page=1"
        className="bg-[#292929] text-white px-6 py-2 rounded flex items-center gap-2 w-fit mb-3"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back</span>
      </Link>
      <div className="border border-borderColor rounded-md overflow-hidden">
        <div className="bg-lightBg px-4 py-2">
          <PageHeader text="Compose New Message" />
        </div>

        <div className="p-5">
          <NewMessageForm />
        </div>
      </div>
    </>
  );
}
