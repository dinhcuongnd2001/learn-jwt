import { TypeLogin } from "@/interfaces";
import { genTokenPair } from "@/libs";
import {
  NextResponse,
  type NextFetchEvent,
  type NextRequest,
} from "next/server";

export async function POST(request: Request) {
  console.log("called");
  const { username, password } = (await request.json()) as TypeLogin;
  console.log("🚀 ~ file: route.ts:12 ~ POST ~ username:", username);
  const token = genTokenPair({ username });
  return NextResponse.json({ message: "Login successfull!", token });
}
