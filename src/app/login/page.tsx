"use client";

import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = () => {
    document.cookie = `token=123456; path=/;`;
    router.push("/home");
  };

  return (
    <div className="bg-white p-6 rounded shadow w-80 space-y-4">
      <h1 className="text-xl font-bold text-center">Login</h1>
      <button
        onClick={handleLogin}
        className="w-full bg-blue-500 text-white py-2 rounded"
      >
        Sign in
      </button>
    </div>
  );
}
