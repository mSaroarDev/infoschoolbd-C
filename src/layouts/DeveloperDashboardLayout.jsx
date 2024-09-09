import { useNavigate } from "react-router-dom";
import DevSidebar from "../components/DeveloperSidebar";
import { useUserInfo } from "../utils/useUserInfo";
import { useState } from "react";
import { logout } from "../libs/login";
import { showError, showSuccess } from "../utils/toastMessage";
import Spinner from "./../components/spinner/Spinner";
import useAutoLogout from "../utils/autoLogoutInactive";
import Swal from "sweetalert2";

export default function DevDashboardLayout({ children }) {
  const userInfo = useUserInfo();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // logout
  const handleLogout = async () => {
    Swal.fire({
      title: "Confirmation",
      text: `Are you sure you want to Logout?`,
      confirmButtonText: "Yes Confirm",
      confirmButtonColor: "#3182ce",
      icon: "question",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoading(true);
          const res = await logout();

          setLoading(false);
          if (res.ok) {
            showSuccess("Logout Success");
            navigate("/login");
          } else {
            showError("Logout Failed");
            navigate("/login");
          }
        } catch (error) {
          showError("Internal Server Error");
        } finally {
          setLoading(false);
        }
      }
    });
  };

  useAutoLogout();

  return (
    <>
      {loading && <Spinner />}
      <div className="bg-white w-full min-h-screen poppins-regular text-[15px]">
        <div className="hidden md:block">
          {/* user sidebar */}
          <DevSidebar />
        </div>

        {/* user dashbaord navbar */}
        {/* user topbar */}
        <div className="fixed top-0 right-0 md:left-[280px] w-full md:w-auto bg-white shadow-md py-2 px-5 flex items-center justify-between z-30 inter-regular">
          <div>
            <div className="md:hidden">
              <img src="/logo.png" className="w-[120px]" />
            </div>
          </div>
          <div className="flex items-center gap-5">
            <div className="flex flex-col items-end gap-1">
              <span className="bg-lightBg px-3 rounded-full font-bold">
                {userInfo?.name_en}
              </span>
              <span className="text-xs">
                {userInfo?.designation}, {userInfo?.institute.name_en}
              </span>
            </div>
            <div className="">
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-12 rounded-full ring-2 ring-blue-600">
                    <img
                      alt={userInfo?.institute.name_en}
                      src={userInfo && userInfo?.image}
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                >
                  {/* <li>
                    <a className="justify-between">
                      Profile
                      <span className="badge">New</span>
                    </a>
                  </li>
                  <li>
                    <a>Settings</a>
                  </li> */}
                  <li>
                    <button onClick={handleLogout} className="font-semibold">
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* user content area */}
        <div className="md:ml-[280px] pt-16 md:pt-14">
          <div className="p-5 md:p-10">{children}</div>
        </div>
      </div>
    </>
  );
}
