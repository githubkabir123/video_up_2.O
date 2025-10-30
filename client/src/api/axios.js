import axios from 'axios';


const baseUrl = import.meta.env.VITE_BASEURL ;
console.log("Base URL:", baseUrl);
const API = axios.create({
  baseURL: `${baseUrl}/api`,
});
console.log("Base URL:", API.defaults.baseURL);
// Add token to every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
