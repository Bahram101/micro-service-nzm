// "use client";
import axios from "axios";
import Cookies from "js-cookie";
import https from "https"

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL_PROD,
  // withCredentials: true,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false, // ⚠️ отключает проверку сертификата
  }),
});

// instance.interceptors.request.use((config) => {
//   const token = Cookies.get("token");
//   console.log("TOKENN", token);
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

export default instance;
