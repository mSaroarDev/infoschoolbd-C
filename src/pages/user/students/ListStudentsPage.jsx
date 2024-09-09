import { ContactRound } from "lucide-react";
import PageHeader from "../../../components/PageHeader";
import { Link, useSearchParams } from "react-router-dom";
import ClassListCard from "../../../components/ClassListCard";
import { useEffect, useState } from "react";
import { getAllClasses } from "../../../libs/classAPI";
import Spinner from "../../../components/spinner/Spinner";
import { Helmet } from "react-helmet";

export default function ListStudentsPage() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");

  // utils
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const fetchData = async () => {
    setLoading(true);
    const res = await getAllClasses(page, 10);

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
        <title>Students || infoSchoolBD</title>
      </Helmet>

      <div className="flex items-center justify-between">
        <PageHeader
          text="শ্রেনীভিত্তিক শিক্ষার্থীবৃন্দের তালিকা"
          icon={<ContactRound className="w-5 h-5" />}
        />

        <Link to="/user/students/class/create" className="button-dark">
          নতুন শ্রেনী যুক্ত করুন
        </Link>
      </div>

      <div className="mt-5">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right  dark:text-gray-400">
            <thead className="uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 font-semibold">
              <tr>
                <th scope="col" className="px-6 py-3 border-borderColor border">
                  #
                </th>
                <td className="px-6 py-3 border-borderColor border">শ্রেনী</td>
                <td className="px-6 py-3 border-borderColor border">মোট শিক্ষার্থী</td>
                <td className="px-6 py-3 border-borderColor border">পুরুষ শিক্ষার্থী</td>
                <td className="px-6 py-3 border-borderColor border">নারী শিক্ষার্থী</td>
                <td className="px-6 py-3 border-borderColor border flex items-center justify-end gap-1">
                  পদক্ষেপ
                </td>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <Spinner />
              ) : (
                data &&
                data.map((classData) => (
                  <ClassListCard key={classData?._id} data={classData} />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
