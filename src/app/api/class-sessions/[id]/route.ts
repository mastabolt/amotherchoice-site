import { NextResponse } from "next/server";
import { getClassSessionById } from "@/lib/class-sessions";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const session = await getClassSessionById(id);

    if (!session) {
      return NextResponse.json({ error: "Class session not found" }, { status: 404 });
    }

    return NextResponse.json(session);
  } catch (error) {
    console.error("Failed to load class session", error);
    return NextResponse.json({ error: "Failed to load class session" }, { status: 500 });
  }
}
