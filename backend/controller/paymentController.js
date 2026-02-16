const asyncWrapper = require("../middleWare/asyncWrapper");
const ErrorHandler = require("../utils/errorHandler");
const OrdersModel = require("../model/orderModel");

const getRazorpayInstance = require("../config/razorpay");
const crypto = require("crypto");

/* ======================================================
                STRIPE CARD PAYMENT
====================================================== */

exports.processPayment = asyncWrapper(async (req, res, next) => {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

  if (!req.body.amount || req.body.amount <= 0) {
    return next(new ErrorHandler("Invalid payment amount", 400));
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    metadata: {
      company: "StyleIn",
      userId: req.user?._id.toString(),
    },
  });

  res.status(200).json({
    success: true,
    client_secret: paymentIntent.client_secret,
  });
});

exports.sendStripeApiKey = asyncWrapper(async (req, res, next) => {
  res.status(200).json({
    stripeApiKey: process.env.STRIPE_API_KEY,
  });
});


/* ======================================================
                RAZORPAY UPI PAYMENT
====================================================== */

// STEP 1 → create razorpay order
exports.createRazorpayOrder = asyncWrapper(async (req, res, next) => {

  if (!req.body.amount || req.body.amount <= 0) {
    return next(new ErrorHandler("Invalid payment amount", 400));
  }

  const options = {
    amount: req.body.amount * 100, // rupees → paise
    currency: "INR",
    receipt: "receipt_" + Date.now(),
  };

  const razorpay = getRazorpayInstance();
const order = await razorpay.orders.create(options);


  res.status(200).json({
    success: true,
    order,
  });
});


// STEP 2 → verify payment signature
exports.verifyRazorpayPayment = asyncWrapper(async (req, res, next) => {

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    return next(new ErrorHandler("UPI Payment verification failed", 400));
  }

  res.status(200).json({
    success: true,
    paymentId: razorpay_payment_id,
  });
});


/* ======================================================
                    CREATE ORDER (DB)
        Works for COD + CARD + UPI
====================================================== */

exports.createDatabaseOrder = asyncWrapper(async (req, res, next) => {

  const {
    shippingInfo,
    orderItems,
    itemsPrice,
    shippingPrice,
    totalPrice,
    paymentInfo
  } = req.body;
  // 🔒 Security: prevent fake free orders
if (!paymentInfo || (paymentInfo.method !== "COD" && !paymentInfo.id && !paymentInfo.razorpay_payment_id)) {
  return next(new ErrorHandler("Payment not completed", 400));
}

  if (!shippingInfo || !orderItems || !itemsPrice || !totalPrice || !paymentInfo) {
    return next(new ErrorHandler("Missing order details", 400));
  }

  if (!req.user) {
    return next(new ErrorHandler("User not authenticated", 401));
  }

  let orderData = {
    shippingInfo,
    orderItems,
    user: req.user._id,
    itemsPrice,
    shippingPrice: shippingPrice || 0,
    totalPrice,
    orderStatus: "Processing",
  };

  /* ================= PAYMENT HANDLING ================= */

  // COD
  if (paymentInfo.method === "COD") {

    orderData.paymentInfo = {
      method: "COD",
      status: "pending"
    };

    orderData.paidAt = null;
  }

  // STRIPE CARD
  else if (paymentInfo.method === "CARD") {

    if (!paymentInfo.id) {
      return next(new ErrorHandler("Card payment not confirmed", 400));
    }

    orderData.paymentInfo = {
      method: "CARD",
      id: paymentInfo.id,
      status: "succeeded"
    };

    orderData.paidAt = Date.now();
  }

  // RAZORPAY UPI
  else if (paymentInfo.method === "UPI") {

    if (!paymentInfo.razorpay_payment_id) {
      return next(new ErrorHandler("UPI payment not verified", 400));
    }
    console.log("RAZORPAY KEY:", process.env.RAZORPAY_KEY_ID);

    orderData.paymentInfo = {
      method: "UPI",
      id: paymentInfo.razorpay_payment_id,
      status: "succeeded"
    };

    orderData.paidAt = Date.now();
  }

  else {
    return next(new ErrorHandler("Invalid payment method", 400));
  }

  /* ================= CREATE ORDER ================= */

  const order = await OrdersModel.create(orderData);

  res.status(201).json({
    success: true,
    order,
  });
});
