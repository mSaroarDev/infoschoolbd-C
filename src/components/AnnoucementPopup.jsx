import { Quote, X } from "lucide-react";
import { useEffect, useState } from "react";
import Spinner from "./spinner/Spinner";

export default function AnnoucementPopup({ data }) {
  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    if (data?.isActive === true) {
      setTimeout(() => {
        setShowModal(true);
      }, 3000);
    }
  }, []);

  return (
    <>
      {loading && <Spinner />}

      {/* modal box */}
      {showModal && (
        <div className="fixed top-0 bottom-0 left-0 right-0 bg-black/20 overflow-hidden z-50 overscroll-none">
          <div className="w-full h-full flex items-center justify-center">
            <div
              className={`w-full max-w-[600px] bg-lightBg poppins-regular rounded-xl overflow-hidden relative transition-transform duration-300 transform ${
                modalVisible ? "scale-100" : "scale-0"
              }`}
            >
              <h2 className="text-center text-[18px] bg-white py-2 font-semibold">
                Announcement
              </h2>

              <div className="p-3">
                <div className="bg-white rounded-xl p-5 flex items-start gap-5">
                  {/* <div className="w-24 h-24 bg-blue-600/10 text-blue-600 flex items-center justify-center rounded-xl">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-10"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 0 1-1.44-4.282m3.102.069a18.03 18.03 0 0 1-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 0 1 8.835 2.535M10.34 6.66a23.847 23.847 0 0 0 8.835-2.535m0 0A23.74 23.74 0 0 0 18.795 3m.38 1.125a23.91 23.91 0 0 1 1.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 0 0 1.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 0 1 0 3.46"
                      />
                    </svg>
                  </div> */}
                  <Quote className="min-w-10 h-10 mb-5 rotate-180 text-gray-500" />

                  <div className="bangla-font">
                  
                    <div
                      dangerouslySetInnerHTML={{
                        __html: data && data?.description,
                      }}
                    />
                  </div>
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
