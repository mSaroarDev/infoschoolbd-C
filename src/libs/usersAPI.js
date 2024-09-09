import { getBaseUrl } from "../utils/getBaseUrl";

const baseUrl = getBaseUrl();

export const createUser = async (values) => {
  const res = await fetch(baseUrl + "/user/create", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  const data = await res.json();
  return data;
};

export const updateUser = async (id, values) => {
  const res = await fetch(baseUrl + "/user/update/" + id, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  return res;
};

export const allUsers = async (page, limit) => {
  const res = await fetch(`${baseUrl}/user/all?page=${page}&limit=${limit}`, {
    method: "GET",
    credentials: "include",
  });
  return res;
};

export const auserInfo = async (id) => {
  const res = await fetch(`${baseUrl}/user/` + id, {
    method: "GET",
    credentials: "include",
  });
  return res;
};

export const deleteUser = async (id) => {
  const res = await fetch(`${baseUrl}/user/delete/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  return res;
};

export const getUsersBySchool = async (schoolId) => {
  const res = await fetch(`${baseUrl}/user/school/${schoolId}`, {
    credentials: "include",
  });
  return res;
};

export const terminateAccess = async (id) => {
  const res = await fetch(baseUrl + "/user/terminate-access/" + id, {
    method: "POST",
    credentials: "include",
  });

  return res;
};

export const grantAccess = async (id) => {
  const res = await fetch(baseUrl + "/user/grant-access/" + id, {
    method: "POST",
    credentials: "include",
  });

  return res;
};

export const getUserInfoByEmail = async (email) => {
  const res = await fetch(`${baseUrl}/user/user-by-email?email=` + email, {
    method: "GET",
    credentials: "include",
  });
  return res;
};

export const changePassword = async (values) => {
  const res = await fetch(baseUrl + "/user/change-password", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  return res;
};

export const updateProfile = async (values) => {
  const res = await fetch(baseUrl + "/user/update-profile", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  return res;
};
