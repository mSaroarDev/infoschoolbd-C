import { useFormik } from "formik";
import { showError, showSuccess } from "../utils/toastMessage";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "./spinner/Spinner";
import JoditEditor from "jodit-react";
import { createAnnouncement } from "../libs/announcement";

export default function NewAnnouncementForm() {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const joditConfig = {
    height: "350px",
  };

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    onSubmit: async (values) => {
      if (!values.title) {
        return showError("Notice title must be given");
      }

      setLoading(true);
      const res = await createAnnouncement(values);

      setLoading(false);
      if (res.ok) {
        showSuccess("Announcement Pubshished");
        navigate(-1);
      } else {
        showError("Failed");
      }
    },
  });
  return (
    <>
      {loading && <Spinner />}
      <form onSubmit={formik.handleSubmit}>
        <label>
          Subject <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          className="mb-3"
        />
        <label>
          Description <span className="text-red-500">*</span>
        </label>

        <JoditEditor
          ref={editor}
          value={content}
          onBlur={(newContent) => {
            formik.setFieldValue("description", newContent);
          }}
          config={joditConfig}
        />

        <button
          type="submit"
          className="button-dark flex items-center gap-2 mt-2"
        >
          <span>Publish</span>
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
    </>
  );
}
