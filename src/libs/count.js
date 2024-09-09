import { getBaseUrl } from "../utils/getBaseUrl";
const baseUrl = getBaseUrl();

//  get income list
export const countDocuments = async () => {
  try {
    const res = await fetch(baseUrl + `/stats/count`, {
      method: "GET",
      credentials: "include",
    });

    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

//  get bank balance
export const calculate = async () => {
  try {
    const res = await fetch(baseUrl + `/stats/calculate`, {
      method: "GET",
      credentials: "include",
    });

    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};
