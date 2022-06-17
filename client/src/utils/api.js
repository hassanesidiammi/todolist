import axios from 'axios';
import authHeader from '../services/auth.service';

const BASE_URL = "http://todo.me/api/"
const AUTH_URL = "http://todo.me/authentication_token";

const api = axios.create({
  baseURL: BASE_URL,
  headers: authHeader(),
});

export const login = (username, password) => {
  return axios
    .post(AUTH_URL, {
      username,
      password
    })
    .then(response => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
}

export const logout = () => {
  localStorage.removeItem("user");
}

export default api;
