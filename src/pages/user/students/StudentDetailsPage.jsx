import { useEffect, useState } from "react";
import PageHeader from "../../../components/PageHeader";
import StudentProfileCard from "../../../components/StudentProfileCard";
import { useNavigate, useParams } from "react-router-dom";
import { getAStudent } from "../../../libs/studentsAPI";
import Spinner from "../../../components/spinner/Spinner";
import { ArrowLeft } from "lucide-react";

export default function StudentDetailsPage() {
  const navigate = useNavigate();

  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const fetchData = async () => {
    setLoading(true);
    const res = await getAStudent(id);

    setLoading(false);
    if (res.ok) {
      const data = await res.json();
      setData(data.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <>
      {loading && <Spinner />}
      <button
        onClick={() => navigate(-1)}
        className="button-dark mb-2 flex items-center gap-2 inter-regular"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back</span>
      </button>

      <div className="border border-borderColor overflow-hidden shadow-md">
        <div className="bg-lightBg px-4 py-2">
          <PageHeader text="শিক্ষার্থী প্রোফাইল" />
        </div>

        <div className="p-5">
          <StudentProfileCard data={data} />
        </div>
      </div>
    </>
  );
}
