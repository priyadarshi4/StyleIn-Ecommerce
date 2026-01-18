// This method creates JWT token, saves it in cookie, and sends response

const sendJWtToken = (user, statusCode, res) => {
  // Generate JWT
  const token = user.getJWTToken();

  // ✅ Cookie options (PRODUCTION READY)
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,

    // 🔥 REQUIRED for Vercel ↔ Render (cross-domain)
    secure: process.env.NODE_ENV === "production", // HTTPS only in prod
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  };

  // Send cookie + response
  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({
      success: true,
      user,
      token,
    });
};

module.exports = sendJWtToken;
