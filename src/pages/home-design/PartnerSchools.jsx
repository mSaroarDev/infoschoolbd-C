import Marquee from "react-fast-marquee";
import { getAllSchoolsWithoutLogin } from "../../libs/schoolAPI";
import { useEffect, useState } from "react";
import Loader from "../../components/loader/Loader";

export default function PartnerSchools() {
  const [loading, setLoading] = useState(true);
  // get last 10 schools
  const [schools, setSchools] = useState([]);
  const fetchSchools = async () => {
    try {
      const res = await getAllSchoolsWithoutLogin(1, 10);
      if (res.ok) {
        const data = await res.json();
        setSchools(data.data);
        setLoading(false);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log("error: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchools();
  }, []);

  return (
    <>
      {loading && <Loader />}
      <div className="bg-lightBg py-5">
        <main>
          <Marquee autoFill={true} pauseOnHover={true}>
            {schools &&
              schools?.map((school) => (
                <div
                  onClick={() =>
                    window.open(school?.school_information?.web, "_blank")
                  }
                  key={school?._id}
                  className="bg-transparent text-center p-5 mx-2 rounded-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <img
                    src={school?.school_information?.logo}
                    alt={school?.name_bn}
                    className="h-[30px] w-auto"
                  />
                  <h3 className="text-base font-bold mt-1">
                    {school?.name_bn}
                  </h3>
                </div>
              ))}
          </Marquee>
        </main>
      </div>
    </>
  );
}
