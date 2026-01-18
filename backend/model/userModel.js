const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [4, "Name should have more than 4 characters"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid Email"], // validator.isEmail checks if the given email string is a valid email format
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minLength: [8, "Password should have more than 8 characters"], // Fixed typo: was "4", updated to "8" for consistency with common standards
    select: false, // This ensures the password is not sent with data to anyone, not even admins when requesting user data
  },
  avatar: {
    public_id: {
      type: String,
      // required: true, // Removed: Made optional to support OTP registration without avatar
    },
    url: {
      type: String,
      // required: true, // Removed: Made optional to support OTP registration without avatar
    },
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

// Password Hashing >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// This function runs every time user data is saved. The if statement prevents re-hashing if the password hasn't changed.
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  // If password is updated or created, hash it
  this.password = await bcrypt.hash(this.password, 10); // 'this' points to the individual user document
});

// JWT Token Generation >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// JWT has three parts: Header (type of JWT, algorithm details), Payload (user data like ID, expiry), and Secret (hashed key stored on server for verification)
// Using Mongoose methods property to create getJWTToken
userSchema.methods.getJWTToken = function () {
  // Payload includes user ID, expiry, and secret key; header has algorithm and type
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Compare Password Method >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password); // Checks the plain password against the hashed password in the database during login
};

// Generating Password Reset Token >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
userSchema.methods.getResetPasswordToken = function () {
  // Generating a token for password reset (similar to OTP)
  const resetPassToken = crypto.randomBytes(20).toString("hex"); // Creates random bytes and converts to hex string
  // Hashing and adding resetPasswordToken to userSchema

  // resetPasswordToken and resetPasswordExpire are defined in the schema. When a user tries to reset their password, these fields store the token and its expiry.
  // The token is sent via Nodemailer, and if it matches when the user submits it, they can reset their password.
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetPassToken)
    .toString("hex");
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // Token is valid for 15 minutes

  return resetPassToken;
};

const userModel = mongoose.model("userModel", userSchema);
module.exports = userModel;