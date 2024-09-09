import { Link } from "react-router-dom";
import { deleteAdmissionForm } from "../libs/admissionAPI";
import { showError, showSuccess } from "./../utils/toastMessage";
import { useState } from "react";
import Spinner from "./spinner/Spinner";

export default function AdmissionListCard({ data, fetchAllData, fetchData }) {
  const [loading, setLoading] = useState(false);

  // delete application
  const handleDelete = async () => {
    const isConfirmed = window.confirm(
      `Are you sure you want to Delete this application?`
    );
    if (isConfirmed) {
      setLoading(true);
      const res = await deleteAdmissionForm(data?._id);

      setLoading(false);
      if (res.ok) {
        showSuccess("Deleted");
        fetchData();
        fetchAllData();
      } else {
        showError("Failed to delete");
      }
    }
  };

  return (
    <>
      {loading && <Spinner />}
      <tr className="odd:bg-white even:bg-gray-50 border-b dark:border-gray-700 text-black cursor-pointer hover:bg-gray-50">
        <td className="px-6 py-2 border-borderColor border">
          <div className="w-8 h-8 rounded-full ring-1 ring-blue-600 overflow-hidden">
            <img
              src={
                (data?.student_image && data?.student_image) ||
                "/placeholder.jpg"
              }
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        </td>
        <td className="px-6 py-2 border-borderColor border capitalize">
          <span className="inter-bold">{data?.name_en}</span> <br />{" "}
          {data?.name_bn}
        </td>
        <td className="px-6 py-2 border-borderColor border inter-medium uppercase">
          {data?.admission_tracking_no} <br /> {data?.current_status?.status}{" "}
        </td>
        <td className="px-6 py-2 border-borderColor border capitalize">{data?.admission_info?.classe}</td>
        <td className="px-6 py-2 border-borderColor border">
          {(data?.admission_info?.department &&
            data?.admission_info?.department) ||
            "N/A"}
        </td>
        <td className="px-6 py-2 border-borderColor border text-right inter-regular text-sm">
          <a
            href={`${data?.institute?.school_information?.web}/admission/application/print/${data?._id}`}
            target="_blank"
            className="bg-[#292929] rounded text-white px-2 py-1"
          >
            View
          </a>

          <Link
            to={`/user/application-corner/preview/${data?._id}`}
            className="ml-1 bg-blue-600 text-white px-2 py-1 rounded"
          >
            Review
          </Link>
          <button
            onClick={() => handleDelete()}
            className="ml-1 bg-red-600 text-white px-2 py-1 rounded"
          >
            Delete
          </button>
        </td>
      </tr>
    </>
  );
}
