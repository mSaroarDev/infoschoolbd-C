import { ArrowLeft, MessagesSquare, Reply } from "lucide-react";
import PageHeader from "./../../../components/PageHeader";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useUserInfo } from "./../../../utils/useUserInfo";
import { useEffect, useState } from "react";
import { deletemessage, getmessageDetails } from "../../../libs/message";
import Spinner from "../../../components/spinner/Spinner";
import { showError, showSuccess } from "./../../../utils/toastMessage";
import ConfirmModal from "./../../../components/ConfirmModal";

export default function MessageDetailsPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const user = useUserInfo();
  const navigate = useNavigate();

  // data
  const [data, setData] = useState();
  const fetchData = async () => {
    setLoading(true);
    const res = await getmessageDetails(id);

    setLoading(false);
    if (res.ok) {
      const data = await res.json();
      setData(data.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  // delete message
  const [showModal, setShowModal] = useState(false);
  const handleDelete = async () => {
    setLoading(true);
    const res = await deletemessage(id);

    setLoading(false);
    if (res.ok) {
      showSuccess("Message Deleted");
      fetchData();
      navigate("/developer/messages?page=1")
    } else {
      showError("Message Delete Failed");
    }
  };

  return (
    <>
      {loading && <Spinner />}
      <div className="flex items-center justify-between">
        <Link
          to={`/${
            user?.account_type == "Developer" ? "developer" : "user"
          }/messages?page=1`}
          className="bg-[#292929] text-white px-6 py-2 rounded flex items-center gap-2 w-fit mb-3"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{user?.account_type == "Developer" ? "Back" : "ফিরুন"}</span>
        </Link>

        <div className="flex items-center gap-2">
          {user && user?.account_type !== "Client" ? (
            <button
              className="bg-red-600 text-white px-4 py-2 rounded mb-3"
              onClick={() => setShowModal(true)}
            >
              Delete
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="border border-borderColor rounded-md overflow-hidden">
        <div className="bg-lightBg px-4 py-2">
          <PageHeader
            text={
              user?.account_type == "Developer"
                ? "Message Details"
                : "মেসেজ বিস্তারিত"
            }
            icon={<MessagesSquare className="w-5 h-5" />}
          />
        </div>

        <div className="flex items-start gap-5 p-5">
          <div className="min-w-[60px]">
            <img
              src={
                (data?.created_by?.image && data?.created_by?.image) ||
                "/placeholder.jpg"
              }
              alt="Saroar"
              className="w-[50px] h-[50px] rounded-full ring"
            />
          </div>
          <div className="w-full ">
            <h2 className="font-bold text-[17px]">
              {data?.created_by?.name_en}
            </h2>
            <p>{`${data?.created_by?.designation}, ${data?.institute?.name_en} <${data?.created_by?.email}>`}</p>
            <p className="mt-7 mb-3 font-bold">বিষয়ঃ {data?.title}</p>
            <div
              dangerouslySetInnerHTML={{__html: data?.description}}
            />

            <button
              type="button"
              className="border-[2px] border-blue-400 px-3 py-2 rounded-md flex items-center gap-3 mt-7 font-bold bangla-font"
            >
              <Reply className="w-5 h-5" />
              <span>রিপ্লাই</span>
            </button>
          </div>
        </div>
      </div>

      {/* modal */}
      {showModal && (
        <ConfirmModal
          confirmFunction={handleDelete}
          message="Delete the message?"
          setConfirm={setShowModal}
        />
      )}
    </>
  );
}
