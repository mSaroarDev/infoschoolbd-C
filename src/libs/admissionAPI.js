import { getBaseUrl } from "../utils/getBaseUrl";
const baseUrl = getBaseUrl();

// fecht for install
export const getAllApplications = async (page, limit) => {
  try {
    const res = await fetch(
      `${baseUrl}/client/admission/all?page=${page}&limit=${limit}`,
      {
        credentials: "include",
      }
    );

    return res;
  } catch (error) {
    console.log("error", error);
  }
};

// get admission info
export const getAdmission = async (id) => {
  try {
    const res = await fetch(baseUrl + "/client/admission/" + id, {
      method: "GET",
    });

    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// review admission form
export const reviewAdmissionForm = async (id, m) => {
  try {
    const res = await fetch(
      `${baseUrl}/client/admission/review-admission/${id}`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: m }),
      }
    );

    return res;
  } catch (error) {
    console.log("error", error);
  }
};

// review admission form
export const deleteAdmissionForm = async (id) => {
  try {
    const res = await fetch(`${baseUrl}/client/admission/delete/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    return res;
  } catch (error) {
    console.log("error", error);
  }
};
