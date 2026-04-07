import { NextResponse } from "next/server";
import { getClassSessions } from "@/lib/class-sessions";

export async function GET() {
  try {
    const sessions = await getClassSessions();
    return NextResponse.json(sessions);
  } catch (error) {
    console.error("Failed to load class sessions", error);
    return NextResponse.json({ error: "Failed to load class sessions" }, { status: 500 });
  }
}
