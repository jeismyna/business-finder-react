import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : "http://localhost:8181/api",
})

export const login = async (user) => {
  try {
    const { data } = await api.post(`/users/login`, user);
    return data;
  } catch (error) {
    console.log(error);
    return Promise.reject(error.message);
  }
};

export const signup = async (normalizedUser) => {
  try {
    const { data } = await api.post(`/users`, normalizedUser);
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const getUserData = async (userId) => {
  try {
    const { data } = await api.get(`/users/${userId}`);
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};
