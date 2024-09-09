import { useEffect, useState } from "react";
import { getAllTestimonials } from "../../../../libs/testimonialAPI";
import TestimonialCard from "../../../../components/TestimonialCard";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function ListTestimonials() {
  const navigate = useNavigate();

  const [data, setData] = useState();
  const fetchTestimonials = async () => {
    const res = await getAllTestimonials(1, 0);

    if (res.ok) {
      const data = await res.json();
      setData(data.data);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  return (
    <>
      <div className="flex items-center justify-between mb-5">
        <button
          onClick={() => navigate(-1)}
          className="button-dark flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>ফিরুন</span>
        </button>

        <Link to="/user/settings/testimonials/create" className="button-main">
          নতুন তৈরী করুন
        </Link>
      </div>


      <div className="grid grid-cols-12 gap-5">
        {data && data.map((item, i) => <TestimonialCard key={i} data={item} />)}
      </div>
    </>
  );
}
