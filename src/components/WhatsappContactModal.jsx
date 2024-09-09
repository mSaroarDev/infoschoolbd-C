import { ArrowRight } from "lucide-react";

export default function WhatsappContactModal() {
  return (
    <>
      <button
        onClick={() => document.getElementById("my_modal_2").showModal()}
        className="bg-brandColor text-black w-full px-5 py-2 rounded-md flex items-center justify-center gap-2 mt-5"
      >
        <span className="font-LiAdorNoirrit_Regular font-[17px]">
          এনরোল করুন
        </span>
        <ArrowRight className="h-5 w-5" />
      </button>

      {/* modal */}
      
    </>
  );
}
