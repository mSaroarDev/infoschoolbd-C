import { useFormik } from "formik";
import { showError, showSuccess } from "../utils/toastMessage";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "./spinner/Spinner";
import { createMessage } from "../libs/message";
import JoditEditor from "jodit-react";

export default function NewMessageForm() {
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
      const res = await createMessage(values);

      setLoading(false);
      if (res.ok) {
        showSuccess("Message sent");
        navigate("/developer/messages?page=1");
      } else {
        showError("Message sending failed");
      }

      console.log(values);
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

        {/* <textarea
          type="text"
          id="description"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          rows={6}
        ></textarea> */}
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
          <span>Send</span>
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
