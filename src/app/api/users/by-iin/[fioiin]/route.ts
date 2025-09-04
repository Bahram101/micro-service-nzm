import instance from "@/lib/axios";
import { NextRequest, NextResponse } from "next/server";

// GET /api/users/by-iin/[fioiin]
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ fioiin: string }> }
) {
  const { fioiin } = await params; // 👈 обязательно await
  const cacheBuster = Date.now();
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const res = await instance.get(
      `/person?fioiin=${fioiin}&_=${cacheBuster}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return NextResponse.json(res.data);
  } catch (e:any) {
    console.error("Upstream API error:", e.response?.status, e.response?.data);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
