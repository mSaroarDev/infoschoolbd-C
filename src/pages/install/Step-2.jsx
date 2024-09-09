import PageHeader from "../../components/PageHeader";
import CreateDeveloperID from "./components/CreateDeveloperID";

export default function Step_2() {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="w-full max-w-[800px] border border-borderColor shadow-md rounded-md">
      <div className="border border-borderColor rounded-md overflow-hidden">
        <div className="bg-lightBg px-4 py-2">
          <PageHeader text="Create a Developer Access ID" />
        </div>

        <div className="p-10">
          <CreateDeveloperID />
        </div>
      </div>
      </div>
        
    </div>
  )
}