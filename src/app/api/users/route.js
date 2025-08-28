import { NextResponse } from "next/server";
import { getUsers, addUser } from "@/lib/db";

export async function GET() {
  const users = await getUsers();
  return NextResponse.json(users);
}

export async function POST(request) {
  const body = await request.json();
  const users = await getUsers();

  if (users.find((u) => u.email === body.email)) {
    return NextResponse.json({ error: "Email already registered" }, { status: 400 });
  }

  const newUser = await addUser(body);
  return NextResponse.json(newUser, { status: 201 });
}
