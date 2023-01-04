import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:9000" });

export const logIn = (formData) => API.post("/api/auth/login", formData);

export const signUp = (formData) => API.post("/api/auth/signup", formData);
