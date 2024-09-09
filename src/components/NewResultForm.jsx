import { useFormik } from "formik";
import { showError, showSuccess } from "../utils/toastMessage";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "./spinner/Spinner";
import { createResult } from "../libs/resultAPI";
import fileUpload from "../libs/file-upload";

export default function NewResultForm() {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    // image upload
  const [pdf, setPdfUrl] = useState();
  const handleChange = async (e) => {
    setLoading(true);
    try {
      const image = e.target.files[0];
      const fileSizeInKb = parseInt(image.size) / 1024;
      if (fileSizeInKb > 5125) {
        return showError("FileSize must be less than 5 MB");
      }
      const allowedTypes = "application/pdf";
      if (!allowedTypes.includes(image.type)) {
        return showError("Please select pdf file only");
      }

      // image upload to server
      setLoading(true);
      const res = await fileUpload(image);
      const file = await res.json();
      setLoading(false);
      if (res.ok) {
        formik.setFieldValue("pdf_link", file.url);
        setPdfUrl(file.url);
      }
    } catch (error) {
      showError("PDF File Upload Failed");
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      pdf_link: ""
    },
    onSubmit: async (values) => {
        if(!values.title || !values.pdf_link){
          return showError("All fields must be given")
        }
        
        setLoading(true)
        const res = await createResult(values);

        setLoading(false)
        if(res.ok){
            showSuccess("Success")
            navigate(-1)
        } else {
            showError("Server Error")
        }
    }
  });
  return (
    <>
    {loading && <Spinner />}
      <form onSubmit={formik.handleSubmit}>
        <label>
          ফলাফল বিবরন <span className="text-red-500">*</span>
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
          PDF ফাইল আপলোড করুন <span className="text-red-500">*</span>
        </label>
        <input type="file" onChange={handleChange} className="w-fit" accept="application/pdf" />
        <button type="submit" className="button-main mt-3">
          পোস্ট করুন
        </button>
      </form>
    </>
  );
}
