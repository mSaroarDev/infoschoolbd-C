import {
  Headset,
  LayoutPanelLeft,
  Lightbulb,
  MessagesSquare,
  UsersRound,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getUnreadDemoReqs } from "../libs/demoReq";
import { getUnreadCount } from "../libs/contacts";

export default function DevSidebarLinks() {
  const { pathname } = useLocation();

  const [data, setData] = useState({
    unreadDemoReqs: 0,
    unreadContacts: 0,
  });

  // get unread demo reqs
  const getUnreadDemo = async () => {
    const res = await getUnreadDemoReqs();
    if (res.ok) {
      const response = await res.json();
      setData((data) => ({
        ...data,
        unreadDemoReqs: response?.data,
      }));
    }
  };

  // get unread contacts count
  const getUnreadContacts = async () => {
    const res = await getUnreadCount();
    if (res.ok) {
      const response = await res.json();
      setData((data) => ({
        ...data,
        unreadContacts: response?.data,
      }));
    }
  };

  useEffect(() => {
    getUnreadDemo();
    getUnreadContacts();
  }, []);


  return (
    <>
      <Link
        to="/developer/dashboard"
        className={`user-sidebar-link mt-7 ${
          pathname.startsWith("/developer/dashboard") &&
          "user-sidebar-link-active"
        }`}
      >
        <LayoutPanelLeft className="w-5 h-5 text-redColor" />
        <span>Overview</span>
      </Link>
      <Link
        to="/developer/announcement?page=1"
        className={`user-sidebar-link ${
          pathname.startsWith("/developer/announcement") &&
          "user-sidebar-link-active"
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
            d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 0 1-1.44-4.282m3.102.069a18.03 18.03 0 0 1-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 0 1 8.835 2.535M10.34 6.66a23.847 23.847 0 0 0 8.835-2.535m0 0A23.74 23.74 0 0 0 18.795 3m.38 1.125a23.91 23.91 0 0 1 1.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 0 0 1.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 0 1 0 3.46"
          />
        </svg>
        <span>Announcements</span>
      </Link>
      <Link
        to="/developer/messages?page=1"
        className={`user-sidebar-link ${
          pathname.startsWith("/developer/messages") &&
          "user-sidebar-link-active"
        }`}
      >
        <MessagesSquare className="w-5 h-5 text-redColor" />
        <span>Messages</span>
      </Link>
      <Link
        to="/developer/users?page=1"
        className={`user-sidebar-link ${
          pathname.startsWith("/developer/users") && "user-sidebar-link-active"
        }`}
      >
        <UsersRound className="w-5 h-5 text-redColor" />
        <span>Users</span>
      </Link>
      <Link
        to="/developer/schools?page=1"
        className={`user-sidebar-link ${
          pathname.startsWith("/developer/schools") &&
          "user-sidebar-link-active"
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
            d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
          />
        </svg>

        <span>Schools</span>
      </Link>

      <Link
        to="/developer/contacts"
        className={`user-sidebar-link flex items-center justify-between ${
          pathname.startsWith("/developer/contacts") &&
          "user-sidebar-link-active"
        }`}
      >
        <div className="flex items-center gap-3">
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
              d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
            />
          </svg>

          <span>Contacts</span>
        </div>
        {data?.unreadContacts > 0 ? (
          <div className="bg-brandColor w-5 h-5 rounded-full text-xs text-white font-normal flex items-center justify-center leading-5">
            {data?.unreadContacts}
          </div>
        ) : (
          ""
        )}
      </Link>

      <Link
        to="/developer/demo-requests?page=1"
        className={`user-sidebar-link flex items-center justify-between ${
          pathname.startsWith("/developer/demo-requests") &&
          "user-sidebar-link-active"
        }`}
      >
        <div className="flex items-center gap-3">
          <Lightbulb className="w-5 h-5" />
          <span>Demo Requests</span>
        </div>
        {data?.unreadDemoReqs > 0 ? (
          <div className="bg-brandColor w-5 h-5 rounded-full text-xs text-white font-normal flex items-center justify-center leading-5">
            {data?.unreadDemoReqs}
          </div>
        ) : (
          ""
        )}
      </Link>

      <Link
        to="/developer/support"
        className={`user-sidebar-link ${
          pathname.startsWith("/developer/support") &&
          "user-sidebar-link-active"
        }`}
      >
        <Headset className="w-5 h-5 text-redColor" />
        <span>Support</span>
      </Link>
    </>
  );
}
