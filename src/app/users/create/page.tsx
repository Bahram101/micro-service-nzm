"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUser } from "@/app/actions/user";

export default function CreateUserPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [iin, setIin] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // await fetch("/api/users", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ email, name, password, iin }),
    // });

    await createUser({email, name, iin, password})

    router.push("/users"); // 👈 после создания отправляем обратно на список
  };

  console.log('create page')

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-xl font-bold mb-4">Create User</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="IIN"
          className="border p-2 rounded w-full"
          value={iin}
          onChange={(e) => setIin(e.target.value)}
        />
        <input
          type="text"
          placeholder="Name"
          className="border p-2 rounded w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
          Save
        </button>
      </form>
    </div>
  );
}
