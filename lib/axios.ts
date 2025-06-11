import axios from "axios";

const api = axios.create({
  baseURL: "/api", // adjust if using external URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
