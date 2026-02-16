const express = require("express");

const {
  processPayment,
  sendStripeApiKey,
  createRazorpayOrder,
  verifyRazorpayPayment
} = require("../controller/paymentController");

const { isAuthentictedUser } = require("../middleWare/auth");

const router = express.Router();

/* =========================================
            STRIPE CARD PAYMENT
========================================= */

// Create stripe payment intent
router.route("/payment/process")
  .post(isAuthentictedUser, processPayment);

// Send stripe public key
router.route("/stripeapikey")
  .get(isAuthentictedUser, sendStripeApiKey);


/* =========================================
            UPI (RAZORPAY) PAYMENT
========================================= */

// Step 1 → Create Razorpay Order
router.route("/payment/razorpay-order")
  .post(isAuthentictedUser, createRazorpayOrder);

// Step 2 → Verify Razorpay Payment
router.route("/payment/verify-razorpay")
  .post(isAuthentictedUser, verifyRazorpayPayment);


module.exports = router;
