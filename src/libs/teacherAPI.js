import { getBaseUrl } from "../utils/getBaseUrl";

const baseUrl = getBaseUrl();

export const createTeacher = async (values) => {
  const res = await fetch(baseUrl + "/teacher/create", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  // const data = await res.json();
  return res;
};

export const getAllTeachers = async () => {
  const res = await fetch(baseUrl + "/teacher/all", {
    credentials: "include",
  });

  // const data = await res.json();
  return res;
};

// get teachers by school id
export const getAllTeachersBySchoolId = async (schoolId) => {
  const res = await fetch(baseUrl + "/teacher/by-school" + schoolId, {
    credentials: "include",
  });

  // const data = await res.json();
  return res;
};

export const getATeacher = async (id) => {
  const res = await fetch(baseUrl + "/teacher/" + id, {
    credentials: "include",
  });

  // const data = await res.json();
  return res;
};

export const deleteTeacher = async (id) => {
  const res = await fetch(baseUrl + "/teacher/delete/" + id, {
    method: "DELETE",
    credentials: "include",
  });

  // const data = await res.json();
  return res;
};

export const editTeacher = async (id, values) => {
  const res = await fetch(baseUrl + "/teacher/edit/" + id, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  return res;
};
