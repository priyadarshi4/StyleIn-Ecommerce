const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter product name"],
    trim: true,
  },

  description: {
    type: String,
    required: [true, "Please Enter product description"],
  },

  price: {
    type: Number,
    required: [true, "Please Enter product Price"],
    maxLength: [8, "Price cannot exceed 9 characters"],
  },

  info: {
    type: String,
    required: [true, "Please Enter product info"],
  },

  ratings: {
    type: Number,
    default: 0,
  },

  images: [
    {
      product_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],

  category: {
    type: String,
    required: [true, "Please enter Product Category"],
  },

  // ================= SIZE LOGIC =================
  hasSize: {
    type: Boolean,
    default: false, // true for clothes, shoes | false for watches, perfume
  },

  sizes: [
    {
      size: {
        type: String, // "S", "M", "L", "XL"
        required: true,
      },
      stock: {
        type: Number,
        required: true,
        min: [0, "Stock cannot be negative"],
      },
    },
  ],

  // TOTAL STOCK (AUTO CALCULATED FROM SIZES)
  Stock: {
    type: Number,
    required: true,
    default: 0,
  },

  numOfReviews: {
    type: Number,
    default: 0,
  },

  reviews: [
    {
      userId: {
        type: mongoose.Schema.ObjectId,
        ref: "userModel",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      ratings: {
        type: Number,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
      recommend: {
        type: Boolean,
        default: true,
      },
      avatar: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],

  // ADMIN USER
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "userModel",
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ProductModel = mongoose.model("ProductModel", productSchema);
module.exports = ProductModel;
