import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { ttt } = await req.json();

  const res = NextResponse.json({ message: "true" });

  res.cookies.set("token", ttt, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
  });

  return res;
}
