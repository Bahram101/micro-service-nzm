import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/users
export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

// POST /api/users
export async function POST(req: Request) {
  const data = await req.json();
  const obj = {
    data: {
      name: data.name,
      email: data.email,
      iin: data.iin,
      password: data.password,
    },
  }
  const user = await prisma.user.create(obj);
  return NextResponse.json(user);
}
