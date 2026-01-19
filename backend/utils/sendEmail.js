const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async ({ email, subject, html }) => {
  try {
    const result = await resend.emails.send({
      from: "StyleIn <onboarding@resend.dev>",
      to: email,
      subject,
      html,
    });

    console.log("✅ OTP email sent:", result.id);
    return result;
  } catch (error) {
    console.error("❌ RESEND ERROR:", error);
    throw error;
  }
};

module.exports = sendEmail;
