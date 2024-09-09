import { getBaseUrl } from "../utils/getBaseUrl";

const baseUrl = getBaseUrl();

export const createCommittee = async (values) => {
  const res = await fetch(baseUrl + "/committee/create", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  return res;
};

export const getAllCommittee = async () => {
  const res = await fetch(baseUrl + "/committee/all", {
    credentials: "include",
  });

  return res;
};

export const getACommittee = async (id) => {
  const res = await fetch(baseUrl + "/committee/" + id, {
    credentials: "include",
  });

  return res;
};

export const deleteCommittee = async (id) => {
  const res = await fetch(baseUrl + "/committee/delete/" + id, {
    method: "DELETE",
    credentials: "include",
  });

  return res;
};

export const editCommittee = async (id, values) => {
  const res = await fetch(baseUrl + "/committee/edit/" + id, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  return res;
};
