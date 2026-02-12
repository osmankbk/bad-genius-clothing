
import Stripe from "stripe";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const handler = async (event) => {
  try {
    const { amount } = JSON.parse(event.body || "{}");

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
    });

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
    };
  } catch (err) {
    console.error("create-payment-intent error:", err);

    return {
      statusCode: err?.statusCode || 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        error: err?.message || "Server error",
        type: err?.type,
      }),
    };
  }
};

