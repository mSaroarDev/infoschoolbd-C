import { useFormik } from "formik";
import { showError, showSuccess } from "../utils/toastMessage";
import { editNotice, getNoticeDetails } from "../libs/noticeAPI";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "./spinner/Spinner";

export default function EditNoticeForm() {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const {id} = useParams()

    // notice data
    const [notice, setNotice] = useState()
    const fetchNotice = async () => {
        const res = await getNoticeDetails(id)
        if(res.ok){
            const data = await res.json();
            setNotice(data.data)
        }
    }

    useEffect(()=> {
        fetchNotice()
    }, [id])

  const formik = useFormik({
    initialValues: {
      title: "",
      description: ""
    },
    onSubmit: async (values) => {
        if(!values.title){
          return showError("Notice title must be given")
        }
        
        setLoading(true)
        const res = await editNotice(id, values);

        setLoading(false)
        if(res.ok){
            showSuccess("Notice Updated")
            navigate("/user/notices?page=1")
        } else {
            showError("Notice update failed")
        }
    }
  });

  useEffect(()=> {
    formik.setValues({
        title: notice?.title,
        description: notice?.description
    })
  }, [notice])

  return (
    <>
    {loading && <Spinner />}
      <form onSubmit={formik.handleSubmit}>
        <label>
          নোটিশ টাইটেল <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          className="mb-3"
        />
        <label>
          বিস্তারিত লিখুন <span className="text-red-500">*</span>
        </label>
        <textarea
          type="text"
          id="description"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          rows={6}
        ></textarea>
        <button type="submit" className="button-main">
          পোস্ট করুন
        </button>
      </form>
    </>
  );
}
