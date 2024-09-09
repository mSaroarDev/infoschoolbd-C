import { EyeIcon, PenBox, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { deleteStudent } from "../libs/studentsAPI";
import { showError, showSuccess } from "./../utils/toastMessage";
import { useState } from "react";
import Spinner from "./spinner/Spinner";
import PromoteClass from "./PromoteClass";

export default function StudentListCard2({ data, fetchData }) {
  const [loading, setLoading] = useState(false);
  // delete student data
  const handleDelete = async () => {
    const isConfirmed = window.confirm("Are you sure you want to delete?");
    if (isConfirmed) {
      setLoading(true);
      const res = await deleteStudent(data?._id);

      setLoading(false);
      if (res.ok) {
        showSuccess("Student Deleted");
        fetchData();
      } else {
        showError("Delete failed");
      }
    }
  };

  return (
    <>
      {loading && <Spinner />}
      <tr className="odd:bg-white even:bg-gray-50 border-b dark:border-gray-700 text-black cursor-pointer hover:bg-gray-50">
        <td className="px-6 py-2 border border-borderColor">
          <div className="w-8 h-8 rounded-full ring-1 ring-blue-600 overflow-hidden">
            <img
              src={(data?.image && data?.image) || "/placeholder.jpg"}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        </td>
        <td className="px-6 py-2 border border-borderColor font-bold">
          <span className="inter-bold">{data?.name_en}</span> <br />{" "}
          {data?.name_bn}
        </td>
        <td className="px-6 py-2 border border-borderColor">
          {data?.personal_information?.present_address?.village1},{" "}
          {data?.personal_information?.present_address?.post1},{" "}
          {data?.personal_information?.present_address?.upazilla1},{" "}
          {data?.personal_information?.present_address?.district1}
        </td>
        <td className="px-6 py-2 border border-borderColor capitalize">
          {data?.classe}
        </td>
        <td className="px-6 py-2 border border-borderColor">
          {data?.class_role}
        </td>
        <td className="px-6 py-2 border border-borderColor">
          {(data?.section && data?.section) || "N/A"}
        </td>
        <td className="px-6 py-2 border border-borderColor border-none flex items-center justify-end h-full w-full">
          <PromoteClass data={data} fetchData={fetchData} />

          <Link
            to={`/user/students/${data?._id}`}
            className="bg-purple-600 rounded text-white p-1 inline-flex ml-1"
          >
            <EyeIcon className="w-4 h-4" />
          </Link>
          <Link
            to={`/user/students/edit/${data?._id}`}
            className="bg-green-500 rounded text-white p-1 mx-1 inline-flex"
          >
            <PenBox className="w-4 h-4" />
          </Link>
          <button
            onClick={() => handleDelete()}
            className="bg-red-600 rounded text-white p-1"
          >
            <Trash2Icon className="w-4 h-4" />
          </button>
        </td>
      </tr>
    </>
  );
}
