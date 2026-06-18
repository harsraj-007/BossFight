const BASE_URL = import.meta.env.VITE_API_URL;
// const BASE_URL = "http://localhost:5000";

export const getToken = () => {
  return localStorage.getItem("token");
};

export const authHeaders = () => {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  };
};

export default BASE_URL;

