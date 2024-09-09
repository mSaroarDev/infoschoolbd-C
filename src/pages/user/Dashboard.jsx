import {
  LayoutGrid,
  Pin,
  ShieldCheck,
  ExternalLink,
  Users,
  UsersRound,
  SquareUserRound,
  ContactRound,
} from "lucide-react";
import { Link } from "react-router-dom";
import ClientStats from "../../components/ClientStats";
import { useEffect, useState } from "react";
import { getStats } from "../../libs/stats";
import { useUserInfo } from "./../../utils/useUserInfo";
import formatBengaliDate from "../../utils/todayDate";
import { getAllNotices } from "./../../libs/noticeAPI";
import NoticeListCard from "../../components/NoticeListCard";
import Loader from "../../components/loader/Loader";
import { Helmet } from "react-helmet";
import AnnoucementPopup from "../../components/AnnoucementPopup";
import { getActiveAnnouncement } from "../../libs/announcement";

export default function DashboardPage() {
  const role = "Client";
  const currUser = useUserInfo();

  const [loading, setLoading] = useState(true);

  const [data, setData] = useState();
  const fetchData = async () => {
    const res = await getStats();

    if (res.ok) {
      const data = await res.json();
      setData(data.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // notice
  const [notices, setNotices] = useState();
  const fetchNotices = async () => {
    const res = await getAllNotices(1, 6);

    if (res.ok) {
      const data = await res.json();
      setNotices(data.data);
    } else {
      console.log(res);
    }
  };

  // get active announcement
  const [announcement, setAnnouncement] = useState([]);
  const fetchAnnouncement = async () => {
    try {
      setLoading(true);
      const res = await getActiveAnnouncement(1, 6);

      if (res.ok) {
        const data = await res.json();
        setAnnouncement(data.data[0]);
      } else {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
    fetchAnnouncement();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Dashboard || infoSchoolBD</title>
      </Helmet>

      <AnnoucementPopup data={announcement && announcement} />
      {role == "Developer" ? (
        <div className="text-center">
          Your are a Developer.. 🔥{" "}
          <Link to="/developer/dashboard" className="underline">
            {" "}
            Redirect to Developer Mode{" "}
          </Link>
        </div>
      ) : (
        <div className="w-full">
          <h2 className="flex items-center gap-2 font-bold font-bangla-font text-[18px]">
            <LayoutGrid className="w-4 h-4" />
            <span>ড্যাশবোর্ড</span>
          </h2>
          <div className="w-full bg-[#EEF0F8]/50 rounded-lg shadow-md grid grid-cols-12 mt-5 border border-borderColor">
            <div className="col-span-3 pl-10 flex items-end justify-center">
              <img
                src="/man.png"
                alt="Image"
                className="-mt-14 h-[170px] w-auto"
              />
            </div>
            <div className="col-span-9 p-5">
              <p className="text-[18px] font-bold">
                <span className="font-bangla-font">স্বাগতম,</span>{" "}
                {currUser?.name_bn}
                <span className="font-bangla-font"></span>
              </p>
              <p className="">Today is: {formatBengaliDate()}</p>
              <a
                href={currUser && currUser?.institute?.school_information?.web}
                target="_blank"
                className=" mt-3 flex items-center gap-3"
              >
                <span className="font-bangla-font">প্রতিষ্ঠানের নাম:</span>{" "}
                <span className="hover:underline cursor-pointer flex items-center gap-1">
                  <strong className="font-bangla-font">
                    {currUser && currUser?.institute?.name_bn}
                  </strong>{" "}
                  - Visit Website <ExternalLink className="w-4 h-4" />
                </span>
              </a>
              <p className=" flex items-center gap-1">
                Status: <ShieldCheck className="w-5 h-5 text-green-500" />{" "}
                Active
              </p>
            </div>
          </div>

          <h2 className="flex items-center gap-2 font-semibold mt-10">
            <LayoutGrid className="w-4 h-4" />
            <span className="font-bangla-font font-bold text-[18px]">
              প্রতিষ্ঠানের স্বারসংক্ষেপ
            </span>
          </h2>
          <div className="mt-5 grid grid-cols-12 gap-5 font-bangla-font">
            <ClientStats
              text={"মোট শিক্ষার্থী"}
              count={data && data?.totalStudents}
              icon={<Users className="w-6 h-6" />}
              bgColor="#EEF0F8"
              textColor="#657CEE"
            />
            <ClientStats
              text={"মোট শ্রেনী"}
              count={data && data?.totalClasses}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                  />
                </svg>
              }
              bgColor="#F8F0E7"
              textColor="#E6AA69"
            />
            <ClientStats
              text={"মোট শিক্ষক"}
              count={data && data?.totalTeachers}
              icon={<UsersRound className="w-6 h-6" />}
              bgColor="#F9E8E8"
              textColor="#DC7B7B"
            />
            <ClientStats
              text={"মোট স্টাফ"}
              count={data && data?.totalStaffs}
              icon={<SquareUserRound className="w-6 h-6" />}
              bgColor="#E6F2E2"
              textColor="#92D268"
            />
            <ClientStats
              text={"কমিটি সদস্য"}
              count={data && data?.totalCommittee}
              icon={<ContactRound className="w-6 h-6" />}
              bgColor="#F9E8E8"
              textColor="#DC7B7B"
            />
          </div>
          <h2 className="flex items-center gap-2 font-semibold mt-10">
            <Pin className="w-4 h-4" />
            <span className="font-bangla-font text-[18px] font-bold">
              সাম্প্রতিক নোটিশ সমূহ
            </span>
          </h2>
          <div className="messages_box mt-5">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      #
                    </th>
                    <th scope="col" className="px-6 py-3">
                      তারিখ
                    </th>
                    <th scope="col" className="px-6 py-3">
                      বিস্তারিত
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 flex items-center justify-end"
                    >
                      পদক্ষেপ
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {notices &&
                    notices.map((notice) => (
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
        </div>
      )}
    </>
  );
}
