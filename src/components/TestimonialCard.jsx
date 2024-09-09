import { Link } from "react-router-dom";

export default function TestimonialCard({ data }) {
  return (
    <>
      <Link
        to={`/user/settings/testimonials/${data?._id}`}
        className="col-span-12 md:col-span-6 py-10 px-5 border border-borderColor shadow-sm"
      >
        <div className="flex flex-col items-center gap-1">
          <div className="w-[50px] h-[50px] rounded-full ring-2 ring-brandColor/50 overflow-hidden">
            <img
              src={data?.image || "placeholder.jpg"}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="mt-5 text-center italic">
            <div
              dangerouslySetInnerHTML={{ __html: data?.text.slice(0, 200) }}
            />
          </div>

          <div className="mt-5 text-center">
            <h3 className="font-bold text-[16px]">{data?.name}</h3>
            <p className="text-center">{data?.designation}</p>
          </div>
        </div>
      </Link>
    </>
  );
}
