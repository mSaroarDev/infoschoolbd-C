import { getBaseUrl } from "../utils/getBaseUrl";

const baseUrl = getBaseUrl();

export const createClass = async (values) => {
  try {
    const res = await fetch(`${baseUrl}/class/create`, {
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

export const editClass = async (id, values) => {
  try {
    const res = await fetch(`${baseUrl}/class/edit/${id}`, {
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

export const getAllClasses = async (page, limit) => {
  try {
    const res = await fetch(
      `${baseUrl}/class/all?page=${page}&limit=${limit}`,
      {
        credentials: "include",
      }
    );

    return res;
  } catch (error) {
    console.log("error", error);
  }
};

export const getClassDetails = async (id) => {
  try {
    const res = await fetch(`${baseUrl}/class/${id}`, {
      credentials: "include",
    });

    return res;
  } catch (error) {
    console.log("error", error);
  }
};

// delte notice
export const deleteClass = async (id) => {
  try {
    const res = await fetch(`${baseUrl}/class/delete/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    return res;
  } catch (error) {
    console.log("error", error);
  }
};
