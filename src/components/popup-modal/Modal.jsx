import "./Modal.css";

export default function InfoModal({ children }) {
  // show and hide modal
  const closeModal = () => {
    const modal = document.getElementById("modal");
    modal.classList.add("close-modal");
    modal.classList.remove("open-modal");
  };

  return (
    <>
      <div>
        <div
          id="modal"
          className={`bg-white shadow-md p-10 modal-wrapper border-t-4 border-blue-600`}
        >
          {children}

          <div className="flex items-center justify-end">
            <button
              onClick={() => closeModal()}
              className="bg-red-500 px-4 py-2 rounded-full text-white mt-5"
            >
              বন্ধ করুন
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
