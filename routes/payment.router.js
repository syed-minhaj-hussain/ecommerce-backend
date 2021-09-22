const express = require("express");
const { authVerify } = require("../middlewares/authVerify");
const router = express.Router();
const stripe = require("stripe")(
  "sk_test_51JcPucSGNCN5XsLAxClpmJow8THvMA7NFrZd9k9JHxtasdczJXshIE4KkyebUBbRhE3aECxiBeGdunq88nR9DYOg00CfK8wcpL"
);
const { v4: uuidv4 } = require("uuid");

router.route("/").post(authVerify, async (req, res) => {
  const { token, cartItems } = req.body;
  const { total } = cartItems?.reduce(
    (acc, { price, quantity }) => ({
      ...acc,
      total: acc.total + price * quantity,
    }),
    { total: 0 }
  );
  const idempotencyKey = uuidv4();

  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });
    if (customer) {
      const charge = await stripe.charges.create(
        {
          amount: total * 100,
          currency: "inr",
          customer: customer.id,
          receipt_email: token.email,
          description: cartItems[0].description,
          shipping: {
            name: token.card.name,
            address: {
              line1: token.card.address_line1,
              line2: token.card.address_line2,
              city: token.card.address_city,
              country: token.card.address_country,
              postal_code: token.card.address_zip,
            },
          },
        },
        { idempotencyKey }
      );
      res.status(200).json({ success: true, charge });
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = { router };
