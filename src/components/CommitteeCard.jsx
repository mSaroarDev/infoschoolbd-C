import { Map } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserInfoByEmail } from "../libs/usersAPI";
import formatTimeAgo from "../utils/convert_date";

export default function CommitteeCard({ data }) {
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const fetchData = async () => {
    try {
      const res = await getUserInfoByEmail(data?.email);
      if(res.ok){
        const data = await res.json()
        setUserData(data?.data);
      }
    } catch (error) {
      console.log("error is", error);
    } finally {
      setLoading(false)
    }
  }

  useEffect(()=> {
     fetchData();
  }, [data])

  return (
    <>
    
      <tr
        onClick={() => navigate(`/user/committee/${data?._id}`)}
        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-lightBg/50 hover:cursor-pointer"
      >
        <th
          scope="row"
          className="px-6 py-2 border-borderColor border font-medium whitespace-nowrap dark:text-white"
        >
          <div className="w-[50px] h-[50px] ring-1 ring-blue-600 rounded-full overflow-hidden">
            <img
              src={data?.image || "/placeholder.jpg"}
              alt=""
              className="object-cover h-full w-full object-center"
            />
          </div>
        </th>
        <td className="px-6 py-2 border-borderColor border">
          <h3 className="font-bold">{data?.name_bn}</h3>
          <p className="flex items-center gap-2 mt-1">
            <Map className="w-4 h-4" />
            <span>{data?.address}</span>
          </p>
        </td>
        <td className="px-6 py-2 border-borderColor border">
          {data?.designation}
        </td>
        <td className="px-6 py-2 border-borderColor border">
          {data?.mpo_index_no}
        </td>
        <td className="px-6 py-2 border-borderColor border">
          <p>{data?.mobile_no}</p> <p>{data?.email}</p>
        </td>
        <td className="px-6 py-2 border-borderColor border">
        {userData?.isActive ? (
              <div className="flex items-center text-xs">
                <div className="h-2 w-2 rounded-full bg-green-600 me-2 font-light "></div>{" "}
                Online
              </div>
            ) : (
              userData?.lastActivity ? 
              (<div className="flex items-center text-xs">
                <div className="h-2 w-2 rounded-full bg-red-500 me-2"></div>{" "}
                {formatTimeAgo(userData?.lastActivity)}
              </div>) : (<div className="flex items-center text-xs">
                <div className="h-2 w-2 rounded-full bg-red-500 me-2"></div>{" "}
                ID Not Given
              </div>)
            )}
        </td>
      </tr>
    </>
  );
}
