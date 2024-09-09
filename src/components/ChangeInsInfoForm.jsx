import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { showError, showSuccess } from "../utils/toastMessage";
import { getMySchool, updateSchool } from "../libs/schoolAPI";
import { useEffect, useState } from "react";
import Spinner from "./spinner/Spinner";
import fileUpload from "./../libs/file-upload";

export default function ChangeSchoolInfoForm() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // authorize sign image upload
  const [authorizedSignImgUrl, setAuthorizedSignImgUrl] = useState();
  const [logoImgUrl, setLogoImgUrl] = useState();

  const handleAuthorizedSignChange = async (e) => {
    await handleImageUpload(e, setAuthorizedSignImgUrl, "authorized_sign");
  };

  const handleLogoChange = async (e) => {
    await handleImageUpload(e, setLogoImgUrl, "logo");
  };

  const handleImageUpload = async (e, setImageUrl, formikFieldName) => {
    try {
      const image = e.target.files[0];
      const fileSizeInKb = image.size / 1024;
      if (fileSizeInKb > 1024) {
        return showError("File size must be less than 1 MB");
      }
      const allowedTypes = ["image/jpeg", "image/png"];
      if (!allowedTypes.includes(image.type)) {
        return showError("Please select jpg or png image only");
      }

      const res = await fileUpload(image);
      const file = await res.json();
      if (res.ok) {
        setImageUrl(file.url);
        formik.setFieldValue(formikFieldName, file.url);
      }
    } catch (error) {
      showError("Image Upload Failed");
    }
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
      authorized_sign: "",
      logo: "",
      google_map_code: "",
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
        const res = await updateSchool(data && data?._id, values);

        setLoading(false);
        if (res.ok) {
          showSuccess("School Updated Successfully");
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
      name_en: data?.name_en,
      name_bn: data?.name_bn,
      institute_type: data?.institute_type,
      stablished_at: data?.stablished_at,
      eiin: data?.eiin,
      institute_address: data?.institute_address,
      region: data?.institute_info?.region,
      mpo: data?.institute_info?.mpo,
      edu_level: data?.institute_info?.edu_level,
      shift: data?.institute_info?.shift,
      contact: data?.contact,
      cell: data?.school_information?.cell,
      email: data?.school_information?.email,
      web: data?.school_information?.web,
      authorized_sign: data?.school_information?.authorized_sign,
      logo: data?.school_information?.logo,
      google_map_code: data?.school_information?.google_map_code,
    });
    setAuthorizedSignImgUrl(data?.school_information?.authorized_sign);
    setLogoImgUrl(data?.school_information?.logo);
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

        <div className="col-span-12 md:col-span-6 lg:col-span-4">
          <label>Email</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
        </div>

        <div className="col-span-12 md:col-span-6 lg:col-span-4">
          <label>Website</label>
          <input
            type="text"
            id="web"
            name="web"
            value={formik.values.web}
            onChange={formik.handleChange}
            placeholder="https://"
          />
        </div>

        <div className="col-span-12">
          <label>Google Map Embeded Code</label>
          <input
            type="text"
            id="google_map_code"
            name="google_map_code"
            value={formik.values.google_map_code}
            onChange={formik.handleChange}
          />
        </div>

        <div className="col-span-3">
          <label>Authorized Sign</label>
          <input type="file" onChange={handleAuthorizedSignChange} />
          {authorizedSignImgUrl == undefined ? (
            ""
          ) : (
            <img src={authorizedSignImgUrl} width="100" className="mt-2" />
          )}
        </div>

        <div className="col-span-3">
          <label>Logo</label>
          <input type="file" onChange={handleLogoChange} />
          {logoImgUrl && (
            <img src={logoImgUrl} alt="Logo" width="100" className="mt-2" />
          )}
        </div>

        <button type="submit" className="button-dark w-fit col-span-12">
          Update
        </button>
      </form>
    </>
  );
}
