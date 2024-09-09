import { getBaseUrl } from "../utils/getBaseUrl";

const baseUrl = getBaseUrl();

export const createResult = async (values) => {
  try {
    const res = await fetch(`${baseUrl}/result/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(values),
    });

    return res;
  } catch (error) {
    console.log("error", error);
  }
};

export const getAllResults = async (page, limit) => {
  try {
    const res = await fetch(
      `${baseUrl}/result/all?page=${page}&limit=${limit}`,
      {
        credentials: "include",
      }
    );

    return res;
  } catch (error) {
    console.log("error", error);
  }
};

// export const getNoticeDetails = async (id) => {
//   try {
//     const res = await fetch(`${baseUrl}/notice/${id}`, {
//       credentials: "include",
//     });

//     return res;
//   } catch (error) {
//     console.log("error", error);
//   }
// };

// // delte notice
// export const deleteNotice = async (id) => {
//   try {
//     const res = await fetch(`${baseUrl}/notice/delete/${id}`, {
//       method: "DELETE",
//       credentials: "include",
//     });

//     return res;
//   } catch (error) {
//     console.log("error", error);
//   }
// };
