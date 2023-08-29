import { genTokenPair } from "@/libs";
import {
  NextResponse,
  type NextFetchEvent,
  type NextRequest,
} from "next/server";

interface BodyRequest {
  username: string;
  password: string;
}

export async function POST(request: Request) {
  const { username } = (await request.json()) as BodyRequest;
  const token = genTokenPair({ username });
  return NextResponse.json({ message: "Login successfull!", token });
}
