import "./spinner.css";

export default function Spinner() {
  return (
    <div>
      <div className="overlay">
        <div className="h-screen w-full flex items-center justify-center fixed top-0 bottom-0 left-0 right-0">
          <span className="loader"></span>
        </div>
      </div>
    </div>
  );
}
