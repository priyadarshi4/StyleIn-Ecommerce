import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // NO /api/v1 here
  withCredentials: true,
});

export default api;
