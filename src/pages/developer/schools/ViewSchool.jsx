import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Copy, ListTree } from "lucide-react";
import PageHeader from "../../../components/PageHeader";
import { useEffect, useState } from "react";
import { getSchoolById } from "../../../libs/schoolAPI";
import Spinner from "../../../components/spinner/Spinner";
import UsersListCard from "../../../components/UsersListCard";
import { getUsersBySchool } from "../../../libs/usersAPI";
import { showError, showSuccess } from "../../../utils/toastMessage";

export default function ViewSchoolPage() {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate()

  // get the existing data
  const [data, setData] = useState("");
  const getData = async () => {
    setLoading(true);
    const res = await getSchoolById(id);

    setLoading(false);
    if (res.ok) {
      const data = await res.json();
      setData(data.data);
    } else {
      console.log(res);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // getusers by this school
  const [users, setUsers] = useState("");
  const getUsers = async () => {
    setLoading(true);
    const res = await getUsersBySchool(id);

    setLoading(false);
    if (res.ok) {
      const data = await res.json();
      setUsers(data?.data);
    } else {
      console.log("error");
    }
  };

  useEffect(() => {
    getUsers();
  }, [data]);

  // copy t clipboard
  const copyText = () => {
    const isCopy = navigator.clipboard.writeText(data?._id);
    if(isCopy){
      showSuccess("School id copied to clipboard.")
    } else {
      showError("Copy failed")
    }
  }

  return (
    <>
      {loading && <Spinner />}
      <button onClick={()=> navigate(-1)} className="button-dark flex items-center gap-2 mb-5">
        <ArrowLeft className="w-4 h-4" />
        <span>Back</span>
      </button>

      <div className="">
        <div className="border border-borderColor rounded-md overflow-hidden">
          <div className="__head bg-lightBg px-4 py-2 text-[18px] font-semibold">
            School Information
          </div>

          {/* main */}
          <div className="p-5">
            <div className="grid grid-cols-12 gap-5">
              <div className="col-span-12 md:col-span-3">
                <img src="/school.png" alt="Store" className="w-[200px]" />
              </div>
              <div className="col-span-12 md:col-span-9">
                <h2 className="font-medium text-[25px]">{data?.name_en}</h2>
                <p>{data?.institute_address}</p>
                <p className="mt-3">EIIN: {data?.eiin}</p>
                <p>Stablished at: {data?.stablished_at}</p>

                <div className="flex items-center gap-3">
                  <Link
                    to={data?.school_information?.web}
                    target="_blank"
                    className="button-main mt-3 inline-block"
                  >
                    Visit Website
                  </Link>

                  <button
                    onClick={() => copyText()}
                    className="bg-lightBg px-4 py-2 mt-3 flex items-center gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    Copy School ID
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* list */}
        <div className="flex flex-col items-start justify-between mb-14 md:mb-0 mt-7">
          <div className="w-full">
            <PageHeader
              icon={<ListTree className="w-5 h-5" />}
              text={`Users of ${data?.name_en}`}
            />

            <div className="ads__area flex flex-col gap-2 mt-3">
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-2 border border-borderColor">
                        #
                      </th>
                      <th scope="col" className="px-6 py-2 border border-borderColor">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-2 border border-borderColor">
                        Institute
                      </th>
                      <th scope="col" className="px-6 py-2 border border-borderColor">
                        Designation
                      </th>
                      <th scope="col" className="px-6 py-2 border border-borderColor">
                        Email
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
                    {users &&
                      users.map((user) => (
                        <UsersListCard key={user?._id} data={user} />
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
