import { BookmarkPlus, Contact, ContactRound, FileStack, LayoutPanelLeft, NotebookPen, ScrollText, UserRoundCog, Users, Wallet } from "lucide-react";
import FeaturesCardLeft from "./FeaturesCardLeft";
import FeaturesCardRight from "./FeaturesCardRight";

export default function Features() {
  return (
    <>
        <section className="py-20 bg-lightBg">
            <main className="px-5">
                <h1 className="section_header">ফিচার্স সমূহ</h1>

                <div className="mt-10 grid grid-cols-12 gap-5">
                    <div className="col-span-12 md:col-span-6 lg:col-span-4">
                        <FeaturesCardLeft title="সারসংক্ষেপ" icon={<LayoutPanelLeft className="w-7 h-7" />} text={`আপনার প্রতিষ্ঠানের সারসংক্ষেপ যেমন: মোট শিক্ষক, শিক্ষার্থী, শ্রেনী, ফলাফল, অনলাইন অ্যাডমিশন ইত্যাদি।`} />
                        <FeaturesCardLeft title="অনলাইন অ্যাডমিশন" icon={<BookmarkPlus className="w-7 h-7" />} text={`অনলাইনে শিক্ষার্থী ভর্তি কার্যক্রমের যাবতীয় ফিচার্স রয়েছে। এবং অ্যাডমিশন এর সম্পুর্ন অ্যক্সেস থাকবে আপনার হাতেই।`} />
                        <FeaturesCardLeft title="নোটিশ" icon={<NotebookPen className="w-7 h-7" /> } text={`থাকছে প্রতিষ্ঠানের যাবতীয় বিজ্ঞপ্তি প্রকাশ করার জন্য একটি নোটিশ বোর্ড।`} />
                        <FeaturesCardLeft title="শিক্ষক পরিচিতি" icon={<Users className="w-7 h-7" />} text={`শিক্ষকদের পরিচিতি যেমন: নাম, পদবী, নিজ জেলা, মোবাইল নম্বর ইত্যাদি।`} />
                        <FeaturesCardLeft title="আয় ব্যায় রিপোর্ট" icon={<FileStack className="w-7 h-7" />} text={`রিপোর্ট সিস্টেমে প্রতিষ্ঠানের আয় ব্যায় এর সমস্ত হিসাব যাচাই করা যাবে। `} />
                    </div>
                    <div className="col-span-12 md:col-span-6 lg:col-span-4 hidden w-full h-full lg:flex items-center justify-center">
                        <img src="/intro-mobile2.png" alt="" />
                    </div>
                    <div className="col-span-12 md:col-span-6 lg:col-span-4">
                        <FeaturesCardRight title="আয় ব্যায় হিসাব" icon={<Wallet className="w-7 h-7" />} text={`প্রতিষ্ঠানের আয় ব্যায় হিসাব করার জন্য একটি সম্পুর্ণ অ্যাকাউন্টিং প্যানেল।`} />
                        <FeaturesCardRight title="শ্রেনীভিত্তিক শিক্ষার্থী" icon={<UserRoundCog className="w-7 h-7" />} text={`রয়েছে শ্রেনী ও লিঙ্গভিত্তিক শিক্ষার্থীদের তথ্য এবং শিক্ষার্থীদের পরিচিতি প্যানেল।`} />
                        <FeaturesCardRight title="অফিস স্টাফ" icon={<ContactRound className="w-7 h-7" /> } text={`অফিস স্টাফদের তথ্য যেমন: অফিস সহকারী, পিওন, নিরাপত্তা প্রহরী সহ অন্যান্য কর্মচারীদের তথ্য।`} />
                        <FeaturesCardRight title="ম্যানেজিং কমিটি" icon={<Contact className="w-7 h-7" />} text={`ম্যানেজিং কমিটির সদস্যদের তথ্য যেমন: প্রতিষ্ঠানের সভাপতি এবং ম্যানেজমেন্ট টিম।`} />
                        <FeaturesCardRight title="ফলাফল" icon={<ScrollText className="w-7 h-7" />} text={`থাকছে শিক্ষার্থীর বিভিন্ন ফলাফলের সারসংক্ষেপ এবং বিস্তারিত। যেমন: ক্লাস টেস্ট, অর্ধবার্ষিক, বার্ষিক ইত্যাদি।`} />
                    </div>
                </div>
            </main>
        </section>
    </>
  )
}