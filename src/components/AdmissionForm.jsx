import { Save, Upload } from "lucide-react";
import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import { createStudent } from "../libs/studentsAPI";
import { showError, showSuccess } from "./../utils/toastMessage";
import fileUpload from "../libs/file-upload";
import Spinner from "./spinner/Spinner";
import { getAllClasses } from "../libs/classAPI";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AdmissionForm = () => {
  // loading
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fileInputRef = useRef();

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

  // fetch classes
  const [classes, setClasses] = useState();
  const fetchClasses = async () => {
    setLoading(true);
    const res = await getAllClasses();

    setLoading(false);
    if (res.ok) {
      const data = await res.json();
      setClasses(data.data);
    } else {
      const confirmed = window.confirm(
        "All Classes are not loaded. Please Reload the page"
      );
      if (confirmed) {
        window.location.reload();
      }
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  // formik
  const formik = useFormik({
    initialValues: {
      name_en: "",
      name_bn: "",
      gender: "",
      classe: "",
      class_role: "",
      section: "",
      father_name: "",
      mother_name: "",
      village1: "",
      post1: "",
      upazilla1: "",
      district1: "",
      village2: "",
      post2: "",
      upazilla2: "",
      district2: "",
      contact_no: "",
      dob: "",
      nid: "",
      image: "",
    },
    onSubmit: async (values) => {
      const {
        name_en,
        name_bn,
        gender,
        classe,
        class_role,
        father_name,
        mother_name,
        village1,
        post1,
        upazilla1,
        district1,
        village2,
        post2,
        upazilla2,
        district2,
        contact_no,
        dob,
        nid,
      } = values;
      if (
        !name_en ||
        !name_bn ||
        !gender ||
        !classe ||
        !class_role ||
        !father_name ||
        !mother_name ||
        !village1 ||
        !post1 ||
        !upazilla1 ||
        !district1 ||
        !village2 ||
        !post2 ||
        !upazilla2 ||
        !district2 ||
        !contact_no ||
        !dob ||
        !nid
      ) {
        alert("failed");
      } else {
        Swal.fire({
          title: "Confirmation",
          text: `The information is all correct?`,
          confirmButtonText: "Yes Confirm",
          confirmButtonColor: "#3182ce",
          icon: "question",
          showCancelButton: true,
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              setLoading(true);
              const res = await createStudent(values);

              setLoading(false);
              if (res.ok) {
                showSuccess("Admitted Succesfully");
                navigate(-1);
              } else {
                showError("Admission Failed");
              }
            } catch (error) {
              showError("Internal Server Error");
            } finally {
              setLoading(false);
            }
          }
        });
      }
    },
  });

  return (
    <>
      {loading && <Spinner />}
      <div className="p-10">
        <form onSubmit={formik.handleSubmit} className="w-full">
          <div className="grid grid-cols-12 gap-5">
            <div className="col-span-9">
              <div className="grid grid-cols-12 gap-5">
                <div className="col-span-6">
                  <label className="font-bangla-font" htmlFor="name">
                    সম্পুর্ন নাম (in English){" "}
                    <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="name_en"
                    name="name_en"
                    value={formik.values.name_en}
                    onChange={formik.handleChange}
                    className="uppercase"
                  />
                </div>
                <div className="col-span-6">
                  <label className="font-bangla-font" htmlFor="name">
                    সম্পুর্ন নাম (বাংলায়){" "}
                    <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="name_bn"
                    name="name_bn"
                    value={formik.values.name_bn}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="col-span-4">
                  <label className="font-bangla-font" htmlFor="name">
                    লিঙ্গ <span className="text-red-600">*</span>
                  </label>
                  <select
                    type="text"
                    id="gender"
                    name="gender"
                    value={formik.values.gender}
                    onChange={formik.handleChange}
                  >
                    <option value="">পছন্দ করুন</option>
                    <option value="Male">পুরুষ</option>
                    <option value="Female">নারী</option>
                    <option value="Others">অন্যান্য</option>
                  </select>
                </div>

                <div className="col-span-4">
                  <label className="font-bangla-font" htmlFor="name">
                    শ্রেনী <span className="text-red-600">*</span>
                  </label>
                  <select
                    type="text"
                    id="classe"
                    name="classe"
                    value={formik.values.classe}
                    onChange={formik.handleChange}
                  >
                    <option value="">পছন্দ করুন</option>
                    {classes &&
                      classes.map((classe, i) => (
                        <option key={i} value={classe.name_en}>
                          {classe.name_bn}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="col-span-4">
                  <label className="font-bangla-font" htmlFor="name">
                    শ্রেনী রোল (in English Digit){" "}
                    <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="class_role"
                    name="class_role"
                    value={formik.values.class_role}
                    onChange={formik.handleChange}
                  />
                </div>

                <div className="col-span-4">
                  <label className="font-bangla-font" htmlFor="name">
                    শ্রেনী শাখা (যদি থাকে)
                  </label>
                  <input
                    type="text"
                    id="section"
                    name="section"
                    value={formik.values.section}
                    onChange={formik.handleChange}
                  />
                </div>

                <div className="col-span-4">
                  <label className="font-bangla-font" htmlFor="name">
                    অভিভাবকের মোবাইল নং <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="contact_no"
                    name="contact_no"
                    value={formik.values.contact_no}
                    onChange={formik.handleChange}
                  />
                </div>

                {/* personal info */}
                <div className="col-span-12 mt-5 mb-3">
                  <h2 className="font-semibold font-bangla-font text-[18px]">
                    ব্যক্তিগত তথ্য
                  </h2>
                </div>

                <div className="col-span-6">
                  <label className="font-bangla-font" htmlFor="name">
                    পিতার নাম (বাংলায়) <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="father_name"
                    name="father_name"
                    value={formik.values.father_name}
                    onChange={formik.handleChange}
                  />
                </div>

                <div className="col-span-6">
                  <label className="font-bangla-font" htmlFor="name">
                    মাতার নাম (বাংলায়) <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="mother_name"
                    name="mother_name"
                    value={formik.values.mother_name}
                    onChange={formik.handleChange}
                  />
                </div>

                <div className="col-span-12 font-bangla-font font-bold">
                  বর্তমান ঠিকানা (বাংলায়){" "}
                  <span className="text-red-600">*</span>
                </div>

                <div className="col-span-4">
                  <input
                    type="text"
                    id="village1"
                    name="village1"
                    value={formik.values.village1}
                    onChange={formik.handleChange}
                    placeholder="গ্রাম/রোড/পাড়া/মহল্লার নাম"
                  />
                </div>

                <div className="col-span-4">
                  <input
                    type="text"
                    id="post1"
                    name="post1"
                    value={formik.values.post1}
                    onChange={formik.handleChange}
                    placeholder="ডাকঘর"
                  />
                </div>

                <div className="col-span-4">
                  <input
                    type="text"
                    id="upazilla1"
                    name="upazilla1"
                    value={formik.values.upazilla1}
                    onChange={formik.handleChange}
                    placeholder="থানা/উপজেলা"
                  />
                </div>

                <div className="col-span-4">
                  <input
                    type="text"
                    id="district1"
                    name="district1"
                    value={formik.values.district1}
                    onChange={formik.handleChange}
                    placeholder="জেলা"
                  />
                </div>

                <div className="col-span-12 font-bangla-font font-bold">
                  স্থায়ী ঠিকানা (বাংলায়) <span className="text-red-600">*</span>
                </div>

                <div className="col-span-4">
                  <input
                    type="text"
                    id="village2"
                    name="village2"
                    value={formik.values.village2}
                    onChange={formik.handleChange}
                    placeholder="গ্রাম/রোড/পাড়া/মহল্লার নাম"
                  />
                </div>

                <div className="col-span-4">
                  <input
                    type="text"
                    id="post2"
                    name="post2"
                    value={formik.values.post2}
                    onChange={formik.handleChange}
                    placeholder="ডাকঘর"
                  />
                </div>

                <div className="col-span-4">
                  <input
                    type="text"
                    id="upazilla2"
                    name="upazilla2"
                    value={formik.values.upazilla2}
                    onChange={formik.handleChange}
                    placeholder="থানা/উপজেলা"
                  />
                </div>

                <div className="col-span-4">
                  <input
                    type="text"
                    id="district2"
                    name="district2"
                    value={formik.values.district2}
                    onChange={formik.handleChange}
                    placeholder="জেলা"
                  />
                </div>

                <div className="col-span-12 mt-5 mb-3 grid grid-cols-12 gap-5">
                  <div className="col-span-6">
                    <label className="font-bangla-font" htmlFor="name">
                      জাতীয় পরিচয়পত্র নং <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="nid"
                      name="nid"
                      value={formik.values.nid}
                      onChange={formik.handleChange}
                    />
                  </div>

                  <div className="col-span-6">
                    <label className="font-bangla-font" htmlFor="name">
                      জন্ম তারিখ <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="dob"
                      name="dob"
                      value={formik.values.dob}
                      onChange={formik.handleChange}
                    />
                  </div>

                  <div className="col-span-4">
                    <label className="font-bangla-font" htmlFor="name">
                      ধর্ম <span className="text-red-600">*</span>
                    </label>
                    <select
                      id="religion"
                      name="religion"
                      value={formik.values.religion}
                      onChange={formik.handleChange}
                    >
                      <option value="">Select</option>
                      <option value="Islam">Islam</option>
                      <option value="Hindu">Hindu</option>
                      <option value="Buddhu">Buddhu</option>
                      <option value="Christan">Christan</option>
                    </select>
                  </div>

                  <div className="col-span-4">
                    <label className="font-bangla-font" htmlFor="name">
                      জাতীয়তা <span className="text-red-600">*</span>
                    </label>
                    <select
                      id="nationality"
                      name="nationality"
                      value={formik.values.nationality}
                      onChange={formik.handleChange}
                    >
                      <option value="">Select</option>
                      <option value="Bangladeshi">Bangladeshi</option>
                    </select>
                  </div>

                  <div className="col-span-4">
                    <label className="font-bangla-font" htmlFor="name">
                      ইমেইল
                    </label>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                    />
                  </div>

                  <div className="col-span-4">
                    <label className="font-bangla-font" htmlFor="name">
                      রক্তের গ্রুপ <span className="text-red-600">*</span>
                    </label>
                    <select
                      id="blood_group"
                      name="blood_group"
                      value={formik.values.blood_group}
                      onChange={formik.handleChange}
                    >
                      <option value="">Select</option>
                      <option value="A (+ve)">A (+ve)</option>
                      <option value="A (-ve)">A (-ve)</option>
                      <option value="B (+ve)">B (+ve)</option>
                      <option value="B (-ve)">B (-ve)</option>
                      <option value="AB (+ve">AB (+ve)</option>
                      <option value="AB (-ve)">AB (-ve)</option>
                      <option value="O (+ve)">O (+ve)</option>
                      <option value="O (-ve)">O (-ve)</option>
                    </select>
                  </div>

                  <div className="col-span-4">
                    <label className="font-bangla-font" htmlFor="name">
                      পেশা <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="occupation"
                      name="occupation"
                      value={formik.values.occupation}
                      onChange={formik.handleChange}
                    />
                  </div>

                  <div className="col-span-4">
                    <label className="font-bangla-font" htmlFor="name">
                      বৈবাহিক অবস্থা <span className="text-red-600">*</span>
                    </label>
                    <select
                      id="marital_status"
                      name="marital_status"
                      value={formik.values.marital_status}
                      onChange={formik.handleChange}
                    >
                      <option value="">Select</option>
                      <option value="Married">Married</option>
                      <option value="Unmarried">Unmarried</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-3 flex flex-col items-center">
              <div className="w-[150px] h-[150px] rounded-full overflow-hidden ring-2 ring-brand">
                <img
                  src={(imgUrl && imgUrl) || "/placeholder.jpg"}
                  className="object-cover w-full h-full"
                  alt="Image"
                />
              </div>
              <button
                onClick={() => fileInputRef.current.click()}
                type="button"
                className="button-dark mt-5 flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                <span>{(imgUrl && "Change Image") || "Upload Image"}</span>
              </button>

              <input
                onChange={handleChange}
                multiple={false}
                ref={fileInputRef}
                type="file"
                hidden
              />
            </div>
          </div>

          <div className="mt-5 w-full text-center">
            <button
              type="submit"
              className="w-1/4 button-dark tiro-bangla-regular flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>সেভ</span>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AdmissionForm;
