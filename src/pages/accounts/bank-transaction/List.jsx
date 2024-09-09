import { Landmark } from "lucide-react";
import PageHeader from "../../../components/PageHeader";
import { Link, useSearchParams } from "react-router-dom";
import Paggination from "../../../components/Paggination";
import { useEffect, useState } from "react";
import { getMyTransactions } from "../../../libs/transaction";
import Spinner from "../../../components/spinner/Spinner";
import TransactionListRow from "../../../components/TransactionListRow";
import { countDocuments } from "../../../libs/count";

export default function BankTransactionListPage() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");
  const [loading, setLoading] = useState(true);

  // fetch data
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const res = await getMyTransactions(page, 200);
      if (res.ok) {
        const result = await res.json();
        const transactions = result.data;

        // Sort transactions by date in descending order
        const sortedTransactions = transactions.sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return dateB - dateA;
        });

        setData(sortedTransactions);
      }
    } catch (error) {
      console.log("error:", error);
    } finally {
      setLoading(false);
    }
  };

  // count all docs
  const [count, setCount] = useState(0);
  const getCount = async () => {
    try {
      const res = await countDocuments(page, 200);
      if (res.ok) {
        const data = await res.json();
        setCount(data);
      }
    } catch (error) {
      console.log("error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    getCount();
  }, []);

  // Function to group data by date
  const groupByDate = (data) => {
    return (
      data &&
      data?.reduce((acc, entry) => {
        const date = entry.createdAt.split("T")[0];
        if (!acc[date]) {
          acc[date] = {
            entries: [],
            count: 0,
            totalAmount: 0,
          };
        }

        acc[date].entries.push(entry);
        acc[date].count += 1;
        acc[date].totalAmount += parseInt(entry.amount);

        return acc;
      }, {})
    );
  };

  const groupedData = groupByDate(data);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-BD", { minimumFractionDigits: 0 }).format(
      amount
    );
  };

  return (
    <>
      {loading && <Spinner />}
      <div className="flex items-center justify-between">
        <PageHeader
          icon={<Landmark className="h-5 w-5" />}
          text="Bank Transactions"
        />

        <Link to="/accounts/bank-transaction/create" className="button-main">
          New Transaction
        </Link>
      </div>

      <div className="list mt-5">
        {Object.keys(groupedData)?.map((date) => (
          <div key={date}>
            <h3 className="font-bold text-base mb-2 mt-5">{date}</h3>
            <div className="relative overflow-x-auto text-sm text-black">
              <table className="w-full text-left rtl:text-righ dark:text-gray-400">
                <thead className="uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-2 border-x border-y border-borderColor">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-2 border-x border-y border-borderColor">
                      Description
                    </th>
                    <th scope="col" className="px-6 py-2 border-x border-y border-borderColor">
                      Voucher No
                    </th>
                    <th scope="col" className="px-6 py-2 border-x border-y border-borderColor">
                      Method
                    </th>
                    <th scope="col" className="px-6 py-2 border-x border-y border-borderColor">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-2 border-x border-y border-borderColor">
                      User
                    </th>
                    <th scope="col" className="px-6 py-2 border-x border-y border-borderColor text-right">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {groupedData[date]?.entries?.map((entry) => (
                    <TransactionListRow
                      key={entry?._id}
                      data={entry}
                      formatCurrency={formatCurrency}
                    />
                  ))}
                </tbody>
              </table>

              <h1 className="text-right font-bold text-base mr-6">
                Total: ৳ {formatCurrency(groupedData[date].totalAmount)}
              </h1>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-end">
        <Paggination
          count={count?.data?.totalBankTransaction}
          limit={200}
          nextLink={"/accounts/bank-transaction"}
        />
      </div>
    </>
  );
}
