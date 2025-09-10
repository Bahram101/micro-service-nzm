"use client";

import axios from "axios";
import Cookies from "js-cookie";

const clientInstance = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_API_URL_PROD,
  withCredentials: true,
});

clientInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      Cookies.remove("token", { path: "/" });
      location.href = "/auth/login";
    }
    return Promise.reject(error);
  }
);

export default clientInstance;
