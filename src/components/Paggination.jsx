import { Link, useSearchParams } from "react-router-dom";

export default function Paggination({ count, nextLink, limit }) {
  // page no
  const [searchParams] = useSearchParams();
  const page_no = searchParams.get("page");

  // buttons
  const buttons = [];
  const startPage = Math.max(1, page_no - 5);
  const endPage = Math.min(Math.ceil(count / (limit ? limit : 10)), page_no + 5);

  for (let i = startPage; i <= endPage; i++) {
    buttons.push(
      <Link
        to={`${nextLink}?page=${i}`}
        key={i}
        className={`join-item btn ${page_no === i ? "btn-active" : ""}`}
      >
        {i}
      </Link>
    );
  }

  return (
    <>
      <div className="join flex items-center overflow-hidden rounded-md mt-10">
        <Link to={`${nextLink}?page=1`} className="join-item btn border-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-3 h-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
            />
          </svg>
        </Link>
        {Math.ceil(count / (limit ? limit : 10)) <= 1 ? (
          <Link
            to={`${nextLink}?page=1`}
            className={`join-item btn btn-active`}
          >
            1
          </Link>
        ) : (
          buttons
        )}
        <Link
          to={`${nextLink}?page=${Math.ceil(count / (limit ? limit : 10))}`}
          className="join-item btn border-0 rounded-e-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-3 h-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
            />
          </svg>
        </Link>
      </div>
    </>
  );
}
