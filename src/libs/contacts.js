import { getBaseUrl } from "../utils/getBaseUrl";
const baseUrl = getBaseUrl();

export const createContact = async (values) => {
  try {
    const res = await fetch(`${baseUrl}/client/contacts/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    return res;
  } catch (error) {
    console.log("error", error);
  }
};

export const getAllContacts = async (page, limit) => {
  try {
    const res = await fetch(
      `${baseUrl}/client/contacts/all?page=${page}&limit=${limit}`,
      {
        credentials: "include",
      }
    );

    return res;
  } catch (error) {
    console.log("error", error);
  }
};

export const getContactDetails = async (id) => {
  try {
    const res = await fetch(`${baseUrl}/client/contacts/${id}`, {
      credentials: "include",
    });

    return res;
  } catch (error) {
    console.log("error", error);
  }
};

export const markRead = async (id) => {
  try {
    const res = await fetch(`${baseUrl}/client/contacts/mark-read/${id}`, {
      credentials: "include",
    });

    return res;
  } catch (error) {
    console.log("error", error);
  }
};

export const getUnreadCount = async () => {
  try {
    const res = await fetch(`${baseUrl}/client/contacts/unread-count`, {
      credentials: "include",
    });

    return res;
  } catch (error) {
    console.log("error", error);
  }
};
