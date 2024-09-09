export default function SchoolPicture({data, handleDelete}) {
  return (
    <>
      <div className="col-span-12 md:col-span-6 lg:col-span-4 flex flex-col border border-borderColor">
        <div className="h-[200px] w-full">
          <img
            src={data}
            alt="School"
            className="h-full w-full object-cover inline-block"
          />
        </div>
        <div className="bg-lightBg flex items-center justify-end px-4 py-2">
            <button onClick={()=> handleDelete(data)} className="bg-red-500 text-white px-3 py-1">{`ডিলিট`}</button>
        </div>
      </div>
    </>
  );
}
