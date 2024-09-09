import { ArrowLeft, MessagesSquare } from "lucide-react";
import PageHeader from "../../../components/PageHeader";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getNoticeDetails } from "../../../libs/noticeAPI";
import convertDateFormat from "./../../../utils/convertDate";

export default function NoticeDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState();
  const fetchNotices = async () => {
    const res = await getNoticeDetails(id);

    if (res.ok) {
      const data = await res.json();
      setData(data.data);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, [id]);

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
          <PageHeader text="নোটিশ বিস্তারিত" />
        </div>

        <div className="flex items-start gap-5 p-5">
          <div className="min-w-[60px]">
            <MessagesSquare className="w-7 h-7 text-redColor" />
          </div>
          <div className="w-full">
            <h2 className="font-bold text-[17px]">প্রধান শিক্ষক</h2>
            <p>{`${data?.institute.name_bn}, ${convertDateFormat(
              data?.created_at
            )}`}</p>
            <p className="mt-7 mb-3 font-semibold">
              বিষয়ঃ {data && data.title}
            </p>
            <div className="font-bangla-font"
              dangerouslySetInnerHTML={{ __html: data && data?.description }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
