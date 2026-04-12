import Stripe from "stripe";

const globalForStripe = globalThis as unknown as {
  stripe?: Stripe;
};

export function getStripe() {
  if (globalForStripe.stripe) {
    return globalForStripe.stripe;
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    throw new Error("STRIPE_SECRET_KEY is required");
  }

  const stripe = new Stripe(secretKey);

  if (process.env.NODE_ENV !== "production") {
    globalForStripe.stripe = stripe;
  }

  return stripe;
}

export function getStripeWebhookSecret() {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    throw new Error("STRIPE_WEBHOOK_SECRET is required");
  }

  return webhookSecret;
}
