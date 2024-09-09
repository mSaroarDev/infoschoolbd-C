import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import AdmissionPreviewForm from "./../../../components/AdmissionPreviewForm";
import { ArrowLeft, Ban, LoaderCircle, SquareCheckBig } from "lucide-react";
import { getAdmission, reviewAdmissionForm } from "../../../libs/admissionAPI";
import Spinner from "./../../../components/spinner/Spinner";
import { showError, showSuccess } from "./../../../utils/toastMessage";
import Swal from "sweetalert2";

export default function AdmissionPreviewPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  // const schoolId = mySchoolId();
  const [data, setData] = useState();
  const fetchData = async () => {
    setLoading(true);
    const res = await getAdmission(id);

    setLoading(false);
    if (res.ok) {
      const data = await res.json();
      setData(data.data);
    } else {
      console.log("Internal server error");
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  // review admission form
  const reviewForm = async (m) => {
    Swal.fire({
      title: "Confirmation",
      text: `Are you sure you want to ${m} this applicant?`,
      confirmButtonText: "Yes Confirm",
      confirmButtonColor: "#3182ce",
      icon: "question",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoading(true);
          const res = await reviewAdmissionForm(id, m);

          setLoading(false);
          if (res.ok) {
            showSuccess("Success");
            fetchData();
          } else {
            showError("Failed to update");
          }
        } catch (error) {
          showError("Internal Server Error");
        } finally {
          setLoading(false);
        }
      }
    });
  };

  return (
    <>
      {loading && <Spinner />}
      <div className="flex items-center justify-between">
        <Link
          to="/user/application-corner?page=1"
          className="bg-[#292929] text-white px-4 py-2 rounded-md flex items-center gap-2 mb-5 w-fit"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>ফিরুন</span>
        </Link>

        <div className="flex items-center gap-2 inter-medium">
          <button
            onClick={() => reviewForm("accepted")}
            className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-md"
          >
            <SquareCheckBig className="w-4 h-4" />
            Accept
          </button>
          <button
            onClick={() => reviewForm("waiting")}
            className="flex items-center gap-2 bg-yellow-200 text-black px-4 py-2 rounded-md"
          >
            <LoaderCircle className="w-4 h-4" />
            Waiting
          </button>
          <button
            onClick={() => reviewForm("rejected")}
            className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-md"
          >
            <Ban className="w-4 h-4" />
            Reject
          </button>
        </div>
      </div>

      <div className="border border-dotted border-gray-500 overflow-hidden mt-2">
        <div className="px-3 py-1 bg-gray-100 font-bold text-[18px] text-center">
          অ্যাডমিশন ফরম
        </div>

        <div className="p-5 bg-custom text-[17px] text-justify">
          <AdmissionPreviewForm data={data} />
        </div>
      </div>
    </>
  );
}
