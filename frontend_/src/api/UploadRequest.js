import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:9000" });

export const uploadImage = (data) => API.post("/api/upload", data);
