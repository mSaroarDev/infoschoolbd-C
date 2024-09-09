export default function FeaturesCardRight({ title, text, icon }) {
  return (
    <>
      {/* card 1 */}
      <div className="bg-white w-full p-5 border-borderColor shadow hover:shadow-md rounded-md mb-3 hover:ml-3 hover:border-l-[3px] hover:border-brandColor transition-all duration-300">
        <div className="flex items-start justify-start gap-5">
          <div className="w-10 h-auto text-[#F03D7A]">{icon}</div>
          <div className="text-left">
            <h3 className="font-bold text-[20px]">{title}</h3>
            <p className="text-[16px] mt-3 text-gray-700">
              {text}
            </p>
          </div>
        </div>
      </div>
      {/* card 1 end */}
    </>
  );
}
