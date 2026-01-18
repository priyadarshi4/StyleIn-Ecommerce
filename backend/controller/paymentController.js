const asyncWrapper = require("../middleWare/asyncWrapper");
const ErrorHandler = require("../utils/errorHandler");
const OrdersModel = require("../model/orderModel"); // Import your order model

// process the payment (for card payments)
exports.processPayment = asyncWrapper(async (req, res, next) => {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

  console.log('=== PAYMENT PROCESSING ===');
  console.log('Timestamp:', new Date().toISOString());
  console.log('Amount:', req.body.amount);
  console.log('User ID:', req.user?.id);
  console.log('==========================');

  // Validate payment amount
  if (!req.body.amount || req.body.amount <= 0) {
    return next(new ErrorHandler("Invalid payment amount", 400));
  }

  // Validate amount is not too large (max 999999999 paise = 9999999.99 INR)
  if (req.body.amount > 999999999) {
    return next(new ErrorHandler("Payment amount too large", 400));
  }

  try {
    const myPayment = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "inr",
      metadata: {
        company: "Ecommerce",
        userId: req.user?.id || 'unknown',
        timestamp: new Date().toISOString()
      },
    });

    console.log('Payment Intent Created:', myPayment.id);

    res.status(200).json({ 
      success: true, 
      client_secret: myPayment.client_secret 
    });
  } catch (error) {
    console.error('Stripe Payment Error:', error.message);
    return next(new ErrorHandler("Payment processing failed", 500));
  }
});

// send STRIPE_API_KEY to user =>
exports.sendStripeApiKey = asyncWrapper(async (req, res, next) => {
  if (!process.env.STRIPE_API_KEY) {
    return next(new ErrorHandler("Stripe API key not configured", 500));
  }
  
  res.status(200).json({ 
    stripeApiKey: process.env.STRIPE_API_KEY 
  });
});

// Create order (handles both card and COD)
exports.createOrder = asyncWrapper(async (req, res, next) => {
  const { shippingInfo, orderItems, itemsPrice, shippingPrice, totalPrice, paymentInfo } = req.body;

  // Validate required fields
  if (!shippingInfo || !orderItems || !itemsPrice || !totalPrice || !paymentInfo) {
    return next(new ErrorHandler("Missing required order details", 400));
  }

  // Ensure user is authenticated
  if (!req.user) {
    return next(new ErrorHandler("User not authenticated", 401));
  }

  try {
    let orderData = {
      shippingInfo,
      orderItems,
      user: req.user._id,
      itemsPrice,
      shippingPrice: shippingPrice || 0,
      totalPrice,
      paymentInfo,
      orderStatus: "Processing", // Default status
    };

    // Handle COD orders
    if (paymentInfo.status === "Cash on Delivery") {
      // For COD, no payment ID needed, and paidAt can be null or set to now if you want
      orderData.paidAt = null; // Or set to Date.now() if you consider it "paid" on delivery
    } else if (paymentInfo.status === "succeeded") {
      // For card payments, ensure payment ID is present and set paidAt
      if (!paymentInfo.id) {
        return next(new ErrorHandler("Payment ID required for card payments", 400));
      }
      orderData.paidAt = Date.now();
    } else {
      return next(new ErrorHandler("Invalid payment status", 400));
    }

    // Create the order
    const order = await OrdersModel.create(orderData);

    console.log('Order Created:', order._id, 'Payment Status:', paymentInfo.status);

    res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error('Order Creation Error:', error.message);
    return next(new ErrorHandler("Order creation failed", 500));
  }
});