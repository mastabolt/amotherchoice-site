import { NextRequest, NextResponse } from "next/server";
import { getClassSessionById } from "@/lib/class-sessions";
import { formatDateRange } from "@/lib/formatters";
import { attachCheckoutSessionToRegistration, createPendingRegistration } from "@/lib/registrations";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type CheckoutRequestBody = {
  classSessionId?: string;
  attendeeName?: string;
  email?: string;
  phone?: string;
  notes?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getTrustedOrigin(value: string | null) {
  if (!value) {
    return null;
  }

  try {
    return new URL(value).origin;
  } catch {
    return null;
  }
}

function getRequestOrigin(request: NextRequest) {
  const explicitOrigin = getTrustedOrigin(request.headers.get("x-site-origin"));

  if (explicitOrigin) {
    return explicitOrigin;
  }

  const forwardedProto = request.headers.get("x-forwarded-proto");
  const forwardedHost = request.headers.get("x-forwarded-host");

  if (forwardedProto && forwardedHost) {
    return `${forwardedProto}://${forwardedHost}`;
  }

  const originHeader = getTrustedOrigin(request.headers.get("origin"));

  if (originHeader) {
    return originHeader;
  }

  const refererOrigin = getTrustedOrigin(request.headers.get("referer"));

  if (refererOrigin) {
    return refererOrigin;
  }

  return request.nextUrl.origin;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CheckoutRequestBody;
    const classSessionId = body.classSessionId?.trim();
    const attendeeName = body.attendeeName?.trim();
    const email = body.email?.trim().toLowerCase();
    const phone = body.phone?.trim();
    const notes = body.notes?.trim() || null;

    if (!classSessionId || !attendeeName || !email || !phone) {
      return NextResponse.json({ error: "Missing required registration fields." }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    const classSession = await getClassSessionById(classSessionId);

    if (!classSession) {
      return NextResponse.json({ error: "Class session not found." }, { status: 404 });
    }

    if (classSession.status !== "open") {
      return NextResponse.json({ error: "This class session is not currently open for registration." }, { status: 400 });
    }

    const registration = await createPendingRegistration({
      classSessionId: classSession.id,
      attendeeName,
      email,
      phone,
      notes,
    });

    const stripe = getStripe();
    const origin = getRequestOrigin(request);

    const successUrl = new URL("/thank-you", origin);
    successUrl.searchParams.set("registration_id", registration.id);
    successUrl.searchParams.set("session_id", classSession.id);
    successUrl.searchParams.set("checkout_session_id", "{CHECKOUT_SESSION_ID}");

    const cancelUrl = new URL(`/book/${classSession.id}`, origin);
    cancelUrl.searchParams.set("cancelled", "1");

    const metadata = {
      registrationId: registration.id,
      classSessionId: classSession.id,
    };

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",
      success_url: successUrl.toString(),
      cancel_url: cancelUrl.toString(),
      customer_email: registration.email,
      client_reference_id: registration.id,
      metadata,
      payment_intent_data: {
        metadata,
      },
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: classSession.price,
            product_data: {
              name: classSession.title,
              description: formatDateRange(classSession.startDate, classSession.endDate),
            },
          },
        },
      ],
    });

    await attachCheckoutSessionToRegistration(registration.id, checkoutSession.id);

    if (!checkoutSession.url) {
      return NextResponse.json({ error: "Checkout URL was not created." }, { status: 500 });
    }

    return NextResponse.json({ checkoutUrl: checkoutSession.url, registrationId: registration.id });
  } catch (error) {
    console.error("Failed to create checkout session", {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      error,
    });

    return NextResponse.json({ error: "Failed to start Checkout." }, { status: 500 });
  }
}
