import axios from 'axios';
import authHeader from '../services/auth.service';

const BASE_URL = "http://localhost:8000/api/"
const AUTH_URL = "http://localhost:8000/authentication_token";

const api = axios.create({
  baseURL: BASE_URL,
  headers: authHeader(),
});

let setMassage  = (message) => {console.log('--- ' + message.type, message.message)}
let tokenValide = true

api.interceptors.response.use((response) => response, (error) => {
  if(401 !== error.response.status || 'Expired JWT Token' !== error.response.data.message){
    console.log('*************', 'Hers');
    throw error;
  }
  setMassage({message: error.response.data.message, type: 'danger'})
});

export const login = (username, password, setCurrentUser) => {
  return axios
    .post(AUTH_URL, {
      username,
      password
    })
    .then(response => {
      if (response.data.token) {
        setCurrentUser(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
}

export const logout = () => {
  localStorage.removeItem("user");
}

export const setMessageHandler = (handler) => {
  setMassage = handler;
}

export default api;
