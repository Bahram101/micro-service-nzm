import instance from "@/lib/axios.server";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET /api/todos
export async function GET() {
  try {
    const { data } = await instance.get("/todos");
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to fetch todo" },
      { status: 500 }
    );
  }
}
