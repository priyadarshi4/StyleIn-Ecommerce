const Razorpay = require("razorpay");

module.exports = function getRazorpayInstance() {

  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    console.log("❌ Razorpay ENV missing");
    throw new Error("Razorpay keys not configured");
  }

  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
};
