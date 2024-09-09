import DemoRequestForm from "../../components/DemoRequestForm";

export default function RequestFreeDemo() {
  return (
    <>
      <section className="py-20">
        <main className="px-5">
          <div className="grid grid-cols-12 gap-5">
            <div className="col-span-12 md:col-span-6">
              <h2 className="font-bold text-[30px] w-full">
                আরও ফিচার্স দেখতে ডেমো অ্যাকাউন্ট নিন
              </h2>
              <p className="mt-3 text-[17px] text-gray-700 w-full text-justify">
                প্রতিনিয়ত আমাদের প্যাকেজ এর সাথে নতুন নতুন সব ফিচার্স যুক্ত করা
                হচ্ছে এবং পুরাতন ফিচার্স গুলোকে আরও User Friendly এবং Performace
                Optimizatoin করা হচ্ছে। আমাদের ফিচার্স গুলো দেখতে পারেন ডেমো অ্যাকাউন্ট এর মাধ্যমে।{" "}
              </p>
            </div>
            <div className="col-span-12 md:col-span-6 flex items-center justify-center">
              <DemoRequestForm buttonText="Get a Free Demo Account" />
            </div>
          </div>
        </main>
      </section>
    </>
  );
}
