import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { getSchoolById, updateAccess } from "../libs/schoolAPI";
import { useEffect, useState } from "react";
import Spinner from "./spinner/Spinner";
import { showError, showSuccess } from "../utils/toastMessage";

export default function EditSchoolPermission() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  // existing data
  const [data, setData] = useState();
  const fetchData = async () => {
    const res = await getSchoolById(id);

    if (res.ok) {
      const data = await res.json();
      setData(data.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const formik = useFormik({
    initialValues: {
      has_access: "",
      website_visible: ""
    },
    onSubmit: async (values) => {

      try {
        setLoading(true);
        const res = await updateAccess(id, values);

        setLoading(false);
        if (res.ok) {
          showSuccess("Access info updated");
          navigate("/developer/schools?page=1");
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
        website_visible: data?.website_visible,
        has_access: data?.has_access,
    });
  }, [data]);

  return (
    <>
      {loading && <Spinner />}
      <form onSubmit={formik.handleSubmit} className="grid grid-cols-12 gap-4">
        <div className="col-span-12">
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              id="has_access"
              name="has_access"
              checked={formik.values.has_access}
              value={formik.values.has_access}
              onChange={formik.handleChange}
              className="sr-only peer"
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              Access
            </span>
          </label>
        </div>

        <div className="col-span-12">
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              id="website_visible"
              name="website_visible"
              checked={formik.values.website_visible}
              value={formik.values.website_visible}
              onChange={formik.handleChange}
              className="sr-only peer"
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              Website Visible
            </span>
          </label>
        </div>

        <button type="submit" className="button-dark w-fit col-span-12 mt-5">
          Update Permission
        </button>
      </form>
    </>
  );
}
