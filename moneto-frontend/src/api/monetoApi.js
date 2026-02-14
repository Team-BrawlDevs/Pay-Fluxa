import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";

export const evaluateProfile = async (profile) => {
  const response = await axios.post(`${BASE_URL}/evaluate`, profile);
  return response.data;
};
