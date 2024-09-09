import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { showError, showSuccess } from "../../../utils/toastMessage";
import Spinner from "../../../components/spinner/Spinner";
import { getBaseUrl } from "../../../utils/getBaseUrl";

export default function InstallCreateSchoolForm() {
  const apiUrl = getBaseUrl();

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name_en: "",
      name_bn: "",
      institute_type: "N/A",
      stablished_at: "N/A",
      eiin: "N/A",
      institute_address: "N/A",
      region: "N/A",
      mpo: "N/A",
      edu_level: "N/A",
      shift: "N/A",
      contact: "N/A",
    },
    onSubmit: async (values) => {
      const { name_en, name_bn } = values;

      if (
        !name_en ||
        !name_bn
      ) {
        return showError("All fields are required!");
      }

      try {
        setLoading(true);
        try {
          const res = await fetch(
            `${apiUrl}/install/create-school`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(values),
            }
          );

          setLoading(false);
          if (res.ok) {
            showSuccess("School Create Success");
            navigate("/install/step-2");
          } else {
            showError("There was an server side error");
          }
        } catch (error) {
          console.log("error", error);
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
          <label>IT Name (in English)</label>
          <input
            type="text"
            id="name_en"
            name="name_en"
            value={formik.values.name_en}
            onChange={formik.handleChange}
          />
        </div>

        <div className="col-span-12 md:col-span-6">
          <label>IT Name (in Bangla)</label>
          <input
            type="text"
            id="name_bn"
            name="name_bn"
            value={formik.values.name_bn}
            onChange={formik.handleChange}
          />
        </div>

        <button type="submit" className="button-dark w-fit col-span-12">
          Next Step
        </button>
      </form>
    </>
  );
}
