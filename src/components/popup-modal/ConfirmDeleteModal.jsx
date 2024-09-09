import { X } from "lucide-react";
import "./Modal.css";

export default function ConfirmDeleteModal({ children, funcaction }) {
  // show and hide modal
  const closeModal = () => {
    const modal = document.getElementById("modal");
    modal.classList.add("close-modal");
    modal.classList.remove("open-modal");
  };

  // action 
  const handleAction = () => {
    closeModal();
    funcaction();
  }

  return (
    <>
      <div>
        <div
          id="modal"
          className={`bg-white rounded-xl shadow-md modal-confirm-wrapper border-t-4 border-blue-600 p-5`}
        >
          
          <div className="flex items-center justify-end -mr-3 -mt-3">
            <button
              onClick={() => closeModal()}
              className="w-7 h-7 bg-red-500 rounded-full text-white flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
          </div>


          <div className="flex flex-col items-center justify-center gap-5">
            <img src="/what.svg" alt="Question" className="w-28 h-28" />
            <h2 className="font-bold text-2xl">আপনি কি ডিলিট করতে ইচ্ছুক?</h2>

            <div className="mt-5 flex items-center gap-5">
              <button onClick={()=> handleAction()} className="w-28 bg-blue-500 text-white px-4 py-2 rounded-sm">হ্যা!</button>
              <button onClick={() => closeModal()} className="bg-red-500 text-white px-4 py-2 rounded-sm">না</button>
            </div>
          </div>


          {children}
        </div>
      </div>
    </>
  );
}
