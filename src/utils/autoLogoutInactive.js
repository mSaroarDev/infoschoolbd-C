import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; // Assuming you're using React Router for navigation
import { logout } from "../libs/login";
import Swal from "sweetalert2";
import { showError } from "./toastMessage";

function useAutoLogout(timeout = 5 * 1000 * 60) {
  // 15 minutes by default
  const navigate = useNavigate();
  const logoutTimerRef = useRef(null);

  const resetLogoutTimer = () => {
    clearTimeout(logoutTimerRef.current);
    logoutTimerRef.current = setTimeout(logoutUser, timeout);
  };

  const logoutUser = async () => {
    try {
      const res = await logout();

      if (res.ok) {
        Swal.fire({
          title: "Logged Out",
          text: "You have been logged out due to inactive.",
          icon: "error",
        });
        navigate("/login");
      }
    } catch (error) {
      showError("Internal server error");
    }
  };

  useEffect(() => {
    resetLogoutTimer(); // Initialize the timer on component mount

    // Reset the timer on user activity
    window.onload = resetLogoutTimer;
    document.onmousemove = resetLogoutTimer;
    document.onkeypress = resetLogoutTimer;

    // Cleanup the event listeners and timer on component unmount
    return () => {
      clearTimeout(logoutTimerRef.current);
      window.onload = null;
      document.onmousemove = null;
      document.onkeypress = null;
    };
  }, []);

  return resetLogoutTimer;
}

export default useAutoLogout;
