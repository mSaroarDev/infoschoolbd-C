import { getBaseUrl } from "../utils/getBaseUrl";

const baseUrl = getBaseUrl();

export const login = async (values) => {
  const res = await fetch(baseUrl + "/user/login", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  return res;
};

export const logout = async () => {
  const res = await fetch(baseUrl + "/user/logout", {
    method: "POST",
    credentials: "include",
  });

  return res;
};
