const API_URL = "http://localhost:3008/blog";



const getToken = () => {
  return localStorage.getItem("token");
};




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




export const getPosts = async () => {
  return apiRequest(API_URL, {
    method: "GET",
  });
};




export const getPostById = async (id) => {
  return apiRequest(`${API_URL}/${id}`, {
    method: "GET",
  });
};





export const createPost = async (postData) => {
  return apiRequest(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: postData.title,
      description: postData.description,
      url: postData.url,
    }),
  });
};




export const updatePost = async (id, postData) => {
  return apiRequest(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: postData.title,
      description: postData.description,
      url: postData.url,
    }),
  });
};




export const uploadImage = async (imageFile) => {
  const formData = new FormData();

  formData.append("image", imageFile);

  return apiRequest(`${API_URL}/upload`, {
    method: "POST",
    body: formData,
  });
};



export const uploadPdf = async (pdfFile) => {
  const formData = new FormData();

  formData.append("pdf", pdfFile);

  return apiRequest(`${API_URL}/upload`, {
    method: "POST",
    body: formData,
  });
};



export const deletePost = async (id) => {
  return apiRequest(`${API_URL}/${id}`, {
    method: "DELETE",
  });
};




const blogApi = {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  uploadImage,
  uploadPdf,
  deletePost,
};

export default blogApi;