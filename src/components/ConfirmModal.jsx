export default function ConfirmModal({ setConfirm, message, confirmFunction }) {
  // function
  const confirmed = () => {
    setConfirm(false)
    confirmFunction()
  }

  return (
    <>
      {/* main modal */}
      <div className="overlay">
        <div className="h-screen w-full flex items-center justify-center fixed top-0 bottom-0 left-0 right-0">
          <div className="modal-box bg-white p-10 text-[17px]">
            <div className="w-full flex flex-col items-center gap-5">
              <h2 className="text-center text-[18px] inter-regular">
                {message}
              </h2>
              <img src="/faq.png" alt="" className="w-[100px] h-auto" />
              <div className="flex items-center gap-7">
                <button
                  onClick={() => confirmed()}
                  className="bg-red-600 px-4 py-2 rounded text-white"
                >
                  Yes Delete
                </button>
                <button
                  onClick={() => setConfirm(false)}
                  className="button-main"
                >
                  No Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
