import { NextResponse } from "next/server";
import { clearAdminSession } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST() {
  await clearAdminSession();
  return new NextResponse(null, {
    status: 303,
    headers: {
      Location: "/?logged_out=1",
    },
  });
}
