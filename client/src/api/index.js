import axios from "axios";
import { LOCAL_NAME } from "../constants/Global";
const API = axios.create({ baseURL: "https://dpic-app.herokuapp.com/" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem(LOCAL_NAME)) {
    req.headers.authorization = `Bearer ${JSON.parse(
      localStorage.getItem(LOCAL_NAME)
    )}`;
  }
  return req;
});

export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery) =>
  API.get(`/posts/search?searchQuery=${searchQuery}`);
export const createPost = (value) => API.post("/posts", value);
export const updatePost = (value) =>
  API.patch(`/posts/${value.id}`, value.value);
export const likePost = (id) => API.patch(`/posts/${id}/likepost`);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const commentPost = (value) =>
  API.post(`/posts/${value.id}/commentpost`, value.value);

export const fetchLibPosts = () => API.get("/posts/libposts");

export const signin = (value) => API.post("/auth/signin", value);
export const signup = (value) => API.post("/auth/signup", value);
export const fetchUser = () => API.get("/auth");
export const fetchAllUser = () => API.get("/auth/getall");

export const fetchPhotos = () => API.get("/photos");
export const createPhoto = (value) => API.post("/photos", value);
export const deletePhoto = (id) => API.delete(`/photos/${id}`);
export const updatePhoto = (value) =>
  API.patch(`/photos/${value.id}`, value.value);

export const fetchCategories = () => API.get("/categories");
export const createCategory = (value) => API.post("/categories", value);
export const updateCategory = (value) =>
  API.patch(`/categories/${value.id}`, value.value);
export const deleteCategory = (id) => API.delete(`/categories/${id}`);

export const fetchExhPosts = (page) => API.get(`/exhibitionposts?page=${page}`);
export const fetchPrivateExhPosts = () => API.get("/exhibitionposts/private");
export const createExhPost = (value) => API.post("/exhibitionposts", value);
export const updateExhPost = (value) =>
  API.patch(`/exhibitionposts/${value.id}`, value.value);
export const likeExhPost = (id) => API.patch(`/exhibitionposts/${id}/likepost`);
export const deleteExhPost = (id) => API.delete(`/exhibitionposts/${id}`);
export const commentExhPost = (value) =>
  API.post(`/exhibitionposts/${value.id}/comment`, value.value);

export const fetchNotify = () => API.get("/notify");
export const createNotify = (value) => API.post("/notify", value);
export const updateNotify = (value) =>
  API.patch(`/notify/${value.id}`, value.value);
export const deleteNotify = (id) => API.delete(`/notify/${id}`);
export const seenNotify = (id) => API.patch(`/notify/${id}/seen`);

export const fetchExhibition = () => API.get("/exhibition");
export const createExhibition = (value) => API.post("/exhibition", value);
export const updateExhibition = (value) =>
  API.patch(`/exhibition/${value.id}`, value.value);
export const deleteExhibition = (id) => API.delete(`/exhibition/${id}`);

export const fetchAdvertises = () => API.get("/advertises");
export const createAdvertise = (value) => API.post("/advertises", value);
export const updateAdvertise = (value) =>
  API.patch(`/advertises/${value.id}`, value.value);
export const deleteAdvertise = (id) => API.delete(`/advertises/${id}`);
