import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
// import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

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

    const res = NextResponse.json({ message: "Login successful" });
    // res.cookies.set("token", token, { httpOnly: true, secure: true });
    return res;
  } catch (error) {
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
