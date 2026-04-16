import { NextResponse } from "next/server";

const ZOHO_INQUIRY_RECORDS_URL =
  "https://forms.zohopublic.com/nutreevit1/form/inquiry/formperma/CCLgW3ogrvNOnd1ja2X3jVcIGdXmX2wEj0KUssovukQ/records";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function splitName(fullName: string) {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);

  return {
    firstName: parts[0] ?? "",
    lastName: parts.slice(1).join(" "),
  };
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const fullName = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!fullName || !email || !message) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
  }

  const { firstName, lastName } = splitName(fullName);
  const zohoPayload = {
    Name: {
      Name_First: firstName,
      Name_Last: lastName,
    },
    Email: email,
    MultiLine: message,
    REFERRER_NAME: "A Mother Choice Website Contact Form",
  };

  try {
    const response = await fetch(ZOHO_INQUIRY_RECORDS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/zoho.forms-v1+json",
      },
      body: JSON.stringify(zohoPayload),
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json({ ok: false, error: "zoho_failed" }, { status: 502 });
    }
  } catch {
    return NextResponse.json({ ok: false, error: "request_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
