import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, phone } = body;

  console.log("New User Registration:", body);

  return NextResponse.json(
    { message: "User registered successfully", user: { name, email, phone } },
    { status: 201 }
  );
}
