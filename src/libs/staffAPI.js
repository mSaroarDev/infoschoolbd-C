import { getBaseUrl } from "../utils/getBaseUrl";

const baseUrl = getBaseUrl();

export const createStaff = async (values) => {
  const res = await fetch(baseUrl + "/staff/create", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  return res;
};

export const getAllStaffs = async () => {
  const res = await fetch(baseUrl + "/staff/all", {
    credentials: "include",
  });

  return res;
};

export const getASatff = async (id) => {
  const res = await fetch(baseUrl + "/staff/" + id, {
    credentials: "include",
  });

  return res;
};

export const deleteStaff = async (id) => {
  const res = await fetch(baseUrl + "/staff/delete/" + id, {
    method: "DELETE",
    credentials: "include",
  });

  return res;
};

export const editStaff = async (id, values) => {
  const res = await fetch(baseUrl + "/staff/edit/" + id, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  return res;
};
