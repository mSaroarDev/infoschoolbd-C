import { useUserInfo } from "../utils/useUserInfo";

export default function StudentProfileCard({ data }) {
  const currUser = useUserInfo();

  return (
    <>
      <div className="py-5 px-14 inter-regular text-[15px]">
        <div className="flex items-center justify-between border-b border-black pb-5">
          <div>
            <img
              src={
                currUser?.institute?.school_information?.logo ||
                "/school-logo.png"
              }
              alt="Logo"
              className="w-[120px]"
            />
          </div>
          <div className="text-center">
            <h1 className="text-[28px] font-bold">
              {currUser?.institute?.name_en}
            </h1>
            <p>Address: {currUser?.institute?.institute_address}</p>
            <p>
              Cell: {currUser?.institute?.contact}, Email:{" "}
              {currUser?.institute?.school_information?.email}, Website:{" "}
              {currUser?.institute?.school_information?.web}
            </p>
            <p className="mt-10 font-semibold uppercase text-[17px]">
              Student Profile
            </p>
          </div>
          <div>
            <div className="border border-borderColor h-[140px] w-[130px] overflow-hidden">
              <img
                src={data && data?.image}
                alt="Image"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="pt-5 grid grid-cols-12 gap-y-7 gap-x-10">
          <div className="col-span-12 flex items-center gap-3">
            <p className="w-fit whitespace-nowrap">Students Name:</p>
            <p className="w-full py-1 border-b border-gray-600 border-dashed">
              {data && data?.name_en} ({data && data?.name_bn})
            </p>
          </div>
          <div className="col-span-12 flex items-center gap-3">
            <p className="w-fit whitespace-nowrap">{`Father's Name:`}</p>
            <p className="w-full py-1 border-b border-gray-600 border-dashed">
              {data && data?.personal_information.father_name}
            </p>
          </div>
          <div className="col-span-12 flex items-center gap-3">
            <p className="w-fit whitespace-nowrap">{`Mother's Name:`}</p>
            <p className="w-full py-1 border-b border-gray-600 border-dashed">
              {data && data?.personal_information.mother_name}
            </p>
          </div>

          <div className="col-span-12 md:col-span-6 flex items-center gap-3">
            <p className="w-fit whitespace-nowrap">{`Date of Birth:`}</p>
            <p className="w-full py-1 border-b border-gray-600 border-dashed">
              {data && data?.dob}
            </p>
          </div>

          <div className="col-span-12 md:col-span-6 flex items-center gap-3">
            <p className="w-fit whitespace-nowrap">{`Gender:`}</p>
            <p className="w-full py-1 border-b border-gray-600 border-dashed">
              {data && data?.gender}
            </p>
          </div>

          <div className="col-span-12 flex items-center gap-3">
            <p className="w-fit whitespace-nowrap">{`Present Address:`}</p>
            <p className="w-full py-1 border-b border-gray-600 border-dashed">
              {data && data?.personal_information.present_address.village1},{" "}
              {data && data?.personal_information.present_address.post1},{" "}
              {data && data?.personal_information.present_address.upazilla1},{" "}
              {data && data?.personal_information.present_address.district1}
            </p>
          </div>

          <div className="col-span-12 flex items-center gap-3">
            <p className="w-fit whitespace-nowrap">{`Permanant Address:`}</p>
            <p className="w-full py-1 border-b border-gray-600 border-dashed">
              {data && data?.personal_information.permanent_address.village2},{" "}
              {data && data?.personal_information.permanent_address.post2},{" "}
              {data && data?.personal_information.permanent_address.upazilla2},{" "}
              {data && data?.personal_information.permanent_address.district2}
            </p>
          </div>

          <div className="col-span-12 md:col-span-6 flex items-center gap-3">
            <p className="w-fit whitespace-nowrap">{`Religion:`}</p>
            <p className="w-full py-1 border-b border-gray-600 border-dashed">
              {data && data?.personal_information.religion}
            </p>
          </div>

          <div className="col-span-12 md:col-span-6 flex items-center gap-3">
            <p className="w-fit whitespace-nowrap">{`Nationality:`}</p>
            <p className="w-full py-1 border-b border-gray-600 border-dashed">
              {data && data?.personal_information.nationality}
            </p>
          </div>

          <div className="col-span-12 md:col-span-6 flex items-center gap-3">
            <p className="w-fit whitespace-nowrap">{`Phone No:`}</p>
            <p className="w-full py-1 border-b border-gray-600 border-dashed">
              {data && data?.personal_information.contact_no}
            </p>
          </div>

          <div className="col-span-12 md:col-span-6 flex items-center gap-3">
            <p className="w-fit whitespace-nowrap">{`Email Address:`}</p>
            <p className="w-full py-1 border-b border-gray-600 border-dashed">
              {data && data?.email}
            </p>
          </div>

          <div className="col-span-12 md:col-span-6 flex items-center gap-3">
            <p className="w-fit whitespace-nowrap">{`NID No:`}</p>
            <p className="w-full py-1 border-b border-gray-600 border-dashed">
              {data && data?.personal_information.nid}
            </p>
          </div>

          <div className="col-span-12 md:col-span-6 flex items-center gap-3">
            <p className="w-fit whitespace-nowrap">{`Blood Group:`}</p>
            <p className="w-full py-1 border-b border-gray-600 border-dashed">
              {data && data?.personal_information.blood_group}
            </p>
          </div>

          <div className="col-span-12 md:col-span-6 flex items-center gap-3">
            <p className="w-fit whitespace-nowrap">{`Occupation:`}</p>
            <p className="w-full py-1 border-b border-gray-600 border-dashed">
              {data && data?.personal_information.occupation}
            </p>
          </div>

          <div className="col-span-12 md:col-span-6 flex items-center gap-3">
            <p className="w-fit whitespace-nowrap">{`Marital Status:`}</p>
            <p className="w-full py-1 border-b border-gray-600 border-dashed">
              {data && data?.personal_information.marital_status}
            </p>
          </div>

          <div className="col-span-12 md:col-span-4 flex items-center gap-3">
            <p className="w-fit whitespace-nowrap">{`Present Class:`}</p>
            <p className="w-full py-1 border-b border-gray-600 border-dashed capitalize">
              {data && data?.classe}
            </p>
          </div>

          <div className="col-span-12 md:col-span-4 flex items-center gap-3">
            <p className="w-fit whitespace-nowrap">{`Class Role:`}</p>
            <p className="w-full py-1 border-b border-gray-600 border-dashed">
              {data && data?.class_role}
            </p>
          </div>

          <div className="col-span-12 md:col-span-4 flex items-center gap-3">
            <p className="w-fit whitespace-nowrap">{`Section:`}</p>
            <p className="w-full py-1 border-b border-gray-600 border-dashed">
              {data && data?.section}
            </p>
          </div>
        </div>

        <div className="pt-14">
          <h2 className="font-semibold text-center">DECLEARATION</h2>
          <p>
            I hereby, declearing that I will obey all the rules and regulations
            of the institution and be fuly responsible for violating the rules.{" "}
          </p>
        </div>

        <div className="pt-20 flex items-center justify-between">
          <div>
            <p></p>
            <p className="pt-2 border-t border-black border-dashed">
              Student Signature
            </p>
          </div>
          <div>
            <img
              src={currUser?.institute?.school_information?.authorized_sign}
              alt=""
              className="w-[110px] pb-2"
            />
            <p className="pt-2 border-t border-black border-dashed">
              Authorized Signature
            </p>
          </div>
        </div>
      </div>
      <div className="w-full bg-borderColor p-4"></div>
    </>
  );
}
