import { NextResponse } from "next/server";
import { registerUser } from "@/server/actions/register";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await registerUser(body);

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json(result, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to process registration" },
      { status: 500 }
    );
  }
}
