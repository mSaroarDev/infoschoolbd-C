import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteTestimonial, getTestimonialDetails } from "../../../../libs/testimonialAPI";
import { ArrowLeft } from "lucide-react";
import ConfirmDeleteModal from "../../../../components/popup-modal/ConfirmDeleteModal";
import { showError, showSuccess } from './../../../../utils/toastMessage';
import Spinner from "../../../../components/spinner/Spinner";

export default function TestimonialDetails() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  const [data, setData] = useState();
  const fetchData = async () => {
    const res = await getTestimonialDetails(id);

    if (res.ok) {
      const data = await res.json();
      setData(data.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  // show and hide modal
  const openModal = () => {
    const modal = document.getElementById('modal');
    modal.classList.add("open-modal")
    modal.classList.remove("close-modal");
  }

  // function
  const handleDelete = async () => {
    setLoading(true)
    const res = await deleteTestimonial(id);

    setLoading(false)
    if(res.ok){
      showSuccess("Deleted Succesfully");
      fetchData();
      navigate(-1)
    } else {
      showError("Failed to delete")
    }
  }

  return (
    <>
    {loading && <Spinner />}

    <ConfirmDeleteModal openModal={openModal} funcaction={handleDelete}>
        
    </ConfirmDeleteModal>
      

      <div className="flex items-center justify-between">
        <button
            onClick={() => navigate(-1)}
            className="button-dark flex items-center gap-2 mb-5"
        >
            <ArrowLeft className="w-4 h-4" />
            <span>ফিরুন</span>
        </button>

        <button onClick={()=> openModal()} className="bg-red-500 text-white px-4 py-2 rounded-md">
            ডিলিট করুন
        </button>

      </div>

      <div className="border border-borderColor rounded-md overflow-hidden">
        <div className="bg-slate-50 px-4 py-2 font-bold">বিস্তারিত</div>
        <div className="p-7">
          <div className="flex items-start gap-5">
            <div className="min-w-[120px] h-[120px] rounded-full ring-4 ring-blue-600 overflow-hidden">
              <img
                src={data && data?.image}
                alt="Image"
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <h2 className="font-bold text-[18px]">{data && data?.name}</h2>
              <h2 className="text-[17px] mb-10">{data && data?.designation}</h2>
              <div
                dangerouslySetInnerHTML={{__html: data && data?.text}}
              />
           
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
