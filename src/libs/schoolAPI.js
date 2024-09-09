import { getBaseUrl } from "../utils/getBaseUrl";

const baseUrl = getBaseUrl();

export const createSchool = async (values) => {
  try {
    const res = await fetch(`${baseUrl}/school/create`, {
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

export const getAllSchools = async (page, limit) => {
  try {
    const res = await fetch(
      `${baseUrl}/school/all?page=${page}&limit=${limit}`,
      {
        credentials: "include",
      }
    );

    return res;
  } catch (error) {
    console.log("error", error);
  }
};

// get all schools without login
export const getAllSchoolsWithoutLogin = async (page, limit) => {
  try {
    const res = await fetch(
      `${baseUrl}/client/school/all?page=${page}&limit=${limit}`,
      {
        credentials: "include",
      }
    );

    return res;
  } catch (error) {
    console.log("error", error);
  }
};

// fecht for install
export const getAllSchoolsInstall = async (page, limit) => {
  try {
    const res = await fetch(
      `${baseUrl}/install/all-schools?page=${page}&limit=${limit}`
    );

    return res;
  } catch (error) {
    console.log("error", error);
  }
};

export const deleteSchool = async (id) => {
  try {
    const res = await fetch(`${baseUrl}/school/delete/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    return res;
  } catch (error) {
    console.log("error", error);
  }
};

export const getSchoolById = async (id) => {
  try {
    const res = await fetch(`${baseUrl}/school/${id}`, {
      credentials: "include",
    });

    return res;
  } catch (error) {
    console.log("error", error);
  }
};

export const getMySchool = async () => {
  try {
    const res = await fetch(`${baseUrl}/school/myschool`, {
      credentials: "include",
    });

    return res;
  } catch (error) {
    console.log("error", error);
  }
};

export const editSchool = async (id, values) => {
  try {
    const res = await fetch(`${baseUrl}/school/edit/${id}`, {
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

export const updateSchool = async (id, values) => {
  try {
    const res = await fetch(`${baseUrl}/school/update/${id}`, {
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

export const updateWebsite = async (id, values) => {
  try {
    const res = await fetch(`${baseUrl}/school/update-website/${id}`, {
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

export const updateAbout = async (values) => {
  try {
    const res = await fetch(`${baseUrl}/school/update-about`, {
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

export const updateAccess = async (id, values) => {
  try {
    const res = await fetch(`${baseUrl}/school/access/${id}`, {
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

// update admission settings
export const updateAdmissionSettings = async (values) => {
  try {
    const res = await fetch(`${baseUrl}/school/update-admission-settings`, {
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

// update admission settings
export const updateHeadTeacher = async (values) => {
  try {
    const res = await fetch(`${baseUrl}/school/update-head-teacher-bani`, {
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

// update school photos
export const updatePhotos = async (values) => {
  try {
    const res = await fetch(`${baseUrl}/school/update-photos`, {
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

// update social links
export const updateSocialLinks = async (values) => {
  try {
    const res = await fetch(`${baseUrl}/school/update/social`, {
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
