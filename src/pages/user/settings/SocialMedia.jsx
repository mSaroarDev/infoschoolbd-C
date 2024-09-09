import { useFormik } from "formik";
import { ThumbsUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import BackButton from "../../../components/BackButton";
import PageHeader from "../../../components/PageHeader";
import Spinner from "../../../components/spinner/Spinner";
import { getMySchool, updateSocialLinks } from "../../../libs/schoolAPI";
import { showError, showSuccess } from "../../../utils/toastMessage";

export default function SocialMedia() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //   fetch old data
  // get the existing data
  const [data, setData] = useState();
  const getData = async () => {
    setLoading(true);
    const res = await getMySchool();

    setLoading(false);
    if (res.ok) {
      const data = await res.json();
      setData(data.data);
    } else {
      console.log(res);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // formik
  const formik = useFormik({
    initialValues: {
      facebook: "",
      linkedin: "",
      twitter: "",
      whatsapp: "",
      others: "",
    },
    onSubmit: async (values) => {
      Swal.fire({
        title: "Confirmation",
        text: "Are you sure you want to update?",
        confirmButtonText: "Yes Confirm",
        confirmButtonColor: "#3182ce",
        icon: "question",
        showCancelButton: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            setLoading(true);
            const res = await updateSocialLinks(values);
            if (res.ok) {
              showSuccess("Success");
              navigate(-1);
            } else {
              showError("Failed");
            }
          } catch (error) {
            showError("Internal Server Error");
          } finally {
            setLoading(false);
          }
        }
      });
    },
  });

  console.log("data", data);

  useEffect(() => {
    formik.setValues({
      facebook: data?.social_links?.facebook,
      linkedin: data?.social_links?.linkedin,
      twitter: data?.social_links?.twitter,
      whatsapp: data?.social_links?.whatsapp,
      others: data?.social_links?.others,
    });
  }, [data]);

  return (
    <>
      {loading && <Spinner />}
      <BackButton />
      <div className="_social-media-links">
        <PageHeader icon={<ThumbsUp />} text="সোসিয়াল মিডিয়া লিংকস" />
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-2 mt-5 w-1/2 border border-borderColor p-7 rounded-md"
        >
          <div className="flex items-center gap-5">
            <label className="whitespace-nowrap w-1/3">Facebook:</label>
            <input
              type="text"
              id="facebook"
              name="facebook"
              onChange={formik.handleChange}
              value={formik.values.facebook}
              placeholder="https://facebook.com/example-url"
            />
          </div>

          <div className="flex items-center gap-5">
            <label className="whitespace-nowrap w-1/3">Twitter:</label>
            <input
              type="text"
              id="twitter"
              name="twitter"
              onChange={formik.handleChange}
              value={formik.values.twitter}
              placeholder="https://twitter.com/example-url"
            />
          </div>

          <div className="flex items-center gap-5">
            <label className="whitespace-nowrap w-1/3">Whatsapp No:</label>
            <input
              type="text"
              id="whatsapp"
              name="whatsapp"
              onChange={formik.handleChange}
              value={formik.values.whatsapp}
              placeholder="017********"
            />
          </div>

          <div className="flex items-center gap-5">
            <label className="whitespace-nowrap w-1/3">Linked In:</label>
            <input
              type="text"
              id="linkedin"
              name="linkedin"
              onChange={formik.handleChange}
              value={formik.values.linkedin}
              placeholder="https://linkedin.com/example-url"
            />
          </div>

          <div className="flex items-center gap-5">
            <label className="whitespace-nowrap w-1/3">Others (if any):</label>
            <input
              type="text"
              id="others"
              name="others"
              onChange={formik.handleChange}
              value={formik.values.others}
              placeholder=""
            />
          </div>

          <button className="button-dark w-fit ms-auto" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
