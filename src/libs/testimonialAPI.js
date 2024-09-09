import { getBaseUrl } from "../utils/getBaseUrl";

const baseUrl = getBaseUrl();

export const createTestimonial = async (values) => {
  try {
    const res = await fetch(`${baseUrl}/testimonial/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(values),
    });

    return res;
  } catch (error) {
    console.log("error", error);
  }
};

export const editTestimonial = async (id, values) => {
  try {
    const res = await fetch(`${baseUrl}/testimonial/edit/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(values),
    });

    return res;
  } catch (error) {
    console.log("error", error);
  }
};

export const getAllTestimonials = async (page, limit) => {
  try {
    const res = await fetch(
      `${baseUrl}/testimonial/all?page=${page}&limit=${limit}`,
      {
        credentials: "include",
      }
    );

    return res;
  } catch (error) {
    console.log("error", error);
  }
};

export const getTestimonialDetails = async (id) => {
  try {
    const res = await fetch(`${baseUrl}/testimonial/${id}`, {
      credentials: "include",
    });

    return res;
  } catch (error) {
    console.log("error", error);
  }
};

// delte Testimonial
export const deleteTestimonial = async (id) => {
  try {
    const res = await fetch(`${baseUrl}/testimonial/delete/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    return res;
  } catch (error) {
    console.log("error", error);
  }
};
