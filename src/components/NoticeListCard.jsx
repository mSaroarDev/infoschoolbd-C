import { CheckCircle, EyeIcon, PenBox, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import convertDateFormat from "../utils/convertDate";
import ConfirmModal from "./ConfirmModal";
import { useState } from "react";
import Spinner from "./spinner/Spinner";
import { showError, showSuccess } from "./../utils/toastMessage";
import { deleteNotice } from "../libs/noticeAPI";

export default function NoticeListCard({ data, fetchNotices }) {
  const [confirm, setConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const confirmFunction = async () => {
    setConfirm(false);
    setLoading(true);
    const res = await deleteNotice(data?._id);

    setLoading(false);
    if (res.ok) {
      showSuccess("Success");
      fetchNotices();
    } else {
      showError("There was an error");
    }
  };

  return (
    <>
      {loading && <Spinner />}
      <tr className="odd:bg-white even:bg-gray-50 border-b dark:border-gray-700 text-black cursor-pointer hover:bg-gray-50">
        <td className="px-6 py-1">
          <CheckCircle className="w-4 h-4 text-green-500" />
        </td>
        <td className="px-6 py-2 border border-borderColor whitespace-nowrap">{convertDateFormat(data.created_at)}</td>
        <td className="px-6 py-2 border border-borderColor">
          <p className="">{data?.title}</p>
        </td>
        <td className="px-6 py-2 border border-borderColor flex items-center justify-end gap-1 w-full h-full">
          <Link
            to={`/user/notices/${data._id}`}
            className="bg-purple-600 rounded text-white p-1"
          >
            <EyeIcon className="w-4 h-4" />
          </Link>
          <Link
            to={`/user/notices/edit/${data._id}`}
            
            className="bg-green-500 rounded text-white p-1"
          >
            <PenBox className="w-4 h-4" />
          </Link>
          <button
            onClick={() => setConfirm((l) => !l)}
            className="bg-red-600 rounded text-white p-1"
          >
            <Trash2Icon className="w-4 h-4" />
          </button>
        </td>
      </tr>

      {confirm && (
        <ConfirmModal
          setConfirm={setConfirm}
          confirmFunction={confirmFunction}
          message="Are you sure you want to Delete?"
        />
      )}
    </>
  );
}
