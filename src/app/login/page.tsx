"use client";

import Field from "@/components/ui/field/Field";
import { IAuthFormData } from "@/types/auth.interface";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { validEmail } from "./email.regex";


export default function LoginPage() {
  const router = useRouter();

  const { handleSubmit, control, reset } = useForm<IAuthFormData>({
    mode: 'onChange',
    defaultValues: {
      email: undefined,
      password: undefined
    }
  })

  const onSubmit: SubmitHandler<IAuthFormData> = (data) => {
    console.log('data', data)
    document.cookie = `token=123456; path=/;`;
    router.push("/");
  }

  return (
    <div className="bg-white p-6 rounded shadow w-80 space-y-4">
      <h1 className="text-xl font-semibold text-center">Login</h1>
      <Field<IAuthFormData>
        placeholder='Email'
        control={control}
        name='email'
        rules={{
          required: 'email is required!',
          pattern: {
            // value: /^[0-9]{12}$/,
            value: validEmail,
            message: 'Please enter a valid email'
          }
        }}
      />
      <Field<IAuthFormData>
        placeholder='Пароль'
        control={control}
        name='password'
        rules={{
          required: 'Password is required!',
          minLength: {
            value: 6,
            message: 'Please enter a valid password'
          }
        }}
      />
      <button
        onClick={handleSubmit(onSubmit)}
        className="w-full bg-blue-500 text-white py-2 rounded-lg"
      >
        Sign in
      </button>
    </div>
  );
}
