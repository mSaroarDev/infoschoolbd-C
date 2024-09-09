import { useEffect, useState } from "react";
import ClientStats from "../../components/ClientStats";
import { LayoutGrid } from "lucide-react";
import { getStats } from "../../libs/stats";
import Loader from "../../components/loader/Loader";
import { Helmet } from "react-helmet";

const DevDashboardPage = () => {
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState();
  const fetchData = async () => {
    setLoading(true);
    const res = await getStats();

    if (res.ok) {
      const data = await res.json();
      setData(data.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Dashboard || infoSchoolBD</title>
      </Helmet>

      <div className="w-full">
        <h2 className="flex items-center gap-2 font-semibold">
          <LayoutGrid className="w-4 h-4" />
          <span>Dashboard</span>
        </h2>
        <div className="mt-5 grid grid-cols-12 gap-5">
          <ClientStats
            text={"Total School"}
            count={data && data?.totalSchools}
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
            bgColor="#EEF0F8"
            textColor="#657CEE"
          />
          <ClientStats
            text={"Total Active Schools"}
            count={data && data?.totalActiveSchools}
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
                  d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                />
              </svg>
            }
            bgColor="#F8F0E7"
            textColor="#E6AA69"
          />
          <ClientStats
            text={"Total Inactive Schools"}
            count={data && data?.totalInactiveSchools}
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
                  d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"
                />
              </svg>
            }
            bgColor="#F9E8E8"
            textColor="#DC7B7B"
          />
          <ClientStats
            text={"Total Users"}
            count={data && data?.totalUsers}
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
                  d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                />
              </svg>
            }
            bgColor="#E6F2E2"
            textColor="#92D268"
          />
          <ClientStats
            text={"Unsolved Tickets"}
            count={0}
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
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
            }
            bgColor="#F9E8E8"
            textColor="#DC7B7B"
          />
          <ClientStats
            text={"Suggetion Tracer"}
            count={0}
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
                  d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
                />
              </svg>
            }
            bgColor="#EEF0F8"
            textColor="#657CEE"
          />
        </div>
      </div>
    </>
  );
};

export default DevDashboardPage;
