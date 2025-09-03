import axios from "axios";
import Cookies from "js-cookie";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

console.log('NEEEEEEEEEEEEEEEEEEEEE', process.env.NEXT_PUBLIC_API_URL)

// instance.interceptors.request.use((config) => {
//   config.headers.Authorization = Cookies.get("token");
//   return config;
// });

export default instance;
