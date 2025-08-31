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
  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      iin: data.iin,
      password: data.password,
    },
  });
  return NextResponse.json(user);
}
