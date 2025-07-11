import axios from 'axios';


const baseUrl = import.meta.env.VITE_BASEURL ;
const API = axios.create({
  baseURL: `${baseUrl}/api`,
});

// Add token to every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
