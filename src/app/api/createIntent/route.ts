import { stripe } from "@/functions/server/stripe";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { amount } = await req.json(); // amount in cents

  const intent = await stripe.paymentIntents.create({
    amount,
    currency: "usd",
    automatic_payment_methods: { enabled: true },
  })

  return NextResponse.json({ clientSecret: intent.client_secret })
}
