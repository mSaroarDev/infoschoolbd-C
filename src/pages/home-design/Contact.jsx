import { useFormik } from "formik";
import { useState } from "react";
import { createContact } from "../../libs/contacts";
import { showError } from "./../../utils/toastMessage";
import Spinner from "../../components/spinner/Spinner";
import Swal from "sweetalert2";

export default function Contact() {
  const [loading, setLoading] = useState(false);

  // send mail
  const formik = useFormik({
    initialValues: {
      name: "",
      school_name: "",
      email: "",
      mobile_no: "",
      message: "",
    },

    onSubmit: async (values, { resetForm }) => {
      if (
        !values.name ||
        !values.school_name ||
        !values.email ||
        !values.mobile_no ||
        !values.message
      ) {
        return showError("Please input all fields");
      }

      setLoading(true);
      const res = await createContact(values);

      setLoading(false);
      if (res.ok) {
        Swal.fire({
          title: "Success!",
          text: "The message was sent successfully.",
          icon: "success",
        });
        resetForm();
      } else {
        showError("Message Sending Failed");
      }
    },
  });
  return (
    <>
      {loading && <Spinner />}
      <section className="py-14 bg-lightBg">
        <main className="px-5">
          <div className="grid grid-cols-12 gap-5">
            <div className="col-span-12 md:col-span-6 flex items-center">
              <div>
                <h2 className="font-bold text-[32px] text-center md:text-left">
                  আরও বিস্তারিত জানতে এবং সার্ভিস অর্ডার করতে আমাদের মেসেজ করুন
                </h2>

                <h1 className="poppins-regular mt-5 mb-3 text-center md:text-left">
                  <strong>
                    Welcome to infoSchoolBD: Your Top Choice for School
                    Management Software
                  </strong>
                </h1>
                <p className="poppins-regular text-center md:text-left">
                  At infoSchoolBD, we offer the best in school management
                  software, designed to streamline your educational institutions
                  operations. Our affordable and reliable system is perfect for
                  schools, colleges, and madrasas. Discover how infoSchoolBD can
                  transform your institution today.
                </p>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 p-0 lg:p-5">
              <div className="bg-white border border-borderColor p-5 lg:p-10 rounded-lg">
                <h2 className="font-bold text-[22px] flex items-center gap-4 mb-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                    />
                  </svg>
                  <span>Contact Form</span>
                </h2>
                <form
                  onSubmit={formik.handleSubmit}
                  className="grid grid-cols-12 gap-2"
                >
                  <input
                    type="text"
                    id="name"
                    name="name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    placeholder="আপনার নাম"
                    className="col-span-12"
                    required
                  />
                  <input
                    type="text"
                    id="school_name"
                    name="school_name"
                    onChange={formik.handleChange}
                    value={formik.values.school_name}
                    placeholder="আপনার প্রতিষ্ঠানের নাম"
                    className="col-span-12"
                    required
                  />
                  <input
                    type="text"
                    id="email"
                    name="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    placeholder="ইমেইল"
                    className="col-span-6"
                    required
                  />
                  <input
                    type="text"
                    id="mobile_no"
                    name="mobile_no"
                    onChange={formik.handleChange}
                    value={formik.values.mobile_no}
                    placeholder="মোবাইল নং"
                    className="col-span-6"
                    required
                  />
                  <textarea
                    type="text"
                    id="message"
                    name="message"
                    onChange={formik.handleChange}
                    value={formik.values.message}
                    placeholder="মেসেজ লিখুন"
                    className="col-span-12 resize-none"
                    rows="4"
                    required
                  ></textarea>
                  <button
                    type="submit"
                    className="w-fit flex items-center gap-2 col-span-12 bg-brandColor px-5 py-2 rounded-md text-white text-[17px]"
                  >
                    <span>সেন্ড করুন</span>
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
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
}
