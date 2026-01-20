import axios from "axios";

const client = axios.create({
  // 🔹 Hard‑coded backend link for local dev
  baseURL: "http://127.0.0.1:8000/api",
});

// Attach token if available (skip for login/register)
client.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (
    token &&
    !config.url.includes("/login/") &&
    !config.url.includes("/register/")
  ) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default client;