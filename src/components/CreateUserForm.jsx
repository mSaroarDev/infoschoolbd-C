import { useFormik } from "formik";
import { showError, showSuccess } from "../utils/toastMessage";
import { createUser } from "../libs/usersAPI";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Spinner from "./spinner/Spinner";
import fileUpload from "../libs/file-upload";
import { getAllSchools } from "../libs/schoolAPI";

export default function CreateUserForm() {
  // navigate
  const navigate = useNavigate();

  // loading
  const [loading, setLoading] = useState(false);

  // fetch schools data
  const [allSchools, setAllSchools] = useState();
  const sortedData = allSchools && allSchools.sort((a, b) => a.name_en.localeCompare(b.name_en))
  const getAllSchool = async () => {
    const res = await getAllSchools();
    const data = await res.json();
    setAllSchools(data?.data);
  };

  useEffect(() => {
    getAllSchool();
  }, []);

  // image upload
  const [imgUrl, setImgUrl] = useState();
  const handleChange = async (e) => {
    setLoading(true);
    try {
      const image = e.target.files[0];
      const fileSizeInKb = parseInt(image.size) / 1024;
      if (fileSizeInKb > 1024) {
        return showError("FileSize must be less than 1 MB");
      }
      const allowedTypes = ["image/jpeg", "image/png"];
      if (!allowedTypes.includes(image.type)) {
        return showError("Please select jpg or png image only");
      }

      // image upload to server
      setLoading(true);
      const res = await fileUpload(image);
      const file = await res.json();
      setLoading(false);
      if (res.ok) {
        formik.setFieldValue("image", file.url);
        setImgUrl(file.url);
      }
    } catch (error) {
      showError("Image Upload Failed");
    } finally {
      setLoading(false);
    }
  };

  // form handler
  const formik = useFormik({
    initialValues: {
      name_bn: "",
      name_en: "",
      institute: "",
      designation: "",
      emp_id: "",
      mobile_no: "",
      image: "",
      account_type: "",
      email: "",
      password: "",
      password1: "",
    },
    onSubmit: async (values) => {
      const {
        name_en,
        name_bn,
        institute,
        designation,
        emp_id,
        mobile_no,
        account_type,
        email,
        password,
        password1,
      } = values;

      if (
        !name_en ||
        !name_bn ||
        !institute ||
        !designation ||
        !emp_id ||
        !mobile_no ||
        !account_type ||
        !email ||
        !password ||
        !password1
      ) {
        return showError("All fields are required!");
      }

      if (password !== password1) {
        return showError("Password didnt match!");
      }

      if (password.length < 6) {
        return showError("Password must more than 6 character!");
      }

      try {
        setLoading(true);
        const res = await createUser(values);
        if (res.msg == "user exist") {
          return showError("Email already exist!");
        }

        setLoading(false);
        showSuccess("User ID Created Successfully");
        navigate("/developer/users?page=1");
      } catch (error) {
        showError("There was an server side error");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <>
      {loading && <Spinner />}
      <form onSubmit={formik.handleSubmit} className="grid grid-cols-12 gap-5">
        <div className="col-span-12 md:col-span-4">
          <input
            type="text"
            id="name_en"
            name="name_en"
            value={formik.values.name_en}
            onChange={formik.handleChange}
            placeholder="Name (English)"
          />
        </div>
        <div className="col-span-12 md:col-span-4">
          <input
            type="text"
            id="name_bn"
            name="name_bn"
            value={formik.values.name_bn}
            onChange={formik.handleChange}
            placeholder="Name (Bangla)"
          />
        </div>
        <div className="col-span-12 md:col-span-4">
          <select
            type="text"
            id="institute"
            name="institute"
            value={formik.values.institute}
            onChange={formik.handleChange}
          >
            <option value="">Select Institute</option>
            {sortedData && sortedData.map((school)=> {
              return <option key={school._id} value={school._id}>{school.name_en} ({school.eiin})</option>
            })}
          </select>
        </div>
        <div className="col-span-12 md:col-span-4">
          <input
            type="text"
            id="designation"
            name="designation"
            value={formik.values.designation}
            onChange={formik.handleChange}
            placeholder="Designation"
          />
        </div>
        <div className="col-span-12 md:col-span-4">
          <input
            type="text"
            id="emp_id"
            name="emp_id"
            value={formik.values.emp_id}
            onChange={formik.handleChange}
            placeholder="Emp ID"
          />
        </div>
        <div className="col-span-12 md:col-span-4">
          <input
            type="text"
            id="mobile_no"
            name="mobile_no"
            value={formik.values.mobile_no}
            onChange={formik.handleChange}
            placeholder="Mobile No"
          />
        </div>
        <div className="col-span-12 md:col-span-8 mt-10">
          <input
            type="text"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            placeholder="Access/Login Email eg: msaroar.dev@gmail.com"
          />
        </div>
        <div className="col-span-12 md:col-span-4 md:mt-10">
          <select
            type="text"
            id="account_type"
            name="account_type"
            value={formik.values.account_type}
            onChange={formik.handleChange}
            placeholder="Account Type"
          >
            <option value="">Select Account Type</option>
            <option value="Client">Client</option>
            <option value="Admin">Admin</option>
            <option value="Developer">Webmaster</option>
          </select>
        </div>
        <div className="col-span-12 md:col-span-6">
          <input
            type="text"
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            placeholder="Password"
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <input
            type="text"
            id="password1"
            name="password1"
            value={formik.values.password1}
            onChange={formik.handleChange}
            placeholder="Retype Password"
          />
        </div>

        <div className="col-span-12">
          <div className="flex items-center justify-start w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full max-w-[160px] h-[160px] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 overflow-hidden object-cover"
            >
              {imgUrl ? (
                <>
                  <img src={imgUrl} className="w-full h-full object-cover" alt="Image" />
                </>
              ) : (
                <>
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Upload Picture</span>
                    </p>
                  </div>
                </>
              )}
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={handleChange}
              />
            </label>
          </div>
        </div>

        <button type="submit" className="button-dark col-span-12 w-fit">
          Create Client ID
        </button>
      </form>
    </>
  );
}
