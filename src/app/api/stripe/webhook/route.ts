import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { markRegistrationPaid, markRegistrationPaymentFailed } from "@/lib/registrations";
import { getStripe, getStripeWebhookSecret } from "@/lib/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getPaymentIntentId(value: string | Stripe.PaymentIntent | null) {
  if (!value) {
    return null;
  }

  return typeof value === "string" ? value : value.id;
}

export async function POST(request: Request) {
  const stripe = getStripe();
  const webhookSecret = getStripeWebhookSecret();
  const signature = (await headers()).get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing Stripe signature." }, { status: 400 });
  }

  const payload = await request.text();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (error) {
    console.error("Failed to verify Stripe webhook", {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      error,
    });

    return NextResponse.json({ error: "Invalid Stripe webhook signature." }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
      case "checkout.session.async_payment_succeeded": {
        const session = event.data.object as Stripe.Checkout.Session;
        const registrationId = session.metadata?.registrationId;

        if (!registrationId) {
          throw new Error(`Stripe webhook missing registrationId metadata for session ${session.id}`);
        }

        await markRegistrationPaid({
          registrationId,
          stripeCheckoutSessionId: session.id,
          stripePaymentIntentId: getPaymentIntentId(session.payment_intent),
        });
        break;
      }
      case "checkout.session.async_payment_failed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const registrationId = session.metadata?.registrationId;

        if (!registrationId) {
          throw new Error(`Stripe webhook missing registrationId metadata for session ${session.id}`);
        }

        await markRegistrationPaymentFailed({
          registrationId,
          stripeCheckoutSessionId: session.id,
          stripePaymentIntentId: getPaymentIntentId(session.payment_intent),
        });
        break;
      }
      default:
        break;
    }
  } catch (error) {
    console.error("Failed to process Stripe webhook", {
      eventType: event.type,
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      error,
    });

    return NextResponse.json({ error: "Failed to process Stripe webhook." }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
