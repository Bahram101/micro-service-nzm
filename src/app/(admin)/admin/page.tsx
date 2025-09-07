"use client"
import Field from '@/components/ui/field/Field'
import { useAuth } from '@/providers/AuthProvider'
import React, { useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation'
import Loader from '@/components/ui/Loader'

type FormValue = {
  ttt: string;
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

  const onSubmit: SubmitHandler<FormValue> = ({ ttt }: FormValue) => {
    Cookies.remove("token");
    Cookies.set("token", ttt, {
      path: '/',
      sameSite: "strict",
    });
  }

  if (!user) {
    return <Loader />;
  }

  if (user.role !== "ADMIN") {
    return null;
  }

  return (
    <div className='flex w-full'>
      <form onSubmit={handleSubmit(onSubmit)} className='flex w-2/3 items-start'>
        <Field<FormValue>
          className="mb-4 w-full mr-2"
          placeholder="Заполните поле"
          control={control}
          name="ttt"
        />
        <button
          type='submit'
          className=" bg-blue-500 text-white py-2 rounded-lg cursor-pointer px-2"
        >
          Сохранить
        </button>
      </form>
    </div>
  )
}

export default AdminPage