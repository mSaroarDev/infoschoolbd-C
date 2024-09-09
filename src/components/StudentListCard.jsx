export default function StudentListCard({ data }) {
  return (
    <>
      <tr className="odd:bg-white even:bg-gray-50 border-b dark:border-gray-700 text-black cursor-pointer hover:bg-gray-50">
        <td className="px-6 py-2 border-borderColor border">
          <div className="w-8 h-8 rounded-full ring-1 ring-blue-600 overflow-hidden">
            <img
              src={(data?.image && data?.image) || "/placeholder.jpg"}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        </td>
        <td className="px-6 py-2 border-borderColor border font-bold">
          <span className="inter-bold">{data?.name_en}</span> <br />{" "}
          {data?.name_bn}
        </td>
        <td className="px-6 py-2 border-borderColor border">
          {data?.personal_information?.present_address?.village1},{" "}
          {data?.personal_information?.present_address?.post1},{" "}
          {data?.personal_information?.present_address?.upazilla1},{" "}
          {data?.personal_information?.present_address?.district1}
        </td>
        <td className="px-6 py-2 border-borderColor border capitalize">{data?.classe}</td>
        <td className="px-6 py-2 border-borderColor border">{data?.class_role}</td>
        <td className="px-6 py-2 border-borderColor border">
          {(data?.section && data?.section) || "N/A"}
        </td>
        {/* <td className="px-6 py-2 border-borderColor border flex items-center justify-end gap-1">
          <Link to={`/user/students/${data?._id}`}
            className="bg-purple-600 rounded text-white p-1"
          >
            <EyeIcon className="w-4 h-4" />
          </Link>
          <button
            onClick={() => alert("Hello")}
            className="bg-green-500 rounded text-white p-1"
          >
            <PenBox className="w-4 h-4" />
          </button>
          <button
            onClick={() => alert("Hello")}
            className="bg-red-600 rounded text-white p-1"
          >
            <Trash2Icon className="w-4 h-4" />
          </button>
        </td> */}
      </tr>
    </>
  );
}
