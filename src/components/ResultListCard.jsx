import convertDateFormat from "../utils/convertDate";

export default function ResultListCard({data}) {
  return (
    <>
      <div className="w-full flex items-center border-b border-slate-200 px-2 py-1">
        <div className="w-[20%]">{convertDateFormat(data?.created_at)}</div>
        <div className="flex-1 ">{data?.title}</div>
        <div className="w-[20%]">
            <a href={data?.pdf_link} target="_blank" className="flex items-center gap-2"><img src="/download.webp" alt="" className="w-[50px]" />
            <span>ডাউনলোড</span>
            </a>
        </div>
      </div>
    </>
  );
}
