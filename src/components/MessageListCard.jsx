import { useLocation, useNavigate } from "react-router-dom";
import convertDateFormat from "../utils/convertDate";
import { markAsRead } from "../libs/message";
import { activeToggle } from "../libs/announcement";
import { showError } from "../utils/toastMessage";
import { useEffect, useState } from "react";
import Spinner from "./spinner/Spinner";
import Swal from 'sweetalert2';

export default function MessageListCard({ data, user, fetchData }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const trimedData = data && data.description.slice(0, 100);
  const { pathname } = useLocation();

  // mark as read
  const markRead = async () => {
    await markAsRead(data?._id);
    navigate(
      `/${user?.account_type == "Developer" ? "developer" : "user"}/messages/${
        data?._id
      }`
    );
  };

  // check unread or not
  const ifRead = data && data?.seen_by?.includes(user?._id);

  // set on off
  // Local state to manage the toggle's checked state
  const [isChecked, setIsChecked] = useState(false);
  const handleToggleChange = async (event) => {
    const isChecked = event.target.checked;
    setIsChecked(isChecked);

    try {
      setLoading(true);
      const res = await activeToggle(data?._id, { isActive: isChecked });

      if (res.ok) {
        Swal.fire({
          title: "Success!",
          text: "Announcement Pinned Succesfully",
          icon: "success"
        });
      } else {
        showError("Update Failed");
      }
    } catch (error) {
      showError("Internal server error");
    } finally {
      setLoading(false);
      fetchData();
    }
  };

  useEffect(() => {
    if (data?.isActive) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  }, [data]);

  return (
    <>
      {loading && <Spinner />}
      <tr
        onClick={pathname.startsWith("/developer/announcement") ? "" : markRead}
        className={`border-b dark:border-gray-700 text-black cursor-pointer ${
          ifRead ? "bg-[#F2F6FC]" : "bg-white"
        }`}
      >
        <td className="px-6 py-2 border-borderColor border whitespace-nowrap hind-siliguri-regular">
          {convertDateFormat(data?.created_at)}
        </td>
        <td className="px-6 py-2 border-borderColor border">
          <h3 className="font-bold flex items-center gap-2">
            <span>{data?.title}</span>
            {ifRead ? (
              <span></span>
            ) : (
              <span className="ml-3 font-normal text-xs bg-brandColor rounded-full text-white px-2">
                New
              </span>
            )}
          </h3>
          <div dangerouslySetInnerHTML={{ __html: trimedData }} />
        </td>

        {pathname.startsWith("/developer/announcement") && (
          <td className="px-6 py-2 border-borderColor border whitespace-nowrap hind-siliguri-regular">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                value=""
                className="sr-only peer"
                onChange={handleToggleChange}
                checked={isChecked}
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                ON/OFF
              </span>
            </label>
          </td>
        )}
      </tr>
    </>
  );
}
