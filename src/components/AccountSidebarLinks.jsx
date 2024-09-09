import { ArrowLeft, Landmark, LayoutPanelLeft, ScrollText } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function AccountSidebarLinks() {
  const { pathname } = useLocation();

  return (
    <>
      <Link
        to="/accounts/dashboard"
        className={`user-sidebar-link mt-3 ${
          pathname.startsWith("/accounts/dashboard") &&
          "user-sidebar-link-active"
        }`}
      >
        <LayoutPanelLeft className="w-5 h-5 text-redColor" />
        <span>Account Summary</span>
      </Link>
      <Link
        to="/accounts/bank-transaction?page=1"
        className={`user-sidebar-link ${
          pathname.startsWith("/accounts/bank-transaction") &&
          "user-sidebar-link-active"
        }`}
      >
        <Landmark className="w-5 h-5 text-redColor" />
        <span>Bank Transaction</span>
      </Link>
      <Link
        to="/accounts/salary?page=1"
        className={`user-sidebar-link ${
          pathname.startsWith("/accounts/salary") &&
          "user-sidebar-link-active"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-5 text-redColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
          />
        </svg>
        <span>Salary</span>
      </Link>
      <Link
        to="/accounts/income?page=1"
        className={`user-sidebar-link ${
          pathname.startsWith("/accounts/income") && "user-sidebar-link-active"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
          />
        </svg>
        <span>Income</span>
      </Link>
      <Link
        to="/accounts/expense?page=1"
        className={`user-sidebar-link ${
          pathname.startsWith("/accounts/expense") && "user-sidebar-link-active"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-5 text-redColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 6 9 12.75l4.286-4.286a11.948 11.948 0 0 1 4.306 6.43l.776 2.898m0 0 3.182-5.511m-3.182 5.51-5.511-3.181"
          />
        </svg>
        <span>Expense</span>
      </Link>
      <Link
        to="/accounts/report"
        className={`user-sidebar-link ${
          pathname.startsWith("/accounts/report") && "user-sidebar-link-active"
        }`}
      >
        <ScrollText className="w-5 h-5 text-redColor" />
        <span>Report</span>
      </Link>
      <Link
        to="/user/dashboard"
        className={`user-sidebar-link ${
          pathname.startsWith("/user/dashboard") &&
          "user-sidebar-link-active"
        }`}
      >
        <ArrowLeft className="w-5 h-5 text-redColor" />
        <span>Back to Dashboard</span>
      </Link>
    </>
  );
}
