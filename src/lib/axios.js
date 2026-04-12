import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { "Content-Type": "application/json" },
});

// Interceptor request: sisipkan token otomatis
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error),
);

// handle  error dengan redirect
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Izinkan caller melewati handler global
    if (error.config?.skipGlobalErrorHandler) return Promise.reject(error);

    // Tangani offline / gagal koneksi
    if (!navigator.onLine || error.code === "ERR_NETWORK" || !error.response) {
      window.location.href = "/500";
      return new Promise(() => {});
    }

    const status = error.response?.status;

    // Redirect berdasarkan status code
    if (status === 401) {
      window.location.href = "/401";
      return new Promise(() => {});
    }
    if (status === 403) {
      window.location.href = "/403";
      return new Promise(() => {});
    }
    if (status >= 500) {
      window.location.href = "/500";
      return new Promise(() => {});
    }

    return Promise.reject(error);
  },
);

export default api;
