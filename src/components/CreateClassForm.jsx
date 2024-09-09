import { useFormik } from "formik";
import { showError, showSuccess } from "../utils/toastMessage";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "./spinner/Spinner";
import { createClass } from "../libs/classAPI";
import {classes} from '../data/classes'

export default function CreateClassForm() {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      class_name: ""
    },
    onSubmit: async (values) => {
        
        setLoading(true)
        const res = await createClass(values);

        setLoading(false)
        if(res.ok){
            showSuccess("Class create success")
            navigate("/user/classes?page=1")
        } else if(res.status === 406){
          showError("This class is already added")
        } else {
            showError("Class create failed")
        }

    }
  });

  return (
    <>
    {loading && <Spinner />}
      <form onSubmit={formik.handleSubmit}>
        <label>
          নোটিশ টাইটেল <span className="text-red-500">*</span>
        </label>
        <select
          type="text"
          id="class_name"
          name="class_name"
          value={formik.values.class_name}
          onChange={formik.handleChange}
          className="mb-3"
        >
            <option value="">সিলেক্ট করুন</option>
            {classes && classes.map((classe, i)=> <option className="capitalize" key={i} value={JSON.stringify(classe)}>{classe.name_en}</option>)}
        </select>
        
        <button type="submit" className="button-main">
          যুক্ত করুন
        </button>
      </form>
    </>
  );
}
