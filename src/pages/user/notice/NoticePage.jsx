import { MessagesSquare } from "lucide-react";
import PageHeader from "../../../components/PageHeader";
import NoticeListCard from "../../../components/NoticeListCard";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllNotices } from "../../../libs/noticeAPI";
import { Helmet } from "react-helmet";

export default function NoticesPage() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");

  const [data, setData] = useState();
  const fetchNotices = async () => {
    const res = await getAllNotices(page, 10);

    if (res.ok) {
      const data = await res.json();
      setData(data.data);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Notices || infoSchoolBD</title>
      </Helmet>

      <div className="flex items-center justify-between">
        <PageHeader
          icon={<MessagesSquare className="w-5 h-5" />}
          text="প্রতিষ্ঠানের নোটিশ সমূহ"
        />
        <Link to="/user/notices/create" className="button-dark font-semibold">
          নতুন নোটিশ তৈরী করুন
        </Link>
      </div>

      <div className="messages_box mt-5">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 border-borderColor border">
                  #
                </th>
                <th scope="col" className="px-6 py-3 border-borderColor border">
                  তারিখ
                </th>
                <th scope="col" className="px-6 py-3 border-borderColor border">
                  বিস্তারিত
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 border-borderColor border flex items-center justify-end"
                >
                  পদক্ষেপ
                </th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((notice) => (
                  <NoticeListCard
                    key={notice._id}
                    data={notice}
                    fetchNotices={fetchNotices}
                  />
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* <div className="mt-5 flex items-center justify-end">
        <Paggination nextLink={pathname} count={14} />
      </div> */}
    </>
  );
}
