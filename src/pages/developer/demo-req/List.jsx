import { MessagesSquare } from "lucide-react";
import PageHeader from "../../../components/PageHeader";
import { useLocation, useSearchParams } from "react-router-dom";
import Paggination from "../../../components/Paggination";
import { useEffect, useState } from "react";
import Spinner from "../../../components/spinner/Spinner";
import { getAllDemoReq } from "../../../libs/demoReq";
import DemoReqsListCard from "../../../components/DemoReqListCard";
import { Helmet } from "react-helmet";

export default function ListDemoRequests() {
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");

  // get all user count
  const [allReqs, setAllReqs] = useState();
  const getAllReqs = async () => {
    try {
      const res = await getAllDemoReq(1, 0);
      if (res.ok) {
        const data = await res.json();
        setAllReqs(data.data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  // fetch data
  const [data, setData] = useState();
  const getReqs = async () => {
    try {
      const res = await getAllDemoReq(page, 10);
      if (res.ok) {
        const data = await res.json();
        setData(data.data);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getReqs();
    getAllReqs();
  }, [page]);

  return loading ? (
    <Spinner />
  ) : (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Demo Requests || infoSchoolBD</title>
      </Helmet>

      <div className="flex items-center justify-between">
        <PageHeader
          icon={<MessagesSquare className="w-5 h-5" />}
          text="Demo Requests"
        />
        {/* <Link to="/developer/users/create" className="button-dark font-medium">
          Create New User
        </Link> */}
      </div>

      <div className="messages_box mt-5">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-2 border border-borderColor">
                  #
                </th>
                <th scope="col" className="px-6 py-2 border border-borderColor">
                  Institute Name
                </th>
                <th scope="col" className="px-6 py-2 border border-borderColor">
                  Email
                </th>
                <th scope="col" className="px-6 py-2 border border-borderColor">
                  Phone
                </th>
                <th scope="col" className="px-6 py-2 border border-borderColor">
                  Status
                </th>

                <th
                  scope="col"
                  className="px-6 py-2 border border-borderColor flex items-center justify-end"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((data) => (
                  <DemoReqsListCard
                    key={data?._id}
                    data={data}
                    getReqs={getReqs}
                  />
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-end">
        <Paggination nextLink={pathname} count={allReqs?.length} />
      </div>
    </>
  );
}
