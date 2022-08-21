import axios from "axios";

export const register = async (user) =>
  await axios.post(`http://localhost:8000/api/register`, user);

export const login = async (user) =>
  await axios.post(`http://localhost:8000/api/login`, user);

export const registerTeacher = async (user) =>
  await axios.post(`http://localhost:8000/api/register/teacher`, user);

export const loginTeacher = async (user) =>
  await axios.post(`http://localhost:8000/api/login/teacher`, user);

export const updateUserInLocalStorage = (user, next) => {
  if (window.localStorage.getItem("auth")) {
    let auth = JSON.parse(localStorage.getItem("auth"));
    auth.teacher = user;
    localStorage.setItem("auth", JSON.stringify(auth));
    next();
  }
};
