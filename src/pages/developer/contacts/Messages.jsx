import { MessagesSquare } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import PageHeader from "../../../components/PageHeader";
import { useEffect, useState } from "react";
import Spinner from "../../../components/spinner/Spinner";
import ContactListCard from "../../../components/ContactListCard";
import { getAllContacts } from "../../../libs/contacts";
import { Helmet } from "react-helmet";

export default function DevContactsPage() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const fetchData = async () => {
    setLoading(true);
    const res = await getAllContacts(page, 10);

    setLoading(false);
    if (res.ok) {
      const data = await res.json();
      setData(data.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // unread contacts
  const unreadMessages =
    data && data.filter((contact) => contact?.status == "unread");

    const lastMessages = data && data.slice(0, 30)

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Contacts || infoSchoolBD</title>
      </Helmet>

      {loading && <Spinner />}
      <div className="flex items-center justify-between">
        <PageHeader
          text={`Recent Contacts (New - ${unreadMessages?.length})`}
          icon={<MessagesSquare className="w-5 h-5" />}
        />
      </div>

      <div className="messages_box mt-5">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Details
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 flex items-center justify-end"
                ></th>
              </tr>
            </thead>
            <tbody>
              {lastMessages &&
                lastMessages.map((item, i) => <ContactListCard key={i} data={item} />)}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
