import { NextResponse } from "next/server";

const ZOHO_INQUIRY_SUBMIT_URL =
  "https://forms.zohopublic.com/nutreevit1/form/inquiry/formperma/CCLgW3ogrvNOnd1ja2X3jVcIGdXmX2wEj0KUssovukQ/record/submit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function splitName(fullName: string) {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 0) {
    return { firstName: "", lastName: "" };
  }

  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(" "),
  };
}

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const fullName = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!fullName || !email || !message) {
    return NextResponse.redirect(new URL("/contact?error=1", requestUrl), { status: 303 });
  }

  const { firstName, lastName } = splitName(fullName);
  const zohoPayload = new URLSearchParams();
  zohoPayload.set("Name_First", firstName);
  zohoPayload.set("Name_Last", lastName);
  zohoPayload.set("Email", email);
  zohoPayload.set("MultiLine", message);
  zohoPayload.set("zf_referrer_name", "A Mother Choice Website Contact Form");
  zohoPayload.set("zf_redirect_url", new URL("/thank-you?type=contact", requestUrl).toString());

  try {
    const response = await fetch(ZOHO_INQUIRY_SUBMIT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: zohoPayload.toString(),
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.redirect(new URL("/contact?error=1", requestUrl), { status: 303 });
    }
  } catch {
    return NextResponse.redirect(new URL("/contact?error=1", requestUrl), { status: 303 });
  }

  return NextResponse.redirect(new URL("/thank-you?type=contact", requestUrl), { status: 303 });
}
