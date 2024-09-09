import { MessagesSquare } from "lucide-react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import PageHeader from "../../../components/PageHeader";
import MessageListCard from "../../../components/MessageListCard";
import { useEffect, useState } from "react";
import Spinner from "../../../components/spinner/Spinner";
import { Helmet } from "react-helmet";
import { useUserInfo } from "../../../utils/useUserInfo";
import { getAllAnnouncement } from "../../../libs/announcement";

export default function AnnouncementList() {
  const { pathname } = useLocation();
  const currUser = useUserInfo();
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const fetchData = async () => {
    setLoading(true);
    const res = await getAllAnnouncement(page, 10);

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
        <title>Announcements || infoSchoolBD</title>
      </Helmet>

      {loading && <Spinner />}
      <div className="flex items-center justify-between">
        <PageHeader
          text="Announcements"
          icon={<MessagesSquare className="w-5 h-5" />}
        />

        <Link to="/developer/announcement/create" className="button-dark">
          Create New
        </Link>
      </div>

      <div className="messages_box mt-5">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-left rtl:text-right  dark:text-gray-400">
            <thead className=" uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 border-borderColor border hind-siliguri-semibold"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 border-borderColor border hind-siliguri-semibold"
                >
                  Description
                </th>
                {pathname.startsWith("/developer/announcement") && (
                  <th
                    scope="col"
                    className="px-6 py-3 border-borderColor border hind-siliguri-semibold"
                  >
                    Set Active
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((item, i) => (
                  <MessageListCard
                    key={i}
                    data={item}
                    user={currUser}
                    fetchData={fetchData}
                  />
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
