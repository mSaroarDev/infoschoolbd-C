import { useFormik } from "formik";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { showError } from "../utils/toastMessage";
import { markDone } from "../libs/demoReq";
import Swal from "sweetalert2";
import Spinner from "./spinner/Spinner";

export default function DemoRequestPopup({
  buttonText,
  data,
  clickViewButton,
  getReqs
}) {
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
      idGiven: "",
    },
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const res = await markDone(data?._id, values);
        if (res.ok) {
          setShowModal(false);
          Swal.fire({
            title: "Sucess",
            text: "The Request Is Completed😊",
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
        getReqs()
      }
    },
  });

  useEffect(() => {
    formik.setValues({
      school_name: data?.school_name,
      email: data?.email,
      phone: data?.phone,
      idGiven: data?.idGiven,
    });
  }, [data]);

  return (
    <>
      {loading && <Spinner />}
      <button
        onClick={() => {
          setShowModal(true);
          clickViewButton();
        }}
        className="w-fit bg-brandColor text-white px-3 py-1 rounded-md text-[15px] transition-all duration-300 flex items-center gap-2"
      >
        <span>{buttonText}</span>
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
                      disabled
                    />
                    <label>Email:</label>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      className="w-full mb-2"
                      disabled
                    />
                    <label>Phone No:</label>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      className="w-full mb-2"
                      disabled
                    />
                    <label>Demo ID Status:</label>
                    <select
                      type="text"
                      id="idGiven"
                      name="idGiven"
                      value={formik.values.idGiven}
                      onChange={formik.handleChange}
                      className="w-full mb-2"
                    >
                      <option value="">Select</option>
                      <option value={true}>Given</option>
                      <option value={false}>Pending</option>
                    </select>
                    <button type="submit" className="button-main w-full">
                      Update
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
