import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import instance from "@/lib/axios";

// GET /api/users
export async function GET() {
  try {
    const { data } = await instance("/users"); 
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
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
  };
  const user = await prisma.user.create(obj);
  return NextResponse.json(user);
}
