import { NextResponse } from "next/server";

// GET /api/users/fioiin
export async function GET(
  req: Request,
  { params }: { params: Promise<{ fioiin: string }> }
) {
  const { fioiin } = await params;   // 👈 обязательно await
  const cacheBuster = Date.now();

  try {
    const res = await fetch(
      `https://rpn.eisz.kz/services/api/person?fioiin=${fioiin}&_=${cacheBuster}`
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Upstream API error" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
