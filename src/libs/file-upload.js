import { getBaseUrl } from "../utils/getBaseUrl";
const baseUrl = getBaseUrl();

const fileUpload = async (file) => {
  try {
    const data = new FormData();
    data.append("image", file);
    const res = await fetch(baseUrl + "/image-upload", {
      method: "POST",
      credentials: "include",
      body: data,
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

export default fileUpload;
