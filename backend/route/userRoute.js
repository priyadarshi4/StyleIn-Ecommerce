const express = require("express");
const rateLimit = require("express-rate-limit");

const router = express.Router();

const { registerUser, loginUser, logoutUser, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getAllUser, getSingleUser, deleteUser, updateUserRole, verifyOTP } = require("../controller/userConttroler"); // Fixed typo: "userConttroler" → "userController"; Added verifyOTP
const { isAuthentictedUser, authorizeRoles } = require("../middleWare/auth");

// Rate limiter for registration: 5 requests per hour per IP to prevent spam
const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  message: "Too many registration attempts, please try again later.",
});

router.route("/register").post(registerLimiter, registerUser); // Added rate limiting
router.route("/verify-otp").post(verifyOTP); // New route for OTP verification
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/password/reset/:token").put(resetPassword);
router.route("/profile").get(isAuthentictedUser, getUserDetails);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/update").put(isAuthentictedUser, updatePassword);
router.route("/profile/update").put(isAuthentictedUser, updateProfile);
router.route("/admin/users").get(isAuthentictedUser, authorizeRoles("admin"), getAllUser);
router.route("/admin/user/:id").get(isAuthentictedUser, authorizeRoles("admin"), getSingleUser).put(isAuthentictedUser, authorizeRoles("admin"), updateUserRole).delete(isAuthentictedUser, authorizeRoles("admin"), deleteUser);

module.exports = router;