import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { showError, showSuccess } from "../utils/toastMessage";
import { useRef, useState } from "react";
import Spinner from "./spinner/Spinner";
import { createTestimonial } from "../libs/testimonialAPI";
import fileUpload from "./../libs/file-upload";
import JoditEditor from "jodit-react";

export default function TestimonialForm() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // jodit editor
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const joditConfig = {
    height: '350px',
    placeholder:"এখানে লিখুন..."
  }

  // get the existing data
  // image upload
  const [imgUrl, setImgUrl] = useState();
  const handleChange = async (e) => {
    setLoading(true);
    try {
      const image = e.target.files[0];
      const fileSizeInKb = parseInt(image.size) / 1024;
      if (fileSizeInKb > 1024) {
        return showError("FileSize must be less than 1 MB");
      }
      const allowedTypes = ["image/jpeg", "image/png"];
      if (!allowedTypes.includes(image.type)) {
        return showError("Please select jpg or png image only");
      }

      // image upload to server
      setLoading(true);
      const res = await fileUpload(image);
      const file = await res.json();
      setLoading(false);
      if (res.ok) {
        formik.setFieldValue("image", file.url);
        setImgUrl(file.url);
      }
    } catch (error) {
      showError("Image Upload Failed");
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      designation: "",
      image: "",
      text: "",
    },
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const res = await createTestimonial(values);

        setLoading(false);
        if (res.ok) {
          showSuccess("Added Successfully");
          navigate(-1);
        }
      } catch (error) {
        showError("There was an server side error");
      } finally {
        setLoading(true);
      }
    },
  });

  return (
    <>
      {loading && <Spinner />}
      <form onSubmit={formik.handleSubmit} className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-6">
          <label>নাম</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <label>পদবী</label>
          <input
            className="resize-none"
            type="text"
            id="designation"
            name="designation"
            value={formik.values.designation}
            onChange={formik.handleChange}
          />
        </div>
        <div className="col-span-12">
          <label>বানী</label>
          {/* <textarea
            rows={10}
            className="resize-none"
            type="text"
            id="text"
            name="text"
            value={formik.values.text}
            onChange={formik.handleChange}
          ></textarea> */}
          <JoditEditor
            ref={editor}
            value={content}
            onBlur={(newContent) => {
              formik.setFieldValue("text", newContent);
            }}
            config={joditConfig}
          />
        </div>

        <div className="col-span-12">
          <label>ছবি</label>
          <div className="flex items-center justify-start w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full max-w-[160px] h-[160px] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 overflow-hidden object-cover"
            >
              {imgUrl ? (
                <>
                  <img
                    src={imgUrl}
                    className="w-full h-full object-cover"
                    alt="Image"
                  />
                </>
              ) : (
                <>
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Upload Picture</span>
                    </p>
                  </div>
                </>
              )}
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={handleChange}
              />
            </label>
          </div>
        </div>

        <button type="submit" className="button-dark w-fit col-span-12">
          আপডেট
        </button>
      </form>
    </>
  );
}
