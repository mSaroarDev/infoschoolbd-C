import { MessagesSquare } from "lucide-react";
import PageHeader from "../../../components/PageHeader";
import MessageListCard from "../../../components/MessageListCard";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllmessages } from "../../../libs/message";
import Spinner from "../../../components/spinner/Spinner";
import { Helmet } from "react-helmet";
import { useUserInfo } from "../../../utils/useUserInfo";

export default function MessagesPage() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const fetchData = async () => {
    setLoading(true);
    const res = await getAllmessages(page, 10);

    setLoading(false);
    if (res.ok) {
      const data = await res.json();
      setData(data.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log("data", data);
  

  const currUser = useUserInfo();

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Messages || infoSchoolBD</title>
      </Helmet>

      {loading && <Spinner />}
      <PageHeader
        icon={<MessagesSquare className="w-5 h-5" />}
        text="গুরুত্বপূর্ন বার্তাসমূহ"
      />

      <div className="messages_box mt-5">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-left rtl:text-right  dark:text-gray-400">
            <thead className="uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 border-borderColor border">
                  তারিখ
                </th>
                <th scope="col" className="px-6 py-3 border-borderColor border">
                  বিস্তারিত
                </th>
                
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((item, i) => (
                  <MessageListCard key={i} data={item} user={currUser} />
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
