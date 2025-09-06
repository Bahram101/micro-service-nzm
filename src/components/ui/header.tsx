"use client";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export const Header = () => {
  const router = useRouter();
  const onLogout = () => {
    Cookies.remove("token", { path: "/" });
    router.push("/login");
  };

  return (
    <div className="px-4 py-4 border-b border-zinc-200 justify-between flex">
      <div className="logo text-xl ">Микро сервис</div>
      <ul className="flex gap-3">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/posts">Post</Link>
        </li>
        <li>
          <Link href="/users">User</Link>
        </li>
        <li>
          <Link href="/todos">Todos</Link>
        </li>
        <li>
          {/* кнопка logout */}
          <button onClick={onLogout} className="hover:underline cursor-pointer">
            Выйти
          </button>
        </li>
      </ul>
    </div>
  );
};
