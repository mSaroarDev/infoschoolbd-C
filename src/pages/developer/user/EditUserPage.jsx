import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import PageHeader from "../../../components/PageHeader";
import EditUserForm from "../../../components/EditUserForm";
import { useEffect, useState } from "react";
import { auserInfo, grantAccess, terminateAccess } from "../../../libs/usersAPI";
import { showError, showSuccess } from "../../../utils/toastMessage";
import ConfirmModal from "../../../components/ConfirmModal";
import Spinner from "../../../components/spinner/Spinner";

export default function EditUserPage() {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  // user data
  const [data, setData] = useState();
  const userInformation = async () => {
    setLoading(true);
    const res = await auserInfo(id);

    setLoading(false);
    if (res.ok) {
      const data = await res.json();
      setData(data.data);
    } else {
      showError("Operation Failed");
    }
  };

  useEffect(() => {
    userInformation();
  }, [id]);


  // terminate access
  const [confirmTerminate, setConfirmTerminate] = useState(false);
  const terminate = async () => {
    setLoading(true);
    const res = await terminateAccess(id);

    setLoading(false);
    if (res.ok) {
      showSuccess("User Access Terminated");
      userInformation();
    } else {
      showError("Operation Failed");
    }
  };

  // give access
  const [confirmGrantTerminate, setConfirmGrantTerminate] = useState(false);
  const giveAccess = async () => {
    setLoading(true);
    const res = await grantAccess(id);

    setLoading(false);
    if (res.ok) {
      showSuccess("User Access Granted");
      userInformation();
    } else {
      showError("Operation Failed");
    }
  };

  return (
    <>
    {loading && <Spinner />}
      <div className="flex items-center justify-between">
        <Link
          to="/developer/users?page=1"
          className="button-dark flex items-center gap-2 w-fit mb-3"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to List</span>
        </Link>

        <div>
          {data?.has_access ? (
            <button
              onClick={() => setConfirmTerminate(true)}
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              Terminate Access
            </button>
          ) : (
            <button
              onClick={() => setConfirmGrantTerminate(true)}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Give Access
            </button>
          )}
        </div>
      </div>
      <div className="border border-borderColor rounded-md overflow-hidden">
        <div className="bg-lightBg px-4 py-2">
          <PageHeader text="Edit Client Access Info" />
        </div>

        <div className="p-5">
          <EditUserForm />
        </div>
      </div>

      {confirmTerminate && (
        <ConfirmModal
          confirmFunction={terminate}
          message="Terminate the user?"
          setConfirm={setConfirmTerminate}
        />
      )}

      {confirmGrantTerminate && (
        <ConfirmModal
          confirmFunction={giveAccess}
          message="Give Access the user?"
          setConfirm={setConfirmGrantTerminate}
        />
      )}
    </>
  );
}
