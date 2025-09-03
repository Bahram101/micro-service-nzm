import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
// import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    console.log("email", email);

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
    //   expiresIn: "1h",
    // });

    const token =
      "eyJhbGciOiJSUzI1NiIsImtpZCI6IjFGMkIzQTYyOTE5MTYxNDBEMTEyQ0U2OTZCMjk4MEUxMTU2RDBFODYiLCJ4NXQiOiJIeXM2WXBHUllVRFJFczVwYXltQTRSVnREb1kiLCJ0eXAiOiJKV1QifQ.eyJjbGllbnRfaWQiOiI2MjMwZmU2MzhhOGY0NGM3OTA2NjkzNDA0MzVkOTg0MSIsImNsaWVudF90eXBlIjoiaW50Iiwic3ViIjoiMGE5NGYxOTMtY2EyMS1mMDExLWFiYzctMDA1MDU2YTViNmY5IiwiYW1yIjoicGFzc3dvcmQiLCJhdXRoX3RpbWUiOiIwOS8wMy8yMDI1IDA5OjE5OjA2IiwiaWRwIjoiYXV0aHNydiIsInJvbGUiOlsiYWRkcmVzc0J5QXR0YWNobWVudCIsIlJlZ2lzdHJhdG9yIiwiQWRkUGVyc29uQWRkcmVzcyIsIkVkaXRQZXJzb24iLCJQZXJzb25hbE1PIiwiQWNjb3VudEdyb3VwIiwiQ2VydGlmaWNhdGVzIiwiRGlhZ25vc2VzIl0sIm5hbWUiOiI5MTEyMDY0MDA3ODIiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiI5MTEyMDY0MDA3ODIiLCJmaXJzdF9uYW1lIjoi0JDQm9Cs0JHQmNCd0JAiLCJsYXN0X25hbWUiOiLQmNCc0JjQndCe0JLQkCIsIm1pZGRsZV9uYW1lIjoi0JzQkNCg0JjQn9CW0JDQndCe0JLQndCQIiwicGVyc29uX2lkIjo0NTUwMDAwMDAwMDE1MDYyNiwiZ2VuZGVyIjoiRiIsImJpcnRoZGF0ZSI6IjA2LjEyLjE5OTEiLCJwZXJzb25faWluIjoiOTExMjA2NDAwNzgyIiwib2hjX2lkIjoiNDY5Iiwib2hjX25hbWUiOiLQk9Ca0J8g0L3QsCDQn9Cl0JIgXCLQo9C50LPRg9GA0YHQutCw0Y8g0KbQoNCRXCIg0JPQoyDQo9CXINCQ0LvQvNCw0YLQuNC90YHQutC-0Lkg0L7QsdC70LDRgdGC0LgiLCJvaGNfbmFtZV9rayI6ItCo0JbSmiBcItKw0LnSk9GL0YAg0LDRg9C00LDQvdC00YvSmyDQvtGA0YLQsNC70YvSmyDQsNGD0YDRg9GF0LDQvdCw0YHRi1wiINCc0JrQmiIsIm9oY19jb2RlIjoiMDNDMiIsIm9oY19yZWdpb25faWQiOiIzIiwib2hjX3N0YXRlX2lkIjoiMyIsIm9oY19zdGF0ZV9rYXRvIjoiMTkwMDAwMDAwIiwib2hjX3JlZ2lvbl9rYXRvIjoiMTk2NjAwMDAwIiwib2hjX2ZzX2lkIjoiMjAwMDAwMDAwMDAwNDc0Iiwib2hjX2ZzX25hbWUiOiLQntCx0YnQtdCx0L7Qu9GM0L3QuNGH0L3Ri9C5INC80LXQtC4g0L_QtdGA0YHQvtC90LDQuyIsInBvc3RfaWQiOiI0NTUwMDAwMDAwMjUyNDQ4MiIsInBvc3RfZnVuY19pZCI6IjIzNCIsInBvc3RfbmFtZSI6ItC80LXQtNC40YbQuNC90YHQutCw0Y8o0LjQuSkg0YHQtdGB0YLRgNCwL9Cx0YDQsNGCICjRgdC_0LXRhtC40LDQu9C40LfQuNGA0L7QstCw0L3QvdCw0Y8o0YvQuSkpIiwicG9zdF9uYW1lX2trIjoi0LzQtdC50ZbRgNCz0LXRgCAo0LzQsNC80LDQvdC00LDQvdC00YvRgNGL0LvSk9Cw0L0pIiwibmJmIjoxNzU2ODkxMTQ3LCJleHAiOjE3NTY5MDU1NDcsImlzcyI6Imh0dHBzOi8vd3d3LmVpc3oua3oiLCJhdWQiOiJodHRwczovL3d3dy5laXN6Lmt6L3Jlc291cmNlcyJ9.BK34LeK3OogONpvcy3N7EkOzKKlNxodTo_rFqLaOXBvGWcBT_Hxd3B0eFKviveT-9gEVfyja2shtHHXcsulL8oGBbfb442SkhL64ElubKwBun5l9rZH0pD41A6sVDLOIcPidwOvI3W1rJGSdDkHKaVhVcUITOZjeF4NKipQvLckCErfcrTt6gdUC53HYHlIePY_l3qlqq01HDNMtQQ_oBQqZG7R1uwU8lBB91kLmwrCoIbsJCeA-B2ww16Iv43kHGl1HLegCrghP86P-zRuKDs4HDm8wS8gu3hOa0PHlNzoePwJ_Loj2MmXHwtZ13IxC5sagwQ_uskRIuH0vsBBk3Q";

    // Можно вернуть токен в куках
    const res = NextResponse.json({ message: "Login successful" });
    res.cookies.set("token", token, { httpOnly: true, secure: true });
    return res;
  } catch (error) {
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
