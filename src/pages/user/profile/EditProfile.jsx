import { useFormik } from "formik";
import { CircleUserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
import ChangePassPopup from "../../../components/ChangePassPopup";
import PageHeader from "../../../components/PageHeader";
import Spinner from "../../../components/spinner/Spinner";
import { updateProfile } from "../../../libs/usersAPI";
import { showError, showSuccess } from "../../../utils/toastMessage";
import { useUserInfo } from "../../../utils/useUserInfo";

export default function EditProfilePage() {
  const [loading, setLoading] = useState(false);
  // user info
  const currUser = useUserInfo();

  // formik
  const formik = useFormik({
    initialValues: {
      name_en: "",
    },
    onSubmit: async (values) => {
      try {
        Swal.fire({
          title: "Comfirm?",
          text: "Are you sure you want to update profile?",
          icon: "question",
          confirmButtonText: "Confirm",
          showCancelButton: true,
        }).then(async (result) => {
          if (result.isConfirmed) {
            Swal.close();
            setLoading(true);
            const res = await updateProfile(values);
            if (res.ok) {
              setLoading(false);
              showSuccess("Updated");
            } else {
              setLoading(false);
              showError("Error");
            }
          }
        });
      } catch (error) {
        showError("Internal Server Error");
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    formik.setValues({
      name_en: currUser?.name_en,
      emp_id: currUser?.emp_id,
      gender: currUser?.gender,
      date_of_birth: currUser?.date_of_birth,
      address: currUser?.address,
      nid: currUser?.nid,
      email: currUser?.email,
      mobile_no: currUser?.mobile_no,
    });
  }, [currUser]);

  return (
    <div className="p-5 md:p-10">
      {loading && <Spinner />}
      <Helmet>
        <meta charSet="utf-8" />
        <title>Edit Profile || infoSchoolBD</title>
      </Helmet>

      <div>
        <PageHeader
          text="এডিট প্রোফাইল"
          icon={<CircleUserRound className="w-5 h-5" />}
        />
      </div>

      {/* profile contents */}
      <div className="mt-10 mb-20 md:mb-0">
        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-12 md:col-span-3 flex flex-col items-center justify-start w-full">
            <div className="h-[150px] w-[150px] rounded-full ring-2 ring-brandColor object-cover overflow-hidden">
              <img
                src={currUser?.image}
                alt={currUser?.name_en}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="w-full mt-5 flex flex-col font-semibold">
              <ChangePassPopup />
            </div>
          </div>
          <form
            onSubmit={formik.handleSubmit}
            className="col-span-12 md:col-span-9"
          >
            <h2 className="text-[18px] font-semibold mb-5">প্রোফাইল তথ্য</h2>
            <div className="grid grid-cols-12 gap-3">
              <div className="col-span-12 md:col-span-6 px-4 flex flex-col gap-1">
                <label className="text-[15px] italic">Full Name</label>
                <input
                  className="text-[15px] border border-borderColor px-4 py-1.5"
                  id="name_en"
                  name="name_en"
                  value={formik.values.name_en}
                  onChange={formik.handleChange}
                />
              </div>

              <div className="col-span-12 md:col-span-6 px-4 flex flex-col gap-1">
                <label className="text-[15px] italic">Emp ID</label>
                <input
                  className="text-[15px] border border-borderColor px-4 py-1.5"
                  id="emp_id"
                  name="emp_id"
                  value={formik.values.emp_id}
                  onChange={formik.handleChange}
                />
              </div>

              <div className="col-span-12 md:col-span-6 px-4 flex flex-col gap-1">
                <label className="text-[15px] italic">Gender</label>
                <select
                  className="text-[15px]"
                  id="gender"
                  name="gender"
                  value={formik.values.gender}
                  onChange={formik.handleChange}
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div className="col-span-12 md:col-span-6 px-4 flex flex-col gap-1">
                <label className="text-[15px] italic">Date of Birth</label>
                <input
                  className="text-[15px] border border-borderColor px-4 py-1.5"
                  id="date_of_birth"
                  name="date_of_birth"
                  value={formik.values.date_of_birth}
                  onChange={formik.handleChange}
                />
              </div>

              <div className="col-span-12 md:col-span-6 px-4 flex flex-col gap-1">
                <label className="text-[15px] italic">Address</label>
                <input
                  className="text-[15px] border border-borderColor px-4 py-1.5"
                  id="address"
                  name="address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                />
              </div>

              <div className="col-span-12 md:col-span-6 px-4 flex flex-col gap-1">
                <label className="text-[15px] italic">Nid No</label>
                <input
                  className="text-[15px] border border-borderColor px-4 py-1.5"
                  id="nid"
                  name="nid"
                  value={formik.values.nid}
                  onChange={formik.handleChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-12 gap-3 mt-10">
              <div className="col-span-12 md:col-span-6 px-4 flex flex-col gap-1">
                <label className="text-[15px] italic">Email</label>
                <input
                  className="text-[15px] border border-borderColor px-4 py-1.5 bg-gray-100"
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  disabled
                />
              </div>

              <div className="col-span-12 md:col-span-6 px-4 flex flex-col gap-1">
                <label className="text-[15px] italic">Mobile No</label>
                <input
                  className="text-[15px] border border-borderColor px-4 py-1.5"
                  id="mobile_no"
                  name="mobile_no"
                  value={formik.values.mobile_no}
                  onChange={formik.handleChange}
                />
              </div>

              <div className="col-span-12 px-4 mt-3">
                <button className="button-main poppins-regular">
                  Save Profile
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
