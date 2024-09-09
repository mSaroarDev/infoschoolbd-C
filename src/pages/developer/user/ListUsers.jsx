import { MessagesSquare } from "lucide-react";
import PageHeader from "../../../components/PageHeader";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import Paggination from "../../../components/Paggination";
import UsersListCard from "../../../components/UsersListCard";
import { allUsers } from "../../../libs/usersAPI";
import { useEffect, useState } from "react";
import Spinner from "../../../components/spinner/Spinner";
import { Helmet } from "react-helmet";

export default function ListUsers() {
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");

  // get all user count
  const [allUser, setAllUser] = useState();
  const getAllUsers = async () => {
    try {
      const res = await allUsers();
      if (res.ok) {
        const data = await res.json();
        setAllUser(data.data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  // fetch data
  const [data, setData] = useState();
  const getUsers = async () => {
    try {
      const res = await allUsers(page, 10);
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
    getUsers();
  }, []);

  return loading ? (
    <Spinner />
  ) : (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Users || infoSchoolBD</title>
      </Helmet>
      
      <div className="flex items-center justify-between">
        <PageHeader
          icon={<MessagesSquare className="w-5 h-5" />}
          text="Users"
        />
        <Link to="/developer/users/create" className="button-dark font-medium">
          Create New User
        </Link>
      </div>

      <div className="messages_box mt-5">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-2 text-sm border border-borderColor">
                  #
                </th>
                <th scope="col" className="px-6 py-2 text-sm border border-borderColor">
                  Name & Active Status
                </th>
                <th scope="col" className="px-6 py-2 text-sm border border-borderColor">
                  Institute
                </th>
                <th scope="col" className="px-6 py-2 text-sm border border-borderColor">
                  Designation
                </th>
                <th scope="col" className="px-6 py-2 text-sm border border-borderColor">
                  Email
                </th>
                <th
                  scope="col"
                  className="px-6 py-2 text-sm border border-borderColor flex items-center justify-end"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((data) => (
                  <UsersListCard
                    key={data?._id}
                    data={data}
                    getUsers={getUsers}
                  />
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-end">
        <Paggination nextLink={pathname} count={allUser?.length} />
      </div>
    </>
  );
}
