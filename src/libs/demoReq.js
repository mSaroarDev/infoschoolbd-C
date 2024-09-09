import { getBaseUrl } from "../utils/getBaseUrl";
const baseUrl = getBaseUrl();

export const createDemoReq = async (values) => {
  try {
    const res = await fetch(`${baseUrl}/client/demo-req/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    return res;
  } catch (error) {
    console.log("error", error);
  }
};

export const getAllDemoReq = async (page, limit) => {
  try {
    const res = await fetch(
      `${baseUrl}/client/demo-req/all?page=${page}&limit=${limit}`,
      {
        credentials: "include",
      }
    );

    return res;
  } catch (error) {
    console.log("error", error);
  }
};

export const markDone = async (id, values) => {
  try {
    const res = await fetch(`${baseUrl}/client/demo-req/mark-done/${id}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    return res;
  } catch (error) {
    console.log("error", error);
  }
};

export const markRead = async (id) => {
  try {
    const res = await fetch(`${baseUrl}/client/demo-req/mark-read/${id}`, {
      method: "POST",
      credentials: "include",
    });

    return res;
  } catch (error) {
    console.log("error", error);
  }
};

export const getUnreadDemoReqs = async () => {
  try {
    const res = await fetch(`${baseUrl}/client/demo-req/unread-count`, {
      method: "GET",
      credentials: "include",
    });

    return res;
  } catch (error) {
    console.log("error", error);
  }
};
