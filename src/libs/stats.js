import { getBaseUrl } from "../utils/getBaseUrl";

const baseUrl = getBaseUrl();

export const getStats = async () => {
  const res = await fetch(baseUrl + `/stats/all`, {
    credentials: "include",
  });

  return res;
};
