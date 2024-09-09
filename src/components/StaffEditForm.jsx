import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { showError, showSuccess } from "../utils/toastMessage";
import fileUpload from "../libs/file-upload";
import Spinner from "./spinner/Spinner";
import { editStaff, getASatff } from "../libs/staffAPI";

export default function EditStaffForm() {

  // utils
  const {id} = useParams()
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // teachers data
  const [data, setData] = useState();
  const fetchData = async () => {
    setLoading(true);
    const res = await getASatff(id)

    setLoading(false)
    if(res.ok){
      const data = await res.json()
      setData(data.data)
    }
  }

  useEffect(()=> {
    fetchData()
  }, [id])

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


  const formik = useFormik({
    initialValues: {
      name_bn: "",
      name_en: "",
      father_name: "",
      mother_name: "",
      gender: "",
      date_of_birth: "",
      address: "",
      nid: "",
      email: "",
      mobile_no: "",
      mpo_index_no: "",
      joining_date: "",
      qualification: "",
      image: "",
    },
    onSubmit: async (values) => {
      const {name_bn, name_en, image, qualification,designation} = values;
      if(!name_bn || !name_en || !image || !qualification || !designation){
        return showError("* Marks are required")
      }

      setLoading(true)
      const res = await editStaff(id, values)

      setLoading(false)
      if(res.ok){
        showSuccess("Staff Updated");
        navigate("/user/staffs?page=1")
      } else {
        showError("Staff update failed")
      }
    },
  });

  useEffect(()=> {
    formik.setValues({
      name_bn: data?.name_bn,
      name_en: data?.name_en,
      father_name: data?.father_name,
      designation: data?.designation,
      mother_name: data?.mother_name,
      gender: data?.gender,
      date_of_birth: data?.date_of_birth,
      address: data?.address,
      nid: data?.nid,
      email: data?.email,
      mobile_no: data?.mobile_no,
      mpo_index_no: data?.mpo_index_no,
      joining_date: data?.joining_date,
      qualification: data?.qualification,
      image: data?.image,
    })

    setImgUrl(data?.image)
  }, [data])

  return (
    <>
    {loading && <Spinner />}
      <form
        onSubmit={formik.handleSubmit}
        className="col-span-12 md:col-span-9 p-10"
      >
        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-12 md:col-span-6 flex flex-col gap-1">
            <label className="text-[15px] italic">নাম (বাংলায়) <span className="text-red-600">*</span></label>
            <input
              type="text"
              id="name_bn"
              name="name_bn"
              value={formik.values.name_bn}
              onChange={formik.handleChange}
              className="text-[15px]"
            />
          </div>

          <div className="col-span-12 md:col-span-6 flex flex-col gap-1">
            <label className="text-[15px] italic">নাম (in English) <span className="text-red-600">*</span></label>
            <input
              type="text"
              id="name_en"
              name="name_en"
              value={formik.values.name_en}
              onChange={formik.handleChange}
              className="text-[15px]"
            />
          </div>

          <div className="col-span-12 md:col-span-4 flex flex-col gap-1">
            <label className="text-[15px] italic">অফিসিয়াল পদবী <span className="text-red-600">*</span></label>
            <input
              type="text"
              id="designation"
              name="designation"
              value={formik.values.designation}
              onChange={formik.handleChange}
              className="text-[15px]"
            />
          </div>

          <div className="col-span-12 md:col-span-4 flex flex-col gap-1">
            <label className="text-[15px] italic">পিতার নাম</label>
            <input
              type="text"
              id="father_name"
              name="father_name"
              value={formik.values.father_name}
              onChange={formik.handleChange}
              className="text-[15px]"
            />
          </div>

          <div className="col-span-12 md:col-span-4 flex flex-col gap-1">
            <label className="text-[15px] italic">মাতার নাম</label>
            <input
              type="text"
              id="mother_name"
              name="mother_name"
              value={formik.values.mother_name}
              onChange={formik.handleChange}
              className="text-[15px]"
            />
          </div>

          <div className="col-span-12 md:col-span-4 flex flex-col gap-1">
            <label className="text-[15px] italic">লিঙ্গ <span className="text-red-600">*</span></label>
            <select
              id="gender"
              name="gender"
              value={formik.values.gender}
              onChange={formik.handleChange}
              className="text-[15px]"
            >
              <option value="">সিলেক্ট করুন</option>
              <option value="Male">পুরুষ</option>
              <option value="Female">নারী</option>
            </select>
          </div>

          <div className="col-span-12 md:col-span-4 flex flex-col gap-1">
            <label className="text-[15px] italic">জন্ম তারিখ</label>
            <input
              type="text"
              id="date_of_birth"
              name="date_of_birth"
              value={formik.values.date_of_birth}
              onChange={formik.handleChange}
              className="text-[15px]"
            />
          </div>

          <div className="col-span-12 md:col-span-4 flex flex-col gap-1">
            <label className="text-[15px] italic">জাতীয় পরিচয়পত্র নং</label>
            <input
              type="text"
              id="nid"
              name="nid"
              value={formik.values.nid}
              onChange={formik.handleChange}
              className="text-[15px]"
            />
          </div>

          <div className="col-span-12 md:col-span-4 flex flex-col gap-1">
            <label className="text-[15px] italic">এমপিও ইনডেক্স নং </label>
            <input
              type="text"
              id="mpo_index_no"
              name="mpo_index_no"
              value={formik.values.mpo_index_no}
              onChange={formik.handleChange}
              className="text-[15px]"
            />
          </div>

          <div className="col-span-12 md:col-span-4 flex flex-col gap-1">
            <label className="text-[15px] italic">যোগদানের তারিখ</label>
            <input
              type="text"
              id="joining_date"
              name="joining_date"
              value={formik.values.joining_date}
              onChange={formik.handleChange}
              className="text-[15px]"
            />
          </div>

          <div className="col-span-12 md:col-span-4 flex flex-col gap-1">
            <label className="text-[15px] italic">শিক্ষাগত যোগ্যতা <span className="text-red-600">*</span></label>
            <input
              type="text"
              id="qualification"
              name="qualification"
              value={formik.values.qualification}
              onChange={formik.handleChange}
              className="text-[15px]"
            />
          </div>

          <div className="col-span-12 md:col-span-6 flex flex-col gap-1">
            <label className="text-[15px] italic">নিজ জেলা (বাংলায়)</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              className="text-[15px]"
            />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-3 mt-10">
          <div className="col-span-12 md:col-span-6 flex flex-col gap-1">
            <label className="text-[15px] italic">ইমেইল</label>
            <input
              type="text"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              className="text-[15px]"
            />
          </div>

          <div className="col-span-12 md:col-span-6 flex flex-col gap-1">
            <label className="text-[15px] italic">মোবাইল নং</label>
            <input
              type="text"
              id="mobile_no"
              name="mobile_no"
              value={formik.values.mobile_no}
              onChange={formik.handleChange}
              className="text-[15px]"
            />
          </div>

         <div className="col-span-12">
            <label className="mb-2">ছবি <span className="text-red-600">*</span></label>
          <div className="flex items-center justify-start w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full max-w-[160px] h-[160px] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 overflow-hidden"
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

          <div className="col-span-12">
            <button type="submit" className="button-main">
              আপডেট
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
