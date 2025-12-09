import { stripe } from "@/functions/server/stripe"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const { email, priceId } = await req.json()

        // Create customer or reuse existing
        const customer = await stripe.customers.create({ email })

        // Create subscription with payment behavior = incomplete
        const subscription = await stripe.subscriptions.create({
            customer: customer.id,
            items: [{ price: priceId }],
            payment_behavior: "default_incomplete",
            expand: ["latest_invoice.payment_intent"],
        })

        return NextResponse.json({
            // @ts-ignore
            clientSecret: subscription.latest_invoice.payment_intent.client_secret,
            subscriptionId: subscription.id,
        })

    } catch (error) {
        console.error("Error creating subscription:", error)
        return NextResponse.json({ error: "Failed to create subscription" }, { status: 500 })
    }
}
