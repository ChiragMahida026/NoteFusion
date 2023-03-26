import axios from "axios";

const API_URL = "/users";

const register = async (userData) => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
    localStorage.setItem("token", response.data.token);
  }

  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(API_URL + "/login", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
    localStorage.setItem("token", response.data.token);
    window.localStorage.setItem("isLOgging", true);
  }

  return response.data;
};

const authService = {
  register,
  login,
};

export default authService;
