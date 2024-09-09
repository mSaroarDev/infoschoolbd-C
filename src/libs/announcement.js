import { getBaseUrl } from "../utils/getBaseUrl";

const baseUrl = getBaseUrl();

export const createAnnouncement = async (values) => {
  try {
    const res = await fetch(`${baseUrl}/announcement/create`, {
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

// export const editmessage = async (id, values) => {
//   try {
//     const res = await fetch(`${baseUrl}/message/edit/${id}`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       credentials: "include",
//       body: JSON.stringify(values),
//     });

//     return res;
//   } catch (error) {
//     console.log("error", error);
//   }
// };

export const getAllAnnouncement = async (page, limit) => {
  try {
    const res = await fetch(
      `${baseUrl}/announcement/all?page=${page}&limit=${limit}`,
      {
        credentials: "include",
      }
    );

    return res;
  } catch (error) {
    console.log("error", error);
  }
};

export const getActiveAnnouncement = async () => {
  try {
    const res = await fetch(`${baseUrl}/announcement/get-active`, {
      credentials: "include",
    });

    return res;
  } catch (error) {
    console.log("error", error);
  }
};

// delte message
export const activeToggle = async (id, values) => {
  try {
    const res = await fetch(`${baseUrl}/announcement/set-active/${id}`, {
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

// export const getmessageDetails = async (id) => {
//   try {
//     const res = await fetch(`${baseUrl}/message/${id}`, {
//       credentials: "include",
//     });

//     return res;
//   } catch (error) {
//     console.log("error", error);
//   }
// };

// // delte message
// export const deletemessage = async (id) => {
//   try {
//     const res = await fetch(`${baseUrl}/message/delete/${id}`, {
//       method: "DELETE",
//       credentials: "include",
//     });

//     return res;
//   } catch (error) {
//     console.log("error", error);
//   }
// };

// // delte message
// export const markAsRead = async (id) => {
//   try {
//     const res = await fetch(`${baseUrl}/message/mark-read/${id}`, {
//       method: "POST",
//       credentials: "include",
//     });

//     return res;
//   } catch (error) {
//     console.log("error", error);
//   }
// };

// // get unread messages
// export const getUnreadmessages = async (page, limit) => {
//   try {
//     const res = await fetch(
//       `${baseUrl}/message/get-unread?page=${page}&limit=${limit}`,
//       {
//         credentials: "include",
//       }
//     );

//     return res;
//   } catch (error) {
//     console.log("error", error);
//   }
// };
