import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { showError, showSuccess } from "../utils/toastMessage";
import { editSchool, getSchoolById } from "../libs/schoolAPI";
import { useEffect, useState } from "react";
import Spinner from "./spinner/Spinner";

export default function EditSchoolForm() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  // get the existing data
  const [data, setData] = useState();
  const getData = async () => {
    setLoading(true);
    const res = await getSchoolById(id);

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
      name_en: "",
      name_bn: "",
      institute_type: "",
      stablished_at: "",
      eiin: "",
      institute_address: "",
      region: "",
      mpo: "",
      edu_level: "",
      shift: "",
      contact: "",
    },
    onSubmit: async (values) => {
      const {
        name_en,
        name_bn,
        institute_type,
        stablished_at,
        eiin,
        institute_address,
        region,
        mpo,
        edu_level,
        shift,
        contact,
      } = values;

      if (
        !name_en ||
        !name_bn ||
        !institute_type ||
        !stablished_at ||
        !eiin ||
        !institute_address ||
        !region ||
        !mpo ||
        !edu_level ||
        !shift ||
        !contact
      ) {
        return showError("All fields are required!");
      }

      try {
        setLoading(true);
        const res = await editSchool(id, values);

        setLoading(false);
        if (res.ok) {
          showSuccess("School Updated Success");
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
      name_en: data?.name_en,
      name_bn: data?.name_bn,
      institute_type: data?.institute_type,
      stablished_at: data?.stablished_at,
      eiin: data?.eiin,
      institute_address: data?.institute_address,
      region: data?.institute_info.region,
      mpo: data?.institute_info.mpo,
      edu_level: data?.institute_info.edu_level,
      shift: data?.institute_info.shift,
      contact: data?.contact,
    });
  }, [data]);

  return (
    <>
      {loading && <Spinner />}
      <form onSubmit={formik.handleSubmit} className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-6">
          <label>School Name (in English)</label>
          <input
            type="text"
            id="name_en"
            name="name_en"
            value={formik.values.name_en}
            onChange={formik.handleChange}
          />
        </div>

        <div className="col-span-12 md:col-span-6">
          <label>School Name (in Bangla)</label>
          <input
            type="text"
            id="name_bn"
            name="name_bn"
            value={formik.values.name_bn}
            onChange={formik.handleChange}
          />
        </div>

        <div className="col-span-12 md:col-span-6 lg:col-span-4">
          <label>Institute Type</label>
          <select
            id="institute_type"
            name="institute_type"
            value={formik.values.institute_type}
            onChange={formik.handleChange}
          >
            <option value="">Select</option>
            <option value="Pre-Cadet School">Pre-Cadet School</option>
            <option value="Primary School">Primary School</option>
            <option value="Secondary School">Secondary School</option>
            <option value="College">College</option>
            <option value="University">University</option>
            <option value="Coaching">Coaching</option>
            <option value="Private">Private</option>
            <option value="Pre-Cadet to Primary">Pre-Cadet to Primary</option>
            <option value="Pre-Cadet to Secondary">
              Pre-Cadet to Secondary
            </option>
            <option value="Others">Others</option>
          </select>
        </div>

        <div className="col-span-12 md:col-span-6 lg:col-span-4">
          <label>Stablished At</label>
          <input
            type="text"
            id="stablished_at"
            name="stablished_at"
            value={formik.values.stablished_at}
            onChange={formik.handleChange}
          />
        </div>

        <div className="col-span-12 md:col-span-6 lg:col-span-4">
          <label>EIIN</label>
          <input
            type="text"
            id="eiin"
            name="eiin"
            value={formik.values.eiin}
            onChange={formik.handleChange}
          />
        </div>

        <div className="col-span-12 lg:col-span-9">
          <label>Institute Details Address</label>
          <input
            type="text"
            id="institute_address"
            name="institute_address"
            value={formik.values.institute_address}
            onChange={formik.handleChange}
          />
        </div>

        <div className="col-span-12 md:col-span-6 lg:col-span-3">
          <label>Region</label>
          <select
            type="text"
            id="region"
            name="region"
            value={formik.values.region}
            onChange={formik.handleChange}
          >
            <option value="">Select</option>
            <option value="Grameen">Grammen</option>
            <option value="City">City</option>
          </select>
        </div>

        <div className="col-span-12 md:col-span-6 lg:col-span-4">
          <label>MPO Type</label>
          <select
            type="text"
            id="mpo"
            name="mpo"
            value={formik.values.mpo}
            onChange={formik.handleChange}
          >
            <option value="">Select</option>
            <option value="MPO">MPO</option>
            <option value="Non-MPO">Non-MPO</option>
          </select>
        </div>

        <div className="col-span-12 md:col-span-6 lg:col-span-4">
          <label>Education Level</label>
          <select
            type="text"
            id="edu_level"
            name="edu_level"
            value={formik.values.edu_level}
            onChange={formik.handleChange}
          >
            <option value="">Select</option>
            <option value="Under Secondary">Under Secondary</option>
            <option value="Secondary">Secondary</option>
            <option value="Higher Secondary">Higher Secondary</option>
            <option value="Upto Secondary">Upto Secondary</option>
          </select>
        </div>

        <div className="col-span-12 md:col-span-6 lg:col-span-4">
          <label>Shift</label>
          <select
            type="text"
            id="shift"
            name="shift"
            value={formik.values.shift}
            onChange={formik.handleChange}
          >
            <option value="">Select</option>
            <option value="Day">Day</option>
            <option value="Evening">Evening</option>
            <option value="Night">Night</option>
          </select>
        </div>

        <div className="col-span-12 md:col-span-6 lg:col-span-4">
          <label>Contact No</label>
          <input
            type="text"
            id="contact"
            name="contact"
            value={formik.values.contact}
            onChange={formik.handleChange}
          />
        </div>

        <button type="submit" className="button-dark w-fit col-span-12">
          Create Data
        </button>
      </form>
    </>
  );
}
