import { Ban, CheckCircle, PenBox, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { deleteUser } from "./../libs/usersAPI";
import { showError, showSuccess } from "./../utils/toastMessage";
import { useState } from "react";
import Spinner from "./spinner/Spinner";
import ConfirmModal from "./ConfirmModal";
import formatTimeAgo from "../utils/convert_date";

export default function UsersListCard({ data, getUsers }) {
  const {
    _id,
    name_en,
    institute,
    designation,
    email,
    has_access,
    isActive,
    lastActivity,
  } = data;

  const [loading, setLoading] = useState(false);

  // delete user
  const [showModal, setShowModal] = useState(false);
  const handleDeleteUser = async () => {
    try {
      setLoading(true);
      const res = await deleteUser(_id);

      setLoading(false);
      if (res.ok) {
        showSuccess("User deleted");
        getUsers();
      } else {
        showError("User delete failed!");
      }
    } catch (error) {
      showError("There was an server side error!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Spinner />}
      <tr className="odd:bg-white even:bg-gray-50 border-b dark:border-gray-700 text-black cursor-pointer hover:bg-gray-50">
        <td className="px-6 py-2 border border-borderColor">
          {has_access ? (
            <CheckCircle className="w-4 h-4 text-green-500" />
          ) : (
            <Ban className="w-4 h-4 text-red-500" />
          )}
        </td>
        <td className="px-6 py-2 border border-borderColor ">
          <h3 className="font-semibold">{name_en}</h3>
          <p>
            {isActive ? (
              <div className="flex items-center text-xs">
                <div className="h-2 w-2 rounded-full bg-green-600 me-2 font-light "></div>{" "}
                Online
              </div>
            ) : (
              <div className="flex items-center text-xs">
                <div className="h-2 w-2 rounded-full bg-red-500 me-2"></div>{" "}
                {formatTimeAgo(lastActivity)}
              </div>
            )}
          </p>
        </td>
        <td className="px-6 py-2 border border-borderColor">
          {institute.name_en}
        </td>
        <td className="px-6 py-2 border border-borderColor">{designation}</td>
        <td className="px-6 py-2 border border-borderColor">{email}</td>

        <td className="px-6 py-2 border border-borderColor h-full flex items-center justify-end gap-1">
          <Link
            to={`/developer/users/edit/${data?._id}`}
            className="bg-green-500 rounded text-white p-1"
          >
            <PenBox className="w-4 h-4" />
          </Link>
          <button
            onClick={() => setShowModal(true)}
            className="bg-red-600 rounded text-white p-1"
          >
            <Trash2Icon className="w-4 h-4" />
          </button>
        </td>
      </tr>

      {showModal && (
        <ConfirmModal
          confirmFunction={handleDeleteUser}
          message="Sure to Delete the User?"
          setConfirm={setShowModal}
        />
      )}
    </>
  );
}
