const express = require("express");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../controller/orderController");

const { isAuthentictedUser, authorizeRoles } = require("../middleWare/auth");

const router = express.Router();

// Create new order (COD + Stripe)
router.route("/order/new").post(isAuthentictedUser, newOrder);

// Get single order
router.route("/order/:id").get(isAuthentictedUser, getSingleOrder);

// Logged-in user's orders
router.route("/orders/myOrders").get(isAuthentictedUser, myOrders);

// Admin routes
router
  .route("/admin/orders")
  .get(isAuthentictedUser, authorizeRoles("admin"), getAllOrders);

router
  .route("/admin/order/:id")
  .put(isAuthentictedUser, authorizeRoles("admin"), updateOrder)
  .delete(isAuthentictedUser, authorizeRoles("admin"), deleteOrder);

module.exports = router;
