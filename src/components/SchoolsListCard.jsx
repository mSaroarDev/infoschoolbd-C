import { Ban, CheckCircle, EyeIcon, KeySquare, PenBox, Trash2Icon, Unlink } from "lucide-react";
import { Link } from "react-router-dom";
import { deleteSchool } from "../libs/schoolAPI";
import { showError, showSuccess } from "./../utils/toastMessage";
import { useState } from "react";
import Spinner from "./spinner/Spinner";

export default function SchoolsListCard({ data, getListSchools, page }) {
  const { name_en, eiin, institute_address, contact } = data;

  const [loading, setLoading] = useState(false)

  // delete school
  const handleDelete = async () => {
    const isConfirmed = window.confirm("Are you sure you want to delete?");
    if (isConfirmed) {
      setLoading(true)
      const res = await deleteSchool(data._id);
      
      setLoading(false)
      if (res.ok) {
        showSuccess("School Delete");
        getListSchools(page, 10)
      } else {
        showError("Delete Failed");
      }
    }
  };

  return (
    <>
    {loading && <Spinner />}
      <tr className="odd:bg-white even:bg-gray-50 border-b dark:border-gray-700 text-black cursor-pointer hover:bg-gray-50">
        <td className="px-6 py-2 border border-borderColor">
        {data?.has_access ? (
            <CheckCircle className="w-4 h-4 text-green-500" />
          ) : (
            <Ban className="w-4 h-4 text-red-500" />
          )}
        </td>
        <td className="px-6 py-2 border border-borderColor font-semibold">{name_en}</td>
        <td className="px-6 py-2 border border-borderColor">{eiin}</td>
        <td className="px-6 py-2 border border-borderColor">{institute_address}</td>
        <td className="px-6 py-2 border border-borderColor">{contact}</td>

        <td className="px-6 py-2 border border-borderColor flex items-center justify-end gap-1">
          <Link
            to={`/developer/schools/${data._id}`}
            className="bg-purple-600 rounded text-white p-1"
          >
            <EyeIcon className="w-4 h-4" />
          </Link>
          <Link to={`/developer/schools/edit-link/${data._id}`}
            className="bg-[#292929] rounded text-white p-1"
          >
            <Unlink className="w-4 h-4" />
          </Link>
          <Link to={`/developer/schools/edit-permission/${data._id}`}
            className="bg-[#292929] rounded text-white p-1"
          >
            <KeySquare className="w-4 h-4" />
          </Link>
          <Link to={`/developer/schools/edit/${data._id}`}
            className="bg-green-500 rounded text-white p-1"
          >
            <PenBox className="w-4 h-4" />
          </Link>
          <button
            onClick={handleDelete}
            className="bg-red-600 rounded text-white p-1"
          >
            <Trash2Icon className="w-4 h-4" />
          </button>
        </td>
      </tr>
    </>
  );
}
