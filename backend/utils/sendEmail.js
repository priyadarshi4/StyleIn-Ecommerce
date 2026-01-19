const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async ({ email, subject, html }) => {
  try {
    await resend.emails.send({
      from: "StyleIn <onboarding@resend.dev>",
      to: email,
      subject,
      html,
    });

    console.log("✅ OTP email sent to:", email);
  } catch (error) {
    console.error("❌ Resend Email Error:", error);
    throw new Error("Email sending failed");
  }
};

module.exports = sendEmail;
