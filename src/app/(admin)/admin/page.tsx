"use client";
import Field from "@/components/ui/field/Field";
import { useAuth } from "@/providers/AuthProvider";
import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import Loader from "@/components/ui/Loader";
import { saveTokenToDb } from "@/app/actions/settings";

type FormValue = {
  token: string;
};

const AdminPage = () => {
  const { user } = useAuth();
  const router = useRouter();

  const { handleSubmit, control } = useForm<FormValue>({
    mode: "onChange",
  });

  useEffect(() => {
    if (user && user.role !== "ADMIN") {
      router.push("/");
    }
  }, [user, router]);

  const onSubmit: SubmitHandler<FormValue> = async ({ token }: FormValue) => {
    await saveTokenToDb({ token });

    await fetch("/api/admin/set-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
      credentials: "include",
    });

    router.push("/");
  };

  if (!user) {
    return <Loader />;
  }

  if (user.role !== "ADMIN") {
    return null;
  }

  return (
    <div className="flex w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full md:w-2/3 items-start"
      >
        <Field<FormValue>
          className="mb-4 w-full mr-2"
          placeholder="Заполните поле"
          control={control}
          name="token"
        />
        <button
          type="submit"
          className=" bg-blue-500 text-white py-2 rounded-lg cursor-pointer px-2"
        >
          Сохранить
        </button>
      </form>
    </div>
  );
};

export default AdminPage;
