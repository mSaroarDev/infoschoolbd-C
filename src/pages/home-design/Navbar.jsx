import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Logo from "../../components/Logo";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 200) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const { pathname } = useLocation();

  return (
    <>
      <section
        className={`bg-white w-full ${
          scrolled
            ? "navbar-scrolled fixed top-0 left-0 right-0 z-50 transition-all duration-300 shadow-md"
            : ""
        }}`}
      >
        <main>
          <div className="grid grid-cols-12 gap-3 navbar-wrapper px-5">
            <div className="col-span-3 flex items-center">
              <Logo />
            </div>
            <div className="col-span-9 flex items-center justify-end gap-3">
              <div className="col-span-8 text-right navbar-links mr-4 hidden lg:block">
                <Link
                  to="/"
                  className={pathname == "/" && "navbar-link-active"}
                >
                  হোমপেজ
                </Link>
                <Link
                  to="/about-us"
                  className={
                    pathname.startsWith("/about-us") && "navbar-link-active"
                  }
                >
                  আমাদের সম্পর্কে
                </Link>
                <Link
                  to="/services"
                  className={
                    pathname.startsWith("/services") && "navbar-link-active"
                  }
                >
                  সার্ভিস সমূহ
                </Link>
                <Link
                  to="/pricing"
                  className={
                    pathname.startsWith("/pricing") && "navbar-link-active"
                  }
                >
                  মূল্য তালিকা
                </Link>
                <Link
                  to="/contact"
                  className={
                    pathname.startsWith("/contact") && "navbar-link-active"
                  }
                >
                  যোগাযোগ
                </Link>
              </div>
              <div className="col-span-2">
                <Link
                  to="/login"
                  className="bg-brandColor text-white px-5 py-3 rounded-md text-[16px]"
                >
                  ক্লায়েন্ট লগিন
                </Link>
              </div>
              <div className="col-span-2 lg:hidden flex items-center justify-center">
                <div className="drawer drawer-end">
                  <input
                    id="my-drawer-4"
                    type="checkbox"
                    className="drawer-toggle"
                  />
                  <div className="drawer-content">
                    {/* Page content here */}
                    <label
                      htmlFor="my-drawer-4"
                      className="drawer-button mt-1 ml-2"
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
                          d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
                        />
                      </svg>
                    </label>
                  </div>
                  <div className="drawer-side">
                    <label
                      htmlFor="my-drawer-4"
                      aria-label="close sidebar"
                      className="drawer-overlay"
                    ></label>
                    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                      {/* Sidebar content here */}
                      <li>
                        <Link
                          to="/"
                          className={
                            pathname.startsWith("/") && "navbar-link-active"
                          }
                        >
                          হোমপেজ
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/about-us"
                          className={
                            pathname.startsWith("/about-us") &&
                            "navbar-link-active"
                          }
                        >
                          আমাদের সম্পর্কে
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/services"
                          className={
                            pathname.startsWith("/services") &&
                            "navbar-link-active"
                          }
                        >
                          সার্ভিস সমূহ
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/pricing"
                          className={
                            pathname.startsWith("/pricing") &&
                            "navbar-link-active"
                          }
                        >
                          মূল্য তালিকা
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/contact"
                          className={
                            pathname.startsWith("/contact") &&
                            "navbar-link-active"
                          }
                        >
                          যোগাযোগ
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
}
