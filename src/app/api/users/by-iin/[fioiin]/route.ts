import serverInstance from "@/lib/axios.server";
import { NextRequest, NextResponse } from "next/server";
// Настройки роута:
export const runtime = "nodejs";                 // обязательно для axios (не edge)
export const dynamic = "force-dynamic";          // запретить пререндер
export const revalidate = 0;                     // всегда fresh
export const preferredRegion = ["fra1", "cdg1", "hnd1", "sin1"]; // гео-регионы

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
    const res = await serverInstance.get(
      `/person?fioiin=${fioiin}&_=${cacheBuster}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return NextResponse.json(res.data);
  } catch (e: any) {
    // if (e.response?.status === 401) {
    //   console.error("Upstream API error:", e);
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }
    // return NextResponse.json({ error: "Failed" }, { status: 500 });
    console.error("Upstream network error:", {
      code: e?.code,
      message: e?.message,
      cause: e?.cause,
      name: e?.name,
      toJSON: typeof e?.toJSON === "function" ? e.toJSON() : undefined,
    });
    return NextResponse.json(
      {
        error: "UPSTREAM_NETWORK_ERROR",
        code: e?.code,
        message: e?.message,
      },
      { status: 502 }
    );
  }
}
