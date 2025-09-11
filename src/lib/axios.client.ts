"use client";

import axios from "axios";
import { logout } from "./auth.helper";

const clientInstance = axios.create({
  withCredentials: true,
});

clientInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401) {
      await logout();
    }
    return Promise.reject(error);
  }
);
export default clientInstance;
