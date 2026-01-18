const express = require("express");
const {
  processPayment,
  sendStripeApiKey,
} = require("../controller/paymentController");
const { isAuthentictedUser } = require("../middleWare/auth");

const router = express.Router();

// Stripe card payment
router.route("/payment/process").post(isAuthentictedUser, processPayment);

// Send stripe public key
router.route("/stripeapikey").get(isAuthentictedUser, sendStripeApiKey);

module.exports = router;
