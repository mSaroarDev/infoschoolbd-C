import { Link } from "react-router-dom";
import AccountSidebarLinks from "./AccountSidebarLinks";

export default function AccountSidebar() {
  return (
    <>
      <div className="w-[280px] fixed top-0 bottom-0 left-0 z-50">
        <div className="w-full h-full border-r border-borderColor overflow-y-auto">
          <div className="flex flex-col h-full">
            <div className="p-5 mt-2">
              <Link to="/">
                <img src="/logo.png" className="w-[150px]" />
              </Link>
            </div>

            <AccountSidebarLinks />
          </div>
        </div>
      </div>
    </>
  );
}
