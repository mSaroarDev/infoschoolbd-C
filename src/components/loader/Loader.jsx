import "./Loader.css"

export default function Loader() {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-50 bg-white">
      <div className="h-screen w-full flex items-center justify-center">
        <span className="loader-css"></span>
      </div>
    </div>
  );
}
