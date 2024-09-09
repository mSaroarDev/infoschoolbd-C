import { UsersRound } from "lucide-react";
import PageHeader from "../../../components/PageHeader";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllCommittee } from "../../../libs/committeeAPI";
import Spinner from "../../../components/spinner/Spinner";
import { Helmet } from "react-helmet";
import CommitteeCard from "../../../components/CommitteeCard";

export default function ListCommittee() {
  // utils
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const fetchData = async () => {
    setLoading(true);
    const res = await getAllCommittee();

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
        <title>Committee || infoSchoolBD</title>
      </Helmet>

      <div className="flex items-center justify-between">
        <PageHeader
          text="ম্যানেজিং কমিটিবৃন্দ"
          icon={<UsersRound className="w-4 h-4" />}
        />
        <Link to="/user/committee/create" className="button-dark font-bold">
          নতুন কমিটি যুক্ত করুন
        </Link>
      </div>

      <div className="messages_box mt-5">
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
            <CommitteeCard key={teacher?._id} data={teacher} />
          ))
        )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
