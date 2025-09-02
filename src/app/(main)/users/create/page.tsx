"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUser } from "@/app/actions/users";

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
    router.push("/users"); 
  };

  console.log('create page')

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded border border-zinc-200">
      <h1 className="text-xl font-bold mb-4">Create User</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="border border-zinc-200 p-2 rounded w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="IIN"
          className="border border-zinc-200 p-2 rounded w-full"
          value={iin}
          onChange={(e) => setIin(e.target.value)}
        />
        <input
          type="text"
          placeholder="Name"
          className="border border-zinc-200 p-2 rounded w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border border-zinc-200 p-2 rounded w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="w-full cursor-pointer bg-blue-500 text-white py-2 rounded">
          Save
        </button>
      </form>
    </div>
  );
}
