import { Helmet } from "react-helmet";
import LoginForm from "../components/LoginForm";

export default function LoginPag() {
  return (
    <>
      <Helmet>
        <title>Login || infoSchoolBD</title>
        <meta
          name="description"
          content="infoschoolbd || Modern School Management Software"
        />
        <link rel="canonical" href="https://infoschoolbd.com/login" />
      </Helmet>

      <div className="h-screen w-full flex items-center justify-center p-5 bg-body">
        <div className="bg-white w-[400px] rounded-lg flex flex-col items-center border border-borderColor">
          <img
            src="/placeholder.jpg"
            alt=""
            className="w-[120px] h-[120px] rounded-full ring -mt-[50px]"
          />

          <h3 className="text-[22px] font-medium mt-5">সাইন ইন করুন</h3>
          <LoginForm />
        </div>
      </div>
    </>
  );
}
