
export default function FeaturesCardLeft({ title, icon, text }) {
  return (
    <>
      {/* card 1 */}
      <div className="bg-white w-full p-5 border-borderColor shadow hover:shadow-md rounded-md mb-3 hover:border-r-[3px] hover:border-brandColor hover:-ml-3 transition-all duration-300">
        <div className="flex items-start justify-end gap-5">
          <div className="w-10 h-auto block md:hidden text-[#F03D7A]">{icon}</div>
          <div className="text-left lg:text-right">
            <h3 className="font-bold text-[20px]">{title}</h3>
            <p className="text-[16px] mt-3 text-gray-700">
              {text}
            </p>
          </div>
          <div className="w-10 h-auto hidden md:block text-[#F03D7A]">{icon}</div>
        </div>
      </div>
      {/* card 1 end */}
    </>
  );
}
