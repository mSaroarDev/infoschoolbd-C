import { ArrowRight, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getStudentStats } from "../libs/studentsAPI";
import convertToBanglaNumber from "../utils/convertNumbertoBangla";

export default function ClassListCard({data}) {
  const [stats, setStats] = useState();
  const fetchStats = async () => {
    const res = await getStudentStats(data?.name_en);

    if (res.ok) {
      const data = await res.json();
      setStats(data.data);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <>
    <tr className="odd:bg-white even:bg-gray-50 border-b dark:border-gray-700 text-gray-700 hover:bg-gray-50">
        <td className="px-6 py-2 border-borderColor border">
          <CheckCircle className="w-4 h-4 text-green-500" />
        </td>
        <td className="px-6 py-2 border-borderColor border capitalize font-semibold">{data?.name_bn}</td>
        <td className="px-6 py-2 border-borderColor border">
          {stats && convertToBanglaNumber(stats.totalStudents)}
        </td>
        <td className="px-6 py-2 border-borderColor border">
          {stats && convertToBanglaNumber(stats.totalMale)}
        </td>
        <td className="px-6 py-2 border-borderColor border">
          {stats && convertToBanglaNumber(stats.totalFemale)}
        </td>
        <td className="px-6 py-2 border-borderColor border flex items-center justify-end border-none">
          <Link to={`/user/students/list?class=${data?.name_en}&page=1`} className="button-dark flex items-center gap-2 w-fit">
            <span>সকল শিক্ষাথী</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </td>
      </tr>
    </>
  )
}