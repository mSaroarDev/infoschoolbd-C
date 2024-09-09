import { ExternalLink, MessagesSquare } from "lucide-react";
import PageHeader from "../../../components/PageHeader";
import { Link } from "react-router-dom";
import TeacherCard from "../../../components/TeacherCard";
import { useEffect, useState } from "react";
import { getAllTeachers } from "../../../libs/teacherAPI";
import Spinner from "../../../components/spinner/Spinner";
import { Helmet } from "react-helmet";

export default function TeachersPage() {
  // utils
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const fetchData = async () => {
    setLoading(true);
    const res = await getAllTeachers();

    setLoading(false);
    if (res.ok) {
      const data = await res.json();
      setData(data.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Teahers || infoSchoolBD</title>
      </Helmet>

      <div className="flex items-center justify-between">
        <PageHeader
          icon={<MessagesSquare className="w-5 h-5" />}
          text="শিক্ষকবৃন্দের তালিকা"
        />
        <div className="flex items-center gap-7">
          <a
            href="/admission"
            target="_blank"
            className="underline flex items-center gap-3 font-bold"
          >
            নিয়োগ বিজ্ঞপ্তি কর্নার <ExternalLink className="w-4 h-4" />
          </a>

          <Link
            to="/user/teachers/create"
            className="button-dark font-semibold"
          >
            নতুন শিক্ষক যুক্ত করুন
          </Link>
        </div>
      </div>

      <div className="messages_box mt-5 ">
        <div className="relative overflow-x-auto">
          <table className="w-full text-left rtl:text-right  dark:text-gray-400">
            <thead className="uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 border-borderColor border">
                  ছবি
                </th>
                <th scope="col" className="px-6 py-3 border-borderColor border">
                  নাম ও ঠিকানা
                </th>
                <th scope="col" className="px-6 py-3 border-borderColor border">
                  পদবী
                </th>
                <th scope="col" className="px-6 py-3 border-borderColor border">
                  আইডি নং
                </th>
                <th scope="col" className="px-6 py-3 border-borderColor border">
                  ইমেইল ও মোবাইল নং
                </th>
                <th scope="col" className="px-6 py-3 border-borderColor border">
                  একটিভ স্ট্যাটাস
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <Spinner />
              ) : (
                data &&
                data.map((teacher) => (
                  <TeacherCard key={teacher?._id} data={teacher} />
                ))
              )}
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
