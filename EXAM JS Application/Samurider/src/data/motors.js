import { get, post,put, del  } from "./api.js";

const endpoints = {
  motorcycles: "/data/motorcycles?sortBy=_createdOn%20desc",
  byId: "/data/motorcycles/",
  create: "/data/motorcycles",
  search: (query) => `/data/motorcycles?where=model%20LIKE%20%22${query}%22`,
};
export async function getAllMotors() {
  return get(endpoints.motorcycles);
}

export async function getById(id) {
  return get(endpoints.byId + id);
}

export async function createMotor(motor) {
  return post(endpoints.create, motor);
}

export async function updateMotor(id, motor) {
  return put(endpoints.byId + id, motor);
}

export async function deleteMotor(id) {
  return del(endpoints.byId + id);
}

export async function search(query) {
  return get(endpoints.search(query));
}
