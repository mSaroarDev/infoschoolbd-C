export default function Statistics() {
  return (
    <>
      <section className="py-20 bg-white">
        <main className="px-5">
          <div className="grid grid-cols-12 gap-5">
            <div className="col-span-12 md:col-span-6 flex items-center">
              <div>
                <p className="font-bold text-gray-600 text-[17px]">
                  স্টাটিসটিক ম্যানেজমেন্ট
                </p>

                <h3 className="text-[32px] font-bold mt-2 mb-4">
                  আপনার প্রতিষ্ঠানের সম্পুর্ন Statistics <br />
                  মাত্র একটি সিস্টেমে
                </h3>
                <h1 className="poppins-semibold my-4 text-sm">
                  infoSchoolBD | Modern School Management Software - Start Today
                </h1>
                <p className="font-medium text-[17px] text-gray-600 w-full">
                  আমাদের স্কুল ম্যানেজমেন্ট সিস্টেমে আপনি পাচ্ছেন সকল ধরনের
                  স্টাটিসটিক। আপনার প্রতিষ্ঠানের পরিচিতি, পাঠদানের ব্যবস্থা,
                  শিক্ষক, শিক্ষার্থী, অফিস স্টাফ, কমিটি ম্যানেজমেন্ট,{" "}
                  <span className="font-bold text-[#F04079]">
                    অনলাইন অ্যাডমিশন সিস্টেম
                  </span>
                  , ফলাফল ইত্যাদি সবকিছু একই সিস্টেমের সাথে। এবং সবকিছু ম্যানেজ
                  করাও একদম সহজ এবং সিম্পল।
                </p>

                <button className="bg-brandColor text-white px-7 py-2 rounded-md mt-7 flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
                    />
                  </svg>

                  <span>ভিডিও দেখুন</span>
                </button>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6">
              <img src="/software-screenshot.png" alt="" />
            </div>
          </div>
        </main>
      </section>
    </>
  );
}
