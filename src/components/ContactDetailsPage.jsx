import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "./PageHeader";
import { useEffect, useState } from "react";
import { useUserInfo } from "../utils/useUserInfo";
import Spinner from "./spinner/Spinner";
import { ArrowLeft, MessagesSquare, Reply } from "lucide-react";
import { getContactDetails } from "../libs/contacts";
import formatBengaliDate from "../utils/todayDate";

export default function ContactDetailsPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const user = useUserInfo();
  const navigate = useNavigate();

  // data
  const [data, setData] = useState();
  const fetchData = async () => {
    setLoading(true);
    const res = await getContactDetails(id);

    setLoading(false);
    if (res.ok) {
      const data = await res.json();
      setData(data.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <>
      {loading && <Spinner />}
      <div className="flex items-center justify-between">
        <button onClick={()=> navigate(-1)}
          className="bg-[#292929] text-white px-6 py-2 rounded flex items-center gap-2 w-fit mb-3"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{user?.account_type == "Developer" ? "Back" : "ফিরুন"}</span>
        </button>

        <div className="flex items-center gap-2">
          
        </div>
      </div>
      <div className="border border-borderColor rounded-md overflow-hidden">
        <div className="bg-lightBg px-4 py-2">
          <PageHeader
            text={
              user?.account_type == "Developer"
                ? "Contact Details"
                : "মেসেজ বিস্তারিত"
            }
            icon={<MessagesSquare className="w-5 h-5" />}
          />
        </div>

        <div className="flex items-start gap-5 p-5">
          <div className="min-w-[60px]">
            <img
              src={
                (data?.name && data?.created_by?.image) ||
                "/placeholder.jpg"
              }
              alt="Saroar"
              className="w-[50px] h-[50px] rounded-full ring"
            />
          </div>
          <div className="w-full ">
            <h2 className="font-bold text-[17px]">
              {data?.name}
            </h2>
            <p>{`${formatBengaliDate(data?.created_at)}`}</p>
            <p className="font-bold mt-5">নামঃ {data?.name}</p>
            <p className="font-bold">ইমেইলঃ {data?.email}</p>
            <p className="mb-3 font-bold">মোবাইলঃ {data?.mobile_no}</p>
            <p className="font-bold">মেসেজঃ</p>
            <p> {data?.message}</p>

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

      
    </>
  );
}
