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

    // 🔥 REQUIRED for Vercel ↔ Render cross-domain cookies
    secure: true,          // MUST be true on Render (HTTPS)
    sameSite: "none",      // REQUIRED for cross-site cookies
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
