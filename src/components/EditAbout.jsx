import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { showError, showSuccess } from "../utils/toastMessage";
import { getMySchool, updateAbout } from "../libs/schoolAPI";
import { useEffect, useRef, useState } from "react";
import Spinner from "./spinner/Spinner";
import JoditEditor from "jodit-react";

export default function ChangeSchoolAbout() {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const joditConfig = {
    height: '350px'
  }

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
      institute_about: "",
    },
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const res = await updateAbout(values);

        setLoading(false);
        if (res.ok) {
          showSuccess("School About Updated Successfully");
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
      institute_about: data?.school_information?.school_about,
    });
    setContent(data?.school_information?.school_about)
  }, [data]);

  return (
    <>
      {loading && <Spinner />}
      <form onSubmit={formik.handleSubmit} className="grid grid-cols-12 gap-4">
        <div className="col-span-12">
          <label>পরিচিতি বর্ননা করুন</label>
          {/* <textarea rows={10} className="resize-none"
            type="text"
            id="institute_about"
            name="institute_about"
            value={formik.values.institute_about}
            onChange={formik.handleChange}
          ></textarea> */}

          <JoditEditor
            ref={editor}
            value={content}
            onBlur={(newContent) => {
              formik.setFieldValue("institute_about", newContent);
            }}
            config={joditConfig}
          />
        </div>

        <button type="submit" className="button-dark w-fit col-span-12">
          Update
        </button>
      </form>
    </>
  );
}
