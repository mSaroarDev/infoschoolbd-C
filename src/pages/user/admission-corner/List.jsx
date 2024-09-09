import { MessagesSquare } from "lucide-react";
import PageHeader from "../../../components/PageHeader";
import { useLocation, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AdmissionListCard from "../../../components/AdmissionListCard";
import { getAllApplications } from "../../../libs/admissionAPI";
import Spinner from "./../../../components/spinner/Spinner";
import Paggination from "../../../components/Paggination";
import { Helmet } from "react-helmet";

export default function RecentApplications() {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");

  // utils
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const fetchData = async () => {
    setLoading(true);
    const res = await getAllApplications(page, 10);

    setLoading(false);
    if (res.ok) {
      const data = await res.json();
      setData(data.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  // all the data
  const [allData, setAllData] = useState();
  const fetchAllData = async () => {
    setLoading(true);
    const res = await getAllApplications(1, 0);

    setLoading(false);
    if (res.ok) {
      const data = await res.json();
      setAllData(data.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  useEffect(() => {
    fetchAllData();
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Admission || infoSchoolBD</title>
      </Helmet>
      
      {loading && <Spinner />}
      <div className="flex items-center justify-between">
        <PageHeader
          icon={<MessagesSquare className="w-5 h-5" />}
          text="সাম্প্রতিক ভর্তির আবেদন সমূহ"
        />
        <div className="flex items-center gap-5"></div>
      </div>

      <div className="messages_box mt-5">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-left rtl:text-right dark:text-gray-400">
            <thead className="uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 border-borderColor border">
                  ছবি
                </th>
                <th scope="col" className="px-6 py-3 border-borderColor border">
                  নাম
                </th>
                <th scope="col" className="px-6 py-3 border-borderColor border">
                  ট্র্যাকিং নং ও আবেদনের অবস্থা{" "}
                </th>
                <th scope="col" className="px-6 py-3 border-borderColor border">
                  শ্রেনী
                </th>
                <th scope="col" className="px-6 py-3 border-borderColor border">
                  বিভাগ
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 border-borderColor border text-right"
                >
                  পদক্ষেপ
                </th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((item) => (
                  <AdmissionListCard
                    key={item?._id}
                    data={item}
                    fetchData={fetchData}
                    fetchAllData={fetchAllData}
                  />
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-end">
        <Paggination
          count={allData && parseInt(allData?.length)}
          nextLink={pathname}
        />
      </div>
    </>
  );
}
