import { useLocation } from "react-router-dom";
import Toploader from "../components/Toploader";
import UserDashboardLayout from "./UserDashboardLayout";
import DevDashboardLayout from "./DeveloperDashboardLayout";
import { Toaster } from "react-hot-toast";
import { PrivateRoute } from "../components/PrivateLayout";
import { DevPrivateRoute } from "../components/DevPrivateLayout";
import AccountDashboardLayout from "./AccountsDashboardLayout";

export default function Layout({ children }) {
  const { pathname } = useLocation();

  return (
    <>
      <Toploader />
      <Toaster
        toastOptions={{
          className: "inter-regular",
        }}
      />
      {pathname.startsWith("/user") ? (
        <>
          <PrivateRoute>
            <UserDashboardLayout>{children}</UserDashboardLayout>
          </PrivateRoute>
        </>
      ) : pathname.startsWith("/accounts") ? (
        <>
          <PrivateRoute>
            <AccountDashboardLayout>{children}</AccountDashboardLayout>
          </PrivateRoute>
        </>
      ) : pathname.startsWith("/developer") ? (
        <>
          <DevPrivateRoute>
            <DevDashboardLayout>{children}</DevDashboardLayout>
          </DevPrivateRoute>
        </>
      ) : (
        <>{children}</>
      )}
    </>
  );
}
