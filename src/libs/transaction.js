import { getBaseUrl } from "../utils/getBaseUrl";

const baseUrl = getBaseUrl();

//  create a new transaction
export const createTransaction = async (values) => {
  try {
    const res = await fetch(baseUrl + "/transaction/create", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

//  create a new transaction
export const createIncome = async (values) => {
  try {
    const res = await fetch(baseUrl + "/transaction/create-income", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

//  get all bank transaction
export const getMyTransactions = async (page, limit) => {
  try {
    const res = await fetch(
      baseUrl + `/transaction/get-my-trx?page=${page}&limit=${limit}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

//  get all my transaction
export const getAllMyTransactions = async (page, limit) => {
  try {
    const res = await fetch(
      baseUrl + `/transaction/get-all-trx?page=${page}&limit=${limit}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

//  get income list
export const getMyIncome = async (page, limit) => {
  try {
    const res = await fetch(
      baseUrl + `/transaction/income?page=${page}&limit=${limit}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

//  get expense list
export const getMyExpense = async (page, limit) => {
  try {
    const res = await fetch(
      baseUrl + `/transaction/expense?page=${page}&limit=${limit}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

//  get expense list
export const getSalary = async (page, limit) => {
  try {
    const res = await fetch(
      baseUrl + `/transaction/salary?page=${page}&limit=${limit}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};
