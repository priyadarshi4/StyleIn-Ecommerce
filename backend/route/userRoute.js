const express = require("express");
const rateLimit = require("express-rate-limit");

const router = express.Router();

const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUser,
  getSingleUser,
  deleteUser,
  updateUserRole,
  verifyOTP,
} = require("../controller/userConttroler");

const { isAuthentictedUser, authorizeRoles } = require("../middleWare/auth");

// ✅ PRODUCTION-SAFE RATE LIMITER (Render compatible)
const registerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many OTP requests. Please try again later.",
  },
});

// =================== AUTH ROUTES ===================

// Send OTP + Register (POST ONLY)
router.post("/register", registerLimiter, registerUser);

// Verify OTP
router.post("/verify-otp", verifyOTP);

// Login / Logout
router.post("/login", loginUser);
router.get("/logout", logoutUser);

// Password reset
router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword);

// =================== USER ROUTES ===================

router.get("/profile", isAuthentictedUser, getUserDetails);
router.put("/password/update", isAuthentictedUser, updatePassword);
router.put("/profile/update", isAuthentictedUser, updateProfile);

// =================== ADMIN ROUTES ===================

router.get(
  "/admin/users",
  isAuthentictedUser,
  authorizeRoles("admin"),
  getAllUser
);

router
  .route("/admin/user/:id")
  .get(isAuthentictedUser, authorizeRoles("admin"), getSingleUser)
  .put(isAuthentictedUser, authorizeRoles("admin"), updateUserRole)
  .delete(isAuthentictedUser, authorizeRoles("admin"), deleteUser);

module.exports = router;
