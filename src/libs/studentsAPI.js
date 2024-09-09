import { getBaseUrl } from "../utils/getBaseUrl";

const baseUrl = getBaseUrl();

export const createStudent = async (values) => {
  const res = await fetch(baseUrl + "/student/create", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  return res;
};

export const getAllStudent = async (page, limit) => {
  const res = await fetch(
    baseUrl + `/student/all?page=${page}&limit=${limit}`,
    {
      credentials: "include",
    }
  );

  return res;
};

export const getAllStudentByClass = async (page, limit, classe) => {
  const res = await fetch(
    baseUrl + `/student/list?class=${classe}&page=${page}&limit=${limit}`,
    {
      credentials: "include",
    }
  );

  return res;
};

export const getAStudent = async (id) => {
  const res = await fetch(baseUrl + "/student/" + id, {
    credentials: "include",
  });

  return res;
};

export const deleteStudent = async (id) => {
  const res = await fetch(baseUrl + "/Student/delete/" + id, {
    method: "DELETE",
    credentials: "include",
  });

  return res;
};

export const editStudent = async (id, values) => {
  const res = await fetch(baseUrl + "/Student/edit/" + id, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  return res;
};

export const getStudentStats = async (classe) => {
  const res = await fetch(baseUrl + `/student/stats?class=${classe}`, {
    credentials: "include",
  });

  return res;
};

export const promoteOrDemoteStudent = async (id, values) => {
  const res = await fetch(baseUrl + "/Student/change-class/" + id, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  return res;
};
