import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function MainPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  // Если не авторизован → на login
  if (!token) {
    redirect("/login");
  }

  return (
    <div>Home</div>
  )

}
