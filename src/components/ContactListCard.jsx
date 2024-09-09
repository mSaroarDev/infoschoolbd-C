import { useNavigate } from "react-router-dom";
import convertDateFormat from "../utils/convertDate";
import { useUserInfo } from "../utils/useUserInfo";
import { markRead } from "../libs/contacts";

export default function ContactListCard({ data }) {
  const user = useUserInfo();
  const navigate = useNavigate();
  const trimedData = data && data.message.slice(0, 100);

  const markReadMessage = async () => {
    await markRead(data?._id)
    navigate(`/${user?.account_type == "Developer" ? "developer" : "user"}/contacts/${data?._id}`)
  }

  return (
    <>
      <tr
        onClick={markReadMessage}
        className={`border-b text-black cursor-pointer ${
          data?.status == "Unread" ? "bg-white" : "bg-[#F2F6FC]"
        }`}
      >
        <td className="px-6 py-4">{convertDateFormat(data?.created_at)}</td>
        <td className="px-6 py-4">
          <h3 className={`${data?.status === "Unread" ? "font-bold" : "font-normal"}`}>
            {data?.name}
            {data?.status === "Unread" ? (
              <span className="ml-3 font-normal text-xs bg-brandColor rounded-full text-white px-2">
                New
              </span>
            ) : (
              <span></span>
            )}
          </h3>
          <p className="mt-2 text-sm">{trimedData}...</p>
        </td>
        <td className="px-6 py-4 text-right"></td>
      </tr>
    </>
  );
}
