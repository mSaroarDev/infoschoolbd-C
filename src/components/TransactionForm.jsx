import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useUserInfo } from "../utils/useUserInfo";
import { createTransaction } from "../libs/transaction";
import { showError, showSuccess } from "../utils/toastMessage";
import Spinner from "./spinner/Spinner";
import Swal from "sweetalert2";
import { getAllTeachers } from "../libs/teacherAPI";
import { getAllStaffs } from "../libs/staffAPI";
import { getAllCommittee } from "../libs/committeeAPI";

export default function TransactionForm({ type }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // get username
  const currUser = useUserInfo();

  // get teacher info
  const [staffsList, setStaffsList] = useState([]);
  
  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [teachersRes, staffsRes, committeeRes] = await Promise.all([
        getAllTeachers(),
        getAllStaffs(),
        getAllCommittee(),
      ]);

      if (teachersRes.ok && staffsRes.ok && committeeRes.ok) {
        const teachersData = await teachersRes.json();
        const staffsData = await staffsRes.json();
        const committeeData = await committeeRes.json();

        const combinedData = [
          ...(teachersData?.data || []),
          ...(staffsData?.data || []),
          ...(committeeData?.data || []),
        ];

        setStaffsList(combinedData);
      } else {
        console.log("One or more requests failed");
      }
    } catch (error) {
      console.log("error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  console.log("staffsList", staffsList);

  // formik
  const formik = useFormik({
    initialValues: {
      transaction_flow: "",
      method: "",
      transaction_type: type,
      description: "",
      amount: "",
    },
    onSubmit: async (values) => {
      if (!values.transaction_flow || !values.method || !values.amount) {
        return showError("Input all fields required!");
      }

      Swal.fire({
        title: "Warning!",
        text: "This transaction is not reversible!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes! Confirm",
      }).then(async (result) => {
        if (result.isConfirmed) {
          setLoading(true);
          try {
            const res = await createTransaction(values);
            if (res.ok) {
              showSuccess("Data updated");
              navigate(-1);
            } else {
              showError("Failed");
            }
          } catch (error) {
            showError("Internal server error");
          } finally {
            setLoading(false);
          }
        } else {
          Swal.close();
        }
      });
    },
  });

  return (
    <>
      {loading && <Spinner />}
      <form
        onSubmit={formik.handleSubmit}
        className="mt-5 w-full grid grid-cols-12 items-center gap-2 border border-borderColor p-5 rounded-md"
      >
        <label className="col-span-12 md:col-span-3">
          Entered By: <span className="text-red-600 text-xs">*</span>
        </label>
        <input
          type="text"
          className="col-span-12 md:col-span-9 w-1/3 pointer-events-none bg-gray-100"
          value={currUser && currUser?.name_en}
          disabled
        />

        <label className="col-span-12 md:col-span-3">
          Transaction Flow: <span className="text-red-600 text-xs">*</span>
        </label>
        <select
          id="transaction_flow"
          name="transaction_flow"
          value={formik.values.transaction_flow}
          onChange={formik.handleChange}
          className="col-span-12 md:col-span-9 w-1/3"
          placeholder="eg: Check"
        >
          <option value="">Select One</option>
          {type === "Bank Transaction" && (
            <>
              <option value="Bank to Cash">Bank to Cash</option>
              <option value="Cash to Bank">Cash to Bank</option>
            </>
          )}
          {type === "Income" && (
            <>
              <option value="Cash Recieve">Cash Recieve</option>
            </>
          )}
          {type === "Expense" && (
            <>
              <option value="Cash Expense">Cash Expense</option>
              <option value="Bank Expense">Bank Expense</option>
              <option value="Wallet Expense">Wallet Expense</option>
            </>
          )}
          {type === "Salary" && (
            <>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="By Cash">By Cash</option>
              <option value="Mobile Wallet Transfer">
                Mobile Wallet Transfer
              </option>
            </>
          )}
        </select>

        <label className="col-span-12 md:col-span-3">
          Method: <span className="text-red-600 text-xs">*</span>
        </label>
        <select
          id="method"
          name="method"
          value={formik.values.method}
          onChange={formik.handleChange}
          className="col-span-12 md:col-span-9 w-1/3"
        >
          <option value="">Select One</option>
          <option value="Check">Check</option>
          <option value="Cash">Cash</option>
          <option value="bKash">bKash</option>
          <option value="Rocket">Rocket</option>
          <option value="Nagad">Nagad</option>
          <option value="Ducth Bangla">Ducth Bangla</option>
          <option value="Bank Transfer">Bank Transfer</option>
          <option value="Others">Others</option>
        </select>

        <label className="col-span-12 md:col-span-3">
          Amount: <span className="text-red-600 text-xs">*</span>
        </label>
        <input
          type="text"
          id="amount"
          name="amount"
          value={formik.values.amount}
          onChange={formik.handleChange}
          className="col-span-12 md:col-span-9 w-1/3"
          placeholder="eg: 5000/10000/20000"
        />

        {type === "Salary" ? (
          <>
            <label className="col-span-12 md:col-span-3">
              Given to: <span className="text-red-600 text-xs text-xs">*</span>
            </label>
            <select
              id="description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              className="col-span-12 md:col-span-9 w-2/3 resize-none"
            >
              <option value="">Select One</option>
              {staffsList?.map((item) => (
                <option key={item?._id} value={item?.name_en}>
                  {item?.name_en} ({item?.designation})
                </option>
              ))}
            </select>{" "}
          </>
        ) : (
          <>
            <label className="col-span-12 md:col-span-3">
              Description:{" "}
              <span className="text-red-600 text-xs text-xs">(optional)</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              className="col-span-12 md:col-span-9 w-2/3 resize-none"
              placeholder="Type here..."
            ></textarea>
          </>
        )}

        <div className="col-span-12 flex items-end justify-end mt-5">
          <button type="submit" className="button-main">
            Save Transaction
          </button>
        </div>
      </form>
    </>
  );
}
