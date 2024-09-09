import { useFormik } from "formik";
import { showError, showSuccess } from "../utils/toastMessage";
import { createNotice } from "../libs/noticeAPI";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "./spinner/Spinner";
import JoditEditor from "jodit-react";
import Swal from "sweetalert2";

export default function NewNoticeForm() {
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

      Swal.fire({
        title: "Confirmation",
        text: "Are you sure you want to publish?",
        confirmButtonText: "Yes Confirm",
        confirmButtonColor: "#3182ce",
        icon: "question",
        showCancelButton: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            setLoading(true);
            const res = await createNotice(values);
            if (res.ok) {
              showSuccess("Notice create success");
              navigate("/user/notices?page=1");
            } else {
              showError("Notice create failed");
            }
          } catch (error) {
            showError("Internal Server Error");
          } finally {
            setLoading(false);
          }
        }
      });
    },
  });

  return (
    <>
      {loading && <Spinner />}
      <form onSubmit={formik.handleSubmit}>
        <label>
          নোটিশ টাইটেল <span className="text-red-500">*</span>
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
          বিস্তারিত লিখুন <span className="text-red-500">*</span>
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
        <button type="submit" className="button-main mt-5">
          পোস্ট করুন
        </button>
      </form>
    </>
  );
}
