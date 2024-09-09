import { ArrowLeft, CircleUserRound } from "lucide-react";
import PageHeader from "../../../components/PageHeader";
import ProfileInfoField from "../../../components/ProfileInfoField";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Spinner from "../../../components/spinner/Spinner";
import { showError, showSuccess } from "../../../utils/toastMessage";
import ConfirmModal from "../../../components/ConfirmModal";
import { deleteStaff, getASatff } from "../../../libs/staffAPI";

export default function StaffProfilePage() {
  // utils
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const fetchData = async () => {
    setLoading(true);
    const res = await getASatff(id);

    setLoading(false);
    if (res.ok) {
      const data = await res.json();
      setData(data.data);
    } else {
      console.log("error", res.json);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // delete function
  const handleDelete = async () => {
    setLoading(true);
    const res = await deleteStaff(id);

    setLoading(false);
    if (res.ok) {
      showSuccess("Staff profile Deleted");
      navigate("/user/staffs?page=1");
    } else {
      showError("Something went wrong");
    }
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <button
            onClick={() => navigate(-1)}
            className="button-dark flex items-center gap-2 mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>ফিরুন</span>
          </button>

          <div className="flex items-center justify-between">
            <PageHeader
              text="স্টাফ প্রোফাইল"
              icon={<CircleUserRound className="w-5 h-5" />}
            />

            <div className="flex items-center gap-1">
              <Link to={`/user/staffs/edit/${id}`} className="button-dark">এডিট</Link>
              <button
                onClick={()=> setShowModal(true)}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                ডিলিট
              </button>
            </div>
          </div>

          {/* profile contents */}
          <div className="mt-10 mb-20 md:mb-0">
            <div className="grid grid-cols-12 gap-5">
              <div className="col-span-12 md:col-span-3 flex flex-col items-center justify-start w-full">
                <div className="h-[150px] w-[150px] rounded-full ring-2 ring-brandColor object-cover overflow-hidden">
                  <img
                    src={(data?.image && data?.image) || "/avatar.jpg"}
                    alt=""
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className="w-full mt-5 flex flex-col items-center font-semibold">
                  <h2 className="bg-blue-600 text-white px-4 py-2 rounded text-center w-fit">
                    {data?.name_bn}
                  </h2>
                </div>
              </div>
              <div className="col-span-12 md:col-span-9">
                <h2 className="text-[18px] font-semibold mb-5">
                  প্রোফাইল তথ্য
                </h2>
                <div className="grid grid-cols-12 gap-5">
                  <ProfileInfoField text="নাম (বাংলায়)" value={data?.name_bn} />
                  <ProfileInfoField
                    text="নাম (ইংরেজীতে))"
                    value={data?.name_en}
                  />
                  <ProfileInfoField
                    text="পিতার নাম"
                    value={data?.father_name}
                  />
                  <ProfileInfoField
                    text="মাতার নাম"
                    value={data?.mother_name}
                  />
                  <ProfileInfoField text="লিঙ্গ" value={data?.gender} />
                  <ProfileInfoField
                    text="জন্ম তারিখ"
                    value={data?.date_of_birth}
                  />
                  <ProfileInfoField text="ঠিকানা" value={data?.address} />
                  <ProfileInfoField text="এনআইডি নং" value={data?.nid} />
                </div>

                <div className="grid grid-cols-12 gap-5 mt-10">
                  <ProfileInfoField text="ইমেইল" value={data?.email} />
                  <ProfileInfoField text="মোবাইল নং" value={data?.mobile_no} />
                </div>

                <div className="grid grid-cols-12 gap-5 mt-10">
                  <ProfileInfoField
                    text="এমপিও ইনডেক্স নং"
                    value={data?.mpo_index_no}
                  />
                  <ProfileInfoField
                    text="পদবী"
                    value={data?.designation}
                  />
                  <ProfileInfoField
                    text="যোগদানের তারিখ"
                    value={data?.joining_date}
                  />
                  <ProfileInfoField
                    text="শিক্ষাগত যোগ্যতা"
                    value={data?.qualification}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <ConfirmModal
          confirmFunction={handleDelete}
          message="Are you sure you want to Delete?"
          setConfirm={setShowModal}
        />
      )}
    </>
  );
}
