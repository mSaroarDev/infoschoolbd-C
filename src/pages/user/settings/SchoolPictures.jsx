import { ArrowLeft, CheckCircle } from "lucide-react";
import PageHeader from "../../../components/PageHeader";
import { useNavigate } from "react-router-dom";
import SchoolPicture from "../../../components/SchoolPicture";
import { useEffect, useState } from "react";
import { showError, showSuccess } from "../../../utils/toastMessage";
import fileUpload from "../../../libs/file-upload";
import { getMySchool, updatePhotos } from "../../../libs/schoolAPI";
import Spinner from "./../../../components/spinner/Spinner";

export default function SchoolPictures() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // image upload
  const [imgUrl, setImgUrl] = useState([]);
  const handleChange = async (e) => {
    setLoading(true);
    try {
      const image = e.target.files[0];
      const fileSizeInKb = parseInt(image.size) / 1024;
      if (fileSizeInKb > 1024) {
        return showError("FileSize must be less than 1 MB");
      }
      const allowedTypes = ["image/jpeg", "image/png"];
      if (!allowedTypes.includes(image.type)) {
        return showError("Please select jpg or png image only");
      }

      // image upload to server
      setLoading(true);
      const res = await fileUpload(image);
      const file = await res.json();
      setLoading(false);
      if (res.ok) {
        // formik.setFieldValue("image", file.url);
        setImgUrl([...imgUrl, file.url]);
      }
    } catch (error) {
      showError("Image Upload Failed");
    } finally {
      setLoading(false);
    }
  };

  // delete the image
  const handleDelete = (image) => {
    const remainingImage = imgUrl && imgUrl.filter((img) => img !== image);
    setImgUrl(remainingImage);
  };

  // post photos
  const handleSubmit = async () => {
    setLoading(true);
    const res = await updatePhotos(imgUrl);

    setLoading(false);
    if (res.ok) {
      showSuccess("Photos Updated");
      navigate(-1);
    } else {
      showError("Photo no updated");
    }
  };

  // get existing photos
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

  useEffect(() => {
    setImgUrl(data?.pictures || []);
  }, [data]);

  return (
    <>
      {loading && <Spinner />}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="bg-[#292929] text-white px-6 py-2 rounded flex items-center gap-2 w-fit mb-3"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>ফিরুন</span>
        </button>

        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-6 py-2 rounded flex items-center gap-2 w-fit mb-3"
        >
          <CheckCircle className="w-4 h-4" />
          <span>আপডেট করুন</span>
        </button>
      </div>

      <div className="border border-borderColor rounded-md overflow-hidden">
        <div className="bg-lightBg px-4 py-2">
          <PageHeader text="প্রতিষ্ঠানের ছবি" />
        </div>

        <div className="p-5">
          <div className="grid grid-cols-12 gap-5">
            {imgUrl &&
              imgUrl.map((img, i) => (
                <SchoolPicture
                  key={i}
                  data={img}
                  index={i}
                  handleDelete={() => handleDelete(img)}
                />
              ))}

            {/* new photo upload */}
            {imgUrl?.length < 5 && (
              <div className="col-span-12 md:col-span-6 lg:col-span-4 flex flex-col border border-borderColor border-dashed">
                <div className="flex items-center justify-center w-full h-full cursor-pointer">
                  <label
                    htmlFor="dropzone-file"
                    className="flex items-center justify-center overflow-hidden"
                  >
                    <>
                      <div className="flex flex-col items-center justify-center pt-5 pb-6 cursor-pointer">
                        <svg
                          className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">আপলোড পিকচার</span>
                        </p>
                      </div>
                    </>
                    <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      onChange={handleChange}
                    />
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
