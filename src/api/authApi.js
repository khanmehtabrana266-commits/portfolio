const API_URL = "http://localhost:3008/users";

// ==============================
// HANDLE RESPONSE
// ==============================

const handleResponse = async (response) => {
let data;

try {
data = await response.json();
} catch {
data = {
message: "Invalid response from server.",
};
}

// Error response handle
if (!response.ok) {
const message = Array.isArray(data?.message)
? data.message.join(", ")
: data?.message ||
`Request failed with status ${response.status}`;


const error = new Error(message);

error.status = response.status;
error.data = data;

throw error;


}

return data;
};

// ==============================
// API FETCH WITH TOKEN
// ==============================

export const apiFetch = async (url, options = {}) => {
// LocalStorage se token
const token = localStorage.getItem("token");

const headers = {
...options.headers,
};

// Content-Type automatically add
if (!headers["Content-Type"]) {
headers["Content-Type"] = "application/json";
}

// ==============================
// AUTOMATIC TOKEN
// ==============================

if (token) {
headers.Authorization = `Bearer ${token}`;
}

const response = await fetch(url, {
...options,
headers,
});

return handleResponse(response);
};

// ==============================
// SIGN UP
// ==============================

export const signupUser = async (userData) => {
const response = await fetch(
`${API_URL}/register`,
{
method: "POST",


  headers: {
    "Content-Type": "application/json",
  },

  body: JSON.stringify(userData),
}


);

return handleResponse(response);
};

// ==============================
// VERIFY OTP
// ==============================

export const verifyOtp = async (otpData) => {
const response = await fetch(
`${API_URL}/verify-otp`,
{
method: "POST",


  headers: {
    "Content-Type": "application/json",
  },

  body: JSON.stringify(otpData),
}


);

return handleResponse(response);
};

// ==============================
// SIGN IN
// ==============================

export const signinUser = async (loginData) => {
const response = await fetch(
`${API_URL}/login`,
{
method: "POST",


  headers: {
    "Content-Type": "application/json",
  },

  body: JSON.stringify(loginData),
}


);

const data = await handleResponse(response);

// ==============================
// GET TOKEN FROM BACKEND RESPONSE
// ==============================

const token =
data?.access_token ||
data?.accessToken ||
data?.token ||
data?.data?.access_token ||
data?.data?.accessToken ||
data?.data?.token;

// ==============================
// SAVE TOKEN
// ==============================

if (token) {
localStorage.setItem("token", token);
} else {
console.warn(
"Login successful but token was not found in backend response."
);
}

return data;
};

// ==============================
// LOGOUT
// ==============================

export const logoutUser = () => {
localStorage.removeItem("token");
};

// ==============================
// GET SAVED TOKEN
// ==============================

export const getToken = () => {
return localStorage.getItem("token");
};

// ==============================
// CHECK LOGIN STATUS
// ==============================

export const isLoggedIn = () => {
const token = localStorage.getItem("token");

return !!token;
};
