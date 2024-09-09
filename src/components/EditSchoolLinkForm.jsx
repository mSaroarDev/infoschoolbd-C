import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { showError, showSuccess } from "../utils/toastMessage";
import { getSchoolById, updateWebsite } from "../libs/schoolAPI";
import { useEffect, useState } from "react";
import Spinner from "./spinner/Spinner";

export default function EditSchoolLinkForm() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  // existing data
  const [data, setData] = useState()
  const fetchData = async () => {
    const res = await getSchoolById(id)

    if(res.ok){
      const data = await res.json()
      setData(data.data)
    }
  }

  useEffect(()=> {
    fetchData()
  }, [id])

  const formik = useFormik({
    initialValues: {
      website_address: "",
    },
    onSubmit: async (values) => {
      const { website_address } = values;
      if (!website_address) {
        return showError("Link is required!");
      }

      try {
        setLoading(true);
        const res = await updateWebsite(id, values);

        setLoading(false);
        if (res.ok) {
          showSuccess("Link updated");
          navigate("/developer/schools?page=1");
        }
      } catch (error) {
        showError("There was an server side error");
      } finally {
        setLoading(true);
      }
    },
  });

  useEffect(()=> {
    formik.setValues({
      website_address: data?.school_information?.web || ""
    })
  }, [data])

  return (
    <>
      {loading && <Spinner />}
      <form onSubmit={formik.handleSubmit} className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-6">
          <label>School Link</label>
          <input
            type="text"
            id="website_address"
            name="website_address"
            value={formik.values.website_address}
            onChange={formik.handleChange}
            placeholder="eg: https://www.school-link.com"
          />
        </div>

        <button type="submit" className="button-dark w-fit col-span-12">
          Update Link
        </button>
      </form>
    </>
  );
}
