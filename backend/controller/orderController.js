const asyncWrapper = require("../middleWare/asyncWrapper");
const orderModel = require("../model/orderModel");
const productModel = require("../model/ProductModel");
const ErrorHandler = require("../utils/errorHandler");

/**
 * =====================================================
 * CREATE NEW ORDER  (COD + STRIPE SAFE + SIZE SAFE)
 * =====================================================
 */
exports.newOrder = asyncWrapper(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (!req.user) {
    return next(new ErrorHandler("User not authenticated", 401));
  }

  if (
    !shippingInfo ||
    !orderItems ||
    orderItems.length === 0 ||
    !paymentInfo ||
    !itemsPrice ||
    !totalPrice
  ) {
    return next(new ErrorHandler("Missing order details", 400));
  }

  // ================= PAID AT LOGIC =================
  let paidAt = null;
let finalPaymentInfo = {};

// CARD OR UPI (already paid online)
if (paymentInfo.method === "CARD" || paymentInfo.method === "UPI") {

  if (!paymentInfo.id && !paymentInfo.razorpay_payment_id) {
    return next(new ErrorHandler("Online payment verification failed", 400));
  }

  finalPaymentInfo = {
    method: paymentInfo.method,
    id: paymentInfo.id || paymentInfo.razorpay_payment_id,
    status: "paid",
  };

  paidAt = Date.now();
}

// COD (not paid yet)
else if (paymentInfo.method === "COD") {

  finalPaymentInfo = {
    method: "COD",
    status: "not_paid",
  };

  paidAt = null;
}

else {
  return next(new ErrorHandler("Invalid payment method", 400));
}

  // ================= CREATE ORDER =================
  const order = await orderModel.create({
    shippingInfo,
    orderItems: orderItems.map((item) => ({
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      image: item.image,
      productId: item.productId,
      size: item.size || null, // ✅ SIZE SAVED
    })),
    paymentInfo: finalPaymentInfo,
    itemsPrice,
    taxPrice: taxPrice || 0,
    shippingPrice: shippingPrice || 0,
    totalPrice,
    user: req.user._id,
    paidAt,
    orderStatus: "Processing",
  });

  res.status(201).json({
    success: true,
    order,
  });
});

/**
 * =====================================================
 * GET SINGLE ORDER
 * =====================================================
 */
exports.getSingleOrder = asyncWrapper(async (req, res, next) => {
  const order = await orderModel
    .findById(req.params.id)
    .populate({ path: "user", select: "name email" });

  if (!order) {
    return next(new ErrorHandler("Order not found with this ID", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

/**
 * =====================================================
 * GET LOGGED-IN USER ORDERS
 * =====================================================
 */
exports.myOrders = asyncWrapper(async (req, res) => {
  const userOrders = await orderModel.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    userOrders,
  });
});

/**
 * =====================================================
 * GET ALL ORDERS (ADMIN)
 * =====================================================
 */
exports.getAllOrders = asyncWrapper(async (req, res) => {
  const orders = await orderModel.find();

  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

/**
 * =====================================================
 * UPDATE ORDER STATUS (ADMIN)  ✅ SIZE AWARE
 * =====================================================
 */
exports.updateOrder = asyncWrapper(async (req, res, next) => {
  const order = await orderModel.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found with this ID", 404));
  }

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("Order already delivered", 400));
  }

  // ================= REDUCE STOCK ON SHIPPED =================
  if (req.body.status === "Shipped") {
    for (const item of order.orderItems) {
      await updateStock(
        item.productId,
        item.quantity,
        item.size // ✅ PASS SIZE
      );
    }
  }

  order.orderStatus = req.body.status;

if (req.body.status === "Delivered") {
  order.deliveredAt = Date.now();

  // COD becomes paid after delivery
  if (order.paymentInfo.method === "COD") {
    order.paymentInfo.status = "paid";
    order.paidAt = Date.now();
  }
}


  await order.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: "Order updated successfully",
  });
});

/**
 * =====================================================
 * UPDATE PRODUCT STOCK (SIZE + NON-SIZE SAFE)
 * =====================================================
 */
async function updateStock(productId, quantity, size) {
  const product = await productModel.findById(productId);

  if (!product) {
    throw new ErrorHandler("Product not found", 404);
  }

  // ================= SIZE BASED PRODUCT =================
  if (size && Array.isArray(product.sizes)) {
    const sizeObj = product.sizes.find((s) => s.size === size);

    if (!sizeObj) {
      throw new ErrorHandler(`Size ${size} not found`, 400);
    }

    sizeObj.stock -= quantity;
    if (sizeObj.stock < 0) sizeObj.stock = 0;
  }
  // ================= NORMAL PRODUCT =================
  else {
    product.Stock -= quantity;
    if (product.Stock < 0) product.Stock = 0;
  }

  await product.save({ validateBeforeSave: false });
}

/**
 * =====================================================
 * DELETE ORDER (ADMIN)
 * =====================================================
 */
exports.deleteOrder = asyncWrapper(async (req, res, next) => {
  const order = await orderModel.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found with this ID", 404));
  }

  await order.deleteOne();

  res.status(200).json({
    success: true,
    message: "Order deleted successfully",
  });
});
