import { useFormik } from "formik";
import { Key, X } from "lucide-react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { changePassword } from "../libs/usersAPI";
import { showError } from "../utils/toastMessage";
import Spinner from "./spinner/Spinner";

export default function ChangePassPopup() {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (showModal) {
      setTimeout(() => setModalVisible(true), 50);
    } else if (!showModal && modalVisible) {
      setModalVisible(false);
      setTimeout(() => setShowModal(false), 300);
    }
  }, [showModal, modalVisible]);

  // form data send to admin
  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      password1: "",
      password2: "",
    },
    onSubmit: async (values, { resetForm }) => {
      if (!values.oldPassword || !values.password1 || !values.password2) {
        return showError("Please input all fields");
      }

      if (values.password1 !== values.password2) {
        return showError("Password doesnt match!");
      }

      try {
        setLoading(true);
        const res = await changePassword(values);
        if (res.ok) {
          resetForm();
          setShowModal(false);
          Swal.fire({
            title: "Sucess",
            text: "Password Changed",
            icon: "success",
          });
        } else if (res.status === 406) {
          resetForm();
          setShowModal(false);
          Swal.fire({
            title: "Failed",
            text: "Old password doesnt match",
            icon: "error",
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
        className="flex items-center gap-3 px-4 py-2 bg-lightBg"
      >
        <Key className="w-4 h-4" />
        <span>পাসওয়ার্ড পরিবর্তন করুন</span>
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
                Change your password
              </h2>

              {/* <div className="w-full h-[220px]">
                <img
                  src="/cover_image.jpg"
                  alt="infoSchoolbd"
                  className="w-full h-full object-contain"
                />
              </div> */}

              <div className="p-5">
                <div className="bg-white rounded-xl p-5">
                  <form onSubmit={formik.handleSubmit} className="w-full">
                    <label className="text-[14px]">Old Password:</label>
                    <input
                      type="password"
                      id="oldPassword"
                      name="oldPassword"
                      value={formik.values.oldPassword}
                      onChange={formik.handleChange}
                      className="w-full mb-2"
                    />
                    <label className="text-[14px]">New Password:</label>
                    <input
                      type="password"
                      id="password1"
                      name="password1"
                      value={formik.values.password1}
                      onChange={formik.handleChange}
                      className="w-full mb-2"
                    />
                    <label className="text-[14px]">Confirm New Password:</label>
                    <input
                      type="password"
                      id="password2"
                      name="password2"
                      value={formik.values.password2}
                      onChange={formik.handleChange}
                      className="w-full mb-2"
                    />
                    <button type="submit" className="button-main w-full">
                      Change Password
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
