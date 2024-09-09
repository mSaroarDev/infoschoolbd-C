import { useFormik } from "formik";
import { useState } from "react";
import { login } from "../libs/login";
import { showError, showSuccess } from "./../utils/toastMessage";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "./spinner/Spinner";
import { ArrowLeft } from "lucide-react";

export default function LoginForm() {
  // utils
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      if(!values.email || !values.password){
        return showError("Please input all fields")
      }

      try {
        setLoading(true);
        const res = await login(values);

        setLoading(false);
        if (res.ok) {
          showSuccess("Login success");
          const response = await res.json();
          const data = response.data;
          if(data.account_type == "Developer"){
            navigate(`/developer/dashboard`);
          } else if(data.account_type == "Client"){
            navigate(`/user/dashboard`);
          } else if(data.account_type == "Admin"){
            navigate(`/developer/dashboard`);
          }
        } else if(res.status === 406){
          showError("Access Blocked from Server");
        } else {
          showError("Wrong username or password");
        }
      } catch (error) {
        showError("There was an server side error");
      } finally {
        setLoading(false)
      }
    },
  });
  return (
    <>
      {loading && <Spinner />}
      <form onSubmit={formik.handleSubmit} className="login__contents w-full px-7 py-5 flex flex-col">
        <label>ইমেইল অথবা মোবাইল নং</label>
        <input
          type="text"
          id="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          className="inter-regular"
        />
        <label className="mt-2">পাসওয়ার্ড</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          className="inter-regular"
        />
        <button
          type="submit"
          className="mt-2 button-main flex items-center justify-center gap-4 font-bold"
        >
          <span>সাইন ইন</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </form>
      <div className="text-center pb-5">
        <Link to="/" className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          <span>হোমপেজ</span>
        </Link>
      </div>
    </>
  );
}
