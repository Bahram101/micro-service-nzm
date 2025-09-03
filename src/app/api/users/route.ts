import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/users
export async function GET() {
  try {
    const res = await fetch("https://dummyjson.com/users?limit=5");
    const data = await res.json();
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to fetch todo" },
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
  }
  const user = await prisma.user.create(obj);
  return NextResponse.json(user);
}
