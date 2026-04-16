"use server";

import { redirect } from "next/navigation";

const ZOHO_INQUIRY_RECORDS_URL =
  "https://forms.zohopublic.com/nutreevit1/form/inquiry/formperma/CCLgW3ogrvNOnd1ja2X3jVcIGdXmX2wEj0KUssovukQ/records";

function splitName(fullName: string) {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);

  return {
    firstName: parts[0] ?? "",
    lastName: parts.slice(1).join(" "),
  };
}

export async function submitContactInquiryAction(formData: FormData) {
  const fullName = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!fullName || !email || !message) {
    redirect("/contact?error=1");
  }

  const { firstName, lastName } = splitName(fullName);

  try {
    const response = await fetch(ZOHO_INQUIRY_RECORDS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/zoho.forms-v1+json",
      },
      body: JSON.stringify({
        Name: {
          Name_First: firstName,
          Name_Last: lastName,
        },
        Email: email,
        MultiLine: message,
        REFERRER_NAME: "A Mother Choice Website Contact Form",
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      redirect("/contact?error=1");
    }
  } catch {
    redirect("/contact?error=1");
  }

  redirect("/thank-you?type=contact");
}
