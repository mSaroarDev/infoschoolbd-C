import PageHeader from "../../../components/PageHeader";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import Paggination from "../../../components/Paggination";
import SchoolsListCard from "../../../components/SchoolsListCard";
import { useEffect, useState } from "react";
import { getAllSchools } from "../../../libs/schoolAPI";
import Spinner from "../../../components/spinner/Spinner";
import { Helmet } from "react-helmet";

export default function DevListSchools() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");
  const { pathname } = useLocation();

  // fetch schools data
  const [allSchools, setAllSchools] = useState();
  const getAllSchool = async () => {
    const res = await getAllSchools();
    const data = await res.json();
    setAllSchools(data?.data?.length);
  };

  useEffect(() => {
    getAllSchool();
  }, []);

  const [listSchools, seListSchools] = useState("");
  const getListSchools = async () => {
    const res = await getAllSchools(page, 10);
    const data = await res.json();
    seListSchools(data?.data);
  };

  useEffect(() => {
    getListSchools();
  }, [page]);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Schools || infoSchoolBD</title>
      </Helmet>

      <div className="flex items-center justify-between">
        <PageHeader
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z"
              />
            </svg>
          }
          text="Schools"
        />
        <Link
          to="/developer/schools/create"
          className="button-dark font-medium"
        >
          Add New School
        </Link>
      </div>

      <div className="messages_box mt-5">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-2 border border-borderColor">
                  #
                </th>
                <th scope="col" className="px-6 py-2 border border-borderColor">
                  School Name
                </th>
                <th scope="col" className="px-6 py-2 border border-borderColor">
                  EIIN
                </th>
                <th scope="col" className="px-6 py-2 border border-borderColor">
                  Location
                </th>
                <th scope="col" className="px-6 py-2 border border-borderColor">
                  Contact
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
              {listSchools == "" ? (
                <Spinner />
              ) : (
                listSchools &&
                listSchools.map((school) => (
                  <SchoolsListCard
                    key={school._id}
                    data={school}
                    getListSchools={getListSchools}
                    page={page}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-end">
        <Paggination nextLink={pathname} count={allSchools} />
      </div>
    </>
  );
}
