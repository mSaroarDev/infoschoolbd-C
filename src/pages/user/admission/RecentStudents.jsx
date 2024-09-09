import { MessagesSquare } from "lucide-react";
import PageHeader from "../../../components/PageHeader";
import { Link, useSearchParams } from "react-router-dom";
import StudentListCard from "../../../components/StudentListCard";
import { useEffect, useState } from "react";
import Spinner from "../../../components/spinner/Spinner";
import { getAllStudent } from "../../../libs/studentsAPI";
import { Helmet } from "react-helmet";

export default function RecentStudents() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");

  // utils
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const fetchData = async () => {
    setLoading(true);
    const res = await getAllStudent(page, 20);

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
        <title>Admission || infoSchoolBD</title>
      </Helmet>
      <div className="flex items-center justify-between">
        <PageHeader
          icon={<MessagesSquare className="w-5 h-5" />}
          text="সাম্প্রতিক ভর্তিকৃত শিক্ষার্থীবৃন্দ"
        />
        <div className="flex items-center gap-5">
          <Link
            to="/user/admission/create"
            className="button-dark font-semibold"
          >
            নতুন শিক্ষার্থী অ্যাডমিশন
          </Link>
        </div>
      </div>

      <div className="messages_box mt-5">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-left rtl:text-right dark:text-gray-400">
            <thead className="uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 border-borderColor border">
                  #
                </th>
                <th scope="col" className="px-6 py-3 border-borderColor border">
                  নাম
                </th>
                <th scope="col" className="px-6 py-3 border-borderColor border">
                  বর্তমান ঠিকানা
                </th>
                <th scope="col" className="px-6 py-3 border-borderColor border">
                  শ্রেনী
                </th>
                <th scope="col" className="px-6 py-3 border-borderColor border">
                  রোল
                </th>
                <th scope="col" className="px-6 py-3 border-borderColor border">
                  শাখা
                </th>
                {/* <th
                  scope="col"
                  className="px-6 py-3 border-borderColor border flex items-center justify-end"
                >
                  পদক্ষেপ
                </th> */}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <Spinner />
              ) : (
                data &&
                data.map((student) => (
                  <StudentListCard key={student?._id} data={student} />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
