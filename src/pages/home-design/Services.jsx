import ServicesCard from "./ServicesCard";

export default function Services() {
  return (
    <>
      <section className="py-20 bg-lightBg">
        <main className="px-5">
          <h1 className="section_header">আমাদের সুবিধাসমূহ</h1>

          <div className="grid grid-cols-12 gap-3 lg:gap-5 mt-7">
            <ServicesCard
              icon={<img src="/design.svg" className="w-12" />}
              text={"১টি ডাইনামিক ওয়েবসাইট"}
              desc="প্যাকেজের সাথে প্রথমেই পাচ্ছেন একটি সম্পুর্ন ডাইনামিক ওয়েবসাইট। যেটি আপনার প্রতিষ্ঠানের পরিচিতি বৃদ্ধি করবে।"
            />

            <ServicesCard
              icon={<img src="/cms.svg" className="w-12" />}
              text={"অ্যাডমিন ড্যাশবোর্ড"}
              desc="ওয়েবসাইট টিকে সম্পূর্ন ম্যানেজ করার জন্য পেয়ে যাচ্ছেন একটি সিএমএস / অ্যাডমিন ড্যাশবোর্ড।"
            />

            <ServicesCard
              icon={<img src="/accounting.png" className="w-12" />}
              text={"আয় ব্যায় হিসাব"}
              desc="প্রতিষ্ঠানের সম্পুর্ন হিসাব নিকাশ করার জন্য সিস্টেমের সাথেই থাকছে একটি অ্যাকাউন্টিং প্যানেল।।"
            />

            <ServicesCard
              icon={<img src="/mongodb-icon.svg" className="w-6" />}
              text="MongoDB ডাটাবেজ"
              desc="ডাটাবেজ হিসেবে পাচ্ছেন MongoDB. যার কারনে যেকোনা ডাটা আদান প্রদান হবে খুবই দ্রুত এবং নিরাপদভাবে।"
            />

            <ServicesCard
              icon={<img src="/solve.svg" className="w-12" />}
              text="২৪/৭ লাইভ সাপোর্ট"
              desc="যেকোন সমস্যা সমাধানে পাচ্ছেন দিনে ২৪ ঘন্টা ও সপ্তাহে ৭ দিন লাইভ সাপোর্ট। তাই সমস্যা সমাধান একদন সিম্পল।"
            />

            <ServicesCard
              icon={<img src="/feature.svg" className="w-10" />}
              text="Features আপডেট"
              desc="সব ধরনের নতুন ফিচার্স অটোমেটিক আপডেট পেয়ে যাবেন। তাই বাড়তি ডেভেলপার খরচের বা ফিচার্স আপডেট এর কোন ঝামেলা থাকলো না।"
            />
          </div>
        </main>
      </section>
    </>
  );
}
