"use client";

import Field from "@/components/ui/field/Field";
import { IAuthFormData } from "@/types/auth.interface";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { validEmail } from "./email.regex";
import { useState } from "react";
import Loader from "@/components/ui/Loader";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { handleSubmit, control } = useForm<IAuthFormData>({
    mode: "onChange",
    defaultValues: {
      email: "nizam9119@mail.ru",
      password: "Nizam919191",
    },
  });

  const onSubmit: SubmitHandler<IAuthFormData> = async ({
    email,
    password,
  }) => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await res.json();
      setIsLoading(false);

      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        router.push("/");
      } else {
        setMessage(data.error || "Ошибка входа");
      }
    } catch (e) {
      setIsLoading(false);
      setMessage("Что-то пошло не так");
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
        type="password"
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
        {isLoading ? <Loader color="white" /> : "Sign in"}
      </button>
    </div>
  );
}
