"use client";

import Field from "@/components/ui/field/Field";
import { IAuthFormData } from "@/types/auth.interface";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { validEmail } from "./email.regex";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Loader from "@/components/ui/Loader";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { handleSubmit, control, reset } = useForm<IAuthFormData>({
    mode: "onChange",
    defaultValues: {
      // email: "test@test.r",
      // password: "test",
    },
  });

  useEffect(() => {
    const tkn =
      "eyJhbGciOiJSUzI1NiIsImtpZCI6IjFGMkIzQTYyOTE5MTYxNDBEMTEyQ0U2OTZCMjk4MEUxMTU2RDBFODYiLCJ4NXQiOiJIeXM2WXBHUllVRFJFczVwYXltQTRSVnREb1kiLCJ0eXAiOiJKV1QifQ.eyJjbGllbnRfaWQiOiI2MjMwZmU2MzhhOGY0NGM3OTA2NjkzNDA0MzVkOTg0MSIsImNsaWVudF90eXBlIjoiaW50Iiwic3ViIjoiMGE5NGYxOTMtY2EyMS1mMDExLWFiYzctMDA1MDU2YTViNmY5IiwiYW1yIjoicGFzc3dvcmQiLCJhdXRoX3RpbWUiOiIwOS8wNS8yMDI1IDEyOjIxOjQxIiwiaWRwIjoiYXV0aHNydiIsInJvbGUiOlsiYWRkcmVzc0J5QXR0YWNobWVudCIsIlJlZ2lzdHJhdG9yIiwiQWRkUGVyc29uQWRkcmVzcyIsIkVkaXRQZXJzb24iLCJQZXJzb25hbE1PIiwiQWNjb3VudEdyb3VwIiwiQ2VydGlmaWNhdGVzIiwiRGlhZ25vc2VzIl0sIm5hbWUiOiI5MTEyMDY0MDA3ODIiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiI5MTEyMDY0MDA3ODIiLCJmaXJzdF9uYW1lIjoi0JDQm9Cs0JHQmNCd0JAiLCJsYXN0X25hbWUiOiLQmNCc0JjQndCe0JLQkCIsIm1pZGRsZV9uYW1lIjoi0JzQkNCg0JjQn9CW0JDQndCe0JLQndCQIiwicGVyc29uX2lkIjo0NTUwMDAwMDAwMDE1MDYyNiwiZ2VuZGVyIjoiRiIsImJpcnRoZGF0ZSI6IjA2LjEyLjE5OTEiLCJwZXJzb25faWluIjoiOTExMjA2NDAwNzgyIiwib2hjX2lkIjoiNDY5Iiwib2hjX25hbWUiOiLQk9Ca0J8g0L3QsCDQn9Cl0JIgXCLQo9C50LPRg9GA0YHQutCw0Y8g0KbQoNCRXCIg0JPQoyDQo9CXINCQ0LvQvNCw0YLQuNC90YHQutC-0Lkg0L7QsdC70LDRgdGC0LgiLCJvaGNfbmFtZV9rayI6ItCo0JbSmiBcItKw0LnSk9GL0YAg0LDRg9C00LDQvdC00YvSmyDQvtGA0YLQsNC70YvSmyDQsNGD0YDRg9GF0LDQvdCw0YHRi1wiINCc0JrQmiIsIm9oY19jb2RlIjoiMDNDMiIsIm9oY19yZWdpb25faWQiOiIzIiwib2hjX3N0YXRlX2lkIjoiMyIsIm9oY19zdGF0ZV9rYXRvIjoiMTkwMDAwMDAwIiwib2hjX3JlZ2lvbl9rYXRvIjoiMTk2NjAwMDAwIiwib2hjX2ZzX2lkIjoiMjAwMDAwMDAwMDAwNDc0Iiwib2hjX2ZzX25hbWUiOiLQntCx0YnQtdCx0L7Qu9GM0L3QuNGH0L3Ri9C5INC80LXQtC4g0L_QtdGA0YHQvtC90LDQuyIsInBvc3RfaWQiOiI0NTUwMDAwMDAwMjUyNDQ4MiIsInBvc3RfZnVuY19pZCI6IjIzNCIsInBvc3RfbmFtZSI6ItC80LXQtNC40YbQuNC90YHQutCw0Y8o0LjQuSkg0YHQtdGB0YLRgNCwL9Cx0YDQsNGCICjRgdC_0LXRhtC40LDQu9C40LfQuNGA0L7QstCw0L3QvdCw0Y8o0YvQuSkpIiwicG9zdF9uYW1lX2trIjoi0LzQtdC50ZbRgNCz0LXRgCAo0LzQsNC80LDQvdC00LDQvdC00YvRgNGL0LvSk9Cw0L0pIiwibmJmIjoxNzU3MDc0OTAzLCJleHAiOjE3NTcwODkzMDMsImlzcyI6Imh0dHBzOi8vd3d3LmVpc3oua3oiLCJhdWQiOiJodHRwczovL3d3dy5laXN6Lmt6L3Jlc291cmNlcyJ9.AQKJQT3HKVNwlv2HoMnKNqtxUlYbR8qMPtJFm22jvvH9Ydxa_o--MkBoZg_z7WhH3_WLpuoEsvDiGos33jHyMSc3NduShMxiZS456J15r1zImJkoFkJoHKc2BODmqRykRTU580wECDnJT-RibGAjWjEbk55MaiurUjyybIkBt0dvsf5KvW0B7Vy1fuLXDnykhcm-w78NXSNnfb5LxLHSIpVc5-9OyCM1l74trnevmvjQWTLxknq6z4jCrpDm9ygDL00nl2FyP7xb93EW0Htut2bfRJ-OCRBQacAQsZhVAsAO3Ii4vdixVkUI6Dobir9QosTEKbGW0WA-4hUYnDC9gA";

    Cookies.set("tkn", tkn, {
      expires: 1, // 1 day
      sameSite: "strict",
    });
  }, []);

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
        const token = Cookies.get("tkn");
        Cookies.set("token", token, {
          expires: 1,
          sameSite: "strict",
        });
        Cookies.remove("tkn");
        localStorage.setItem('user',JSON.stringify(data.user));
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
        type='password'
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
