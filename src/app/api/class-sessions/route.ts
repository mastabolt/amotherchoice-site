import { NextResponse } from "next/server";
import { getClassSessions } from "@/lib/class-sessions";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const sessions = await getClassSessions();
    return NextResponse.json(sessions);
  } catch (error) {
    console.error("Failed to load class sessions", {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      error,
    });
    return NextResponse.json({ error: "Failed to load class sessions" }, { status: 500 });
  }
}
