import { useLocation } from "react-router-dom";

const ClientStats = ({ count, text, icon, bgColor, textColor }) => {
  const { pathname } = useLocation();

  return (
    <>
      <div
        className={`col-span-6 md:col-span-3 p-5 rounded-lg shadow-md flex items-center justify-start gap-4 w-full border nunito-regular`}
        style={{ backgroundColor: bgColor }}
      >
        <div className="">
          <div
            className="w-14 h-14 bg-blue-600/10 rounded-lg flex items-center justify-center"
            style={{ background: textColor, color: "#ffffff" }}
          >
            {icon}
          </div>
        </div>
        <div className="flex flex-col items-start justify-start">
          <h4 className="font-black text-[28px]">{count}</h4>
          <p
            className={`text-sm ${
              pathname.startsWith("/user") ? "bangla-font" : ""
            } `}
          >
            {text}
          </p>
        </div>
      </div>
    </>
  );
};

export default ClientStats;
