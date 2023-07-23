import { get, post, put, del } from "./api.js";

const endpoints = {
  shoes: "/data/shoes?sortBy=_createdOn%20desc",
  byId: "/data/shoes/",
  create: "/data/shoes",
  search: (query) => `/data/shoes?where=brand%20LIKE%20%22${query}%22`,
};
export async function getAllShoes() {
  return get(endpoints.shoes);
}

export async function getById(id) {
  return get(endpoints.byId + id);
}

export async function createShoes(data) {
  return post(endpoints.create, data);
}

export async function updateShoes(id, data) {
  return put(endpoints.byId + id, data);
}

export async function deleteShoes(id) {
  return del(endpoints.byId + id);
}

export async function search(query) {
  return get(endpoints.search(query));
}
