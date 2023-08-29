import { genTokenPair, verifyToken } from "@/libs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const authorization = request.headers.get("Authorization");
  if (!authorization) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }
  const accessToken = authorization.split(" ")[1];
  const username = verifyToken({ accessToken });
  if (!username) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }
  return NextResponse.json({
    message: "access with authentication into protected api",
  });
}
