"use client";

import Field from "@/components/ui/field/Field";
import { IAuthFormData } from "@/types/auth.interface";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { validEmail } from "./email.regex";
import { useState } from "react";

export default function LoginPage() {
  const { handleSubmit, control, reset } = useForm<IAuthFormData>({
    mode: "onChange",
    defaultValues: {
      email: undefined,
      password: undefined,
    },
  });

  const router = useRouter();
  const [message, setMessage] = useState("");

  const onSubmit: SubmitHandler<IAuthFormData> = async ({
    email,
    password,
  }) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage("Успешный вход!");
      router.push("/users");
    } else {
      setMessage(data.error || "Ошибка входа");
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow w-80 space-y-4">
      <h1 className="text-xl font-semibold text-center">Login</h1>
      {message && <span className="text-red-400 mb-3 block">{message}</span>}
      <Field<IAuthFormData>
        className="mb-4"
        placeholder="Email"
        control={control}
        name="email"
        rules={{
          required: "email is required!",
          pattern: {
            // value: /^[0-9]{12}$/,
            value: validEmail,
            message: "Please enter a valid email",
          },
        }}
      />
      <Field<IAuthFormData>
        className="mb-4"
        placeholder="Пароль"
        control={control}
        name="password"
        rules={{
          required: "Password is required!",
          minLength: {
            value: 4,
            message: "Please enter a valid password",
          },
        }}
      />
      <button
        onClick={handleSubmit(onSubmit)}
        className="w-full bg-blue-500 text-white py-2 rounded-lg cursor-pointer"
      >
        Sign in
      </button>
    </div>
  );
}
