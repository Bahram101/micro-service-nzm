"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

type AuthContextType = {
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {

  const router = useRouter();

  // useEffect(() => {
  //   const savedToken = localStorage.getItem("token");
  //   const savedUser = localStorage.getItem("user");
  //   if (savedToken && savedUser) {
  //     setToken(savedToken);
  //     setUser(JSON.parse(savedUser));
  //   }
  // }, []);

  // const login = (email: string, token: string) => {
  //   setUser({ email });
  //   setToken(token);
  //   localStorage.setItem("token", token);
  //   localStorage.setItem("user", JSON.stringify({ email }));
  //   router.push("/");
  // };

  const logout = () => {
    Cookies.remove("token", { path: "/" });
    window.location.href = "/auth/login";
  };

  return (
    <AuthContext.Provider value={{ logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
