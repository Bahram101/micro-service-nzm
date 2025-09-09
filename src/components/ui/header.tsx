"use client";
import Link from "next/link";
import { useAuth } from "@/providers/AuthProvider";

export const Header = () => {
  const { user, logout } = useAuth()

  return (
    <div className="px-4 py-4 border-b border-zinc-200 justify-between flex">
      <div className="logo text-xl ">Микро сервис</div>
      <ul className="flex gap-3">
        <li>
          <Link href="/">Home</Link>
        </li>
        {user && user.role === "ADMIN" && (
          <li>
            <Link href="/admin">Админ</Link>
          </li>
        )}
        <li>
          <button onClick={logout} className=" cursor-pointer">
            Выйти
          </button>
        </li>
      </ul>
    </div>
  );
};
