const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async ({ email, subject, message }) => {
  try {
    await resend.emails.send({
      from: "Style In <onboarding@resend.dev>", // ✅ IMPORTANT
      to: email,
      subject,
      html: `<p>${message}</p>`,
    });

    console.log("✅ OTP email sent via Resend to:", email);
  } catch (error) {
    console.error("❌ Resend email error:", error);
    throw new Error("Failed to send OTP");
  }
};

module.exports = sendEmail;
