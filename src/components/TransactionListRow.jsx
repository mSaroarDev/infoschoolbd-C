import { convertToGmtPlus6 } from "../utils/covertToTime";

export default function TransactionListRow({ data, formatCurrency }) {
  return (
    <>
      <tr className="bg-white text-black border-b dark:bg-gray-800 dark:border-gray-700">
        <th
          scope="row"
          className="px-6 py-1 font-medium whitespace-nowrap dark:text-white border-x border-borderColor"
        >
          {convertToGmtPlus6(data?.createdAt)}
        </th>
        {data?.transaction_type === "Salary" ? (
          <td className="px-6 py-1 border-r border-borderColor">{data?.description}</td>
        ) : (
          <td className="px-6 py-1 border-r border-borderColor">{data?.transaction_flow}</td>
        )}
        <td className="px-6 py-1 border-r border-borderColor">{data?.voucher_no}</td>
        <td className="px-6 py-1 border-r border-borderColor">{data?.method}</td>
        <td className="px-6 py-1 border-r border-borderColor">
          <span className="px-2 bg-green-500 text-white rounded text-sm">
            {data?.status}
          </span>
        </td>
        <td className="px-6 py-1 border-r border-borderColor">{data?.created_by?.name_en.split(" ")[0]}</td>
        <td className="px-6 py-1 text-right border-r border-borderColor">
          $ {formatCurrency(data?.amount)}
        </td>
      </tr>
    </>
  );
}
