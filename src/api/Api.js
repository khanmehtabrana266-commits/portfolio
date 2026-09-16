import axios from "axios";

const API_URL = "http://localhost:3008";

export const addContact = async (data) => {
  const response = await axios.post(
    `${API_URL}/contact`,
    {
        "senderEmail":data.email,
    "message":data.message,
    "senderName":data.name
    }
  );

  return response.data;
};