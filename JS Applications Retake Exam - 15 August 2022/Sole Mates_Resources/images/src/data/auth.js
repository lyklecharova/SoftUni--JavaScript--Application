import { clearUserData, setUserData } from "../util.js";
import { get, post } from "./api.js";

const endpoints = {
  login: "/users/login",
  register: "/users/register",
  logout: "/users/logout",
};

export async function login(email, password) {
  const result = await post(endpoints.login, { email, password });
  setUserData(result);
}

export async function register(email, password) {
  const result = await post(endpoints.register, { email, password });
  setUserData(result);
}

export async function logout() {
  get(endpoints.logout);
  clearUserData();
}
