import { TypeLogin } from "@/interfaces";
import { genTokenPair } from "@/libs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { username } = (await request.json()) as TypeLogin;
  const token = genTokenPair({ username });
  return NextResponse.json({ message: "Login successfull!", data: token });
}
