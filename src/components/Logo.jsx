import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <>
      <Link to="/">
        <div className="flex items-center gap-3 w-[150px] h-auto">
          <img src="/logo.png" className="w-full h-full object-contain" />
        </div>
      </Link>
    </>
  );
}
