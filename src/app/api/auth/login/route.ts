import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { fetchTokenFromDb } from "@/app/actions/settings";
// import bcrypt from "bcrypt";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

//api/auth/login
export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || password !== user.password) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const settings = await fetchTokenFromDb();

    const response = NextResponse.json({
      message: "Login successful",
      user: { id: user.id, email: user.email, role: user.role },
    });
    let tkn = "";
    if (settings?.token) {
      tkn = settings.token;
    } else {
      tkn = "qwerty";
    }

    response.cookies.set("token", tkn, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      // maxAge: 60 * 60,
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
