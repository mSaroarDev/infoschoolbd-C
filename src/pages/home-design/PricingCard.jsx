import { ChevronRight } from "lucide-react";
import OrderInfoPopup from "../../components/OrderInfoPopup";

export default function PricingCard({ data }) {
  return (
    <>
      <div
        className={`bg-white col-span-12 md:col-span-6 lg:col-span-4 p-10 rounded-xl shadow-md hover:shadow-lg flex flex-col justify-between border-t-[4px] border-[#4F46E5] overflow-hidden`}
      >
        <div className="flex flex-col items-start">
          <p className="font-bold text-black text-[22px]">
            {data?.package_name}
          </p>

          <h3 className="text-[45px] font-semibold my-3">
            <span
              className={`${
                data?.package_name == "Pro Plus (Most Popular)" && "text-[#4F46E5]"
              } "text-black"`}
            >
              ৳ {data?.price}
            </span>{" "}
            <span className="text-[15px] text-gray-600">/ প্রতি মাস</span>
          </h3>
          <hr />
          {data.particles.map((item, i) => (
            <p
              key={i}
              className="text-gray-700 text-[15px] font-semibold flex items-center gap-3 mt-2"
            >
              <span className="w-6 h-6 bg-[#4F46E5]/10 flex items-center justify-center rounded-full">
                <ChevronRight className="w-4 h-4" />
              </span>
              <span>{item}</span>
            </p>
          ))}
        </div>

        {/* <button className={`mt-2 px-7 py-2 rounded-full font-bold text-[17px] ${
                data?.package_name == "Pro Plus (Most Popular)" ? "bg-[#4F46E5] text-white" : "bg-[#4F46E5]/10 text-[#4F46E5]"
              }`}>
          অর্ডার করুন
        </button> */}

        <OrderInfoPopup data={data} />

        {/* recomended */}
      </div>
      
    </>
  );
}
