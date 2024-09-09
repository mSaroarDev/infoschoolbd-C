import { ChevronsRight, ShieldCheck } from "lucide-react";
import DemoRequestForm from "../../components/DemoRequestForm";

export default function Hero() {
  return (
    <>
      <section className="bg-lightBg w-full py-5 px-5">
        <main className="bg-white border border-borderColor rounded-2xl px-5">
          <div className="grid grid-cols-12 gap-5 items-center justify-between p-3 lg:p-10">
            <div className="col-span-12 lg:col-span-6 py-5 lg:py-14">
              <h1 className="text-[45px] font-bold font-ador-noirit">
                মাত্র ৩৯৯/- টাকায় <br />
                স্কুল ম্যানেজমেন্ট সফটওয়্যার
              </h1>

              <div className="services">
                <h2 className="mt-7 font-bold text-[20px]">
                  কি কি থাকছে আমাদের প্যাকেজ এঃ
                </h2>
                <p className="mt-3 text-[18px] flex items-start gap-3">
                  <ChevronsRight className="min-w-5 h-5 mt-1" />{" "}
                  <span>১টি ওয়েবসাইট</span>
                </p>
                <p className="mt-1 text-[18px] flex items-start gap-3">
                  <ChevronsRight className="min-w-5 h-5 mt-1" />{" "}
                  <span>
                    ওয়েবসাইট টিকে ম্যানেজ করার জন্য একটি অ্যাডমিন ড্যাশবোর্ড
                  </span>
                </p>
                <p className="mt-1 text-[18px] flex items-start gap-3">
                  <ChevronsRight className="min-w-5 h-5 mt-1" />{" "}
                  <span>
                    হিসাব নিকাশের জন্য অ্যাকাউন্ট প্যানেল 
                  </span>
                </p>
                <p className="mt-1 text-[18px] flex items-start gap-3">
                  <ChevronsRight className="min-w-5 h-5 mt-1" />{" "}
                  <span>সুপার ফাস্ট ডাটাবেজ</span>
                </p>
                <p className="mt-1 text-[18px] flex items-start gap-3">
                  <ChevronsRight className="min-w-5 h-5 mt-1" />{" "}
                  <span>সমস্যা সমাধান এর জন্য ২৪/৭ লাইভ সাপোর্ট</span>
                </p>
                <p className="mt-1 text-[18px] flex items-start gap-3">
                  <ChevronsRight className="min-w-5 h-5 mt-1" />{" "}
                  <span>অটোমেটিক ফিচার্স আপডেট সহ আরও অনেক কিছু</span>
                </p>
              </div>

              <DemoRequestForm buttonText="ডেমো দেখুন" />

              <div className="mt-5 flex items-center gap-3 text-[20px] poppins-bold">
                <ShieldCheck className="w-7 h-7 text-green-500" />
                <h1>infoSchoolBd</h1>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-6 w-full h-full p-5">
              <img
                src="/laptop.png"
                alt="infoSchoolbd"
                className="w-full h-full object-contain transition-all duration-300 image-container"
              />
            </div>
          </div>
        </main>
      </section>
    </>
  );
}
