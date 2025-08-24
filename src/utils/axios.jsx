import axios from "axios";

const getAccessToken = () => localStorage.getItem("accessToken");
const getRefreshToken = () => localStorage.getItem("refreshToken");

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = getRefreshToken();
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/lammoiaccesstoken`,
          {
            refreshToken,
          }
        );

        localStorage.setItem("accessToken", res.data.data.accessToken);

        originalRequest.headers.Authorization = `Bearer ${res.data.data.accessToken}`;

        return api(originalRequest);
      } catch (err) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/dangnhap";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
