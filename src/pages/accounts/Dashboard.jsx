import { Landmark } from "lucide-react";
import ClientStats from "../../components/ClientStats";
import { useEffect, useState } from "react";
import { calculate } from "../../libs/count";
import Loader from "../../components/loader/Loader";
import { getAllMyTransactions } from "../../libs/transaction";
import { convertDateEn } from "../../utils/convertDateEn";
import { Helmet } from "react-helmet";

export default function AccDashboardPage() {
  const [loading, setLoading] = useState(true);

  // count all docs
  const [data, setData] = useState(0);
  const getCalculate = async () => {
    try {
      const res = await calculate();
      if (res.ok) {
        const data = await res.json();
        setData(data.data);
      }
    } catch (error) {
      console.log("error:", error);
    }
  };

  // get some transactions
  const [transactions, setTransactions] = useState([]);
  const getTransactions = async () => {
    try {
      const res = await getAllMyTransactions(1, 50);
      if (res.ok) {
        const data = await res.json();
        setTransactions(data.data);
      }
    } catch (error) {
      console.log("error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCalculate();
    getTransactions();
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-BD", { minimumFractionDigits: 0 }).format(
      amount
    );
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Acounting Dashboard || infoSchoolBD</title>
      </Helmet>

      {loading && <Loader />}
      <div className="">
        <h3 className="text-lg font-bold mb-5">Summary Preview</h3>
        <div className="grid grid-cols-12 gap-5">
          <ClientStats
            count={`$ ${data && data?.openingBalance?.toLocaleString()}`}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                />
              </svg>
            }
            text={`Opening Balance`}
            bgColor="#EEF0F8"
            textColor="#657CEE"
          />

          <ClientStats
            count={`$ ${data && data?.bankBalance?.toLocaleString()}`}
            icon={<Landmark className="w-6 h-6" />}
            text={`Bank Balance`}
            bgColor="#F8F0E7"
            textColor="#E6AA69"
          />

          <ClientStats
            count={`$ ${data && data?.cashBalance?.toLocaleString()}`}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
                />
              </svg>
            }
            text={`Cash Balance`}
            bgColor="#F9E8E8"
            textColor="#DC7B7B"
          />

          <ClientStats
            count={`$ ${data && data?.todayTransactionValue?.toLocaleString()}`}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
            }
            text={`Today Transaction`}
            bgColor="#E6F2E2"
            textColor="#92D268"
          />

          <ClientStats
            count={`$ ${data && data?.todayExpenseValue?.toLocaleString()}`}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5 text-redColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 6 9 12.75l4.286-4.286a11.948 11.948 0 0 1 4.306 6.43l.776 2.898m0 0 3.182-5.511m-3.182 5.51-5.511-3.181"
                />
              </svg>
            }
            text={`Today Expense`}
            bgColor="#F9E8E8"
            textColor="#DC7B7B"
          />

          <ClientStats
            count={`$ ${data && data?.todayIncomeValue?.toLocaleString()}`}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                />
              </svg>
            }
            text={`Today Income`}
            bgColor="#EEF0F8"
            textColor="#657CEE"
          />

          <ClientStats
            count={`$ ${
              data && data?.currentMonthTransactionValue?.toLocaleString()
            }`}
            icon={<Landmark className="w-6 h-6" />}
            text={`This Month Transaction`}
            bgColor="#F8F0E7"
            textColor="#E6AA69"
          />

          <ClientStats
            count={`$ ${
              data && data?.currentMonthIncomeValue?.toLocaleString()
            }`}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
                />
              </svg>
            }
            text={`This Month Income`}
            bgColor="#F9E8E8"
            textColor="#DC7B7B"
          />

          <ClientStats
            count={`$ ${
              data && data?.currentMonthExpenseValue?.toLocaleString()
            }`}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
            }
            text={`This Month Expense`}
            bgColor="#E6F2E2"
            textColor="#92D268"
          />

          <ClientStats
            count={`$ ${
              data && data?.lastMonthTransactionValue?.toLocaleString()
            }`}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                />
              </svg>
            }
            text={`Last Moth Transaction`}
            bgColor="#EEF0F8"
            textColor="#657CEE"
          />

          <ClientStats
            count={`$ ${data && data?.lastMonthIncomeValue?.toLocaleString()}`}
            icon={<Landmark className="w-6 h-6" />}
            text={`Last Month Income`}
            bgColor="#F8F0E7"
            textColor="#E6AA69"
          />

          <ClientStats
            count={`$ ${data && data?.lastMonthExpenseValue?.toLocaleString()}`}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
                />
              </svg>
            }
            text={`Last Month Expense`}
            bgColor="#F9E8E8"
            textColor="#DC7B7B"
          />

          <ClientStats
            count={`$ ${data && data?.lastMonthProfit?.toLocaleString()}`}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
            }
            text={`Last Month Net Income`}
            bgColor="#E6F2E2"
            textColor="#92D268"
          />
        </div>
      </div>

      {/* <div className="mt-5">
        <h3 className="text-lg font-bold mb-5">Accounting Chart</h3>
        <div className="grid grid-cols-12 gap-5"></div>
      </div> */}

      <div className="mt-10">
        <h3 className="text-lg font-bold mb-5">Transaction History</h3>

        <div className="relative overflow-x-auto text-sm">
          <table className="w-full text-left rtl:text-righ dark:text-gray-400">
            <thead className="uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-2 border-x border-y border-borderColor"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-2 border-x border-y border-borderColor"
                >
                  Description
                </th>
                <th
                  scope="col"
                  className="px-6 py-2 border-x border-y border-borderColor"
                >
                  Voucher No
                </th>
                <th
                  scope="col"
                  className="px-6 py-2 border-x border-y border-borderColor"
                >
                  Method
                </th>
                <th
                  scope="col"
                  className="px-6 py-2 border-x border-y border-borderColor"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-2 border-x border-y border-borderColor"
                >
                  Done By
                </th>
                <th
                  scope="col"
                  className="px-6 py-2 border-x border-y border-borderColor text-right"
                >
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions &&
                transactions.map((item) => (
                  <tr
                    key={item?._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-6 py-2 border-x border-borderColor font-medium whitespace-nowrap dark:text-white"
                    >
                      {convertDateEn(item?.createdAt)}
                    </th>
                    <td className="px-6 py-2 border-r border-borderColor">
                      {item?.transaction_type}
                    </td>
                    <td className="px-6 py-2 border-r border-borderColor">
                      {item?.voucher_no}
                    </td>
                    <td className="px-6 py-2 border-r border-borderColor">
                      {item?.method}
                    </td>
                    <td className="px-6 py-2 border-r border-borderColor">
                      <span className="px-2 bg-green-500 text-white rounded text-sm">
                        {item?.status}
                      </span>
                    </td>
                    <td className="px-6 py-2 border-r border-borderColor">
                      {item?.created_by?.name_en?.split(" ")[0]}
                    </td>
                    <td className="px-6 py-2 border-r border-borderColor text-right">
                      $ {formatCurrency(item?.amount)}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
