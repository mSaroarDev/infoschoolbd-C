import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { getAllClasses } from "../libs/classAPI";
import Spinner from "./spinner/Spinner";
import { useFormik } from "formik";
import { promoteOrDemoteStudent } from "../libs/studentsAPI";
import { showError, showSuccess } from "../utils/toastMessage";
import Swal from "sweetalert2";

export default function PromoteClass({ data, fetchData }) {
  const [loading, setLoading] = useState(false);
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

  // formi
  const formik = useFormik({
    initialValues: {
      classe: "",
      class_role: "",
    },
    onSubmit: async (values) => {
      const { classe, class_role } = values;

      if (!classe || !class_role) {
        return showError("All fields are required");
      }

      document.getElementById(`promote_${data?._id}`).close();
      Swal.fire({
        title: "Warning!",
        text: "Are you sure you want to update information?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirm",
      }).then(async (result) => {
        if (result.isConfirmed) {
          setLoading(true);
          const res = await promoteOrDemoteStudent(data?._id, values);

          setLoading(false);
          if (res.ok) {
            showSuccess("Student Data Updated");
            fetchData();
          } else {
            showError("Student Update Failed");
          }
        }
      });
    },
  });

  useEffect(() => {
    formik.setValues({
      classe: data?.classe,
      class_role: data?.class_role,
    });
  }, [data]);

  return (
    <>
      {loading && <Spinner />}
      {/* promote student */}
      <button
        title="Promote Student"
        onClick={() =>
          document.getElementById(`promote_${data?._id}`).showModal()
        }
        className="bg-green-500 rounded text-white p-1 inline-flex items-center gap-1 text-sm"
      >
        <ArrowUp className="w-4 h-4" /> Promote
      </button>
      {/* promote student */}

      {/* modal */}
      <dialog id={`promote_${data?._id}`} className="modal w-[95%] md:w-full mx-auto">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div>
            <h1 className="font-bold text-[18px] mb-5 poppins-medium">Promote or Demote Student</h1>

            <form
              onSubmit={formik.handleSubmit}
              className="grid grid-cols-12 gap-1 text-[17px]"
            >
              <label className="mt-3 col-span-12 md:col-span-3">শ্রেনী</label>
              <select
                id="classe"
                name="classe"
                value={formik.values.classe}
                onChange={formik.handleChange}
                className="mb-2 col-span-12 md:col-span-9"
              >
                <option value="">সিলেক্ট করুন</option>
                {classes &&
                  classes.map((classe, i) => (
                    <option key={i} value={classe?.name_en}>
                      {classe?.name_bn}
                    </option>
                  ))}
              </select>
              <label className="col-span-12 md:col-span-3">
                রোল{" "}
              </label>
              <input
                id="class_role"
                name="class_role"
                value={formik.values.class_role}
                onChange={formik.handleChange}
                type="text"
                className="col-span-12 md:col-span-9"
              />
              <div className="text-sm text-red-500 col-span-12 text-right">
                  Roll must be in english digit (eg: 1)
                </div>
              <button type="submit" className="button-dark col-span-12">
                আপডেট করুন
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
