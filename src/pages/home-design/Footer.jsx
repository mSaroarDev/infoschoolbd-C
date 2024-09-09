import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export default function Footer() {
  return (
    <>
      <section className="py-10 bg-[#292929] text-white">
        <main>
          <div className="grid grid-cols-12 gap-5">
            <div className="col-span-6 lg:col-span-4 px-5 flex flex-col gap-4">
              <img
                src="/logo-white.png"
                alt="infoSchoolBD"
                className="w-[200px]"
              />
              <p>
                মাত্র ৩৯৯/- টাকা সাবসক্রিপশনে সম্পূর্ন স্কুল/কলেজ/মাদ্রাসা
                ম্যানেজমেন্ট সিস্টেম। আজই শুরু করুন আপনার প্রতিষ্ঠানের অনলাইন
                পরিচিতি।
              </p>

              <div className="mt-10">
                <p className="mb-3">Owned by</p>
                <a href="https://isoftbd.com">
                  <h1>
                    <img
                      src="/isoftbd-logo.png"
                      alt="isoftbd"
                      className="w-[150px]"
                    />
                  </h1>
                </a>
              </div>
            </div>
            <div className="col-span-6 lg:col-span-4 px-5">
              <h4 className="font-bold text-base">কুইক লিংকস</h4>
              <div className="mt-3 flex flex-col gap-y-2">
                <p className="flex items-center gap-2">
                  <ChevronRight className="w-4 h-4" />
                  <Link className="hover:underline" to="/">
                    হোমপেজ
                  </Link>
                </p>
                <p className="flex items-center gap-2">
                  <ChevronRight className="w-4 h-4" />
                  <Link className="hover:underline" to="/about-us">
                    আমাদের সম্পর্কে
                  </Link>
                </p>
                <p className="flex items-center gap-2">
                  <ChevronRight className="w-4 h-4" />
                  <Link className="hover:underline" to="/blogs">
                    ব্লগ সমূহ
                  </Link>
                </p>
                <p className="flex items-center gap-2">
                  <ChevronRight className="w-4 h-4" />
                  <Link className="hover:underline" to="/terms">
                    টার্মস এন্ড পলিসি
                  </Link>
                </p>
                <p className="flex items-center gap-2">
                  <ChevronRight className="w-4 h-4" />
                  <Link className="hover:underline" to="/refund-policy">
                    রিফান্ড পলিসি
                  </Link>
                </p>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-4 px-5">
              <h2 className="font-bold text-[20px]">সাপোর্ট সেন্টার</h2>
              <h2 className="font-bold text-[35px] mt-5 hind-siliguri-bold text-[#ED9705]">
                01798-456380
              </h2>
              <p className="text-[17px] hind-siliguri-semibold -mt-3">
                (10.00 am - 10.00 pm)
              </p>

              <h2 className="font-bold text-[20px] mt-5 hind-siliguri-regular">
                Email
              </h2>
              <p className="text-[25px] hind-siliguri-semibold -mt-1">
                mail@infoschoolbd.com
              </p>

              <h2 className="font-bold text-[20px] mt-5 hind-siliguri-regular">
                Social Links
              </h2>
              <div className="flex items-center gap-5 mt-2">
                <a target="_blank" href="https://facebook.com/infoschoolbd">
                  <img src="/facebook.png" className="w-[35px]" />
                </a>

                <a target="_blank" href="https://youtube.com/@infoschoolbd">
                  <img src="/youtube.png" className="w-[35px]" />
                </a>
              </div>
            </div>
          </div>
        </main>
      </section>
      <hr className="border-t border-gray-600" />
      <section className="py-5 bg-[#292929] text-white">
        <main className="text-center">Copyright by iSoftBD.com</main>
      </section>
    </>
  );
}
