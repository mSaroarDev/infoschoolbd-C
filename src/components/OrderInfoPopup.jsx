import { X } from "lucide-react";
import { useEffect, useState } from "react";

export default function OrderInfoPopup({ data }) {
  const [showModal, setShowModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (showModal) {
      setTimeout(() => setModalVisible(true), 50);
    } else if (!showModal && modalVisible) {
      // Trigger the closing animation and then hide the modal after it completes
      setModalVisible(false);
      setTimeout(() => setShowModal(false), 300); // Delay should match the transition duration
    }
  }, [showModal, modalVisible]);

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className={`px-7 py-2 rounded-full font-bold text-[17px] mt-5 ${
          data?.package_name == "Pro Plus (Most Popular)"
            ? "bg-[#4F46E5] text-white"
            : "bg-[#4F46E5]/10 text-[#4F46E5]"
        }`}
      >
        <span>অর্ডার করুন</span>
      </button>

      {/* modal box */}
      {showModal && (
        <div className="fixed top-0 bottom-0 left-0 right-0 bg-black/20 overflow-hidden z-50 overscroll-none">
          <div className="w-full h-full flex items-center justify-center">
            <div
              className={`w-full max-w-[400px] bg-lightBg poppins-regular rounded-xl overflow-hidden relative transition-transform duration-300 transform ${
                modalVisible ? "scale-100" : "scale-0"
              }`}
            >
              <h2 className="text-center text-[18px] bg-white py-2 font-semibold">
                Order Now
              </h2>

              <div className="w-full h-[220px]">
                <img
                  src="/cover_image.jpg"
                  alt="infoSchoolbd"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="p-5">
                <div className="bg-white rounded-xl p-5">
                  <p className="bangla-font2 text-[18px] font-bold text-center">
                    আমাদের সার্ভিসটি অর্ডার করতে অথবা বিস্তারিত জানতে ফোন করুন
                    আমাদের সাপোর্ট নম্বরে-
                  </p>
                  <h2 className="flex items-center justify-center gap-5 mt-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-7"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M20.25 3.75v4.5m0-4.5h-4.5m4.5 0-6 6m3 12c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 0 1 4.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 0 0-.38 1.21 12.035 12.035 0 0 0 7.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 0 1 1.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 0 1-2.25 2.25h-2.25Z"
                      />
                    </svg>

                    <span className="font-bold text-[30px] text-brandColor">017 98 456 380</span>
                  </h2>
                </div>
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="absolute top-2 right-2 bg-red-500/20 text-red-500 p-1 rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
