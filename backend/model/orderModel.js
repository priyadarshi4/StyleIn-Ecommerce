const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  // ================= SHIPPING INFO =================
  shippingInfo: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
      default: "India",
    },
    pinCode: {
      type: Number,
      required: true,
    },
    phoneNo: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },

  // ================= ORDER ITEMS =================
  orderItems: [
    {
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      productId: {
        type: mongoose.Schema.ObjectId,
        ref: "ProductModel",
        required: true,
      },
      size: {
        type: String,
        default: null, // ✅ SIZE SUPPORT (S, M, L...)
      },
    },
  ],

  // ================= USER =================
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "userModel",
    required: true,
  },

  // ================= PAYMENT INFO =================
paymentInfo: {
  method: {
    type: String,
    required: true,
    enum: ["COD", "CARD", "UPI"],
  },
  id: {
    type: String,
    default: null, // stripe id or razorpay id
  },
  status: {
    type: String,
    required: true,
    enum: ["pending", "succeeded", "failed"],
  },
},

  // ================= PAYMENT TIME =================
  paidAt: {
    type: Date,
    default: null,
  },

  // ================= PRICES =================
  itemsPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  taxPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  shippingPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  },

  // ================= ORDER STATUS =================
  orderStatus: {
    type: String,
    required: true,
    default: "Processing",
    enum: ["Processing", "Shipped", "Delivered"],
  },

  deliveredAt: {
    type: Date,
    default: null,
  },

  // ================= CREATED =================
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("OrdersModel", orderSchema);
