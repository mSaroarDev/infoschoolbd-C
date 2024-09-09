
export default function ServicesCard({ icon, text, desc }) {
  return (
    <>
      <div className="bg-white col-span-12 md:col-span-6 lg:col-span-4 flex flex-col items-center justify-center gap-3 border-borderColor shadow hover:shadow-md p-6 rounded-md hover:scale-105 transition-all duration-300 hover:bg-brandColor hover:text-white">
        <div className="w-20 h-20 flex items-center justify-center rounded-full shadow text-[#F03D7A]">
          {icon}
        </div>
        <h2 className="font-bold text-[19px] mt-2">{text}</h2>
        <p className="text-center text-[16px]">{desc}</p>
      </div>
    </>
  );
}
