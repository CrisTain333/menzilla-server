const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
exports.paymentProcess = async (req) => {
  const { amount } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "usd",
      amount: amount,
    });
    return {
      status: 200,
      message: "ok",
      data: paymentIntent.client_secret,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "fail to create payment intent",
    };
  }

  return;
};
