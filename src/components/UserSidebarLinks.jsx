import {
  ClipboardList,
  LayoutPanelLeft,
  ListCollapse,
  ListTodo,
  MessagesSquare,
  ScrollText,
  Settings,
  UserRound,
  UserSearch,
  UsersRound,
  Wallet,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { getUnreadmessages } from "../libs/message";
import { useEffect, useState } from "react";

export default function UserSidebarLinks() {
  const { pathname } = useLocation();

  // const
  const [data, setData] = useState(0);
  const getMessages = async () => {
    const res = await getUnreadmessages();
    if (res.ok) {
      const data = await res.json();
      setData(data?.data);
    }
  };

  useEffect(() => {
    getMessages();
  }, []);  
  

  return (
    <>
      <Link
        to="/user/dashboard"
        className={`user-sidebar-link mt-3 ${
          pathname.startsWith("/user/dashboard") && "user-sidebar-link-active"
        }`}
      >
        <LayoutPanelLeft className="w-5 h-5 text-redColor" />
        <span>ওভারভিউ</span>
      </Link>
      <Link
        to="/accounts/dashboard"
        // target="_blank"
        className={`user-sidebar-link ${
          pathname.startsWith("/accounts") && "user-sidebar-link-active"
        }`}
      >
        <Wallet className="w-5 h-5 text-redColor" />
        <span>অ্যাকাউন্টস সেকশন</span>
      </Link>
      <Link
        to="/user/messages"
        className={`user-sidebar-link flex items-center justify-between ${
          pathname.startsWith("/user/messages") && "user-sidebar-link-active"
        }`}
      >
        <div className="flex items-center gap-3">
          <MessagesSquare className="w-5 h-5 text-redColor" />
          <span>মেসেজ</span>
        </div>
        {data > 0 ? (
          <div className="bg-brandColor w-5 h-5 rounded-full text-xs text-white font-normal flex items-center justify-center leading-5">
            {data}
          </div>
        ) : (
          ""
        )}
      </Link>
      <Link
        to="/user/notices?page=1"
        className={`user-sidebar-link ${
          pathname.startsWith("/user/notices") && "user-sidebar-link-active"
        }`}
      >
        <ListCollapse className="w-5 h-5 text-redColor" />
        <span>নোটিশ সমূহ</span>
      </Link>
      <Link
        to="/user/application-corner?page=1"
        className={`user-sidebar-link ${
          pathname.startsWith("/user/application-corner") &&
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

        <span>অ্যাডমিশন কর্নার</span>
      </Link>
      <Link
        to="/user/admission?page=1"
        className={`user-sidebar-link ${
          pathname.startsWith("/user/admission") && "user-sidebar-link-active"
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

        <span>নতুন শিক্ষার্থী ভর্তি</span>
      </Link>
      <Link
        to="/user/teachers?page=1"
        className={`user-sidebar-link ${
          pathname.startsWith("/user/teachers") && "user-sidebar-link-active"
        }`}
      >
        <UserRound className="w-5 h-5 text-redColor" />
        <span>শিক্ষক</span>
      </Link>
      <Link
        to="/user/students/all?page=1"
        className={`user-sidebar-link ${
          pathname.startsWith("/user/students") && "user-sidebar-link-active"
        }`}
      >
        <UsersRound className="w-5 h-5 text-redColor" />
        <span>শিক্ষার্থী</span>
      </Link>
      <Link
        to="/user/staffs?page=1"
        className={`user-sidebar-link ${
          pathname.startsWith("/user/staffs") && "user-sidebar-link-active"
        }`}
      >
        <UserSearch className="w-5 h-5 text-redColor" />
        <span>অফিস স্টাফ</span>
      </Link>
      <Link
        to="/user/committee?page=1"
        className={`user-sidebar-link ${
          pathname.startsWith("/user/committee") && "user-sidebar-link-active"
        }`}
      >
        <ClipboardList className="w-5 h-5 text-redColor" />
        <span>ম্যনেজিং কমিটি</span>
      </Link>
      <Link
        to="/user/classes?page=1"
        className={`user-sidebar-link ${
          pathname.startsWith("/user/classes") && "user-sidebar-link-active"
        }`}
      >
        <ListTodo className="w-5 h-5 text-redColor" />
        <span>শ্রেনী</span>
      </Link>
      <Link
        to="/user/results?page=1"
        className={`user-sidebar-link ${
          pathname.startsWith("/user/results") && "user-sidebar-link-active"
        }`}
      >
        <ScrollText className="w-5 h-5 text-redColor" />
        <span>ফলাফল</span>
      </Link>
      {/* <Link
        to="/user/support"
        className={`user-sidebar-link ${
          pathname.startsWith("/user/support") && "user-sidebar-link-active"
        }`}
      >
        <Headset className="w-5 h-5 text-redColor" />
        <span>সাপোর্ট</span>
      </Link> */}
      <Link
        to="/user/settings"
        className={`user-sidebar-link ${
          pathname.startsWith("/user/settings") && "user-sidebar-link-active"
        }`}
      >
        <Settings className="w-5 h-5 text-redColor" />
        <span>সেটিংস</span>
      </Link>
    </>
  );
}
