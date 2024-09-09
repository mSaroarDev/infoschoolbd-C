import { ArrowLeft, ContactRound } from "lucide-react";
import PageHeader from "../../../components/PageHeader";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Spinner from "../../../components/spinner/Spinner";
import { getAllStudentByClass } from "../../../libs/studentsAPI";
import StudentListCard2 from "../../../components/StudentListCard2";

export default function ByClassStudentsPage() {

  const navigate = useNavigate()

  const [seachParams] = useSearchParams();
  const page = seachParams.get("page")
  const classe = seachParams.get("class")

  // utils
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const fetchData = async () => {
    setLoading(true)
    const res = await getAllStudentByClass(page, 0, classe)

    setLoading(false)
    if(res.ok){
      const data = await res.json()
      setData(data.data)
    }
  }

  useEffect(()=> {
    fetchData()
  }, [page])
  
  return (
    <>
    <button onClick={()=> navigate(-1)} className="button-dark flex items-center gap-2 mb-2">
      <ArrowLeft className="w-4 h-4" />
      <span>ফিরুন</span>
    </button>
      <div className="flex items-center justify-between">
        <PageHeader
          text="শ্রেনীভিত্তিক শিক্ষার্থীবৃন্দের তালিকা"
          icon={<ContactRound className="w-5 h-5" />}
        />

        <Link to="/user/admission/create" className="button-main">
          অ্যাডমিশন
        </Link>
      </div>

      <div className="mt-5">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 font-bold">
            <tr>
                <th scope="col" className="px-6 py-3 border border-borderColor">
                  #
                </th>
                <th scope="col" className="px-6 py-3 border border-borderColor">
                  নাম
                </th>
                <th scope="col" className="px-6 py-3 border border-borderColor">
                  বর্তমান ঠিকানা
                </th>
                <th scope="col" className="px-6 py-3 border border-borderColor">
                  শ্রেনী
                </th>
                <th scope="col" className="px-6 py-3 border border-borderColor">
                  রোল
                </th>
                <th scope="col" className="px-6 py-3 border border-borderColor">
                  শাখা
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 border border-borderColor flex items-center justify-end"
                >
                  পদক্ষেপ
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <Spinner />
              ) : (
                data &&
                data.map((classData) => (
                  <StudentListCard2 key={classData?._id} data={classData} fetchData={fetchData} />
                ))
              )}
            </tbody>
          </table>
        </div>

        
      </div>
    </>
  );
}
