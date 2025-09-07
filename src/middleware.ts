import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  // console.log("TOKEN FROM MIDDLE", token);
  const { pathname } = req.nextUrl;
  const publicPaths = ["/auth/login", "/auth/register", "/auth/forgot-password"];

  if (!token && !publicPaths.includes(pathname)) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  if (token && pathname === "/auth/login") { 
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
