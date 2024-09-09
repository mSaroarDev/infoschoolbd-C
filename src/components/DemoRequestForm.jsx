import { useFormik } from "formik";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { showError } from "../utils/toastMessage";
import { createDemoReq } from "../libs/demoReq";
import Swal from "sweetalert2";
import Spinner from "./spinner/Spinner";

export default function DemoRequestForm({buttonText}) {
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

  // form data send to admin
  const formik = useFormik({
    initialValues: {
      school_name: "",
      email: "",
      phone: "",
    },
    onSubmit: async (values, { resetForm }) => {
      if (!values.school_name || !values.email || !values.phone) {
        return showError("Please input all fields");
      }

      try {
        setLoading(true);
        const res = await createDemoReq(values);
        if (res.ok) {
          resetForm();
          setShowModal(false);
          Swal.fire({
            title: "Sucess",
            text: "তথ্যগুলি জমা হয়েছে। অতি শীঘ্রই আপনার দেওয়া মোবাইলে একটি ডেমো অ্যাকাউন্ট মেসেজ করে পাঠানো হবে। ধন্যবাদ 😊",
            icon: "success",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: '<a href="/">Why do I have this issue?</a>',
          });
        }
      } catch (error) {
        showError("Internal Server Error");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <>
      {loading && <Spinner />}
      <button
        onClick={() => setShowModal(true)}
        className="w-fit mt-7 bg-brandColor text-white px-5 py-3 rounded-md text-[15px] transition-all duration-300 flex items-center gap-2"
      >
        <span>{buttonText}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
          />
        </svg>
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
                Demo Request
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
                  <form onSubmit={formik.handleSubmit} className="w-full">
                    <label>School/College/Madrasha Name:</label>
                    <input
                      type="text"
                      id="school_name"
                      name="school_name"
                      value={formik.values.school_name}
                      onChange={formik.handleChange}
                      className="w-full mb-2"
                    />
                    <label>Your Email:</label>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      className="w-full mb-2"
                    />
                    <label>Your Phone No:</label>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      className="w-full mb-2"
                    />
                    <button type="submit" className="button-main w-full">
                      Get Demo
                    </button>
                  </form>
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
