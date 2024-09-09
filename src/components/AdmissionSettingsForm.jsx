import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { showError, showSuccess } from "../utils/toastMessage";
import { getMySchool, updateAdmissionSettings } from "../libs/schoolAPI";
import { useEffect, useRef, useState } from "react";
import Spinner from "./spinner/Spinner";
import JoditEditor from "jodit-react";

export default function AdmissionSettingsForm() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // jodit editor
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const joditConfig = {
    height: "350px",
    placeholder: "এখানে লিখুন...",
  };

  // get the existing data
  const [data, setData] = useState();
  const getData = async () => {
    setLoading(true);
    const res = await getMySchool();

    setLoading(false);
    if (res.ok) {
      const data = await res.json();
      setData(data.data);
    } else {
      console.log(res);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const formik = useFormik({
    initialValues: {
      isOpen: "",
      instructions: "",
    },
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const res = await updateAdmissionSettings(values);

        setLoading(false);
        if (res.ok) {
          showSuccess("Admission System Updated Successfully");
          navigate("/user/settings");
        }
      } catch (error) {
        showError("There was an server side error");
      } finally {
        setLoading(true);
      }
    },
  });

  useEffect(() => {
    formik.setValues({
      isOpen: data?.admission_corner?.isOpen,
      instructions: data?.admission_corner?.instructions,
    });
    setContent(data?.admission_corner?.instructions);
  }, [data]);

  return (
    <>
      {loading && <Spinner />}
      <form onSubmit={formik.handleSubmit} className="grid grid-cols-12 gap-4">
        <div className="col-span-12 flex flex-col items-center w-fit">
          <label>অ্যাডমিশন সিস্টেম চালু / বন্ধ করুন</label>
          <select
            id="isOpen"
            name="isOpen"
            value={formik.values.isOpen}
            onChange={formik.handleChange}
            className="w-fit"
          >
            <option value="">সিলেক্ট করুন</option>
            <option value="true">চালু</option>
            <option value="false">বন্ধ</option>
          </select>
        </div>

        <div className="col-span-12">
          <label>শর্তাবলী বর্ননা করুন</label>
          {/* <textarea
            rows={10}
            className="resize-none"
            type="text"
            id="instructions"
            name="instructions"
            value={formik.values.instructions}
            onChange={formik.handleChange}
          ></textarea> */}
          <JoditEditor
            ref={editor}
            value={content}
            onBlur={(newContent) => {
              formik.setFieldValue("instructions", newContent);
            }}
            config={joditConfig}
          />
        </div>

        <button type="submit" className="button-dark w-fit col-span-12">
          আপডেট করুন
        </button>
      </form>
    </>
  );
}
