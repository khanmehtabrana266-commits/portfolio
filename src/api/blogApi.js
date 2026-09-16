const API_URL = "http://localhost:3008/blog";

/* ========================================
   GET TOKEN
======================================== */

const getToken = () => {
  return localStorage.getItem("token");
};


/* ========================================
   HANDLE RESPONSE
======================================== */

const handleResponse = async (response) => {
  const contentType = response.headers.get("content-type");

  let data;

  if (contentType?.includes("application/json")) {
    data = await response.json();
  } else {
    data = await response.text();
  }

  if (!response.ok) {
    let message = "Something went wrong";

    if (Array.isArray(data?.message)) {
      message = data.message.join(", ");
    } else if (data?.message) {
      message = data.message;
    } else if (typeof data === "string" && data) {
      message = data;
    }

    throw new Error(message);
  }

  return data;
};


/* ========================================
   COMMON REQUEST
======================================== */

const apiRequest = async (url, options = {}) => {
  const token = getToken();

  const headers = {
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  return handleResponse(response);
};


/* ========================================
   GET ALL POSTS
======================================== */

export const getPosts = async () => {
  return apiRequest(API_URL, {
    method: "GET",
  });
};


/* ========================================
   GET SINGLE POST
======================================== */

export const getPostById = async (id) => {
  return apiRequest(`${API_URL}/${id}`, {
    method: "GET",
  });
};


/* ========================================
   CREATE POST
======================================== */

export const createPost = async (postData) => {
  return apiRequest(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  });
};


/* ========================================
   UPDATE POST
======================================== */

export const updatePost = async (id, postData) => {
  return apiRequest(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  });
};


/* ========================================
   DELETE POST
======================================== */

export const deletePost = async (id) => {
  return apiRequest(`${API_URL}/${id}`, {
    method: "DELETE",
  });
};


/* ========================================
   EXPORT DEFAULT
======================================== */

const blogApi = {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};

export default blogApi;