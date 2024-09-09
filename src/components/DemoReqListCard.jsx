import { CheckCircle } from "lucide-react";
import DemoRequestPopup from "./DemoDetailsPopup";
import { markRead } from "../libs/demoReq";

export default function DemoReqsListCard({ data, getReqs }) {
  const { school_name, email, phone, status } = data;

  //   mark read
  const markAsRead = async () => {
    const res = await markRead(data?._id);
    if (res.ok) {
      getReqs();
    }
  };

  //   click on view button
  const clickViewButton = () => {
    markAsRead();
  };

  return (
    <>
      <tr
        className={`border-b dark:border-gray-700 text-black cursor-pointer hover:bg-gray-50 ${
          status === "Unread" ? "bg-white" : "bg-[#F2F6FC]"
        }`}
      >
        <td className="px-6 py-2">
          <CheckCircle className="w-4 h-4 text-green-500" />
        </td>
        <td
          className={`px-6 py-2 border-s border-borderColor h-full flex items-center gap-5 ${
            status === "Unread" ? "font-semibold" : "font-normal"
          }`}
        >
          <span>{school_name}</span>
          {status === "Unread" ? (
            <span className="font-normal text-xs bg-brandColor rounded-full text-white px-2">
              New
            </span>
          ) : (
            <span></span>
          )}
        </td>
        <td className="px-6 py-2 border border-borderColor">{email}</td>
        <td className="px-6 py-2 border border-borderColor">{phone}</td>
        <td className="px-6 py-2 border border-borderColor">
          {data?.idGiven === true ? (
            <span className="bg-green-500 text-white px-2 rounded-full text-sm">
              Done
            </span>
          ) : (
            <span className="bg-yellow-300 text-black px-2 rounded-full text-sm">
              Pending
            </span>
          )}
        </td>

        <td className="px-6 py-2 border border-borderColor flex items-center justify-end gap-1">
          <DemoRequestPopup
            buttonText="View"
            data={data}
            getReqs={getReqs}
            clickViewButton={clickViewButton}
          />
        </td>
      </tr>
    </>
  );
}
