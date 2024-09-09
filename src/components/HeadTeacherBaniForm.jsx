import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { showError, showSuccess } from "../utils/toastMessage";
import { getMySchool, updateHeadTeacher } from "../libs/schoolAPI";
import { useEffect, useRef, useState } from "react";
import Spinner from "./spinner/Spinner";
import JoditEditor from "jodit-react";

export default function HeadTeacherBaniForm() {
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
      bani: "",
    },
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const res = await updateHeadTeacher(values);

        setLoading(false);
        if (res.ok) {
          showSuccess("Updated Successfully");
          navigate(-1);
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
      bani: data?.bani?.head_teacher,
    });
    setContent(data?.bani?.head_teacher);
  }, [data]);

  return (
    <>
      {loading && <Spinner />}
      <form onSubmit={formik.handleSubmit} className="grid grid-cols-12 gap-4">
        <div className="col-span-12">
          <label>বানী বর্ননা করুন</label>
          {/* <textarea
            rows={10}
            className="resize-none"
            type="text"
            id="bani"
            name="bani"
            value={formik.values.bani}
            onChange={formik.handleChange}
          ></textarea> */}

          <JoditEditor
            ref={editor}
            value={content}
            onBlur={(newContent) => {
              formik.setFieldValue("bani", newContent);
            }}
            config={joditConfig}
          />
        </div>

        <button type="submit" className="button-dark w-fit col-span-12">
          আপডেট
        </button>
      </form>
    </>
  );
}
