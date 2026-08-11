import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

//POST request
export const postData = async (url, formData) => {
  try {
    const params = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post(apiUrl + url, formData, params);

    return response.data; // success case
  } catch (error) {
    // Always return backend message
    return {
      success: false,
      error: true,
      message: error.response?.data?.message || "Something went wrong",
    };
  }
};

// GET request
export const fetchDataFromApi = async (url) => {
  try {
    const params = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(apiUrl + url, params);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// upload profile image
export const uploadImage = async (url, updatedData) => {
  const params = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      "Content-Type": "multipart/form-data",
    },
  };

  var response;
  await axios.put(apiUrl + url, updatedData, params).then((res) => {
    response = res;
  });
  return response;
};

// Upload and create category
export const uploadImageAndCreateCategory = async (url, formData) => {
  const params = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      "Content-Type": "multipart/form-data",
    },
  };
  const response = await axios.post(apiUrl + url, formData, params);
  return response.data;
};

//edit data
export const editData = async (url, updatedData) => {
  const params = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      "Content-Type": "application/json",
    },
  };

  var response;
  await axios.put(apiUrl + url, updatedData, params).then((res) => {
    response = res;
  });
  return response;
};

// Delete data
export const deleteData = async (url) => {
  const params = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      "Content-Type": "application/json",
    },
  };
  const { data } = await axios.delete(apiUrl + url, params);
  return data;
};

export const deleteMultipleData = async (url, ids) => {
  try {
    if (!Array.isArray(ids) || ids.length === 0)
      throw new Error("IDs must be a non-empty array");

    const params = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
      data: { ids }, // THIS IS THE CRUCIAL PART
    };

    // The request must be: axios.delete(url, { data, headers })
    const { data } = await axios.delete(apiUrl + url, params);
    return data;
  } catch (error) {
    return {
      success: false,
      error: true,
      message: error.response?.data?.message || "Something went wrong",
    };
  }
};
