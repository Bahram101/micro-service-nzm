import serverInstance from "@/lib/axios.server";
import { ISearch } from "@/types/search.interface";
import { NextRequest, NextResponse } from "next/server";

// GET /api/users/by-iin/[fioiin]
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<ISearch> }
) {
  const { fioiin } = await params; 
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
    // console.error("Upstream network error:", {
    //   code: e?.code,
    //   message: e?.message,
    //   cause: e?.cause,
    //   name: e?.name,
    //   toJSON: typeof e?.toJSON === "function" ? e.toJSON() : undefined,
    // });

    if (e.response?.status === 401) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
